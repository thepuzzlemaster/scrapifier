import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/controls',
      name: 'controls',
      component: require('@/components/Controls')
    },
    {
      path: '/',
      name: 'selector',
      component: require('@/components/Selector')
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
