import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * 地址访问常量
 */
export const constantRoutes = [
  {
    path: '/Login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    children: [{
      path: 'dashboard',
      name: '管理首页',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '管理首页', icon: 'dashboard' }
    }]
  }, {
    path: '/base',
    component: Layout,
    name: 'baseInfo',
    meta: { title: '公共信息', icon: 'form' },
    children: [
      {
        path: 'provinceList',
        name: 'provinceList',
        component: () => import('@/views/base/provinceList'),
        meta: { title: '区域管理', icon: 'table' }
      }, {
        path: 'subAreaList/:pId',
        name: 'subAreaList',
        component: () => import('@/views/base/subAreaList')
      }, {
        path: 'areaAdd/:pId',
        name: 'areaAdd',
        component: () => import('@/views/base/model/areaAdd')
      }, {
        path: 'classList',
        name: 'classList',
        component: () => import('@/views/base/classList'),
        meta: { title: '班级管理', icon: 'table' }
      }, {
        path: 'classAdd',
        name: 'classAdd',
        component: () => import('@/views/base/model/classAdd')
      }, {
        path: 'gradeList',
        name: 'gradeList',
        component: () => import('@/views/base/gradeList'),
        meta: { title: '年级管理', icon: 'table' }
      }, {
        path: 'gradeAdd',
        name: 'gradeAdd',
        component: () => import('@/views/base/model/gradeAdd')
      }
    ]
  }, {
    path: '/user',
    component: Layout,
    name: 'userInfo',
    meta: { title: '用户信息', icon: 'form' },
    children: [
      {
        path: 'studentList',
        name: 'studentList',
        component: () => import('@/views/userInfo/studentList'),
        meta: { title: '学生管理', icon: 'table' }
      }, {
        path: 'studentAdd',
        name: 'studentAdd',
        component: () => import('@/views/userInfo/model/studentAdd')
      }, {
        path: 'studentEdit/:id',
        name: 'studentEdit',
        component: () => import('@/views/userInfo/model/studentEdit')
      }, {
        path: 'teacherList',
        name: 'teacherList',
        component: () => import('@/views/userInfo/teacherList'),
        meta: { title: '老师管理', icon: 'table' }
      }, {
        path: 'teacherAdd',
        name: 'teacherAdd',
        component: () => import('@/views/userInfo/model/teacherAdd')
      }, {
        path: 'teacherEdit/:id',
        name: 'teacherEdit',
        component: () => import('@/views/userInfo/model/teacherEdit')
      }, {
        path: 'guardianList',
        name: 'guardianList',
        component: () => import('@/views/userInfo/guardianList'),
        meta: { title: '监护人管理', icon: 'table' }
      }, {
        path: 'guardianAdd',
        name: 'guardianAdd',
        component: () => import('@/views/userInfo/model/guardianAdd')
      }, {
        path: 'guardianEdit/:id',
        name: 'guardianEdit',
        component: () => import('@/views/userInfo/model/guardianEdit')
      }
    ]
  }, {
    path: '/school',
    component: Layout,
    name: 'schoolInfo',
    meta: { title: '学校信息', icon: 'form' },
    children: [
      {
        path: 'schoolList',
        name: 'schoolList',
        component: () => import('@/views/school/schoolList'),
        meta: { title: '学校管理', icon: 'table' }
      }, {
        path: 'schoolAdd',
        name: 'schoolAdd',
        component: () => import('@/views/school/model/schoolAdd')
      }, {
        path: 'schoolEdit/:id',
        name: 'schoolEdit',
        component: () => import('@/views/school/model/schoolEdit')
      }
    ]
  }, {
    path: '/book',
    component: Layout,
    name: 'bookInfo',
    meta: { title: '书籍信息', icon: 'form' },
    children: [
      {
        path: 'bookList',
        name: 'bookList',
        component: () => import('@/views/book/bookList'),
        meta: { title: '书籍管理', icon: 'table' }
      }, {
        path: 'bookAdd',
        name: 'bookAdd',
        component: () => import('@/views/book/model/bookAdd')
      }, {
        path: 'bookEdit/:name/:id',
        name: 'bookEdit',
        component: () => import('@/views/book/model/bookEdit')
      }, {
        path: 'subjectList',
        name: 'subjectList',
        component: () => import('@/views/book/subjectList'),
        meta: { title: '科目管理', icon: 'table' }
      }, {
        path: 'subjectAdd',
        name: 'subjectAdd',
        component: () => import('@/views/book/model/subjectAdd')
      }, {
        path: 'subjectEdit/:id',
        name: 'subjectEdit',
        component: () => import('@/views/book/model/subjectEdit')
      }, {
        path: 'versionList',
        name: 'versionList',
        component: () => import('@/views/book/versionList'),
        meta: { title: '版本管理', icon: 'table' }
      }, {
        path: 'versionAdd',
        name: 'versionAdd',
        component: () => import('@/views/book/model/versionAdd')
      }, {
        path: 'versionEdit/:id',
        name: 'versionEdit',
        component: () => import('@/views/book/model/versionEdit')
      }
    ]
  }, {
    path: '/exam',
    component: Layout,
    name: 'examInfo',
    meta: { title: '考试信息', icon: 'form' },
    children: [
      {
        path: 'hardLevelList',
        name: 'hardLevelList',
        component: () => import('@/views/exam/hardLevelList'),
        meta: { title: '难度系数', icon: 'table' }
      }, {
        path: 'hardLevelAdd',
        name: 'hardLevelAdd',
        component: () => import('@/views/exam/model/hardLevelAdd')
      }, {
        path: 'hardLevelEdit/:id',
        name: 'hardLevelEdit',
        component: () => import('@/views/exam/model/hardLevelEdit')
      }, {
        path: 'questionTypeList',
        name: 'questionTypeList',
        component: () => import('@/views/exam/questionTypeList')
      }, {
        path: 'questionTypeAdd',
        name: 'questionTypeAdd',
        component: () => import('@/views/exam/model/questionTypeAdd')
      }, {
        path: 'questionTypeEdit/:id',
        name: 'questionTypeEdit',
        component: () => import('@/views/exam/model/questionTypeEdit')
      }, {
        path: 'selectQuestionList',
        name: 'selectQuestionList',
        component: () => import('@/views/exam/selectQuestionList'),
        meta: { title: '选择题管理', icon: 'table' }
      }, {
        path: 'multiSelectList',
        name: 'multiSelectList',
        component: () => import('@/views/exam/multiSelectList'),
        meta: { title: '分组选择题', icon: 'table' }
      }, {
        path: 'selectQuestionAdd',
        name: 'selectQuestionAdd',
        component: () => import('@/views/exam/model/selectQuestionAdd')
      }, {
        path: 'selectQuestionEdit/:id',
        name: 'selectQuestionEdit',
        component: () => import('@/views/exam/model/selectQuestionEdit')
      }, {
        path: 'fillQuestionList',
        name: 'fillQuestionList',
        component: () => import('@/views/exam/fillQuestionList'),
        meta: { title: '填空题管理', icon: 'table' }
      }, {
        path: 'fillQuestionAdd',
        name: 'fillQuestionAdd',
        component: () => import('@/views/exam/model/fillQuestionAdd')
      }, {
        path: 'fillQuestionEdit/:id',
        name: 'fillQuestionEdit',
        component: () => import('@/views/exam/model/fillQuestionEdit')
      }, {
        path: 'askQuestionList',
        name: 'askQuestionList',
        component: () => import('@/views/exam/askQuestionList'),
        meta: { title: '问答题管理', icon: 'table' }
      }, {
        path: 'askQuestionAdd',
        name: 'askQuestionAdd',
        component: () => import('@/views/exam/model/askQuestionAdd')
      }, {
        path: 'askQuestionEdit/:id',
        name: 'askQuestionEdit',
        component: () => import('@/views/exam/model/askQuestionEdit')
      }
    ]
  }, {
    path: '/content',
    component: Layout,
    name: 'contentInfo',
    meta: { title: '内容管理', icon: 'form' },
    children: [
      {
        path: 'bannerCateList',
        name: 'bannerCateList',
        component: () => import('@/views/banner/bannerCateList'),
        meta: { title: 'Banner类别', icon: 'table' }
      }, {
        path: 'bannerInfoList',
        name: 'bannerInfoList',
        component: () => import('@/views/banner/bannerList'),
        meta: { title: 'Banner管理', icon: 'table' }
      }, {
        path: 'bannerInfoAdd',
        name: 'bannerInfoAdd',
        component: () => import('@/views/banner/model/bannerAdd')
      }, {
        path: 'bannerInfoEdit/:id',
        name: 'bannerInfoEdit',
        component: () => import('@/views/banner/model/bannerEdit')
      }, {
        path: 'bannerCateAdd',
        name: 'bannerCateAdd',
        component: () => import('@/views/banner/model/bannerCateAdd')
      }, {
        path: 'bannerCateEdit/:id',
        name: 'bannerCateEdit',
        component: () => import('@/views/banner/model/bannerCateEdit')
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  linkActiveClass: 'active',
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
