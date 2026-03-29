import xml.etree.ElementTree as ET


def get_attr_value(element, attr_name="value"):
    if element is None:
        return None
    return element.attrib.get(attr_name)

def parse_int(value):
    if value is None:
        return None
    try:
        return int(value)
    except (TypeError, ValueError):
        return None

def parse_hot_games(xml_text: str) -> list[dict]:
    root = ET.fromstring(xml_text)
    results = []

    for item in root.findall("item"):
        game = {
            "bgg_id": parse_int(item.attrib.get("id")),
            "rank": parse_int(item.attrib.get("rank")),
            "name": get_attr_value(item.find("name")),
            "thumbnail": get_attr_value(item.find("thumbnail")),
            "year_published": parse_int(get_attr_value(item.find("yearpublished"))),
        }
        results.append(game)

    return results
