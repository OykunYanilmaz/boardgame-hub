from django.contrib import admin, messages
# from django.contrib.contenttypes.admin import GenericTabularInline
from django.db import models as django_models
from django.db.models import Count, F, Value
from django.db.models.functions import Coalesce, Concat
from django.urls import reverse
from django.utils.html import format_html, urlencode, format_html_join
from . import models

COMPLEXITY_HIGH = "High"
COMPLEXITY_MEDIUM = "Medium"
COMPLEXITY_LOW = "Low"
COMPLEXITY_THRESHOLDS = {
    "High": 3.8,
    "Medium": 3.1,
}

class ComplexityFilter(admin.SimpleListFilter):
    title = 'complexity'
    parameter_name = 'complexity'

    def lookups(self, request, model_admin):
        return [
            ('>=3.8', COMPLEXITY_HIGH),
            ('>=3.1', COMPLEXITY_MEDIUM),
            ('<3.1', COMPLEXITY_LOW)
        ]

    def queryset(self, request, queryset):
        if self.value() == '>=3.8':
            return queryset.filter(weight__gte=COMPLEXITY_THRESHOLDS[COMPLEXITY_HIGH])
        if self.value() == '>=3.1':
            return queryset.filter(weight__gte=COMPLEXITY_THRESHOLDS[COMPLEXITY_MEDIUM], weight__lt=COMPLEXITY_THRESHOLDS[COMPLEXITY_HIGH])
        if self.value() == '<3.1':
            return queryset.filter(weight__lt=COMPLEXITY_THRESHOLDS[COMPLEXITY_MEDIUM])
        return queryset
    

class GameInline(admin.TabularInline):
    model = models.Game
    extra = 1
    fk_name = 'publisher'

@admin.register(models.Publisher)
class PublisherAdmin(admin.ModelAdmin):
    inlines = [GameInline]
    list_display = ['name', 'games_count']
    prepopulated_fields = {"slug": ("name",)}
    search_fields = ['name']

    @admin.display(ordering='games_count', description='Games Count')
    def games_count(self, publisher):
        url = (
                reverse('admin:library_game_changelist')
                + '?'
                + urlencode({
                    'publisher__id': str(publisher.id)
                })
              )
        return format_html('<a href="{}">{}</a>', url, publisher.games_count)

    def get_queryset(self, request):
        return super().get_queryset(request).annotate(
            games_count=Count('games')
        )

@admin.register(models.Category)
class CategoryAdmin(admin.ModelAdmin):
    prepopulated_fields = {"slug": ("name",)}

@admin.register(models.Mechanism)
class MechanismAdmin(admin.ModelAdmin):
    prepopulated_fields = {"slug": ("name",)}

class ExpansionInline(admin.TabularInline):
    model = models.Game
    fk_name = 'parent_game'
    # fields = ['name', 'slug', 'game_type']
    autocomplete_fields = ['publisher']
    extra = 1
    # min_num = 1
    # max_num = 5

@admin.register(models.Game)
class GameAdmin(admin.ModelAdmin):
    inlines = [ExpansionInline]
    # fields = ['name', 'slug']
    # readonly_fields = ['bgg_id']
    # exclude = ['bgg_id']
    # prepopulated_fields = {"slug": ("name",)}
    prepopulated_fields = {'slug': ['name']}
    autocomplete_fields = ['publisher']
    filter_horizontal = ['categories', 'mechanisms']

    actions = ['add_exclamation_to_the_description']

    search_fields = ['name__istartswith']

    list_display = ['name', 'description', 'publisher_name', 'year_published', 'game_categories_badges', 'game_mechanics', 'complexity', 'game_type']
    list_editable = ['year_published']
    list_filter = ['year_published', 'publisher', 'categories', 'mechanisms', ComplexityFilter]
    list_per_page = 5
    # ordering = ['name', 'year']
    
    # list_select_related = ['publisher']
    def get_queryset(self, request):
        return super().get_queryset(request).select_related('publisher').prefetch_related('categories')

    @admin.display(ordering='publisher_name')
    def publisher_name(self, game):
        return game.publisher.name

    @admin.display(ordering='weight')
    def complexity(self, game):
        w = game.weight
        if w is None: 
            return '-'
        return COMPLEXITY_HIGH if w >= COMPLEXITY_THRESHOLDS[COMPLEXITY_HIGH] else COMPLEXITY_MEDIUM if w >= COMPLEXITY_THRESHOLDS[COMPLEXITY_MEDIUM] else COMPLEXITY_LOW

    def game_categories(self, game):
        return ", ".join(category.name for category in game.categories.all())
    
    def game_categories_badges(self, game):
        categories = game.categories.all()

        if not categories.exists():
            return "-"
        
        return format_html(
            '<div style="display:flex; flex-wrap:wrap; gap:4px;">{}</div>',
            format_html_join(
                "", 
                '<a href="{}" style="padding:2px 8px; border-radius:999px; '
                'background:grey; border:1px solid #c6dafc; '
                'font-size:12px; text-decoration:none;">{}</a>',
                ((
                    reverse("admin:library_game_changelist")
                    + "?"
                    + urlencode({"categories__id": category.id}),
                    category.name
                ) for category in categories)
            )    
        )
    
    def game_mechanics(self, game):
        return ", ".join(mechanism.name for mechanism in game.mechanisms.all())

    @admin.action(description='Add exclamation to the description')
    def add_exclamation_to_the_description(self, request, queryset):
        updated_count = queryset.update(description=Concat(
                                            Coalesce(F('description'), Value(''), output_field=django_models.TextField()),
                                            Value('!!!', output_field=django_models.TextField()),
                                            output_field=django_models.TextField(),
                                        ))
        self.message_user(
            request,
            f'{updated_count} descriptions were successfully updated.',
            messages.SUCCESS
        )
