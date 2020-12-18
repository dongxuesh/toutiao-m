import request from '@/utils/request.js'

/**
 * 获取联想建议列表
 */
export const getSuggestions = q => {
  return request({
    method:'GET',
    url: '/app/v1_0/suggestion',
    params: {
      q
    }
  })
}

/**
 * 获取联想建议列表
 */
export const getResults = params => {
  return request({
    method:'GET',
    url: '/app/v1_0/search',
    params
  })
}
