// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import store from './store/store'
import { yhcReq,baseUrl } from './utils/http'

// 样式
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/base.css';
import './assets/css/common.css';
import './assets/css/commonStlye.less';

//全局公用函数
import Fns from './utils/common'
import CONSTANT from './utils/constant'
Object.keys(Fns).forEach(key => {
    Vue.prototype[key] = Fns[key]
})
//全局的filter
import filters from './utils/filters'
filters(Vue)

Vue.use(ElementUI);
Vue.config.productionTip = false

Vue.prototype.$post = yhcReq;
Vue.prototype.cnst = CONSTANT;
Vue.prototype.baseUrl = baseUrl;
// 全局路由守卫
router.beforeEach((to, from, next) => {
    if (to.query.token) {
        localStorage.setItem("yhc_token", to.query.token);
    }
    next();
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
