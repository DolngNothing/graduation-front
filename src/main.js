// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import store from './store'
import './styles/card.css'
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
axios.defaults.baseURL = 'http://localhost:8080/api'
Vue.prototype.$axios = axios
Vue.use(ElementUI)
Vue.config.productionTip = false

// main.js
function formatDate(date, fmt) {
  date = new Date(date)
  if (typeof (fmt) === 'undefined') {
    fmt = 'yyyy-MM-dd HH:mm:ss'
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'H+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : ('00' + str).substr(str.length))
    }
  }
  return fmt
}

// 定义一个时间过滤器
Vue.filter('FormatDate', function(date, fmt) {
  return formatDate(date, fmt)
})

router.beforeEach((to, from, next) => {
  if (sessionStorage.getItem('user')) {
    store.dispatch('user/login', JSON.parse(sessionStorage.getItem('user')))
  }

  if (sessionStorage.getItem('student')) {
    store.dispatch('student/setStudent', JSON.parse(sessionStorage.getItem('student')))
  }

  if (!store.state.user.user.role) {
    if (
      to.matched.length > 0 &&
          !to.matched.some(record => record.meta.requiresAuth)
    ) {
      next()
    } else {
      next({ path: '/login' })
    }
  } else {
    if (!store.state.permission.permissionList) {
      store.dispatch('permission/FETCH_PERMISSION').then(() => {
        next({ path: to.path })
      })
    } else {
      if (to.path !== '/login') {
        next()
      } else {
        next(from.fullPath)
      }
    }
  }
})

router.afterEach((to, from, next) => {
  var routerList = to.matched
  store.commit('setCrumbList', routerList)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
