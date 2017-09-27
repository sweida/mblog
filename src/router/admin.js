import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/admin/main'
import Login from '@/components/admin/login'



Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  mode: 'history',
  base: '/admin',
  routes: [{
    path: '/',
    component: Main
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
