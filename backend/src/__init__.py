from flask import Flask
from flask_cors import CORS

def create_app(config_file='settings.py'):

    app = Flask(__name__)
    app.config.from_pyfile(config_file)
    CORS(app)

    from . import db
    db.init_app(app)

    from .accounts.urls import accounts
    from .lists.urls import lists
    app.register_blueprint(accounts)
    app.register_blueprint(lists)

    return app
