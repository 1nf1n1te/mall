<template>
  <div class="goods-list">
    <goods-list-item v-for="item in goods" :key="item.index" :goods-item="item" class="item" />
    <!-- {{goods}} -->
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem'

export default {
  name:'GoodsList',
  data() {
    return {
     
    }
  },
  components:{
    GoodsListItem
  },
  props:{
    goods:{
      type:Array,
      default(){
        return []
      }
    }
  }
};
</script>
 
<style scoped>  
  .goods-list{
    display: flex;
    /* 让弹性盒子元素在必要的时候拆行 */
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 2px;
  }
  .goods-list .item{
    width: 48%;
  }
</style>