import Vue from 'vue'
import Router from 'vue-router'
import Alcodehol from '@/components/Alcodehol'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Alcodehol
    }
  ]
})
