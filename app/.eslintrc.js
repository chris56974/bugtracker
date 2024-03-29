module.exports = {
  env: { es2022: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['@typescript-eslint', 'import', 'node',],
  rules: {
    'linebreak-style': ['error', 'unix'],
    'object-curly-spacing': ['error', 'always'],
    indent: ['error', 2, { 'SwitchCase': 1 }],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
  }
}
