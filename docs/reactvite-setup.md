## React + Vite Setup

### 1- Install Node and Nvm in WSL
```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
command -v nvm
nvm install --lts
nvm use --lts

node -v
npm -v
which node
which npm
```

### 2- Install Vite
```sh
npm create vite@latest .
npm i
npm run dev
```

### 3- .gitignore file
```.gitignore
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

# Node
node_modules
dist
dist-ssr
.vite

# Env
.env
.env.*
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# Deploy
.vercel
```

### 4- Dockerfile and .dockerignore file and add frontend to docker-compose.yml
```Dockerfile
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
```

```Dockerfile
node_modules
dist
dist-ssr
.vite
.env
.env.*
.git
.gitignore
.vscode
.idea
.DS_Store
```

```Dockerfile
  web:
    build: ./web
    container_name: bghub-web
    ports:
        - "5173:5173"
    volumes:
        - ./web:/app
        - /app/node_modules
    command: npm run dev -- --host 0.0.0.0
    stdin_open: true
    tty: true
```