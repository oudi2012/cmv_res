import request from '@/utils/request'

export function list() {
  return request({
    url: '/class/list',
    method: 'get'
  })
}

export function remove(id) {
  return request({
    url: '/class/remove?id=' + id,
    method: 'get'
  })
}

export function create(data) {
  return request({
    url: '/class/create',
    method: 'post',
    data
  })
}
