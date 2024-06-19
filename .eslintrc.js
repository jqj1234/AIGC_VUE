module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'semi': 'off',
    'quotes': 'off',
    'indent': 'off',
    'no-multiple-empty-lines': 'off',
    'space-before-function-paren': 'off',
    'eol-last': 'off',
    'no-trailing-spaces': 'off'
  }
}
