<template>
  <div id="shop-item">
    <div class="item-selector">
      <!-- 将mutation中的payload.checked = true赋值给这个itemInfo.checked -->
      <CheckButton :is-checked="itemInfo.checked" @click.native="checkClick">

      </CheckButton>
    </div>
    <div class="item-img">
      <img :src="itemInfo.image" alt="商品图片">
    </div>
    <div class="item-info">
      <div class="item-title">{{itemInfo.title}}</div>
      <div class="item-desc">商品描述: {{itemInfo.desc}}</div>
      <div class="info-bottom">
        <div class="item-price left">¥{{itemInfo.value}}</div>

        <div class="item-count right">
          <button @click="add()">+</button>
          {{itemInfo.count}}
          <button @click="subtract()">-</button>
          <button class="item-del" @click="itemDel()">删除</button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton'

  export default {
    name: "ShopCartItem",
    props: {
      itemInfo: Object
    },
    components: {
      CheckButton
    },
    methods: {
      checkClick() {
        this.itemInfo.checked = !this.itemInfo.checked
      },
      add() {
        this.itemInfo.count++
      },
      subtract() { 
        if(this.itemInfo.count >= 1){
          this.itemInfo.count--
        }
      },
      itemDel() {
        
      }
    },
  }
</script>

<style scoped>
  #shop-item {
    width: 100%;
    display: flex;
    font-size: 0;
    padding: 5px;
    border-bottom: 1px solid #ccc;
  }

  .item-selector {
    width: 14%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .item-title, .item-desc {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .item-img {
    padding: 5px;
    /*border: 1px solid #ccc;*/
  }

  .item-img img {
    width: 80px;
    height: 100px;
    display: block;
    border-radius: 5px;
  }

  .item-info {
    font-size: 17px;
    color: #333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
  }

  .item-info .item-desc {
    font-size: 14px;
    color: #666;
    margin-top: 15px;
  }

  .info-bottom {
    margin-top: 10px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
  }
  .info-bottom .item-price {
    color: orangered;
  }
  .item-del{
    margin-left: 10px;
  } 
</style>
