<template>
  <!-- 这里的show是下面的show来定的 -->
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name:'Toast',
  data() {
    return {
      message: '',
      isShow:false
    }
  },
  methods: {
    show(message, duration) {
      this.isShow = true;
      this.message = message

      setTimeout(() => {
        this.isShow = false;
        this.message = ''
      },duration)
    }
  },
};
</script>
 
<style scoped>
  .toast {
    position: fixed;
    /* 只有top left transform三者一起设置如下才能真正居中 */
    top: 50%;
    left: 50%;
    /* 根据自己当前位置来进行调整 */
    transform:translate(-50%,-50%);
    padding:8px 10px;
    background-color: rgba(0,0,0,.7);
    color: #fff;
    z-index: 999;
  }
</style>