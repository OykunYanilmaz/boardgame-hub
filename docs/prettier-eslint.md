### 1- Install Prettier and Eslint
```sh
npm install -D prettier eslint

npx prettier --version
npx eslint --version
```

### 2- Run commands
```sh
npx prettier . --check
npx prettier . --write
npx eslint .
npx eslint . --fix
```

### 3- Create .prettierrc and .prettierignore 
```prettier
{
  "semi": false,
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "trailingComma": "es5",
  "arrowParens": "avoid",
  "endOfLine": "lf"
}
```

```prettier
node_modules
dist
build
coverage
```
