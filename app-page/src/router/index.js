import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/index.vue'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [{
    path: '/',
    name: 'Home',
    component: Home
  }]
})
