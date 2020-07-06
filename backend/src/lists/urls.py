from flask import Blueprint
from .views import (
    MyLists,
)

lists = Blueprint(
    'lists',
    __name__,
    url_prefix='/'
)

lists.add_url_rule('my-lists/', view_func=MyLists.as_view('my-lists'))