import request from '@/utils/request'

export function pageList(data) {
  return request({
    url: '/book/pageList',
    method: 'get',
    params: data
  })
}

export function createBook(data) {
  return request({
    url: '/book/create',
    method: 'post',
    data
  })
}

export function findBook(id) {
  return request({
    url: '/book/findById?bookId=' + id,
    method: 'get'
  })
}

export function editBook(data) {
  return request({
    url: '/book/edit',
    method: 'post',
    data
  })
}

export function removeBook(data) {
  return request({
    url: '/book/remove',
    method: 'post',
    data
  })
}
