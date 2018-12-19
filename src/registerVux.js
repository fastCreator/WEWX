import Vue from 'vue'
import * as vux from 'vux'
const components = ['ViewBox', 'XHeader', 'Scroller', 'Search', 'Swiper', 'Tabbar', 'TabbarItem']
const plugins = ['LoadingPlugin', 'ToastPlugin']
export default () => {
  components.forEach(key => {
    Vue.component(key, vux[key])
  })
  plugins.forEach(key => {
    Vue.use(vux[key])
  })
}
