import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

import toast from 'components/common/toast'

Vue.config.productionTip = false

// vue实例是可以作为事件总线的  如下所示意味着$bus 就是vue实例了
Vue.prototype.$bus = new Vue()

// 安装toast插件 会默认去找index里面的对象 就是第一行的obj 执行obj的install函数
Vue.use(toast)

// 解决移动端300ms延时
FastClick.attach(document.body)

// 使用懒加载的插件
Vue.use(VueLazyLoad, {
  //还没完全加载时的替代图
  loading: require('assets/img/common/11.jpg')
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')


/*
  fastclick:
    1.安装 npm install fastclick --save
    2.导入  import FastClick from 'fastclick'
    3.引用 FastClick.attach(document.body)
*/ 