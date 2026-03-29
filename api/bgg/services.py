import requests
from django.conf import settings

BGG_BASE_URL = settings.BGG_API_BASE_URL

def get_hot_games() -> str:
    url = f"{BGG_BASE_URL}/hot"
    headers = {
        "Authorization": f"Bearer {settings.BGG_API_TOKEN}",
    }
    params = {
        "type": "boardgame",
    }

    response = requests.get(url, headers=headers, params=params, timeout=15)
    response.raise_for_status()

    return response.text
