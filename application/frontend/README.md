## documentation

[General](#general)

[Node upgrade](#node)

[Path config](#path-config)

[Add SCSS](#scss)

[Unit tests](#unit-tests)

[ES linting](#es-linting)

[Express](#express)

[Swagger](#swagger)

[Sentry](#sentry)

[GIT pipeline](#git-pipeline)

## general

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

_Open story book:_

```console
npm run storybook
```

_Run cypress tests:_

```console
npm run cypress:open
```

[Back to TOP](#documentation)

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

## path-config

**_Path Config_**

in vite.config.ts add

```js
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: '@', replacement: '/src' }]
  }
});
```

[Back to TOP](#documentation)

## scss

```console
npm add -D sass
```

[Back to TOP](#documentation)

## unit-tests

[Vitest migration](https://willcodefor.beer/posts/vitest)

[RTL Documentation](https://testing-library.com/docs/react-testing-library/setup)

```console
npm i -D @testing-library/jest-dom @testing-library/react @testing-library/react-hooks @testing-library/user-event jsdom vitest
```

Add `setupTests.ts` to the root of the the project, and in that file add:

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
  },
});
```

`/// <reference types="vitest" />` This part is only needed if you use TS

Add script to package.json

```js
"scripts": {
  ...
  "test": "vitest",
  "coverage": "vitest run --coverage"
}
```

[Back to TOP](#documentation)

#### Icons used in project

_react-icons_

['React-icons'](https://react-icons.github.io/react-icons/icons?name=ri)

#### Custom Libraries in project

_tenStack Table_

['TenStack Table'](https://tanstack.com/table/v8/docs/guide/installation)

_react hook form_

['React hook form'](https://react-hook-form.com/)

#### Storybook

[Vite Storybook](https://storybook.js.org/docs/react/builders/vite)

[StoryBookV7](https://github.com/storybookjs/storybook/issues/18923)

**Do migration**

```console
npx sb@next automigrate
```

#### Adding redux to project

```console
npm i @reduxjs/toolkit react-redux
```

#### Adding router to project

['React-router'](https://reactrouter.com/en/v6.3.0/getting-started/concepts)

```console
npm i react-router-dom
```

#### SVG-generator

[tablericons](https://tablericons.com/)

[Link-with-tools](https://www.smashingmagazine.com/2021/03/svg-generators/)

## React app with Vite

[Vite Documentation](https://vitejs.dev/guide/)

```code
npm create vite@latest my-vue-app --template react-ts
```

## Setup PWA

[Vite PWA](https://vite-pwa-org.netlify.app/guide/register-service-worker.html)

[Official Git Repo](https://github.com/vite-pwa/vite-plugin-pwa)

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

## Add ES lint

[Vite Plugins](https://vitejs.dev/guide/api-plugin.html#rollup-plugin-compatibility)

[Vite all Rollup Plugins](https://vite-rollup-plugins.patak.dev/)

[ES Lint Article](https://www.robinwieruch.de/vite-eslint/)

```console
npm install vite-plugin-eslint --save-dev
```

```js
// in vite.config.ts
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()]
});
```

```console
npm install eslint-config-react-app --save-dev
```

#### prettier.config.js

```json
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/jsx-runtime"
  ],
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
