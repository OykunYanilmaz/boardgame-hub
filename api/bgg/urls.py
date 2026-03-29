from django.urls import path
from .views import bgg_hot_list_view

urlpatterns = [
    path("hot/", bgg_hot_list_view, name="bgg-hot-list"),
]
