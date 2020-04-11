module.exports = {
  endOfLine: 'lf',
  jsxSingleQuote: true,
  overrides: [
    {
      files: ['*.json', '*.yaml', '*.yml', '*.md', '*.markdown'],
      options: {
        singleQuote: false,
        tabWidth: 4,
        useTabs: false,
      },
    },
  ],
  printWidth: 80,
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
  useTabs: false,
};
