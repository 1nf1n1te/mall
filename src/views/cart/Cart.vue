<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>

    <!-- 商品列表 -->
    <cart-list />
    <!-- 底部汇总 -->
    <cart-bottom-bar />
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'

import {mapGetters} from 'vuex'

export default {
  name:'Cart',
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    // 想要将getters里面cartLength函数的转成这里的计算属性 这里的计算属性就不用写了
    // 就是直接用getters里面的cartLength方法
    // 解决：使用展开运算符将getters混入到computed对象中
    // 语法1：正常写法 ()里面是数组
    // ...mapGetters([
    //   'cartLength',
    //   'cartList'
    // ])

    // 语法2：想要改名字的写法 ()里面是对象 => 前面是想要的名字 后面是getters里面实际的名字
    ...mapGetters({
      length: 'cartLength',
      list: 'cartList'
    }),
    
  },
};
</script>
 
<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
