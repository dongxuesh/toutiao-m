import request from '@/utils/request'

export const getChannel = () => {
  return request({
    methods: 'GET',
    url: '/app/v1_0/user/channels'
  })
}
