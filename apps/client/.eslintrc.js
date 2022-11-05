module.exports = {
  ...require('eslint-config-custom'),
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
}