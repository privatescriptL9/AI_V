module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'prettier', 'unused-imports'],
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended', 'prettier'],
  root: true,
  env: {
    node: true,
    jest: true
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    semi: 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': ['warn', { vars: 'all', args: 'after-used' }],
    'no-console': 'error'
  }
}
