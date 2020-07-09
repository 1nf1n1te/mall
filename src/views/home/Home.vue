<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <scroll class="content" 
          ref="scroll" 
          :probe-type="3" 
          @scroll="contentScroll" 
          :pull-up-load="true" 
          @pullingUp="loadMore">
      <home-swiper :banners="banners" />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control class="tab-control" :titles="['流行','新款','精选']" @tabClick="tabClick" />
      <goods-list :goods="showGoods" />
    </scroll>
    <!-- 组件不能直接监听点击 如果要得在click后面添加上native 如下所示 详细见5.事件监听 图片部分-->
    <!-- native 监听组件根元素的原生事件  v-show来控制显示还是隐藏-->
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
// 最好按照下面的类别进行分割 方便之后的管理 下面组件的注册也一样
// 子组件
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";
// 公共组件
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import GoodsListItem from "components/content/goods/GoodsListItem";
import Scroll from "components/common/scroll/Scroll";
import BackTop from 'components/content/backTop/BackTop'
// 方法&额外数据
import { getHomeMultidata, getHomeGoods } from "network/home";
// 之所以用{}的形式来写 是因为home.js 没用export default的形式导出

export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,

    NavBar,
    TabControl,
    GoodsList,
    GoodsListItem,
    Scroll,
    BackTop
  },
  // 搞一个data用来在函数执行完毕之前存储请求过来的数据 即下面的res 防止其销毁
  data() {
    return {
      // 建立此为了保存对应数据
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      isShowBackTop:false
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  // 组件创建好之后发送 所以是用的生命周期函数create 但是created里面一般来说是不写主要逻辑的
  // 这个方法这里到时候要回看一下 P154
  created() {
    // 1.请求多个数据
    // 小括号表示调用 前面加上this 在调用的时候才是调用的下面方法中的这个函数 不然导入的就是上面import中方法和额外数据的那个函数
    this.getHomeMultidata();
    // 2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    // 这样拿到上面的swiper元素
    // 如果ref是绑定在组件中的 那么通过this.$refs.ref绑定的名字 获取到的是一个组件对象
    // 如果ref是绑定在普通元素中的 那么通过this.$refs.ref绑定的名字 获取到的是一个元素对象
    // this.$refs.swiper
  },
  methods: {
    // 事件监听相关方法
    tabClick(index) {
      // console.log(index);
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
    },
    backClick(){
      // scrollTo 前面两个是xy坐标 后面的是执行时间
      this.$refs.scroll.scrollTo(0, 0)
    },
    contentScroll(position){
      this.isShowBackTop = (-position.y) > 1000
    },
    loadMore(){
      this.getHomeGoods(this.currentType)
      // 先监听图片加载完 然后再刷新 就不会出现界面下拉加载更多无法拖动的情况了
      this.$refs.scroll.scroll.refresh()//刷新
    },
    // 网络请求相关方法
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        // console.log(res)
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      // 下拉菜单再加载一页
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        // .push(...xxx)就是相当于把前面的元素都push给后面的数组中去了
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        this.$refs.scroll.finishPullUp()
      });
    }
  }
};
</script>
 
<style scoped>
/* 有scoped  即是只起作用于当前作用域 不会在其他地方起效果*/
#home {
  padding-top: 44px;
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 999;
}
.tab-control {
  /* position:sticky 要绑定一个top */
  position: sticky;
  top: 44px;
  z-index: 998;
}
/* .content {
  vh 表示视角高度
  height: calc(100% - 93px);
  overflow: hidden;
  margin-top: 44px;
} */
.content{
  /* height: 300px; */
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>