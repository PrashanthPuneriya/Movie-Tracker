import json
import jwt
from flask import make_response, request, current_app
from flask.views import MethodView
from .. import db
from ..accounts.views import token_required

"""
json.dumps() serializes the data i.e. encodes the python data
json.loads() deserializes the data i.e. decodes the json data or string of json formatted data into python data type
"""


def find_userID_by_decoding_jwt():
    # No need to check whether payload is correct or not. Since, it has been taken care by @token_required
    auth_header = request.headers.get('Authorization')
    auth_token = auth_header.split(" ")[1]
    payload = jwt.decode(
        auth_token, current_app.config['SECRET_KEY'])
    email = payload['email']
    connection = db.get_db()
    cursor = connection.cursor()
    cursor.execute(
        "SELECT users.id from users WHERE users.email=%s",
        (email, )
    )
    user_id = cursor.fetchone()
    return user_id[0]


class MyLists(MethodView):
    @token_required
    def get(self):
        # Get all lists of a particular user
        user_id = find_userID_by_decoding_jwt()
        connection = db.get_db()
        cursor = connection.cursor()
        cursor.execute(
            "SELECT lists.id, lists.list_name FROM lists WHERE lists.user_id=%s;",
            (user_id, )
        )
        rows = cursor.fetchall()
        column_names = [col[0] for col in cursor.description]
        lists = [dict(zip(column_names, row)) for row in rows]

        response = make_response(json.dumps(lists))
        response.mimetype = 'application/json'
        return response

    def post(self):
        # Create a new list
        user_id = find_userID_by_decoding_jwt()
        connection = db.get_db()
        cursor = connection.cursor()
        data = request.get_json()
        list_name = data['list_name']
        cursor.execute(
            "INSERT INTO lists (list_name, user_id) VALUES (%s, %s);",
            (list_name, user_id)
        )
        connection.commit()
        return ({"Success": f"{list_name} list created successfully"}, 201)

    def delete(self):
        # Delete all lists of a particular user
        user_id = find_userID_by_decoding_jwt()
        connection = db.get_db()
        cursor = connection.cursor()
        cursor.execute(
            "DELETE FROM lists WHERE lists.user_id=%s;",
            (user_id, )
        )
        connection.commit()
        return ({"Success": "Deleted all your lists successfully"})


class SingleList(MethodView):
    def get(self, list_id):
        # Get a single list details
        connection = db.get_db()
        cursor = connection.cursor()
        cursor.execute(
            "SELECT movie_id, movie_title FROM movies WHERE movies.list_id=%s;",
            (list_id, )
        )
        rows = cursor.fetchall()
        column_names = [col[0] for col in cursor.description]
        posts = [dict(zip(column_names, row)) for row in rows]

        response = make_response(json.dumps(posts))
        response.mimetype = 'application/json'
        return response

    def patch(self, list_id):
        # Update list name
        # PATCH -> Because we are updating only certain fields of the post but not the entire entity
        connection = db.get_db()
        cursor = connection.cursor()
        data = request.get_json()
        list_name = data['list_name']

        cursor.execute(
            "UPDATE lists SET list_name=%s WHERE lists.id=%s;",
            (list_name, list_id)
        )
        connection.commit()
        return ({"Success": "List name updated successfully"})

    def delete(self, list_id):
        # Delete a single list
        connection = db.get_db()
        cursor = connection.cursor()
        cursor.execute(
            "DELETE FROM lists WHERE lists.id=%s;",
            (list_id, )
        )
        connection.commit()
        return ({"Success": "Deleted the list successfully"}, 200)


class MovieInList(MethodView):

    def post(self, list_id):
        # Add a movie under that particular list
        connection = db.get_db()
        cursor = connection.cursor()
        data = request.get_json()
        movie_id = data['movie_id']
        movie_title = data['movie_title']

        # check if movie is already present or not and decide whether to insert the movie into the list
        cursor.execute(
            "SELECT EXISTS (SELECT movie_id FROM movies WHERE list_id=%s AND movie_id=%s);", (
                list_id, movie_id, )
        )
        rows = cursor.fetchone()
        if not rows[0]:
            cursor.execute(
                "INSERT INTO movies (movie_id, movie_title, list_id) VALUES (%s, %s, %s);",
                (movie_id, movie_title, list_id)
            )
            connection.commit()

        return ({"Success": "Movie added to the list successfully", "movie_title": movie_title}, 201)

    def delete(self, list_id):
        # Remove a movie from a particular list
        connection = db.get_db()
        cursor = connection.cursor()
        data = request.get_json()
        movie_id = data['movie_id']

        cursor.execute(
            "DELETE FROM movies WHERE movies.movie_id=%s AND movies.list_id=%s;",
            (movie_id, list_id)
        )
        connection.commit()

        return ({"Success": "Removed movie from the list successfully"}, 200)
