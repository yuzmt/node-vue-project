/*
 * @Description: 
 * @Author: zmt
 * @LastEditTime: 2020-05-14 13:46:27
 */
import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'

import http from './http'

import './style.css'

Vue.prototype.$http = http // 如此, 可以在任何页面通过使用 this.$http

Vue.config.productionTip = false

Vue.mixin({
  computed: {
    uploadUrl() {
      return this.$http.defaults.baseURL + '/upload'
    }
  },
  methods: {
    getAuthHeaders() {
      return {
        Authorization: `Bearer ${localStorage.token || ''}`
      }
    }
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
