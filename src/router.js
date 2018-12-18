import Vue from 'vue'
import Router from 'vue-router'
import navs from './nav'

Vue.use(Router)
let router = new Router({
  routes: navs
})

router.beforeEach((to, from, next) => {
  // document.title = to.meta.title
  next()
})

export default router
