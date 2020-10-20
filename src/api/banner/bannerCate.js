import request from '@/utils/request'

export function bannerCatePageList(data) {
  return request({
    url: '/bannerCate/pageList',
    method: 'get',
    params: data
  })
}

export function bannerCateFindById(id) {
  return request({
    url: '/bannerCate/findById?id=' + id,
    method: 'get'
  })
}

export function bannerCateCreate(data) {
  return request({
    url: '/bannerCate/create',
    method: 'post',
    data
  })
}

export function bannerCateUpdate(data) {
  return request({
    url: '/bannerCate/edit',
    method: 'post',
    data
  })
}

export function bannerCateRemove(data) {
  return request({
    url: '/bannerCate/remove',
    method: 'post',
    data
  })
}
