### Python - Django BE - FE - Black - Ruff - ESLint - Prettier
```json
  "python-envs.defaultEnvManager": "ms-python.python:pipenv",
  "python.terminal.activateEnvironment": true,
  "editor.formatOnSave": true,
  "editor.trimAutoWhitespace": true,
  "files.insertFinalNewline": true,

  // Python Black Formatter - Ruff
  "[python]": {
    "editor.defaultFormatter": "ms-python.black-formatter",
    // "editor.codeActionsOnSave": {
    //   "source.fixAll.ruff": "explicit",
    //   "source.organizeImports.ruff": "explicit"
    // }
  },

  // Django - Backend
  "files.associations": {
    "**/*.html": "html",
    "**/templates/**/*.html": "django-html",
    "**/requirements{/**,*}.{txt,in}": "pip-requirements"
  },

  "emmet.includeLanguages": {
    "django-html": "html"
  },

  "[django-html]": {
    "editor.tabSize": 2,
    "editor.insertSpaces": true,
    "editor.detectIndentation": false,
    "editor.formatOnSave": true
  },

  // React - Frontend
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },

  // ESLint
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ],
```
