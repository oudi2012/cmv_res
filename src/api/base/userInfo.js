import request from '@/utils/request'

export function listStudent(data) {
  return request({
    url: '/student/list',
    method: 'get',
    params: data
  })
}

export function findStudent(id) {
  return request({
    url: '/student/findById?id=' + id,
    method: 'get'
  })
}

export function createStudent(data) {
  return request({
    url: '/student/create',
    method: 'post',
    data
  })
}

export function editStudent(data) {
  return request({
    url: '/student/edit',
    method: 'post',
    data
  })
}

export function removeStudent(data) {
  return request({
    url: '/student/remove',
    method: 'post',
    data
  })
}

export function listRoles() {
  return request({
    url: '/guardian/listRoles',
    method: 'get'
  })
}

export function listGuardian(data) {
  return request({
    url: '/guardian/list',
    method: 'get',
    params: data
  })
}

export function findGuardian(id) {
  return request({
    url: '/guardian/findById?id=' + id,
    method: 'get'
  })
}

export function createGuardian(data) {
  return request({
    url: '/guardian/create',
    method: 'post',
    data
  })
}

export function editGuardian(data) {
  return request({
    url: '/guardian/edit',
    method: 'post',
    data
  })
}

export function removeGuardian(data) {
  return request({
    url: '/guardian/remove',
    method: 'post',
    data
  })
}

export function listTeacher(data) {
  return request({
    url: '/teacher/list',
    method: 'get',
    params: data
  })
}

export function findTeacher(id) {
  return request({
    url: '/teacher/findById?id=' + id,
    method: 'get'
  })
}

export function createTeacher(data) {
  return request({
    url: '/teacher/create',
    method: 'post',
    data
  })
}

export function editTeacher(data) {
  return request({
    url: '/teacher/edit',
    method: 'post',
    data
  })
}

export function removeTeacher(data) {
  return request({
    url: '/teacher/remove',
    method: 'post',
    data
  })
}
