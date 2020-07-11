module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended',
    'prettier',
  ],
  globals: {
    requestAnimationFrame: true,
    performance: true,
    window: true,
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
}
