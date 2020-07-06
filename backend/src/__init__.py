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

    return app
