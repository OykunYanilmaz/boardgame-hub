from django.core.cache import cache
from django.http import JsonResponse
from django.http import HttpResponse
from .parsers import parse_hot_games
from .services import get_hot_games


def bgg_hot_test_view(request):
    xml_text = get_hot_games()
    return HttpResponse(xml_text, content_type="application/xml")


def bgg_hot_list_view(request):
    cache_key = "bgg_hot_games"
    cached_games = cache.get(cache_key)

    if cached_games is not None:
        print("HOT GAMES: served from cache")
        games = cached_games
    else:
        print("HOT GAMES: fetched from BGG")
        xml_text = get_hot_games()
        games = parse_hot_games(xml_text)
        cache.set(cache_key, games, timeout=60 * 60 * 24)

    return JsonResponse(
        {
            "count": len(games),
            "shown_count": len(games[:10]),
            "results": games[:10],
        }
    )
