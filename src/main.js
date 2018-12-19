// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import Components from './components/install.js'
import router from './router'
import store from './store'
import mixins from './mixins'
import './style/style.less'
import registerVux from './registerVux'
import './server'

let deal = {
  qrgive (v) {
    window.server.qr_read(v, () => {
      window.Toast({
        message: '获取积分成功',
        position: 'bottom',
        duration: 3000
      })
    })
  },
  referrer: 'attr'
}

window.start((data) => {
  FastClick.attach(document.body)
  Vue.config.productionTip = false
  Vue.use(Components)
  Vue.mixin(mixins)
  registerVux()
  window.attention = data.attention
  let vm = new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
  window.console.log(vm)
  window.Toast = (msg) => { vm.$vux.toast.text(msg, 'bottom') }
}, deal)
