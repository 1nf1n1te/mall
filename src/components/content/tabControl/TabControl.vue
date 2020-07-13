// 如果只是文字不一样的话 就没必要弄插槽
<template>
  <div class="tab-control">
    <!-- 后面还是要跟一个key才能保证不会出错 -->
    <div v-for="(item,index) in titles" :key="item.index" class="tab-control-item" 
      :class="{active:index === currentIndex}" @click="itemClick(index)">
      <!-- 上面这里的index实际上是前面Home.vue 里面定义的index-->
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name:'TabControl',
  props:{
    titles:{//这里的title是前面的父组件传过来的 title里面的内容在前面已经确定了 完全是分离的
      type:Array,
      default(){
        return[]
        // 当默认值是一个对象或者数组的时候default 后面是函数
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
      // this是当前的tabcontrol组件 
      // index是传过来的参数 是前面Home.vue定下来的 是用来传值的 不是来获取值的 
      // 所以是currentIndex = index 来改变当前的currentIndex的值
      this.currentIndex = index;
      // 不能写作是index = this.currentIndex 是因为currentIndex初始值为0 
      // 如果等了 那index就一直是0 逻辑上面就出错了 所以必须是currentIndex = index 来改变currentIndex的值 才能实现对应功能
      // index = this.currentIndex;
      // console.log(index);
      // console.log(this.currentIndex);
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