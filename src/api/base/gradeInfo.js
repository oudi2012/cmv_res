import request from '@/utils/request'

export function listGrade() {
  return request({
    url: '/grade/list',
    method: 'get'
  })
}

export function removeGrade(id) {
  return request({
    url: '/grade/remove?gradeId=' + id,
    method: 'get'
  })
}

export function createGrade(data) {
  return request({
    url: '/grade/create',
    method: 'post',
    data
  })
}
