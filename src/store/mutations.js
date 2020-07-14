import {ADD_COUNTER, ADD_TO_CART} from './mutation-types'

export default {
    // mutation唯一的目的就是修改state的状态
    // mutation中的每一个方法所完成的事件都尽可能的单一
    // 第一个参数是state
    // 这样做可以跟踪
    [ADD_COUNTER](state, payload) {
      payload.count++
    },
    [ADD_TO_CART](state, payload) {
      payload.checked = false
      state.cartList.push(payload)
    }
}