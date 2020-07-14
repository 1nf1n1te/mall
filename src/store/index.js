import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

// 1.安装插件
Vue.use(Vuex)

const state = {
  cartList: []
}

// 2.创建Store对象
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
})

// 3.挂载到vue实例上面
export default store

// 数组常用方法有哪些？
// push/pop/unshift/shift/sort/reverse/map/filter/reduce/join