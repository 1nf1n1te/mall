import axios from 'axios'

export function request(config) {
  // 1.创建axios的实例 不要用全局的
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:8000/api/n3',
    timeout: 5000
  })

  // 2.axios的拦截器
  instance.interceptors.request.use(config => {
    return config
  },err => {

  });

  instance.interceptors.response.use(res => {
    return res.data
  },err => {
    console.log(err)
  })

  // 3.发送真正的网络请求

  return instance(config)
}

