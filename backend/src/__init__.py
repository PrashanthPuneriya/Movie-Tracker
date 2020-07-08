from flask import Flask


def create_app(config_file='settings.py'):

    app = Flask(__name__)
    app.config.from_pyfile(config_file)

    from . import db
    db.init_app(app)

    from .accounts.urls import accounts
    from .lists.urls import lists
    app.register_blueprint(accounts)
    app.register_blueprint(lists)

    @app.after_request
    def after_request(response):
        response.headers.add('Access-Control-Allow-Origin',
                             'http://127.0.0.1:3000')
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        # Headers which can be used in actual requests. This is a response to preflight requests
        response.headers.add('Access-Control-Allow-Headers',
                             'Content-Type, Authorization, Credentials, Set-Cookie')
        # Specifies the methods allowed when accessing the resource in response to a preflight request.
        response.headers.add('Access-Control-Allow-Methods',
                             'GET, PUT, POST, DELETE, OPTIONS')
        # Indicates which headers can be exposed as part of the response by listing their names.
        response.headers.add('Access-Control-Expose-Headers',
                             'Content-Type, Set-Cookie')
        # Used when issuing a preflight request to let the server know which HTTP headers will be used when the actual request is made.
        response.headers.add('Access-Control-Request-Headers',
                             'Content-Type, Authorization, Credentials')

        return response

    return app
