export default {
  install (Vue) {
    const components = require.context('../components', true, /\/*\.vue$/)
    components.keys().forEach((item, i) => {
      let c = components(item).default
      Vue.component(c.name, c)
    })
  }
}
