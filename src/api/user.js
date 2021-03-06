/**
 * 用户相关请求模块
 */
import request from '@/utils/request'
// import store from '@/store'

/**
 * 登录/注册
 */
export const login = data => {
  return request({
    method:'POST', // 方法尽量大写
    url: '/app/v1_0/authorizations',
    data
  })
}

/**
 * 发送短信验证码
 */
export const sendSms = mobile => {
  return request({
    method: 'GET',
    url: '/app/v1_0/sms/codes/${mobile}'
  })
}


/**
 * 获取登录用户信息
 */
export const getCurrentUser = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user'
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}
