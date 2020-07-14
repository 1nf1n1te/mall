<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :titles="['流行','新款','精选']" 
          @tabClick="tabClick" 
          ref="tabControl1" 
          class="tab-control" 
          v-show="isTabFixed"/>
    <scroll class="content" 
          ref="scroll" 
          :probe-type="3" 
          @scroll="contentScroll" 
          :pull-up-load="true" 
          @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl2" />
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
// 方法&额外数据
import {debounce} from 'common/utils'
import {itemListenerMixin, backTopMixin} from 'common/mixin'
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
  },
  mixins:[itemListenerMixin, backTopMixin],
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
      tabOffsetTop: 0,
      isTabFixed:false,
      saveY: 0,
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },

  destroyed() {
    console.log("home destroyed")
  },
  activated() {
    // 最好还是要做一次刷新 但是这里先刷新能够解决小概率回弹到顶部的问题
    this.$refs.scroll.refresh()

    this.$refs.scroll.scrollTo(0, this.saveY, 0)
  },
  deactivated() {
    // 1.保存y值
    this.saveY = this.$refs.scroll.getScrollY()
    // console.log(this.saveY);
    // 2.取消全局事件的监听
    // 注意下面这里不能只传一个事件 不然所有关于这个事件的监听都会被取消掉
    this.$bus.$off('itemImgLoad',this.itemImgListener)
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
    // 这里后面直接全提到mixin里面去了 故全注释了

    // 这样拿到上面的swiper元素
    // 如果ref是绑定在组件中的 那么通过this.$refs.ref绑定的名字 获取到的是一个组件对象
    // 如果ref是绑定在普通元素中的 那么通过this.$refs.ref绑定的名字 获取到的是一个元素对象
    // this.$refs.swiper

    // 防抖动操作
    // 注意这里传入的是整个函数不是返回值 所以不能加上括号
    // // const refresh = debounce(this.$refs.scroll.refresh,1000)
    // 3.监听item中图片加载完成
    // 对监听的事件进行保存
    // this.itemImgListener = () => {
    //   // () => {}这个闭包对上面的refresh这个局部变量有引用所以是不会在执行后销毁的
    //   refresh()
    // }
    // // 实际中是没有$bus的 所以得在原型中添加见main.js
    // this.$bus.$on('itemImageLoad', this.itemImgListener)

    // // 获取tabControl的offsetTop 然而组件没有offsetTop 只能去包含组件的元素中找
    // // 所有的组件都有一个属性$el 专门用来获取组件的元素
    // this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
  },
  methods: {
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
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    contentScroll(position) {
      // 1.判断backtop是否显示
      this.isShowBackTop = (-position.y) > 1000
      // 2.决定tabcontrol是否吸顶(position:fixed)
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    loadMore() {
      this.getHomeGoods(this.currentType)
      // 先监听图片加载完 然后再刷新 就不会出现界面下拉加载更多无法拖动的情况了
      this.$refs.scroll.refresh()//刷新
    },
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
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
        // 完成了上拉加载更多之后
        this.$refs.scroll.finishPullUp()
      });
    }
  }
};
</script>
 
<style scoped>
/* 有scoped  即是只起作用于当前作用域 不会在其他地方起效果*/
#home {
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 999; */
}
/* .tab-control {
  position:sticky 要绑定一个top
  position: sticky;
  top: 44px;
  z-index: 998;
  使用better-scroll之后不起作用了 
} */

.tab-control {
  position: relative;
  z-index: 999;
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