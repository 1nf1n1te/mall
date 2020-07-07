<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
  name:'NavBar',
  data() {
    return {
     
    }
  },
};
</script>
 
<style scoped>
  .nav-bar {
    display: flex;
    /* 一般来说导航栏高度都是44px */
    /* 这里之所以没加载成功是因为最开始里面没有内容 无法把他撑起来 等项目后期可以省略掉的 */
    height: 44px;
    line-height: 44px;
    text-align: center;
    box-shadow: 0 1px 1px rgba(100, 100, 100, 0.1);
  }

  .left,.right {
    width: 60px;
  }

  .center{
    flex: 1;
  }
</style>