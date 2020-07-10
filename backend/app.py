from .lists.urls import lists
from .accounts.urls import accounts
from . import db
import os
from flask import Flask


# def create_app(config_file='settings.py'):
app = Flask(__name__, static_folder='../frontend/build',
            static_url_path='')
# app.config.from_pyfile(config_file)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')

db.init_app(app)

app.register_blueprint(accounts)
app.register_blueprint(lists)


@app.route('/')
def root():
    return app.send_static_file('index.html')

# @app.after_request
# def after_request(response):
#     response.headers.add('Access-Control-Allow-Origin',
#                          '*')
#     response.headers.add('Access-Control-Allow-Credentials', 'true')
#     # Headers which can be used in actual requests. This is a response to preflight requests
#     response.headers.add('Access-Control-Allow-Headers',
#                          'Content-Type, Authorization, Credentials, Set-Cookie')
#     # Specifies the methods allowed when accessing the resource in response to a preflight request.
#     response.headers.add('Access-Control-Allow-Methods',
#                          'GET, PUT, POST, DELETE, OPTIONS')
#     # Indicates which headers can be exposed as part of the response by listing their names.
#     response.headers.add('Access-Control-Expose-Headers',
#                          'Content-Type, Set-Cookie')
#     # Used when issuing a preflight request to let the server know which HTTP headers will be used when the actual request is made.
#     response.headers.add('Access-Control-Request-Headers',
#                          'Content-Type, Authorization, Credentials')
#     return response

# return app


if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT', 80))
