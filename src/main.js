// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import store from './store/store'
import { yhcReq } from './utils/http'
import './utils/directive' //阻止按钮同一时间内多次触发
import './utils/portSwitch' //判断
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


// import VueAMap from 'vue-amap';

// Vue.use(VueAMap);
// VueAMap.initAMapApiLoader({
//   key: 'd753742ce2ae6974538e3e40ae05a732',
//   plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor','AMap.MarkerClusterer'],
//   v: '1.4.4'
// });


import AMap  from 'vue-amap'//引入高德地图并初始化
Vue.use(AMap)
AMap.initAMapApiLoader({
  //集合秘钥key
  key:'9dda7871b127d833afdc75274e12ae44',
  //插件集合
  plugin:[
    "AMap.Autocomplete", //输入提示插件
    "AMap.PlaceSearch", //POI搜索插件
    "AMap.Scale", //右下角缩略图插件 比例尺
    "AMap.OverView", //地图鹰眼插件
    "AMap.ToolBar", //地图工具条
    "AMap.MapType", //类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
    "AMap.PolyEditor", //编辑 折线多，边形
    "AMap.CircleEditor", //圆形编辑器插件
    "AMap.Geolocation" //定位控件，用来获取和展示用户主机所在的经纬度位置
  ]
})





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
  template: '<App/>',
  mounted() {
    document.dispatchEvent(new Event('render-event'))
  }
})
