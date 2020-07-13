import {debounce} from './utils'

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