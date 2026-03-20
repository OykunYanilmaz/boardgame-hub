from rest_framework import serializers
from decimal import Decimal
from .models import Category, Game, Mechanism, Publisher

# Serializers and ModelSerializers

class MechanismSerializer(serializers.ModelSerializer):
    games_count = serializers.IntegerField()

    class Meta:
        model = Mechanism
        fields = ['id', 'name', 'games_count']

class CategorySerializer(serializers.ModelSerializer):
    games_count = serializers.IntegerField()

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
        fields = ['id', 'name', 'description', 'weight', 'weight_for_pros', 'publisher']
        # , 'publisher_id', 'publisher', 'publisher_object', 'publisher_hyper'

    # id = serializers.IntegerField()
    # title = serializers.CharField(max_length=255, source='name')
    # weight = serializers.DecimalField(max_digits=3, decimal_places=2)
    weight_for_pros = serializers.SerializerMethodField(method_name='calculate_weight_for_pros')

    # Serializing Relationships
    # publisher_id = serializers.PrimaryKeyRelatedField(queryset=Publisher.objects.all())
    publisher = serializers.StringRelatedField()
    # publisher_object = PublisherSerializer(source='publisher')
    # publisher_hyper = serializers.HyperlinkedRelatedField(
    #     source='publisher',
    #     queryset=Publisher.objects.all(),
    #     view_name='library:publisher-detail'
    # )

    def calculate_weight_for_pros(self, game: Game):
        return game.weight * Decimal(0.9)

    def validate(self, data):
        if data['name'] == 'Oykun':
            raise serializers.ValidationError({'name': 'Oykun is the KING, he is not a game.'})
        return data

    def create(self, validated_data):
        game = Game(**validated_data)
        game.name = game.name + '!'
        game.save()
        return game
    
    # def update(self, instance, validated_data):
    #     instance.slug = validated_data.get('slug')
    #     instance.save()
    #     return instance
