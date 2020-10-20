import request from '@/utils/request'

export function provinceList() {
  return request({
    url: '/area/provinces',
    method: 'get'
  })
}

export function cityList(parentId) {
  return request({
    url: '/area/cities?provinceId=' + parentId,
    method: 'get'
  })
}

export function townList(parentId) {
  return request({
    url: '/area/towns?cityId=' + parentId,
    method: 'get'
  })
}

export function areaList(parentId) {
  return request({
    url: '/area/areaList?parentId=' + parentId,
    method: 'get'
  })
}

export function pathList(parentId) {
  return request({
    url: '/area/pathListByCode?parentId=' + parentId,
    method: 'get'
  })
}

export function removeByCode(code) {
  return request({
    url: '/area/areaDel?areaCode=' + code,
    method: 'get'
  })
}

export function create(data) {
  return request({
    url: '/area/areaAdd',
    method: 'post',
    data
  })
}
