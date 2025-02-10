const sPrettier = require('s-prettier');

module.exports = {
  ...sPrettier,
  plugins: ['prettier-plugin-tailwindcss', '@trivago/prettier-plugin-sort-imports'],
  bracketSpacing: true,
  tabWidth: 2,
  importOrder: ['^@/types/(.*)$', '^@/(.*)$', '^[./]', '^react'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
};
