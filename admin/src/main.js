/*
 * @Description: 
 * @Author: zmt
 * @LastEditTime: 2020-05-07 11:00:01
 */
import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'

import http from './http'

Vue.prototype.$http = http // 如此, 可以在任何页面通过使用 this.$http

Vue.config.productionTip = false


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
