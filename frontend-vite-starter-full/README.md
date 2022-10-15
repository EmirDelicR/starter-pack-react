## Starter pack with

- Vite
- React v18.2
- ES lint
- Prettier
- RTL -React testing library

## React app with Vite

[Vite Documentation](https://vitejs.dev/guide/)

```code
npm create vite@latest my-vue-app --template react-ts
```

## Setup path resolver

in vite.config.ts add

```js
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: '@', replacement: '/src' }]
  }
});
```

## Add scss

```code
npm add -D sass
```

## Setup RTL

[RTL Documentation](https://testing-library.com/docs/react-testing-library/setup)

```code
npm i -D @testing-library/jest-dom @testing-library/react @testing-library/react-hooks @testing-library/user-event jsdom vitest
```

Add `setupTests.ts` to root of the project! and in that file add

```js
import '@testing-library/jest-dom';
```

In vite.config.ts add

```js
/// <reference types="vitest" />
export default defineConfig({
  ...,
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTests.ts',
  },
});
```

`/// <reference types="vitest" />` This part is only needed if you use TS

Add script to package.json

```code
"test": "vitest",
"coverage": "vitest run --coverage"
```

## Add ES lint

[Vite Plugins](https://vitejs.dev/guide/api-plugin.html#rollup-plugin-compatibility)

[Vite all Rollup Plugins](https://vite-rollup-plugins.patak.dev/)

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

### Cypress setup

[Documentation](https://testing-library.com/docs/cypress-testing-library/intro/)

```code
npm install --save-dev cypress @testing-library/cypress
npm install eslint-plugin-cypress --save-dev
```

```js
{
  "extends": [
    "eslint:recommended",
    "prettier"
  ],
  "plugins": ["cypress"],
  "env": {
    "cypress/globals": true
  }
}

```

Add scipt to package.json

```js
"cypress": "cypress open"
```

### Storybook

```code
npx sb init

npm run storybook
```

### Icons used in project

https://react-icons.github.io/react-icons/icons?name=ri
