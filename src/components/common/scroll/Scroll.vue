<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    };
  },
  mounted() {
    // 1.创建better-scroll对象
    // 这里之所以不用document.querySelector('wrapper') 是因为如果有多个wrapper的时候这个难以指定到目标的
    // 还是用下面的方法好点
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    });
    // 2.监听滚动的位置
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on("scroll", position => {
        // console.log(position);
        // 'scroll' 是自定义事件 所以前面Home中要使用是@scroll 相关方法也是前面自己定义的
        this.$emit("scroll", position);
      });
    }
    // console.log(this.scroll);
    // 图片加载完后刷新 重新定高度
    // this.scroll.refresh()
    // 3.监听上拉事件
    // this.scroll.on('pullingUp', () => {
    //   // console.log("上拉加载更多");
    //   this.$emit('pullingUp')
    // })

    // 3.监听scroll滚动到底部
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        this.$emit('pullingUp')
      });
    }
  },
  methods: {
    scrollTo(x, y, time = 500) {
      // && 逻辑与 判断是否正确有没有值 正确的话继续执行 反之不执行
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll.finishPullUp();
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0
    }
  }
};
</script>
 
<style scoped>
</style>