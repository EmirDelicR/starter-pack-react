## documentation

[General](#general)

[Node upgrade](#node)

[Typescript](#typescript)

[Path config](#path-config)

[Nodemon](#nodemon)

[ES linting](#es-linting)

[Unit tests](#unit-tests)

[Express](#express)

[Swagger](#swagger)

[Sentry](#sentry)

[GIT pipeline](#git-pipeline)

## general

#### Run project

**Setup data**
You can run the script in the scripts folder to set up all data that is needed with one command.

First, you need to add permissions to the folder:

```console
sudo chmod -R 777 scripts
```

and then execute

```console
./scripts/start.sh
```

This script will create a logs folder for you, dump all data, populate data with backup data, create .env file and add entries, install dependency, and run the project. After you stop the project you can only call

```console
npm start
```

to start the project again. Or you can do all these steps manually as written below.

**_Do this command before you run docker and modify the .env file with your data._**

To use docker you need to install docker on your machine and run:

```console
./scripts/start_docker.sh
```

To stop the container and (optional) remove the container and image run

```console
./scripts/stop_container.sh
```

If you want to omit sudo when calling the docker command use this command and restart your PC.

```console
sudo usermod -aG docker $USER
```

**Env setup**

Create .env file in the root of the project.

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

**Create logs file**

In the source folder create a logs folder: src/logs or run the command:

```console
mkdir src/logs
```

**Dump data**

Navigate in the terminal to the backend/scripts folder and execute:

```console
./dump_data.sh
```

Follow instructions.

If you have an issue with permissions run:

```console
sudo chmod 777 dump_data.sh
```

**Populate data**

Navigate in the terminal to the backend/scripts folder and execute. This command will give some pre-defined data.

```console
./populate_data.sh
```

If you have an issue with permissions run:

```console
sudo chmod 777 populate_data.sh
```

**User**

If you have executed:

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

After that go to the Auth folder and execute the register route. You will get a response and from this response if is successful copy the token. Click on backend-api root folder and in tab variables update token. Do the same for user id.

## node

```console
sudo npm cache clean -f
sudo npm install -g n
sudo n stable
```

## Update packages

```console
npm outdated
npx npm-check-updates -u
```

[Back to TOP](#documentation)

## typescript

**_Type Script Setup_**

```console
npm i -D typescript @types/node ts-node
```

- Add this as a script to package.json to avoid installing typescript globally.

```javascript
"scripts": {
  ...
  "tsc": "tsc"
}
```

Now run command

```console
npm run tsc -- --init
```

This will generate tsconfig.json file (Options that I use)

```json
{
  "compilerOptions": {
    "target": "es6",
    "lib": ["es6"],
    "module": "commonjs",
    "rootDir": "./src",
    "moduleResolution": "node",
    "baseUrl": ".",
    "paths": {
      "src/*": ["src/*"]
    },
    "sourceMap": true,
    "outDir": "./dist",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  }
}
```

Test if TS is configured correctly. In package.json file add start script. Create file src/app.ts and add some TS code.

```javascript
"scripts": {
  ...
  "start": "ts-node src/app.ts"
}
```

```console
npm run start
```

[Back to TOP](#documentation)

## path-config

**_Path Config_**

```console
npm i -D tsconfig-paths
```

Update tsconfig.json

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "src/*": ["src/*"]
    }
  }
}
```

Update the start script to use paths

```js
"scripts": {
  ...
  "start": "ts-node -r tsconfig-paths/register src/app.ts"
}
```

[Back to TOP](#documentation)

## nodemon

**_Nodemon Setup_**

```console
npm i -D nodemon
```

Update the start script to use nodemon

```js
"scripts": {
  ...
  "start": "nodemon --watch 'src/**/*.ts' --exec 'ts-node' -r tsconfig-paths/register src/app.ts"
}
```

Run:

```console
npm run start
```

You can also create a file nodemon.json and add settings to make the start script smaller.

```json
{
  "watch": ["src"],
  "ext": "ts",
  "exec": "ts-node -r tsconfig-paths/register src/app.ts"
}
```

```js
"scripts": {
  ...
  "start": "nodemon"
}
```

```console
npm run start
```

[Back to TOP](#documentation)

## es-linting

**_ESLint and Prettier Config_**

Ultimately, we will configure VSCode to use ESLint and Prettier to find problems and format our code, respectively. If you don't have the extensions installed yet, install them: [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) and [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).

[ES Article](https://sourcelevel.io/blog/how-to-setup-eslint-and-prettier-on-node)

you can run this command:

```console
npx eslint --init
```

or do it manually:

```console
npm i -D eslint prettier eslint-config-prettier eslint-plugin-prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-plugin-import
```

Create .eslintrc.json file and past this (this is my settings)

```json
{
  "env": {
    "node": true,
    "es2021": true,
    "jest": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
    "project": "tsconfig.json"
  },
  "plugins": ["@typescript-eslint", "prettier", "import"],
  "rules": {
    "prettier/prettier": "error",
    "import/extensions": 0,
    "import/no-unresolved": 0,
    "no-console": "off",
    "object-curly-newline": "off",
    "import/prefer-default-export": "off",
    "comma-dangle": ["error", "only-multiline"],
    "no-var": "error",
    "no-multi-spaces": "error",
    "space-in-parens": "error",
    "no-multiple-empty-lines": "error",
    "prefer-const": "error",
    "indent": ["error", "tab"],
    "linebreak-style": ["error", "unix"],
    "quotes": ["error", "single"],
    "semi": ["error", "always"]
  },
  "settings": {
    "import/resolver": {
      "typescript": {
        "alwaysTryTypes": true
      },
      "node": {
        "extensions": [".js", ".ts"],
        "moduleDirectory": ["src", "node_modules"]
      }
    },
    "import/parsers": {
      "@typescript-eslint/parser": [".ts"]
    }
  }
}
```

Add linting script command in package.json

```js
"scripts": {
  ...
  "lint": "eslint '**/*.{ts,tsx}'"
}
```

Run:

```console
npm run lint
```

#### .prettierrc.json

Add a prettier extension for VSCode and install in the project.

```console
npm i --D prettier eslint-config-prettier eslint-plugin-prettier
```

Go to the VSCode setting search for Default Formatter and add **_ebsenp.prettier-vscode_**

Add .prettierrc.json file

```json
{
  "tabWidth": 2,
  "semi": true,
  "singleQuote": true,
  "trailingComma": "none",
  "bracketSpacing": true,
  "endOfLine": "auto",
  // import order is optional
  "importOrder": [
    "^src/interfaces/(.*)$",
    "^src/controllers",
    "^src/middleware",
    "^src/routes",
    "^src/swagger",
    "^src/util"
  ],
  "importOrderSeparation": true,
  "importOrderSortSpecifiers": true
}
```

[Back to TOP](#documentation)

## unit-tests

**_Jest configuration_**

```console
npm i -D jest @types/jest ts-jest
```

Initialize jest config file

```console
npx ts-jest config:init
```

This will create jest.config.js file

```js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // To resolve path from tsconfig.json add
  moduleNameMapper: {
    'src/(.*)': '<rootDir>/src/$1'
  }
};
```

Add script to the package.json

```js
"scripts": {
  ...
  "test": "jest --watch",
}
```

Create **_someTest.spec.ts_** file

Run:

```console
npm run test
```

[Back to TOP](#documentation)

## express

**_Configure server_**

```console
npm i express dotenv cors helmet morgan cookie-parser
npm i -D @types/cookie-parser @types/cors @types/express @types/morgan
```

[Back to TOP](#documentation)

## swagger

**_Configure API Documentation_**

[Swagger setup autogen](https://blog.stackademic.com/how-to-create-api-documentation-fast-swagger-with-typescript-a5926acbed30)
[Swagger setup](https://dev.to/desmondsanctity/documenting-nodejs-api-using-swagger-4klp)

```console
npm i -D swagger-jsdoc swagger-ui-express @types/swagger-ui-express @types/swagger-jsdoc
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

Add document for a specific route.

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

Add document of the specific route to the main document

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

## git-pipeline

[Actions](https://docs.github.com/en/actions/quickstart)

[Back to TOP](#documentation)
