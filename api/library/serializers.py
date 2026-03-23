from rest_framework import serializers
from decimal import Decimal
from .models import Category, Game, Mechanism, Publisher, Review

# Serializers and ModelSerializers

class MechanismSerializer(serializers.ModelSerializer):
    games_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Mechanism
        fields = ['id', 'name', 'games_count']

class CategorySerializer(serializers.ModelSerializer):
    games_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Category
        fields = ['id', 'name', 'games_count']

class PublisherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publisher
        fields = ['id', 'name', 'games_count']

    games_count = serializers.IntegerField(read_only=True)

class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ['id', 'name', 'description', 'year_published', 'weight', 'weight_for_pros', 'publisher', 'categories', 'mechanisms']

    weight_for_pros = serializers.SerializerMethodField(method_name='calculate_weight_for_pros')

    # Serializing Relationships
    # publisher_id = serializers.PrimaryKeyRelatedField(queryset=Publisher.objects.all())
    # publisher = serializers.StringRelatedField()
    publisher = PublisherSerializer(read_only=True)
    # publisher_hyper = serializers.HyperlinkedRelatedField(
    #     source='publisher',
    #     queryset=Publisher.objects.all(),
    #     view_name='library:publisher-detail'
    # )
    categories = CategorySerializer(many=True, read_only=True)
    mechanisms = MechanismSerializer(many=True, read_only=True)

    def calculate_weight_for_pros(self, game: Game):
        return game.weight * Decimal(0.9)

    def validate(self, data):
        if data['name'] == 'Oykun':
            raise serializers.ValidationError({'name': 'Oykun is the KING, he is not a game.'})
        return data

    # def create(self, validated_data):
    #     game = Game(**validated_data)
    #     game.name = game.name + '!'
    #     game.save()
    #     return game


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'name', 'description', 'date']

    def create(self, validated_data):
        game_id = self.context['game_id']
        return Review.objects.create(game_id=game_id, **validated_data)
