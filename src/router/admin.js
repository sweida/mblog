import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/admin/main'
import Login from '@/components/admin/login'
import Dashboard from '@/components/admin/dashboard'
import Content from '@/components/admin/content/index'
import Setting from '@/components/admin/setting/index'



Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  mode: 'history',
  base: '/admin',
  routes: [{
    path: '/',
    component: Main,
    children : [
      {
        path : 'dashboard',
        component : Dashboard
      },
      {
        path : 'content',
        component : Content
      },
      {
        path : 'setting',
        component : Setting
      }
    ]
  }, {
    path: '/login',
    component: Login
  }],
  scrollBehavior(to, from, savedPosition) {
    let position = {}
    if (to.hash) {
      position.selector = to.hash
    } else {
      position = {
        x: 0,
        y: 0
      }
    }
    return position
  }
})
