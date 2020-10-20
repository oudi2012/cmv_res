import request from '@/utils/request'

const hardLevel = 'hardLevel'

export function pageHardLevel(data) {
  return request({
    url: '/exam/' + hardLevel + '/pageList',
    method: 'get',
    params: data
  })
}

export function createHardLevel(data) {
  return request({
    url: '/exam/' + hardLevel + '/create',
    method: 'post',
    data
  })
}

export function findHardLevel(id) {
  return request({
    url: '/exam/' + hardLevel + '/findById?examId=' + id,
    method: 'get'
  })
}

export function editHardLevel(data) {
  return request({
    url: '/exam/' + hardLevel + '/edit',
    method: 'post',
    data
  })
}

export function removeHardLevel(data) {
  return request({
    url: '/exam/' + hardLevel + '/remove',
    method: 'post',
    data
  })
}
