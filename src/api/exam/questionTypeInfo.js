import request from '@/utils/request'

const questionType = 'questionType'

export function pageQuestionType(data) {
  return request({
    url: '/exam/' + questionType + '/pageList',
    method: 'get',
    params: data
  })
}

export function createQuestionType(data) {
  return request({
    url: '/exam/' + questionType + '/create',
    method: 'post',
    data
  })
}

export function findQuestionType(id) {
  return request({
    url: '/exam/' + questionType + '/findById?examId=' + id,
    method: 'get'
  })
}

export function editQuestionType(data) {
  return request({
    url: '/exam/' + questionType + '/edit',
    method: 'post',
    data
  })
}

export function removeQuestionType(data) {
  return request({
    url: '/exam/' + questionType + '/remove',
    method: 'post',
    data
  })
}
