## documentation

[General](#general)

[Node upgrade](#node)

[Typescript](#typescript)

[Path config](#path-config)

[ES linting](#es-linting)

[Swagger](#swagger)

[Sentry](#sentry)

[Unit tests](#unit-tests)

[GIT pipeline](#git-pipeline)

## general

#### Run project

**Env setup**

```env
HOST = localhost
PORT = 3100
AUTH_PASSWORD_SALT = 'encription-salt'
AUTH_JWT_SECRET = 'jwt-secret'
AUTH_JWT_EXPIRES = '24h'
AUTH_JWT_REFRESH_SECRET = 'jwt-refresh-secret'
AUTH_JWT_REFRESH_EXPIRES = '48h'
```

**Install**

```console
npm i
```

**Run**

```console
npm start
```

**Run tests**

```console
npm run test
```

**Run lint**

```console
npm run lint
```

**Dump data**

Navigate in terminal to backend folder and execute.

```console
./dump_data.sh
```

Follow instructions.

If you have issue with permissions run:

```console
sudo chmod 777 dump_data.sh
```

**Populate data**

Navigate in terminal to backend folder and execute. This command will give some pre defined data.

```console
./populate_data.sh
```

If you have issue with permissions run:

```console
sudo chmod 777 populate_data.sh
```

**User**

If you have executed

```console
./populate_data.sh
```

you can now use in frontend user:

**_email: test@test.com_**
**_password: Test123!_**

**Check API End points**

http://localhost:3100/api-docs

or you can use backend-api.postman_collection.json in Postman

## How to use Postman collection

First import file in Postman. Then start the backend.

After that go to Auth folder and execute register route. You will get response and from this response if is successful copy token. Click on backend-api root folder and in tab variables update token. Do the same for user id.

## node

```console
sudo npm cache clean -f
sudo npm install -g n
sudo n stable
```

[Back to TOP](#documentation)

## typescript

```console
npm install -D typescript tslint types/express
```

In tsconfig.json

```json
{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "lib": ["es6"],
    "sourceMap": true,
    "outDir": "./dist",
    "rootDir": "src",

    "strict": true,

    "moduleResolution": "node",
    "esModuleInterop": true
  }
}
```

Add **start** script

```js
"start": "nodemon --watch 'src/**/*.ts' --exec 'ts-node' src/app.ts",
```

[Back to TOP](#documentation)

## path-config

```console
npm install --save-dev tsconfig-paths
```

In tsconfig.json

```js
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "src/*": ["src/*"]
    }
  }
}
```

Add script in package.json

```js
"scripts": {
  "start": "nodemon --watch 'src/**/*.ts' --exec 'ts-node' -r tsconfig-paths/register src/app.ts",
},
```

[Back to TOP](#documentation)

## es-linting

[ES Article](https://sourcelevel.io/blog/how-to-setup-eslint-and-prettier-on-node)

```console
npx eslint --init
```

#### prettier.config.js

```json
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": ["prettier", "airbnb-base"],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "plugins": ["prettier", "@typescript-eslint"],
  "rules": {
    "prettier/prettier": "error",
    "import/extensions": [{ "ts": "never" }]
  },
  "settings": {
    "import/resolver": {
      "node": {
        "extensions": [".ts"],
        "paths": ["src"]
      }
    }
  }
}
```

Add prettier extension for VSCode and install in project

```console
npm i --save-dev prettier eslint-config-prettier eslint-plugin-prettier
```

Go to VSCode setting search for Default Formatter and add **_ebsenp.prettier-vscode_**

Add prettier.config.js file

```js
module.exports = {
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  trailingComma: 'es5'
};
```

[Back to TOP](#documentation)

## swagger

```console
npm i swagger-jsdoc swagger-ui-express

```

#### Add swagger to code

```js
import { swaggerDocument } from '../swagger/swagger';
import swaggerUi from 'swagger-ui-express';

const registerRoutes = (app: Application) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
```

#### Document routes

You can create a **_.json_** or use **_.ts_** and separate routes documentation as is made in this setup.

Add swagger main document.

```js
export const swaggerDocument = {
  swagger: '2.0',
  info: {
    description: 'API Documentation for NodeJS API project',
    version: '1.0.0',
    title: 'NODE API',
    contact: {
      email: 'test@test.com'
    },
    license: {
      name: 'Apache 2.0',
      url: 'http://www.apache.org/licenses/LICENSE-2.0.html'
    }
  },
  servers: [
    {
      // you can fetch from process.env and set one url
      url: 'http://localhost:3100/api/v1',
      description: 'Local server'
    },
    {
      url: 'https://app-dev.herokuapp.com/api/v1',
      description: 'DEV Env'
    }
  ]
};
```

Add document for specific route

```js
const loginRequest = {
  in: 'body',
  name: 'body',
  description: 'User login parameters',
  required: true,
  schema: {
    type: 'object',
    properties: {
      email: {
        type: 'string'
      },
      password: {
        type: 'string'
      }
    }
  }
};

const loginResponse = {
  type: 'object',
  properties: {
    message: {
      type: 'string',
      description: 'Response message'
    },
    status: {
      type: 'integer',
      description: 'Response status code'
    }
  }
};

export const login = {
  tags: ['Login'],
  operationId: 'login',
  description: 'Login user',
  produces: ['application/json'],
  parameters: [loginRequest],
  responses: {
    200: {
      description: 'Success!',
      schema: loginResponse
    },
    400: {
      description: 'Invalid status value!',
      schema: loginResponse
    },
    404: {
      description: 'User not found!',
      schema: loginResponse
    }
  }
};
```

Add document of specific route to main document

```js
import { login } from './routes/auth';

export const swaggerDocument = {
  swagger: '2.0',
  info: {
    // ...
  },
  servers: [
    // ...
  ],
  tags: [
    {
      name: 'Login'
    }
  ],
  paths: {
    '/login': {
      post: login
    }
  }
};
```

Start server and go to **_/api-docs_**

[Back to TOP](#documentation)

## sentry

[Sentry](https://docs.sentry.io/platforms/node/guides/express/)

https://stackoverflow.com/questions/62048610/using-sentry-with-a-custom-error-handler-in-express

https://codeburst.io/sentry-error-reporting-by-example-part-1-999b2df11556

https://docs.bitnami.com/tutorials/build-deploy-monitor-express-application-kubernetes-bitnami-sentry/

[Back to TOP](#documentation)

## unit-tests

```console
npm install jest --save-dev
```

```console
npm i @types/jest ts-jest --save-dev
```

Initialize jest config file

```console
npx ts-jest config:init
```

This will create **_jest.config.js_** file

```js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    'src/(.*)': '<rootDir>/src/$1'
  }
};
```

To resolve path from tsconfig.json add

```js
moduleNameMapper: {
  'src/(.*)': '<rootDir>/src/$1',
},
```

Add to package.json

```js
 "scripts": {
    "test": "jest --watch",
  },
```

Create file **_someTest.spec.ts_** file

Run:

```console
npm test
```

[Back to TOP](#documentation)

## git-pipeline

[Actions](https://docs.github.com/en/actions/quickstart)

[Back to TOP](#documentation)
