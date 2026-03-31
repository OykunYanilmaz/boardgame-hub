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

### 5- Install ChakraUI for Vite
https://chakra-ui.com/docs/get-started/frameworks/vite

### 6- Install other useful libraries - Part 1
```sh
npm i react-icons immer react-hook-form zod @hookform/resolvers axios
```

We installed emotion when we were installing ChakraUI. So this is optional. Another Css in Js library.
```sh
npm i styled-components @types/styled-components
```

### 7- Install React Query
```sh
npm i @tanstack/react-query
npm i @tanstack/react-query-devtools
```

main.tsx:
```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools} from '@tanstack/react-query-devtools'

const queryClient = new QueryClient();

<QueryClientProvider client={queryClient}>
    <App />
    <ReactQueryDevtools />
</QueryClientProvider>
```

### 8- Install Camelcase-keys and Decamelize-keys
backend -> frontend = camelcase-keys
frontend -> backend = decamelize-keys
```sh
npm install camelcase-keys
npm install decamelize-keys
```

api-client.ts:
```ts
import camelcaseKeys from 'camelcase-keys';
import decamelizeKeys from 'decamelize-keys';

axiosInstance.interceptors.request.use((config) => {
  if (config.data && !(config.data instanceof FormData)) {
    config.data = decamelizeKeys(config.data, { deep: true });
  }

  if (config.params) {
    config.params = decamelizeKeys(config.params, { deep: true });
  }

  return config;
});

axiosInstance.interceptors.response.use((response) => {
  response.data = camelcaseKeys(response.data, { deep: true });
  return response;
});
```

### 9- Install Infinite Scroll and Ms
```sh
npm i react-infinite-scroll-component

npm i ms
npm i -D @types/ms
```

### 10- Install Zustand
```sh
npm i zustand
```
Optional:
```sh
npm i simple-zustand-devtools
npm i -D @types/node
```

### 11- Install React Router
```sh
npm i react-router-dom
```
