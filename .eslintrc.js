module.exports = {
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:cypress/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'cypress'],
  ignorePatterns: ["dist/**/*", '.eslintrc.js'],
  root: true,
};
