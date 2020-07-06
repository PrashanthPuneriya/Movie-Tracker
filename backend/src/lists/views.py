import json
from flask import make_response, request, session
from flask.views import MethodView
from .. import db
from ..accounts.views import login_required

"""
json.dumps() serializes the data i.e. encodes the python data
json.loads() deserializes the data i.e. decodes the json data or string of json formatted data into python data type
"""


class MyLists(MethodView):
    # @login_required
    def get(self):
        # Get all lists of a particular user
        # user_id = session['session_id']
        user_id = 4
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

    # @login_required
    def post(self):
        # Create a new list
        connection = db.get_db()
        cursor = connection.cursor()

        # user_id = session['session_id']
        user_id = 4
        data = request.get_json()
        list_name = data['list_name']

        cursor.execute(
            "INSERT INTO lists (list_name, user_id) VALUES (%s, %s);",
            (list_name, user_id)
        )
        connection.commit()
        return ({"Success": f"{list_name} list created successfully"}, 201)

    @login_required
    def delete(self):
        # Delete all lists of a particular user
        user_id = session['session_id']
        connection = db.get_db()
        cursor = connection.cursor()
        cursor.execute(
            "DELETE FROM lists WHERE lists.user_id=%s;",
            (user_id, )
        )
        connection.commit()
        return ({"Success": "Deleted all your lists successfully"})


class SingleList(MethodView):
    @login_required
    def get(self, list_id):
        # Get a single list details
        connection = db.get_db()
        cursor = connection.cursor()
        cursor.execute(
            "SELECT movie_id, movie_title FROM movies WHERE movie.list_id=%s;",
            (list_id, )
        )
        rows = cursor.fetchall()
        column_names = [col[0] for col in cursor.description]
        posts = [dict(zip(column_names, row)) for row in rows]

        response = make_response(json.dumps(posts))
        response.mimetype = 'application/json'
        return response

    @login_required
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

    @login_required
    def delete(self, list_id):
        # Delete a single list
        connection = db.get_db()
        cursor = connection.cursor()
        cursor.execute(
            "DELETE FROM lists WHERE lists.id=%s;",
            (list_id, )
        )
        connection.commit()
        return ({"Success": "Deleted the list successfully"})


class MovieInList(MethodView):
    @login_required
    def post(self):
        # Add a movie under that particular list
        user = session['session_id']
        connection = db.get_db()
        cursor = connection.cursor()

        data = request.get_json()
        movie_id = data['movie_id']
        movie_title = data['movie_title']
        list_id = data['list_id']

        cursor.execute(
            "INSERT INTO movies (movie_id, movie_title, list_id) VALUES (%s, %s, %s);",
            (movie_id, movie_title, list_id)
        )
        connection.commit()

        return ({"Success": "Movie added to the list successfully", "movie_title": movie_title}, 201)

    @login_required
    def delete(self):
        # Remove a movie from a particular list
        connection = db.get_db()
        cursor = connection.cursor()

        data = request.get_json()
        movie_id = data['movie_id']
        list_id = data['list_id']

        cursor.execute(
            "DELETE FROM movies WHERE movies.movie_id=%s AND movies.list_id=%s;",
            (movie_id, list_id)
        )
        connection.commit()

        return ({"Success": "Removed movie from the list successfully"})
