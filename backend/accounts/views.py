import jwt
from datetime import datetime
from flask import make_response, request, redirect, url_for, session, current_app
from flask.views import MethodView
from werkzeug.security import generate_password_hash, check_password_hash
from .. import db


def token_required(func):
    def wrapper_function(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        if auth_header:
            # Token is present
            auth_token = auth_header.split(" ")[1]
            # Verify token
            try:
                payload = jwt.decode(
                    auth_token, current_app.config['SECRET_KEY'])
            except:
                # token is invalid
                print("token is invalid")
                return ({"Unauthorized": "You must be logged in"}, 401)
            return func(*args, **kwargs)
        else:
            # Token is not present
            print("token is not present")
            return ({"Unauthorized": "You must be logged in"}, 401)
    return wrapper_function


class RegisterView(MethodView):
    def post(self):
        connection = db.get_db()
        cursor = connection.cursor()

        data = request.get_json()
        first_name = data['first_name']
        last_name = data['last_name']
        email = data['email']
        password = data['password']

        cursor.execute(
            "select id from users where email = %s;",
            (email, )
        )
        user = cursor.fetchone()

        if user is not None:
            return ({'message': 'Email is already used by someone'}, 409)
        else:
            encoded_token = jwt.encode(
                {'email': email}, current_app.config['SECRET_KEY'], algorithm='HS256')
            cursor.execute(
                "insert into users (first_name, last_name, email, password) values (%s, %s, %s, %s);",
                (first_name, last_name, email, generate_password_hash(password))
            )
            cursor.execute("select id from users where email = %s;", (email, ))
            user = cursor.fetchone()
            connection.commit()
            # Add two default lists for every user
            cursor.execute(
                "insert into lists (list_name, user_id) values (%s, %s), (%s, %s);",
                ("Best Movies", user[0], "To Watch Movies", user[0])
            )
            connection.commit()
            return ({"message": "Registered successfully", "token": "token = " + encoded_token.decode('UTF-8')}, 201)


class LoginView(MethodView):
    def post(self):
        data = request.get_json()
        email = data['email']
        password = data['password']
        error = None

        connection = db.get_db()
        cursor = connection.cursor()
        cursor.execute("select * from users where email=%s;", (email, ))
        user = cursor.fetchone()  # user_id --> user[0]

        if user is None or not check_password_hash(user[4], password):
            error = "Please check login credentials"

        if error is None:
            encoded_token = jwt.encode(
                {'email': email}, current_app.config['SECRET_KEY'], algorithm='HS256')
            # cursor.execute(
            #     "insert into tokens (token, user_id) values (%s, %s);",
            #     (encoded_token.decode('UTF-8'), user[0])
            # )
            # encoded_token.decode('utf-8') is used to make the token readable
            # connection.commit()

            cursor.execute(
                "update users set last_logged_in=now();"
            )
            connection.commit()
            response = make_response(
                {"message": "Logged in successfully", "token": "token = " + encoded_token.decode('UTF-8')}, 200)
            return response
        else:
            return ({"message": error}, 401)
