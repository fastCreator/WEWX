import Home from './views/Home.vue'
import Page from './views/Page.vue'

let components
// home
let home = []
components = require.context(`./views/home`, true, /\/index\.vue$/)
components.keys().forEach((item, i) => {
  let path = item.replace('/index.vue', '').replace('.', '')
  let config = require(`./views/home` + item.replace('/index.vue', '/config.js').replace('.', '')).default
  home.push(Object.assign({
    path: path,
    name: path,
    component: components(item).default
  }, config))
})
// home end

// page
let page = []
components = require.context(`./views/page`, true, /\/index\.vue$/)
components.keys().forEach((item, i) => {
  let path = '/page' + item.replace('/index.vue', '').replace('.', '')
  let config = require(`./views/page` + item.replace('/index.vue', '/config.js').replace('.', '')).default
  page.push(Object.assign({
    path: path,
    name: path,
    component: components(item).default
  }, config))
})
// page end
let nav = [
  {
    path: '/',
    component: Home,
    children: home,
    redirect: 'index'
  },
  {
    path: '/page',
    component: Page,
    children: page
  }
]
export default nav
