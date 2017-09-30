import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/admin/main'
import Login from '@/components/admin/login'
import Dashboard from '@/components/admin/dashboard/index'
import Content from '@/components/admin/content/index'
import Setting from '@/components/admin/setting/index'
import User from '@/components/admin/user/index'
import Comment from '@/components/admin/comment/index'
import Theme from '@/components/admin/theme/index'


import Article from '@/components/admin/content/article'
import Page from '@/components/admin/content/page'
import Link from '@/components/admin/content/link'


Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  mode: 'history',
  base: '/admin',
  routes: [{
    path: '/',
    component: Main,
    children: [{
        path: 'dashboard',
        component: Dashboard
      }, {
        path: 'user',
        component: User
      },
      {
        path: 'theme',
        component: Theme
      },
      {
        path: 'comment',
        component: Comment
      },
      {
        path: 'content',
        component: Content,
        children: [{
          path: 'article',
          component: Article
        }, {
          path: 'page',
          component: Page
        }, {
          path: 'link',
          component: Link
        }]
      },
      {
        path: 'setting',
        component: Setting
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
