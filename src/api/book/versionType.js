import request from '@/utils/request'

export function pageVersion(data) {
  return request({
    url: '/version/pageList',
    method: 'get',
    params: data
  })
}

export function listVersion() {
  return request({
    url: '/version/list',
    method: 'get'
  })
}

export function createVersion(data) {
  return request({
    url: '/version/create',
    method: 'post',
    data
  })
}

export function findVersion(id) {
  return request({
    url: '/version/findById?id=' + id,
    method: 'get'
  })
}

export function editVersion(data) {
  return request({
    url: '/version/edit',
    method: 'post',
    data
  })
}

export function removeVersion(data) {
  return request({
    url: '/version/remove',
    method: 'post',
    data
  })
}
