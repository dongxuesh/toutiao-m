/**
 * 请求模块
 */
import axios from 'axios'
import store from '@/store'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn'
})

// 请求拦截器 利用拦截器统一设置 token
request.interceptors.request.use(function (config) {
  const { user } = store.state
  if(user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

//响应拦截器

export default request
