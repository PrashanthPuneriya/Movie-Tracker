from flask import Flask
# from flask_cors import CORS


def create_app(config_file='settings.py'):

    app = Flask(__name__)
    app.config.from_pyfile(config_file)
    # CORS(app)

    from . import db
    db.init_app(app)

    from .accounts.urls import accounts
    from .lists.urls import lists
    app.register_blueprint(accounts)
    app.register_blueprint(lists)

    @app.after_request
    def after_request(response):
        response.headers.add('Access-Control-Allow-Origin',
                             'http://localhost:3000')
        response.headers.add('Access-Control-Allow-Headers',
                             'Content-Type,Authorization')
        response.headers.add('Access-Control-Allow-Methods',
                             'GET,PUT,POST,DELETE,OPTIONS')
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        return response

    return app
