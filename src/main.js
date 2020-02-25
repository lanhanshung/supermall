import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import fastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

import toast from 'components/comment/toast'
// import NavBar from "components/comment/navbar/NavBar";

Vue.config.productionTip = false
Vue.prototype.$bus=new Vue()

// 安装toast插件
Vue.use(toast)

// 使用图片懒加载
Vue.use(VueLazyLoad,{
  loading:require('assets/img/common/placeholder.png')
})

// fastClick.attach(document.body)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
