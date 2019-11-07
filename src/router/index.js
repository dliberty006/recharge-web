import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
  {path: '/login', component: () => import('@/views/login/index'), hidden: true},
  {path: '/404', component: () => import('@/views/404'), hidden: true},
  {
    path: '',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/home/index'),
      meta: {title: '首页', icon: 'home'}
    }]
  },
  {
    path: '/pms',
    component: Layout,
    redirect: '/pms/vote',
    name:'pms',
    meta: {title: '投票管理', icon: 'product'},
    children: [
      {
        path: 'vote',
        name: 'vote',
        component: () => import('@/views/pms/vote'),
        meta: {title: '活动管理', icon: 'product'}
      },
      {
        path: 'addVote',
        name: 'addVote',
        component: () => import('@/views/pms/vote/add'),
        meta: {title: '添加活动'},
        hidden: true
      },
      {
        path: 'updateVote',
        name: 'updateVote',
        component: () => import('@/views/pms/vote/update'),
        meta: {title: '修改活动'},
        hidden: true
      },
      {
        path: 'signup',
        name: 'signup',
        component: () => import('@/views/pms/signup'),
        meta: {title: '报名管理', icon: 'sms'}
      },
      {
        path: 'addSignup',
        name: 'addSignup',
        component: () => import('@/views/pms/signup'),
        meta: {title: '添加管理'},
        hidden: true
      },
      {
        path: 'updateSignup',
        name: 'updateSignup',
        component: () => import('@/views/pms/signup'),
        meta: {title: '修改管理'},
        hidden: true
      }
    ]
  },

  {path: '*', redirect: '/404', hidden: true}
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})

