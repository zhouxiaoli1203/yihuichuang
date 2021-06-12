import Vue from 'vue'
import Fns from '@/utils/common'
import store from '@/store/store'
import secret from '@/utils/jquery.md5'
import { yhcReq,baseUrl } from '@/utils/http'

import CktDesign from '@chuangkit/chuangkit-design'
// var CKT = CKT || {};
// (function(global){
//     global.useCkt = function(options,complateFun){
//         global.options = {
//             token:store.state.token          
//         };
//         console.log(store);
//        setInit(options);
//     //    var gl_options =  setInit(options);
       
//         function setInit(config) {
//             var judge, options,newData;
//             if (config) {
//                 options = JSON.parse(JSON.stringify(config));
//                 for (var i in global.options) { //默认配置和所传的参数配置进行比较合并
//                     judge = true;
//                     for (var j in options) {
//                         if (i == j) {
//                             judge = false;
//                         }
//                     }
//                     if (judge) {
//                         options[i] = global.options[i];
//                     }
//                 }
//             } else {
//                 options = JSON.parse(JSON.stringify(global.options));
//             }
//             yhcReq("post",baseUrl+"Ckt/sign",options).then((res)=>{
//                 if(res.code == 1){
//                     console.log(res)
//                     CKT = new CktDesign(res.data);
//                     CKT.open();
//                 }
//            });

//         };
//         // function objKeySort(obj) {//排序的函数
//         //     var newkey = Object.keys(obj).sort();
//         // 　　//先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
//         //     var newObj = {};//创建一个新的对象，用于存放排好序的键值对
//         //     for (var i = 0; i < newkey.length; i++) {//遍历newkey数组
//         //         if(obj[newkey[i]] != ""){
//         //             newObj[newkey[i]] = obj[newkey[i]];//向新创建的对象中按照排好的顺序依次增加键值对
//         //         }
//         //     }
//         //     return newObj;//返回排好序的新对象
//         // };
//         // function getKey(){
//         //     let key = "1A2AA5E996990C2DCB3E9F8E7BCD8144";
//         //     let obj_ = objKeySort(gl_options);
//         //     var param = obj_;
//         //     var arr = [];
//         //     for (let i in obj_) {
//         //         let str = ""+i+"="+obj_[i];
//         //         arr.push(str)
//         //     }
//         //     param["sign"] = secret.md5(arr.join("&")+key).toString().toUpperCase();
//         //     return param;
//         // };
//         // CKT = new CktDesign(gl_options);
//         // CKT.open();
//         window.chuangkitComplete = function(res){
//             complateFun(res);
//             if(res.type && res.type=="interrupted"){
//               //在该处根据自身需要实现相应功能
//               alert(res.msg+"现在应该跳转到第三方购买页");
//               location.href='https://ckt.cn';
//             }
//         }
//     }
// })(CKT)
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
    console.log(res,"11111");
    fn(res);
    if(res.type && res.type=="interrupted"){
      //在该处根据自身需要实现相应功能
      alert(res.msg+"现在应该跳转到第三方购买页");
      location.href='https://ckt.cn';
    }
}
const CKT = new Ckt();
export default CKT;