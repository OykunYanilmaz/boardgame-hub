## After Installation

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
