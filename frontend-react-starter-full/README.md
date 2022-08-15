## Starter pack with 

- CRA 5 - create react app 5 
- React v18.2
- ES lint
- Prettier
- RTL -React testing library


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