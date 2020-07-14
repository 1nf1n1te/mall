import {debounce} from './utils'
import BackTop from 'components/content/backTop/BackTop';

export const itemListenerMixin = {
  // data也可以混入 同理component methods等等都可以
  data() {
    return {
      itemImgListener: null
    }
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh,1000)
    this.itemImgListener = () => {
      refresh()
    }
    this.$bus.$on('itemImgLoad', this.itemImgListener)
  },
}

export const backTopMixin = {
  components:{
    BackTop
  },
  data() {
    return {
      isShowBackTop: false,
    }
  },
  // methods里面只会合并函数 但是函数内部的代码会覆盖 所以不是一样的最好还是别动
  // 但是生命周期的函数可以
  methods: {
    backClick() {
      // scrollTo 前面两个是xy坐标 后面的是执行时间
      this.$refs.scroll.scrollTo(0, 0, 300)
      // console.log('backtop')
    },
  },
}