import Toast from './Toast'

const obj = {}   

// install在导入的时候会默认传过来一个参数 就是Vue
obj.install = function (Vue) {
  // Vue.extend(Toast)
  // 相当于是toast能够添加到body上面
  // document.body.appendChild(Toast.$el)

  // 1.创建组件构造器
  const toastConstructor = Vue.extend(Toast)

  // 2.new 的方式 根据组件构造器 可以创建一个组件对象
  const toast = new toastConstructor()

  // 3.将组件对象 手动挂载到某一个元素上
  toast.$mount(document.createElement('div'))

  // 4.toast.$el对应的就是上面的div
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast;
}

export default obj