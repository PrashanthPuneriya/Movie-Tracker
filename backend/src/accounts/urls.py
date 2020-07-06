from flask import Blueprint
from .views import RegisterView, LoginView, logoutView, ProfileView


accounts = Blueprint(
    'accounts',
    __name__,
    url_prefix='/api/'
)

accounts.add_url_rule('register/', view_func=RegisterView.as_view('register'))
accounts.add_url_rule('login/', view_func=LoginView.as_view('login'))
accounts.add_url_rule('logout/', view_func=logoutView, endpoint='logout')
