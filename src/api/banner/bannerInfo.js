import request from '@/utils/request'

export function bannerInfoPageList(data) {
  return request({
    url: '/banner/pageList',
    method: 'get',
    params: data
  })
}

export function bannerInfoFindById(id) {
  return request({
    url: '/banner/findById?id=' + id,
    method: 'get'
  })
}

export function bannerInfoCreate(data) {
  return request({
    url: '/banner/create',
    method: 'post',
    data
  })
}

export function bannerInfoUpdate(data) {
  return request({
    url: '/banner/edit',
    method: 'post',
    data
  })
}

export function bannerInfoRemove(data) {
  return request({
    url: '/banner/remove',
    method: 'post',
    data
  })
}
