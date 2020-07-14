import {ADD_COUNTER, ADD_TO_CART} from './mutation-types'

export default {
  // dispatch的第一个参数是context 
  addCart(context, payload) {
    // payload新添加的商品
    // 法一
    // let oldProduct = null
    // for (let item of state. ) {
    //   // 比较item的iid是否等于是传进来的iid 如果是相等的 则令oldProduct赋给item
    //   if(item.iid === payload.iid ) {
    //     oldProduct = item
    //   }
    // }

    // 法二：
    // 每次从数组里面拿到item 一旦发现当前拿到的item等于传过来(payload)的item 就会将()里面的这个item返回product作为其值
    // let product = state.cartList.find(function(item) {
    //   return item.iid === payload.iid
    // }) 化简如下
    // 1.查找之前的数组中是否有该商品
    let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

    // 2.判断oldProduct 
    // 如果oldProduct不为空(已经存在) 则数量加1 
    // 如果为空(不存在)则给取到的添加一个count属性并令为1 并添加到数组中
    if (oldProduct) {
      // oldProduct.count += 1
      context.commit(ADD_COUNTER, oldProduct)
    } else {
      payload.count = 1
      // 添加新品
      // context.state.cartList.push(payload)
      context.commit(ADD_TO_CART, payload)
    }
  }
}