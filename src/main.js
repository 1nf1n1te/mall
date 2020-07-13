import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

// vue实例是可以作为事件总线的  如下所示意味着$bus 就是vue实例了
Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
