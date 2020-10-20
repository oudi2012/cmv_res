import request from '@/utils/request'

const select = 'selectQuestion'

export function pageSelect(data) {
  return request({
    url: '/exam/' + select + '/pageList',
    method: 'get',
    params: data
  })
}

export function createSelect(data) {
  return request({
    url: '/exam/' + select + '/create',
    method: 'post',
    data
  })
}

export function findSelect(id) {
  return request({
    url: '/exam/' + select + '/findById?examId=' + id,
    method: 'get'
  })
}

export function editSelect(data) {
  return request({
    url: '/exam/' + select + '/edit',
    method: 'post',
    data
  })
}

export function removeSelect(data) {
  return request({
    url: '/exam/' + select + '/remove',
    method: 'post',
    data
  })
}
