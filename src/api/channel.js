import request from '@/utils/request'

/**
 * 获取频道列表
 */
export const getChannel = () => {
  return request({
    methods: 'GET',
    url: '/app/v1_0/user/channels'
  })
}

/**
 *获取频道列表基本信息
 */
export const getArticles = params => {
  return request({
    methods: 'GET',
    url: '/app/v1_1/articles',
    params
  })
}

/**
 * 获取所有频道信息
 */
export const getAllchannels = () => {
  return request({
    methods: 'GET',
    url: '/app/v1_0/channels'
  })
}