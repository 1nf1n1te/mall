module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      viewportWidth: 375,//视窗宽度(一般标准的是750)
      viewportHeight: 667,//视窗高度
      unitPrecision: 5,//指定px转换为视窗单位值的小数位数
      viewportUnit: 'vw',//指定需要转换成的视窗单位建议使用vw
      selectorBlackList: ['ignore', 'tab-bar'],//指定不需要转换的类
      minPixelValue: 1,// 小于等于1px不转换为视窗单位
      mediaQuery: false,//允许在媒体查询中转换 px
      exclude: [/TabBar\.vue$/]
    },
  }
}

// 1.在js中使用正则： /正则相关规则/
// 2.exclude中存放的元素必须是正则表达式
// 3.按照排除的文件来写对应的正则
// ^ 以什么开头 ^abc  $以什么结尾 abc$
