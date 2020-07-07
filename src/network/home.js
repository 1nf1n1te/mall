import {request} from './request'

export function getHomeMultidata(){
  return request({
    url:'/home/multidata'
  })
}

// 函数调用是 压入到函数栈中调用的(保存函数调用过程中所有变量)
// 函数调用结束 ->弹出函数栈(释放函数中所有变量 内存会全部回收 相当于是函数执行完毕之后就销毁了)