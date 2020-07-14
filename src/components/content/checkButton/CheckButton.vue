<template>
  <div class="check-button" :class="{check: isChecked}">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
export default {
  name:'CheckButton',
  props: {
    isChecked: {
      type: Boolean,
      // 记录这个勾选框的状态必须是在模型中记录的 即mutation中
      default: false
    }
  }
};
</script>
 
<style scoped>
  .check-button {
    border-radius: 50%;
    border: 2px solid rgb(100, 97, 98);
  }
  .check {
    border-color: teal;
    background-color: cadetblue;
  }
</style>