import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 全部导入 element-ui 所有的组件都能直接用
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 导入抽离的按需
import './utils/element'
// 导入主题色
import '@/styles/index.scss'
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
