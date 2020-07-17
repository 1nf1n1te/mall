<template>
  <div class="bottom-bar">
    <div class="check-content">
      <!-- 在父组件中给子组件绑定事件 想要其触发就必须绑定.native-->
      <check-button :is-checked="isSelectAll" class="check-button" @click.native="checkClick" />
      <span>全选</span>
    </div>

    <div class="price">
      合计：{{totalPrice}}
    </div>

    <div class="calculate" @click="calcClick"> 
      去计算：({{checkLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";
import {mapGetters} from 'vuex'

export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return '￥' + this.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.value * item.count
      }, 0).toFixed(2)
    },
    checkLength() {
      return this.cartList.filter(item => item.checked).length
    },
    isSelectAll() {
      // 法一
      // ()里面是先找列表里面有没有未选中的这个数组就有长度
      // return !(this.cartList.filter(item => !item.checked).length)

      // 法二：
      // find()会查找某个元素并将其返回
      if(this.cartList.length === 0) return false
      return !this.cartList.find(item => !item.checked)
    }
  },
  methods: {
    checkClick() {
      if(this.isSelectAll) { //全选中
        this.cartList.forEach(item => item.checked = false)
      } else {//部分选中或者是全部选中
        this.cartList.forEach(item => item.checked = true)
      } 
      //如果想简化如下 实际上是不行的 因为forEach一直在遍历 会改变里面的状态 
      // 且会改变上面的isSelectAll的值 而上面isSelectAll这个值的改变又会反过来影响这里的值 死循环
      // this.cartList.forEach(item => item.checked = !this.isSelectAll)
    },
    calcClick() {
      if (!this.isSelectAll) {
       this.$toast.show('请选择购买的商品',3000)
      }
    }
  }
};
</script>
 
<style scoped>
.bottom-bar {
  height: 40px;
  background-color: #d1d0d5;
  position: relative;
  line-height: 40px;
  display: flex;
  font-size: 14px;
}
.check-content {
  display: flex;
  align-items: center;
  margin-left: 8px;
  width: 60px;
}
.check-button {
  width: 20px;
  height: 20px;
  /* 下面设置这个lh覆盖上面的 */
  line-height: 20px;
  margin-right: 5px;
}
.price{
  margin-left: 15px;
  flex: 1;
}
.calculate {
  width: 100px;
}
</style>