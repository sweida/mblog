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


import ConArticle from '@/components/admin/content/article'
import ConPage from '@/components/admin/content/page'
import ConLink from '@/components/admin/content/link'
import ConCate from '@/components/admin/content/cate'
import ConTag from '@/components/admin/content/tag'
import ConNav from '@/components/admin/content/nav'


import SetGeneral from '@/components/admin/setting/general'
import SetUpload from '@/components/admin/setting/upload'
import SetMail from '@/components/admin/setting/mail'
import SetComment from '@/components/admin/setting/comment'

import UserFrom from '@/components/admin/user/form'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  mode: 'history',
  base: '/admin',
  routes: [{
    path: '/',
    component: Main,
    redirect: '/dashboard/',
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
        redirect: '/content/article/',
        children: [{
          path: 'article',
          component: ConArticle
        }, {
          path: 'page',
          component: ConPage
        }, {
          path: 'link',
          component: ConLink
        }, {
          path: 'cate',
          component: ConCate
        }, {
          path: 'tag',
          component: ConTag
        }, {
          path: 'nav',
          component: ConNav
        }]
      },
      {
        path: 'setting',
        component: Setting,
        redirect: '/setting/general/',
        children: [{
          path: 'general',
          component: SetGeneral
        }, {
          path: 'upload',
          component: SetUpload
        }, {
          path: 'mail',
          component: SetMail
        }, {
          path: 'comment',
          component: SetComment
        }]
      },
      {
        path: 'user/new',
        component: UserFrom
      },
      {
        path: 'user/:id',
        component: UserFrom
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
