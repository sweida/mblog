import Vue from 'vue'
import App from './components/admin.vue'
import router from './router/admin'
import VueResource from 'vue-resource'

import Filters from './assets/utils/filters'

import Layer from './components/ui/layer/index'

//注册过滤器
Object.keys(Filters).forEach(key => Vue.filter(key, Filters[key]))

//挂载全局方法
Vue.prototype.$layer = Layer


Vue.use(VueResource)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})
