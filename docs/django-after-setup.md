## After Setup and Installation

### 1- .gitignore file
```git
# Env
.env

# Python
__pycache__/
*.py[cod]

# Django local/dev artifacts
db.sqlite3
*.sqlite3

# Media / static
media/
staticfiles/

# Logs
*.log

# Virtual environments
.venv/
venv/
env/

# Test / coverage
.pytest_cache/
.coverage
htmlcov/
```

### 2- Django Debug Toolbar
```sh
pipenv install django-debug-toolbar
```

```py
# settings.py
INSTALLED_APPS = [
    'debug_toolbar'
]

MIDDLEWARE = [
    'debug_toolbar.middleware.DebugToolbarMiddleware',
]

INTERNAL_IPS = [
    '127.0.0.1',
    '172.18.0.1' # for inside docker
]

# urls.py
if settings.DEBUG:
    import debug_toolbar
    urlpatterns += [
        path('__debug__/', include(debug_toolbar.urls)),
    ]
```

### 3- Django Rest Framework
```sh
pipenv install djangorestframework
```

```py
INSTALLED_APPS = [
    'rest_framework',
]

REST_FRAMEWORK = {
    'COERCE_DECIMAL_TO_STRING': False,
}
```

### 4- CORS
```sh
pipenv install django-cors-headers
```

```py
INSTALLED_APPS = [
    "corsheaders",
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
]

CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]
```

### 5- Nested Routers
```sh
pipenv install drf-nested-routers
```

```py
from rest_framework_nested import routers

products_router = routers.NestedDefaultRouter(router, 'products', lookup='product')  # product_pk
products_router.register('reviews', views.ReviewViewSet, basename='product-reviews')

urlpatterns = router.urls + products_router.urls
```

### 6- Generic Filtering
```sh
pipenv install django-filter
```

```py
INSTALLED_APPS = [
    'django_filters',
]
```

```py
from django_filters.rest_framework import DjangoFilterBackend

filter_backends = [DjangoFilterBackend]
filterset_fields = ['collection_id']
```

### 7- Auth System Library - Djoser and SimpleJwt
```sh
pipenv install djoser
```

```py
INSTALLED_APPS = [
    'djoser',
]

path('auth/', include('djoser.urls')),
```

```sh
pipenv install djangorestframework_simplejwt
```

```py
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
}

SIMPLE_JWT = {
   'AUTH_HEADER_TYPES': ('JWT',),
}

path('auth/', include('djoser.urls.jwt')),
```

### 8- ImageField - Pillow
```py
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
# MEDIA_ROOT = BASE_DIR / 'media'

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

avatar = models.ImageField(upload_to='accounts/avatars/', blank=True, null=True, validators=[validate_file_size])
```

```sh
pipenv install pillow
```

### 9- Fake Smtp - Simple Mail Transfer Protocol
```sh
docker run --rm -it -p 3000:80 -p 2525:25 rnwood/smtp4dev
```
Even beter: Add a service to the compose.yml
```yml
  smtp4dev:
    image: rnwood/smtp4dev
    container_name: bghub-smtp4dev
    ports:
        - "3000:80"
        - "2525:25"
```

```py
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
# EMAIL_HOST = 'localhost'
# EMAIL_HOST = "host.docker.internal"
EMAIL_HOST = "smtp4dev"
EMAIL_HOST_USER = ''
EMAIL_HOST_PASSWORD = ''
EMAIL_PORT = 2525
EMAIL_USE_TLS = False
DEFAULT_FROM_EMAIL = 'noreply@bghub.com'

ADMINS = [
    ('Oykun', 'admin@bghub.com')
]
```
