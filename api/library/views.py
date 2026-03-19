from django.shortcuts import render
from library.models import Game

def say_hello(request):
    queryset = Game.objects.all().select_related('publisher')
    

    # return HttpResponse("Hello World")
    return render(request, 'hello.html', {'name': 'Oykun', 'games': list(queryset)})
