// 如果只是文字不一样的话 就没必要弄插槽
<template>
  <div class="tab-control">
    <!-- 后面还是要跟一个key才能保证不会出错 -->
    <div v-for="(item,index) in titles" :key="item.index" class="tab-control-item" 
      :class="{active:index === currentIndex}" @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name:'TabControl',
  props:{
    titles:{
      type:Array,
      default(){
        return[]
      }
    }
  },
  data(){
    return{
      //设置一个初始值记录当前状态
      currentIndex: 0 
    }
  },
  methods:{
    itemClick(index){
      this.currentIndex = index;
      // 传出
      this.$emit('tabClick',index)
    }
  }
};
</script>
 
<style scoped>
  .tab-control {
    display: flex;
    text-align: center;
    font-size: 15px;
    background-color: #fff;
  }
  .tab-control-item{
    flex: 1;
    line-height: 40px;
  }
  .tab-control-item span {
    padding: 5px;
  }
  .active {
    color: var(--color-high-text);
  }
  .active span{
    border-bottom: 2px solid var(--color-high-text);
  }
</style>