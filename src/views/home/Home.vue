<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banners="banners" />
    <recommend-view :recommends="recommends"/>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import {getHomeMultidata} from 'network/home'
// 之所以用{}的形式来写 是因为home.js 没用export default的形式导出


export default {
  name:'Home',
  components:{
    NavBar,
    HomeSwiper,
    RecommendView
  },
  // 搞一个data用来在函数执行完毕之前存储请求过来的数据 即下面的res 防止其销毁
  data() {
    return {
      // 建立此为了保存对应数据
      banners:[],
      recommends:[]
    }
  },
  created(){
    // 1.请求多个数据
    // 小括号表示调用
    getHomeMultidata().then(res => {
      // console.log(res)
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    })
  }
};
</script>
 
<style scoped>
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;
  }
</style>