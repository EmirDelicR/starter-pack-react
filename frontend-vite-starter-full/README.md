## Starter pack with

- Vite
- React v18.2
- ES lint
- Prettier
- RTL -React testing library with Vitest
- Cypress
- Storybook

## documentation

[General](#general)

[Node upgrade](#node)

[SCSS](#scss)

[Path config](#path-config)

[Unit tests](#unit-tests)

[ES linting](#es-linting)

[Prettier](#prettier)

[Cypress](#cypress)

[Storybook](#storybook)

## general

#### React app with Vite

[Vite Documentation](https://vitejs.dev/guide/)

```code
npm create vite@latest my-react-app
```

Chose `react` and `typescript`.

#### Run project

_Install:_

```console
npm i
```

_Start project:_

```console
npm run dev
```

_Test project:_

```console
npm run test
```

_Lint project:_

```console
npm run lint
```

[Back to TOP](#documentation)

## node

#### Update Node to latest version

```console
sudo npm cache clean -f
sudo npm install -g n
sudo n stable
```

#### Update packages to latest version

```console
npm outdated
npx npm-check-updates -u
```

[Back to TOP](#documentation)

## scss

```code
npm i -D sass
```

Now change all `.css` files to `.scss` and start project.

[Back to TOP](#documentation)

## path-config

in `vite.config.ts` add:

```js
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: '@', replacement: '/src' }]
  }
});
```

in `tsconfig.json` add:

```js
{
  "compilerOptions": {
    ...,
    /* Path - this part here */
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

Reload VSCode -> press `Strg + P` and type `> rel` use `Developer: Reload Window`

[Back to TOP](#documentation)

## unit-tests

**_Jest and Vitest configuration_**

[RTL Documentation](https://testing-library.com/docs/react-testing-library/setup)

```code
npm i -D @testing-library/jest-dom @testing-library/react @testing-library/user-event jsdom vitest
```

Add `setupTests.ts` to root of the project! and in that file add

```js
import '@testing-library/jest-dom';
```

In `vite.config.ts` add:

```js
/// <reference types="vitest" />
export default defineConfig({
  ...,
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTests.ts',
    // ADD this to not hash classes
    css: {
      modules: {
        classNameStrategy: 'non-scoped'
      }
    }
  },
});
```

`/// <reference types="vitest" />` This part is only needed if you use TypeScript

In `tsconfig.json` add:

```js
{

  "compilerOptions": {
    ...
    /* Types */
    "types": [
      "vite/client",
      "vitest/globals",
      "node",
      "@testing-library/jest-dom"
    ]
  }
}
```

Add script to `package.json`:

```js
"scripts": {
  ...
  "test": "vitest",
  "coverage": "vitest run --coverage"
}
```

Create `[fileName].test.[tsx/ts]` and add:

```js
describe('Simple working test', () => {
  it('should ...', () => {
    expect(true).toEqual(true);
  });
});
```

Run test:

```console
npm run test
```

[Back to TOP](#documentation)

## es-linting

Ultimately, we will configure VSCode to use ESLint and Prettier to find problems and format our code, respectively. If you don't have the extensions installed yet, install them: [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) and [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).

If you used command:

```code
npm create vite@latest my-react-app
```

this will create file `.eslint.cjs` but you can change that to `.eslintrc` and use config.

You can use basic presets:

```json
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:import/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/jsx-runtime",
    "eslint-config-prettier"
  ],
  "ignorePatterns": ["dist", ".eslintrc"],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": ["react", "@typescript-eslint"],
  "rules": {
    "import/extensions": 0,
    "import/no-unresolved": 0,
    "no-console": "off",
    "object-curly-newline": "off",
    "import/prefer-default-export": "off",
    "comma-dangle": ["error", "only-multiline"],
    "@typescript-eslint/no-non-null-assertion": "off"
  }
}
```

Or you can manually setup all by fallowing this links:

[Vite Plugins](https://vitejs.dev/guide/api-plugin.html#rollup-plugin-compatibility)

[Vite all Rollup Plugins](https://vite-rollup-plugins.patak.dev/)

[ES Article](https://sourcelevel.io/blog/how-to-setup-eslint-and-prettier-on-node)

```console
npx eslint --init
```

[Back to TOP](#documentation)

## prettier

Add prettier extension for VSCode and install in project:

```console
npm i -D prettier eslint-config-prettier eslint-plugin-prettier
```

Go to VSCode setting search for Default Formatter and add **_ebsenp.prettier-vscode_**

Add `.prettierrc` file

```json
{
  "tabWidth": 2,
  "semi": true,
  "singleQuote": true,
  "trailingComma": "none",
  "bracketSpacing": true,
  "endOfLine": "auto",
  "importOrder": ["^@/components", "^[./]"],
  "importOrderSeparation": true,
  "importOrderSortSpecifiers": true
}
```

Update `.eslintrc`:

```json
{
  "extends": [
    ...,
    // Add this part here
    "prettier"
  ],
  // Add this part here
  "plugins": ["react", "@typescript-eslint", "prettier"],
  "rules": {
    ...,
    // Add this part here
    "prettier/prettier": "error",
  }
}
```

And you have project setup with `Vite`, `TypeScript`, `ESLint`, `Prettier` and `Vitest`.

[Back to TOP](#documentation)

## cypress

[Documentation](https://testing-library.com/docs/cypress-testing-library/intro/)

```code
npm install -D cypress @testing-library/cypress eslint-plugin-cypress
```

Add es lint config to `.eslintrc`

```json
{
  "env": {
    ...
    "cypress/globals": true
  },
}
```

Create `cypress.config.ts` file:

```js
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/e2e/**/*.{ts,tsx}',
    setupNodeEvents(_on, _config) {
      // implement node event listeners here
    }
  },

  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite'
    }
  }
});
```

Add script to `package.json`

```js
"scripts": {
  ...
  "cypress:open": "cypress open --e2e"
},
```

Run:

```console
npm run cypress:open
```

[Back to TOP](#documentation)

## storybook

[Documentation](https://storybook.js.org/docs/get-started/install)

```code
npx sb init
```

Add script to `package.json`:

```js
"scripts": {
  ...,
  "storybook": "storybook dev -p 6006",
}
```

```console
npm run storybook
```

[Back to TOP](#documentation)

#### Icons used in project

[Icons](https://react-icons.github.io/react-icons/)
