### 1- settings.json
```json
  "todo-tree.general.tags": [
    "TODO",
    "FIXME",
    "BUG",
    "NOTE",
    "HACK",
    "REVIEW",
    "OPTIMIZE",
    "TEMP",
    "DEPRECATED"
  ],

  "todo-tree.tree.showCountsInTree": true,
  "todo-tree.tree.groupedByTag": false,

  "todo-tree.filtering.includeGlobs": [
    "**/*.ts",
    "**/*.tsx",
    "**/*.js",
    "**/*.jsx",
    "**/*.py",
    "**/*.go",
    "**/*.json"
  ],

  "todo-tree.highlights.enabled": true,
  "todo-tree.highlights.defaultHighlight": {
    "type": "text"
  },

  "todo-tree.highlights.customHighlight": {
    "TODO": {
      "icon": "check",
      "foreground": "#ffffff",
      "background": "#ffcc00"
    },
    "FIXME": {
      "icon": "flame",
      "foreground": "#ffffff",
      "background": "#ff2d55"
    },
    "NOTE": {
      "icon": "note",
      "foreground": "#ffffff",
      "background": "#0000ff"
    },
    "HACK": {
      "icon": "tools",
      "foreground": "#ffffff",
      "background": "#ffa500"
    },
    "REVIEW": {
      "icon": "eye",
      "foreground": "#ffffff",
      "background": "#90ee90"
    },
    "BUG": {
      "icon": "bug",
      "foreground": "#ffffff",
      "background": "#ff0000"
    },
    "OPTIMIZE": {
      "icon": "rocket",
      "foreground": "#ffffff",
      "background": "#800080"
    },
    "TEMP": {
      "icon": "clock",
      "foreground": "#ffffff",
      "background": "#f97316"
    },
    "DEPRECATED": {
      "icon": "x",
      "foreground": "#ffffff",
      "background": "#000000"
    }
  },

  "todo-tree.regex.regex": "(//|#|<!--|;|/\\*)\\s*($TAGS):\\s"
```

### 2- extensions.json
```json
  "recommendations": [
    "gruntfuggly.todo-tree"
  ]
```