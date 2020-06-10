/*
 * @Descripttion:
 * @Date: 2020-06-03 13:56:50
 * @LastEditTime: 2020-06-10 15:05:30
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import './mock/index' // 使用mock进行模拟

Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
