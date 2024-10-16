import App from './App'
import {SERVE_URL,SERVE_URL_TWO,SERVE_URL_ONE} from './config/server.js'
// #ifndef VUE3
import Vue from 'vue'
Vue.prototype.SERVE_URL = SERVE_URL
Vue.prototype.SERVE_URL_ONE = SERVE_URL_ONE
Vue.prototype.SERVE_URL_TWO = SERVE_URL_TWO
Vue.config.productionTip = false
// Vue.prototype.$store = store
App.mpType = 'app'

import uView from '@/uni_modules/uview-ui'
Vue.use(uView)

// 获取登录信息
// store.commit('login/getLoginInfo')
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif