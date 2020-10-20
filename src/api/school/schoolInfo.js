import request from '@/utils/request'

export function pageList(data) {
  return request({
    url: '/school/list',
    method: 'get',
    params: data
  })
}

export function listKv(data) {
  return request({
    url: '/school/listKv',
    method: 'get',
    params: data
  })
}

export function create(data) {
  return request({
    url: '/school/create',
    method: 'post',
    data
  })
}

export function find(id) {
  return request({
    url: '/school/findById?id=' + id,
    method: 'get'
  })
}

export function edit(data) {
  return request({
    url: '/school/edit',
    method: 'post',
    data
  })
}

export function remove(data) {
  return request({
    url: '/school/remove',
    method: 'post',
    data
  })
}
