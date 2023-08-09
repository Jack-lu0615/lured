// 项目不同配置项可能不同，主要看rules项即可
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    // 修改标签属性的 eslint 规则 允许标签属性换行
    'vue/first-attribute-linebreak': ['error', {
      singleline: 'ignore',
      multiline: 'ignore'
    }],
    // 修改 右标签 > 的 eslint 规则  无需单独一行
    'vue/html-closing-bracket-newline': 0,
    'semi': [2, 'never'],  // 不使用分号，否则报错
    'quotes': [2, 'single']
  }
}