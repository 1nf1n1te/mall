<template>
  <div id="detail">
    <!-- 比较复杂的都放到childComps里面做 -->
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <!-- probe-type默认是0 0的时候不派发事件 所以没有生效 要想生效加上probe-type='3'
      但是这样传是不对的会当做是字符串传过去 所以前面要加上: 才能真正的传number类型
     -->
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <!-- 属性：topImages 前面传入值的时候：top-images 前面-后面驼峰
        之所以前面要用-来链接 是因为传入值不区分大小写 你写成topImages可能会被识别为给topimages传 但是没有topimages就会报错
      -->
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <!-- ""里面对应的是当前页面的对象 在data里面有定义
      ：后面对应的是子组件中的 props里面定义的 这里将其动态绑定过来-->
      <detail-shop-info :shop="shops" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <!-- ref=""这个是用来对元素或者是子组件添加一个标识的  方便后面的$refs来对其进行调节
        ref加到普通元素上面 之后 用this.$refs获取的就是dom元素
        ref 加在子组件上，用this.$refs.(ref值)获取到的是组件实例，可以使用组件的所有方法。在使用方法的时候直接this.$refs.(ref值).方法() 就可以使用了。
        DOM文档对象模型 允许程序&脚本 动态访问和更新文档的内容 结构 样式 DOM元素--添加删除替换HTML元素
      -->
      <detail-param-info ref="params" :param-info="paramInfo" />
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <goods-list ref="recommend" :goods="recommends" />
    </scroll>
    <detail-bottom-bar @addCart="addToCart"/>
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from './childComps/DetailBottomBar';

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";

import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "network/detail";
import { debounce } from "common/utils";
import { itemListenerMixin , backTopMixin} from "common/mixin";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,

    Scroll,
    GoodsList,
  },
  mixins: [itemListenerMixin, backTopMixin],
  
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shops: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
    };
  },
  created() {
    // 1.保存存入的iid
    this.iid = this.$route.params.iid;
    // 2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      // 获取顶部的轮播数据
      // console.log(res)
      const data = res.result;
      this.topImages = data.itemInfo.topImages;
      // console.log(this.topImages)

      // 2.获取商品信息 下面是调用的整合后的 new后面接的是整合的类名
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      // 3.创建店铺信息的对象
      this.shops = new Shop(data.shopInfo);

      // 4.保存商品的详情数据
      this.detailInfo = data.detailInfo;

      // 5.获取参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      // 6.获取评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }

      // 测试二：值不对 原因：this.$refs.params.$el压根不存在
      // this.themeTopYs = [];
      // this.themeTopYs.push(0);
      // this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44);
      // // console.log(this.$refs.params.$el.offsetTop) undefined
      // this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44);
      // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44);
      // console.log(this.themeTopYs);

      // 测试三：值不对
      // 这个函数会等detailparamsinfo里面的DOM都渲染完了再回调一次里面的函数
      // 但是这里的问题是 当DOM渲染完了图片不一定渲染完了
      // this.$nextTick(() => {
      //   // 根据最新的已经被渲染出来了 但是图片不一定(即此时的offsetTop是无图的)
      //   this.themeTopYs = [];
      //   this.themeTopYs.push(0);
      //   this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44);
      //   // console.log(this.$refs.params.$el.offsetTop) undefined
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44);
      //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44);
      //   console.log(this.themeTopYs);
      // });
    });
    // 3.请求推荐数据
    getRecommend().then(res => {
      // console.log(res)
      this.recommends = res.data.list;
    });

    // 4.给getThemeTopY赋值 (对给this.themeTopYs赋值的操作进行防抖)
    // 测试五：oj8k
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44);
      // console.log(this.$refs.params.$el.offsetTop) undefined
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44);
      this.themeTopYs.push(Number.MAX_VALUE)
      // console.log(this.themeTopYs);
    },200)
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();
      // 测试四：值对了 放在图片加载完刷新之后 就能够完美获取到 但是过于频繁换到上面
      // this.themeTopYs = [];
      // this.themeTopYs.push(0);
      // this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44);
      // // console.log(this.$refs.params.$el.offsetTop) undefined
      // this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44);
      // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44);
      // console.log(this.themeTopYs);

      // 注意这里要调一下
      this.getThemeTopY()
    },
    titleClick(index) {
      // console.log(index)
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200);
    },
    contentScroll(position) {
      // console.log(position)
      // 1.获取y值
      const positionY = -position.y
      // 2.positionY与主题中的值进行对比
      let length = this.themeTopYs.length
      for(let i = 0; i < length - 1; i++){
        // 但是不能如下写 原因如下
        // 1.上面如果用的(let i in themeTopYs)那么这里的i是字符串类型 i+1会变成 i1 =>法一：parseInt(i) 法二：i * 1
        // 2.i如果到3的话 i+1就越界了 取不到的 故注释之
        // if( positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) { }
        
        // 这里先判断是否一致 一致就不需要赋值了 不一致再给最新的i  但是如下的性能会差一点 故在上面加上MaxValue
        // if(this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) || (i === length - 1 && positionY >= this.themeTopYs[i]))){
        if(this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) )){
          // console.log(i)
          this.currentIndex = i
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }

      // 3.是否显示回到顶部
      this.isShowBackTop = (-position.y) > 1000
    },
    addToCart() {
      // 1.获取购物车需要展示的商品信息 并添加
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.value = this.goods.realPrice
      product.iid = this.iid
      

      // 2.将商品添加到购物车里面
      // 像这种购物车可以用Vuex来管理
      // 注意修改任何state里面的内容都最好还是通过mutation来操作 最好不要用下面这行写法
      // this.$store.cartList.push(product)
      // this.$store.commit('addCart',product)
      this.$store.dispatch('addCart',product)
    }

  },
  mounted() {
    // 测试一：值不对
    // this.$refs.params 这个时候这里拿到的是一个组件对象  组件对象是没有offsetTop的
    // 只有.到 组件里面的$el 才能拿到
    // 这里之所以拿不到数据是因为后面的DetailParamsInfo中对根组件进行了一次判断 而$el就相当于是根组件
    // 如果根组件拿不到数据的话 这里也就是空的-->undefined
    // 所以代码不能写在这里
    // this.themeTopYs.push(0)
    // this.themeTopYs.push(this.$refs.params.$el.offsetTop)
    // // console.log(this.$refs.params.$el.offsetTop) undefined
    // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
    // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
    // console.log(this.themeTopYs)
  },
  destroyed() {
    this.$bus.$off("itemImgLoad", this.itemImgListener);
  }
};
</script>
 
<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-nav {
  position: relative;
  z-index: 99;
  background-color: #fff;
}
.content {
  /* 注意减号后面一定要加空格 不然会识别错误 */
  height: calc(100% - 44px - 49px);
}
</style>