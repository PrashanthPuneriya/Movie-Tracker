from flask import Blueprint
from .views import (
    MyLists,
    SingleList,
    MovieInList,
)

lists = Blueprint(
    'lists',
    __name__,
    url_prefix='/api/'
)

lists.add_url_rule('my-lists/', view_func=MyLists.as_view('my-lists'))
lists.add_url_rule('my-lists/<int:list_id>/', view_func=SingleList.as_view('single-list'))
lists.add_url_rule('my-lists/<int:list_id>/movie/', view_func=MovieInList.as_view('movie-in-list'))