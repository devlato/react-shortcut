module.exports = {
  trailingComma: 'all',
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  quoteProps: 'as-needed',
  jsxSingleQuote: false,
  bracketSpacing: true,
  jsxBracketSameLine: false,
  arrowParens: 'always',
  parser: 'typescript',
  htmlWhitespaceSensitivity: 'strict',
  endOfLine: 'lf',
  printWidth: 120,
  overrides: [
    {
      files: '.prettierrc',
      options: { parser: 'json' },
    },
    {
      files: '.babelrc',
      options: { parser: 'json' },
    },
    {
      files: '.stylelintrc',
      options: { parser: 'json' },
    },
    {
      files: '*.json',
      options: { parser: 'json' },
    },
    {
      files: '*.{js,jsx}',
      options: { parser: 'babel' },
    },
    {
      files: '*.{ts,tsx}',
      options: { parser: 'typescript' },
    },
    {
      files: '*.scss',
      options: { parser: 'scss' },
    },
    {
      files: '*.yml',
      options: { parser: 'yaml' },
    },
    {
      files: '*.md',
      options: { parser: 'markdown' },
    },
  ],
};
