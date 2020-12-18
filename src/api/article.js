import request from '@/utils/request'

/**
 * 获取文章详情信息
 */
export const getArticleDetail = articleId => {
  return request({
    method: 'GET',
    url: `/app/v1_0/articles/${articleId}`
  })
}