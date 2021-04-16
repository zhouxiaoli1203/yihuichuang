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
Object.keys(Fns).forEach(key => {
    Vue.prototype[key] = Fns[key]
})
import Directives from './utils/directives'
import {CONSTANT} from './utils/constant'
//全局的filter
import filters from './utils/filters'

filters(Vue)

Vue.use(ElementUI,Directives);
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

/* 七牛插件公用的函数：
 * 图片上传前的钩子,对图片进行限制
 */
Vue.prototype.beforeUpload = function(file){
    //console.log(file);
 
     //const isJPG = file.type === 'image/jpeg' || 'image/jpg' || 'image/png';
     var isJPG;
     if(file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png'){
        isJPG=true;
     }else{
        isJPG=false;
     }
 
     const isLt2M = file.size / 1024 / 1024 < 3;
 
     if (!isJPG) {
        //this.$message.error('上传头像图片只能是 jpeg/jpg/png 格式!');
        this.$message({
            message: '上传头像图片只能是 jpeg/jpg/png 格式!',
            type: 'error',
            duration:1500,
            showClose: true,
         });
      }
      if (!isLt2M) {
         //this.$message.error('上传头像图片大小不能超过 3MB!');
         this.$message({
             message: '上传头像图片大小不能超过 3MB!',
             type: 'error',
             duration:1500,
             showClose: true,
          });
       }
       return isJPG && isLt2M;
}
 
    /* 得到图片中间的key
     * 新增和编辑时上传图片到七牛都调用 _this.getImagekey(_this.oldPicUrl) 方法，参数要求：
     * 新增：_this.oldPicUrl=""
     * 编辑：_this.oldPicUrl 值为修改前的图片url
    */
    Vue.prototype.getImagekey = function(url){
        var key="tmp_bj_" + Date.parse(new Date());
        var count="0";
        if(url!=""){
            if(url.indexOf("http://qrndg83uk.hn-bkt.clouddn.com/")>=0){
                if(url.indexOf("?")>=0){
                    key=url.substring(26).substring(0,url.substring(26).lastIndexOf("?"));
                    count="1";//覆盖
                }else{
                    key=url.substring(26);
                    count="1";//覆盖
                }
            }
        }
        //其中覆盖时,key与url相等;普通上传时,url为空,key为上传的key.
        return { key:key , url : count == "0" ? "" : key };
    }
    //文件超出个数限制时的钩子
    Vue.prototype.exceed = function(files, fileList){
        console.log(files);
        // console.log(fileList);
        this.$message({
            message: '上传的图片数量超出限制!',
            type: 'warning',
            duration:1500,
            showClose: true,
        });
    }


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
