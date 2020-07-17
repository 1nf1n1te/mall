<template>
  <div class="goods-item" @click="itemClick">
    <img v-lazy="showImage" alt="" @load="imageLoad">
    <!-- @load='方法' vue中用来监听加载是否完成的 -->
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name:'GoodsListItem',
  data() {
    return {
     
    }
  },
  props:{
    goodsItem:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  computed: {
    showImage() {
      return this.goodsItem.image || this.goodsItem.show.img
    }
  },
  methods: {
    imageLoad() {
      // 由于home和detail页面都用了imageLoad 为了让detail页面加载 home页面不刷新 操作如下
      // 法一：
      // if (this.$router.path.indexOf('/home')) {
      //   this.$bus.$emit('itemImageLoad')
      // } else if (this.$router.path.indexOf('/detail')) {
      //    this.$bus.$emit('detailItemImgLoad')
      // }

      // 法二：
      this.$bus.$emit('itemImageLoad')
    },
    itemClick() {
      this.$router.push('/detail/' + this.goodsItem.iid)
      // console.log(this.goodsItem.iid)
    }
  },
};
</script>
 
<style scoped>
.goods-item {
    padding-bottom: 40px;
    position: relative;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>