module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: 'airbnb',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-param-reassign': 'off',
    'import/no-cycle': 'off',
    'arrow-parens': 'off',
    'implicit-arrow-linebreak': 'off',
    'operator-linebreak': 'off',
    'consistent-return': 'warn',
    'space-before-function-paren': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-confusing-arrow': 'off',
  },
};
