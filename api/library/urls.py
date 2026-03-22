from django.urls import include, path
# from rest_framework.routers import DefaultRouter
from rest_framework_nested import routers
from . import views

app_name="library"

router = routers.DefaultRouter()
router.register('games', views.GameViewSet, basename='games')
router.register('publishers', views.PublisherViewSet)
router.register('categories', views.CategoryViewSet)
router.register('mechanisms', views.MechanismViewSet)

games_router = routers.NestedDefaultRouter(router, 'games', lookup='game')
games_router.register('reviews', views.ReviewViewSet, basename='game-reviews')

urlpatterns = [
    path('', include(router.urls)),
    path('', include(games_router.urls)),
    path('hello/', views.HelloView.as_view()),
    # path('games/', views.GameList.as_view()),
    # path('games/<int:pk>/', views.GameDetail.as_view()),
    # path('publishers/', views.PublisherList.as_view()),
    # path('publishers/<int:pk>/', views.PublisherDetail.as_view(), name='publisher-detail'),
]
