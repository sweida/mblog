import Vue from 'vue'
import App from './components/admin.vue'
import router from './router/admin'
import VueResource from 'vue-resource'

import Filters from './assets/utils/filters'
import Store from './assets/utils/store'

import Layer from './components/ui/layer/index'


Vue.use(VueResource)

Vue.config.productionTip = false

//注册过滤器
Object.keys(Filters).forEach(key => Vue.filter(key, Filters[key]))

//挂载全局方法
Vue.prototype.$layer = Layer


const checkToken = () => {
  const token = Store(true, '_auth_admin_token_')
  if (token) {
    Vue.http.headers.common['x-auth-token'] = token
  } else {
    delete Vue.http.headers.common['x-auth-token']
    //todo 跳到登录
    router.push('/login')
  }
}
checkToken()

//拦截器
Vue.http.interceptors.push((request, next) => {
  if (!/\/user\/admin\/login/.test(request.url)) {
    checkToken()
  }
  next((response) => {
    const result = response.body
    if (result.code === 405 || result.code === 499) {
      const token = Store(true, '_auth_admin_token_', null)
      router.push('/login')
      return
    } else if (result.code === 408) {
      Layer.toast('没有操作此API的权限')
      return
    }
  })
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})
