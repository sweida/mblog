import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index/index'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  mode: 'history',
  routes: [{
    path: '/',
    component: Index
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
