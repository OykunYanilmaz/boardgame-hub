# from django.shortcuts import render, get_object_or_404
from django.views.generic import ListView
from django.db.models.aggregates import Count
from django_filters.rest_framework import DjangoFilterBackend
# from rest_framework.generics import ListAPIView, RetrieveAPIView
# from rest_framework.decorators import api_view
# from rest_framework.response import Response
# from rest_framework.views import APIView
# from rest_framework import status
from rest_framework.viewsets import ReadOnlyModelViewSet, ModelViewSet

from .filters import GameFilter
from .models import Category, Game, Mechanism, Publisher, Review
from .serializers import CategorySerializer, GameSerializer, MechanismSerializer, PublisherSerializer, ReviewSerializer

# Function-based and Class-based Views

# Django DTL View
class HelloView(ListView):
    model = Game
    template_name = 'library/hello.html'
    context_object_name = 'games'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['name'] = 'Oykun'
        return context
    
    def get_queryset(self):
        return Game.objects.select_related('publisher').all()

# def say_hello(request):
#     queryset = Game.objects.all().select_related('publisher')
#     return render(request, 'hello.html', {'name': 'Oykun', 'games': list(queryset)})


# DRF API Views

class GameViewSet(ReadOnlyModelViewSet):
    # queryset = Game.objects.select_related('publisher').all()
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    filter_backends = [DjangoFilterBackend]
    # filterset_fields = ['publisher_id']
    filterset_class = GameFilter

    # def get_serializer_context(self):
    #     return {'request': self.request}

# class GameDetail(RetrieveAPIView):
#     queryset = Game.objects.select_related('publisher').all()
#     serializer_class = GameSerializer
    # def get_serializer_context(self):
    #     return {'request': self.request}

# class GameList(ListAPIView):
#     queryset = Game.objects.select_related('publisher').all()
#     serializer_class = GameSerializer
    # def get_serializer_context(self):
    #     return {'request': self.request}

# @api_view(['GET', 'POST'])
# def game_list(request):
#     if request.method == 'GET':
#         queryset = Game.objects.select_related('publisher').all()
#         serializer = GameSerializer(queryset, many=True, context={'request': request})
#         return Response(serializer.data)
#     elif request.method == 'POST':
#         serializer = GameSerializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         serializer.save()
#         # serializer.validated_data
#         return Response(serializer.data, status=status.HTTP_201_CREATED)
    

class PublisherViewSet(ReadOnlyModelViewSet):
    queryset = Publisher.objects.annotate(games_count=Count('games')).all()
    serializer_class = PublisherSerializer

# @api_view()
# def publisher_detail(request, pk):
#     publisher = get_object_or_404(Publisher.objects.annotate(games_count=Count('games')), pk=pk)
#     serializer = PublisherSerializer(publisher)
#     return Response(serializer.data)


class CategoryViewSet(ReadOnlyModelViewSet):
    queryset = Category.objects.annotate(games_count=Count('games')).all()
    serializer_class = CategorySerializer

class MechanismViewSet(ReadOnlyModelViewSet):
    queryset = Mechanism.objects.annotate(games_count=Count('games')).all()
    serializer_class = MechanismSerializer

class ReviewViewSet(ModelViewSet):
    serializer_class = ReviewSerializer

    def get_queryset(self):
        return Review.objects.filter(game_id=self.kwargs['game_pk'])

    def get_serializer_context(self):
        return {'game_id': self.kwargs['game_pk']}
