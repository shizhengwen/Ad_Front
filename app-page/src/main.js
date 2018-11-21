// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.axios = axios;

axios.defaults.baseURL = 'http://47.52.157.58:8080'

import "../static/css/reset.css"
import "../static/fonts/iconfont.css"
import "../static/js/rem"
import 'mint-ui/lib/style.css'
import Mint from 'mint-ui'
Vue.use(Mint)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
