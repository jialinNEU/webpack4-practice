module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: 'airbnb',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    // 不允许对document进行覆盖
    document: false
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    // 不遵循prefer stateless function的要求
    "react/prefer-stateless-function": 0,
    // 不遵循jsx的文件以js文件命名的要求
    "react/jsx-filename-extension": 0
  },
  parser: "babel-eslint"
};
