from django.urls import include, path
from rest_framework.routers import DefaultRouter
from . import views

app_name="library"

router = DefaultRouter()
router.register('games', views.GameViewSet)
router.register('publishers', views.PublisherViewSet)
router.register('categories', views.CategoryViewSet)
router.register('mechanisms', views.MechanismViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('hello/', views.HelloView.as_view()),
    # path('games/', views.GameList.as_view()),
    # path('games/<int:pk>/', views.GameDetail.as_view()),
    # path('publishers/', views.PublisherList.as_view()),
    # path('publishers/<int:pk>/', views.PublisherDetail.as_view(), name='publisher-detail'),
]
