import Vue from 'vue'
import Fns from '@/utils/common'
import store from '@/store/store'
import secret from '@/utils/jquery.md5'
import { yhcReq,baseUrl } from '@/utils/http'

import CktDesign from '@chuangkit/chuangkit-design'
var fn = {};
function Ckt(){
    this.useCkt = function(options,complateFun){
        fn = complateFun;
        let _options = {
            token:store.state.token ,
        };
        console.log(store);
       setInit(options);
    //    var gl_options =  setInit(options);
       
        function setInit(config) {
            var judge, options,newData;
            if (config) {
                options = JSON.parse(JSON.stringify(config));
                for (var i in _options) { //默认配置和所传的参数配置进行比较合并
                    judge = true;
                    for (var j in options) {
                        if (i == j) {
                            judge = false;
                        }
                    }
                    if (judge) {
                        options[i] = _options[i];
                    }
                }
            } else {
                options = JSON.parse(JSON.stringify(_options));
            }
            console.log(options,"options");
            yhcReq("post","Ckt/sign",options).then((res)=>{
                if(res.code == 1){
                    let cktDesign = new CktDesign(res.data);
                    cktDesign.open();
                    document.getElementById("chuangkit-design-close-btn").previousSibling.innerText=""; 
                }
           });

        };
    }
    console.log("*********");
}
window.chuangkitComplete = function(res){
    fn(res);
    if(res.type && res.type=="interrupted"){
      //在该处根据自身需要实现相应功能
      alert(res.msg+"现在应该跳转到第三方购买页");
      location.href='https://ckt.cn';
    }
}
const CKT = new Ckt();
export default CKT;