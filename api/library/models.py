from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.core.exceptions import ValidationError


class Publisher(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(unique=True)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name


class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(unique=True)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name


class Mechanism(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(unique=True)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name


class GameType(models.TextChoices):
    CORE = "C", "Core"
    EXPANSION = "E", "Expansion"


class Game(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)

    bgg_id = models.PositiveIntegerField(null=True, blank=True, unique=True)

    year_published = models.PositiveSmallIntegerField(null=True, blank=True, validators=[MinValueValidator(1800), MaxValueValidator(2200)])
    description = models.TextField(blank=True)
    min_players = models.PositiveSmallIntegerField(null=True, blank=True)
    max_players = models.PositiveSmallIntegerField(null=True, blank=True)
    play_time_min = models.PositiveSmallIntegerField(null=True, blank=True)
    play_time_max = models.PositiveSmallIntegerField(null=True, blank=True)
    weight = models.DecimalField(null=True, blank=True, max_digits=3, decimal_places=2, validators=[MinValueValidator(1), MaxValueValidator(5)])

    game_type = models.CharField(max_length=1, choices=GameType.choices, default=GameType.CORE)

    parent_game = models.ForeignKey("self", on_delete=models.SET_NULL, null=True, blank=True, related_name="expansions")
    publisher = models.ForeignKey(Publisher, on_delete=models.SET_NULL, null=True, blank=True, related_name="games")
    categories = models.ManyToManyField(Category, blank=True, related_name="games")
    mechanisms = models.ManyToManyField(Mechanism, blank=True, related_name="games")

    thumbnail_url = models.URLField(blank=True)
    image_url = models.URLField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["name"]

    # class Meta:
    #     # db_table = 'store_customers'
    #     indexes = [
    #         models.Index(fields=['last_name', 'first_name'])
    #     ]

    def __str__(self):
        return self.name

    def clean(self):
        if self.game_type == GameType.CORE and self.parent_game:
            raise ValidationError("Core game cannot have a parent game.")
        
        if self.game_type == GameType.EXPANSION and not self.parent_game:
            raise ValidationError("Expansion must have a parent game.")
        
