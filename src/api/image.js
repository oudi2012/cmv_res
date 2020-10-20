import request from '@/utils/request'

export function uploadImage(data) {
  return request({
    url: '/banner/pageList',
    method: 'get',
    params: data
  })
}
