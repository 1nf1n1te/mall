module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        // 默认了'@': 'src'
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    }
  }
}

// router就只有main.js这里引用了一次 所以可以不写 
// store 一般不引用 所以也不要
// 且在所有组件中都可以通过this.$router this.$store来拿到 故一般不写