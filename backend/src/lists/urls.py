from flask import Blueprint
from .views import (
    MyLists,
)

blogs = Blueprint(
    'lists',
    __name__,
    url_prefix='/'
)

blogs.add_url_rule('my-lists/', view_func=MyLists.as_view('my-lists'))