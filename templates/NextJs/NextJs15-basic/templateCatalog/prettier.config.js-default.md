const sPrettier = require('s-prettier');

module.exports = {
  ...sPrettier,
  plugins: ['prettier-plugin-tailwindcss'],
  bracketSpacing: true,
  tabWidth: 2,
};
