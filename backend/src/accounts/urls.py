from flask import Blueprint
from .views import RegisterView, LoginView


accounts = Blueprint(
    'accounts',
    __name__,
    url_prefix='/api/'
)

accounts.add_url_rule('register/', view_func=RegisterView.as_view('register'))
accounts.add_url_rule('login/', view_func=LoginView.as_view('login'))
