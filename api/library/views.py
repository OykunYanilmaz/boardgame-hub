from django.shortcuts import render
from django.http import HttpResponse


def say_hello(request):
    # return HttpResponse("Hello World")
    print(request.META.get("REMOTE_ADDR"))
    return render(request, 'hello.html', {'name': 'Oykun'})
