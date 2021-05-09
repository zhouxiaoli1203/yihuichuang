// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import store from './store/store'
import { yhcReq } from './utils/http'
import './utils/directive' //阻止按钮同一时间内多次触发
import merge from 'deepmerge'
import Meta from 'vue-meta'
// 样式
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/base.css';
import './assets/css/common.css';
import './assets/css/commonStlye.less';

//全局公用函数
import Fns from './utils/common'
Object.keys(Fns).forEach(key => {
    Vue.prototype[key] = Fns[key]
})
import Directives from './utils/directives'
import {CONSTANT} from './utils/constant'
import CKT from './utils/useCkt'
//全局的filter
import filters from './utils/filters'

filters(Vue)
// console.log(Directives);
Vue.use(ElementUI);
Vue.use(Directives);
Vue.use(Meta);
Vue.config.productionTip = false

Vue.prototype.$post = yhcReq;
Vue.prototype.cnst = CONSTANT;
Vue.prototype.CKT = CKT;
Vue.prototype.merge = merge;
// 全局路由守卫
router.beforeEach((to, from, next) => {
    if (to.query.token) {
        localStorage.setItem("yhc_token", to.query.token);
    }
    // console.log(to.meta.content)
//   if(to.meta.content){
//     let head = document.getElementsByTagName('head');
//     let meta = document.createElement('meta');
//     setTimeout(() => {
//     document.querySelector('meta[name="keywords"]').setAttribute('content', to.meta.content.keywords)
//     document.querySelector('meta[name="description"]').setAttribute('content', to.meta.content.description)
//     },1000)
//     meta.content = to.meta.content;
//     head[0].appendChild(meta)
//   }
//   // /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title;
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
