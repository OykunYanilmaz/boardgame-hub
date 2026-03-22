from rest_framework.pagination import PageNumberPagination

class DefaultPagination(PageNumberPagination):
    page_size = 10

class GamePagination(PageNumberPagination):
    page_size = 5
