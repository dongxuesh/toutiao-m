/**
 * 请求模块
 */
import axios from 'axios'
import store from '@/store'
import JSONbig from 'json-bigint'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn',
  transformResponse:[function (data) {
    try{
      return JSONbig.parse(data)
    }catch(e){
      console.log('转换失败',e)
      return data
      //TODO handle the exception
    }
  }]
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
