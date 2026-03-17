### .gitignore file in Root Directory

```git
############################
# 🐍 Django / Python
############################
*.log
*.pot
*.pyc
*.pyo
*.pyd
__pycache__/
*.py[cod]
*$py.class

# Django local/dev artifacts
db.sqlite3
db.sqlite3-journal
*.sqlite3

media/
staticfiles/

############################
# 🔐 ENV / SECRETS
############################
.env
.env.*
api/.env
web/.env

.venv/
venv/
ENV/
env/
env.bak/
venv.bak/

local_settings.py
settings_local.py

############################
# 🧪 Tests / Coverage
############################
htmlcov/
.coverage
.coverage.*
coverage.xml
*.cover
*.py,cover
.pytest_cache/
.tox/
.nox/
.hypothesis/

############################
# 🔍 Type check / lint
############################
.mypy_cache/
.dmypy.json
dmypy.json
.pyre/
.pytype/

############################
# 🧵 Celery
############################
celerybeat-schedule
celerybeat.pid

############################
# 📦 Build / packaging
############################
build/
dist/
*.egg-info/
.eggs/
wheels/
pip-wheel-metadata/
*.egg
MANIFEST

############################
# 📚 Docs / notebooks
############################
docs/_build/
.ipynb_checkpoints/

############################
# 🌐 FRONTEND (WEB)
############################
web/node_modules/
web/dist/
web/dist-ssr/
web/.vite/

############################
# 📱 FUTURE MOBILE
############################
mobile/node_modules/

############################
# 🖥️ OS
############################
.DS_Store
Thumbs.db

############################
# 🧠 IDE
############################
.vscode/
.idea/
*.iml
*.swp
*~
```