import request from '@/utils/request'

export function listSubject() {
  return request({
    url: '/subject/list',
    method: 'get'
  })
}

export function createSubject(data) {
  return request({
    url: '/subject/create',
    method: 'post',
    data
  })
}

export function findSubject(id) {
  return request({
    url: '/subject/findById?id=' + id,
    method: 'get'
  })
}

export function findByName(name) {
  return request({
    url: '/subject/findByName?name=' + name,
    method: 'get'
  })
}

export function editSubject(data) {
  return request({
    url: '/subject/edit',
    method: 'post',
    data
  })
}

export function removeSubject(data) {
  return request({
    url: '/subject/remove',
    method: 'post',
    data
  })
}
