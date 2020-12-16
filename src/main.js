import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 全局引入vant
import Vant from 'vant';
// 全局引入vant样式
import 'vant/lib/index.css';
// 自动设置基准值
import 'amfe-flexible'

// import axios from './utils/request'
import './font/iconfont.css'
import './styles/index.less'
import './utils/dayjs'

// 全局注册vant
Vue.use(Vant);
// Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
