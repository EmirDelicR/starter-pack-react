module.exports = {
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  trailingComma: 'none',
  bracketSpacing: true,
  endOfLine: 'auto',
  importOrder: [
    '^src/interfaces/(.*)$',
    '^src/controllers',
    '^src/middleware',
    '^src/routes',
    '^src/swagger',
    '^src/util'
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true
};
