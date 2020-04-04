import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/login/login'
import layout from '@/views/layout/layout'
import home from '@/views/home/home'
import notFound from '@/views/errorpage/notFound'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login,
      hidden: true,
      meta: {
        requiresAuth: false
      }
    }
  ]
})

export const DynamicRoutes = [
  {
    path: '',
    component: layout,
    name: 'container',
    redirect: 'home',
    meta: {
      requiresAuth: true,
      name: '首页'
    },
    children: [
      {
        path: 'home',
        component: home,
        name: 'home',
        meta: {
          name: '首页'
        }
      }
    ]
  },
  {
    path: '*',
    component: notFound
  }
]
