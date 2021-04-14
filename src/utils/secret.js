import Vue from 'vue'
import Fns from '@/utils/common'
import { yhcReq,baseUrl } from '@/utils/http'
var secret = require('@/utils/jquery.md5');
var obj = {
    "app_id": "0d68eeb82eaf46aa9206718d7e7fdc2a",// 企业唯一密钥ID
    "user_flag": "1A2AA5E996990C2DCB3E9F8E7BCD8144",// 企业唯一密钥
    "expire_time": Fns.formatDate_addDay(1),
    "sign": "",
    "device_type":1,//1PC 2移动
    "kind_id":"166",
    "download_quality":"1",//"1"-高清 "2"-普清
    "enable_authorize":"1",
    "taxpayer_name":"安徽滚动永恒信息科技有限公司",
    "taxpayer_phone":"18256189888",
    "taxpayer_number":"91340603MA2UYMQ92F"
}



const scts = {
    objKeySort(obj) {//排序的函数
        var newkey = Object.keys(obj).sort();
    　　//先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
        var newObj = {};//创建一个新的对象，用于存放排好序的键值对
        for (var i = 0; i < newkey.length; i++) {//遍历newkey数组
            if(obj[newkey[i]] != ""){
                newObj[newkey[i]] = obj[newkey[i]];//向新创建的对象中按照排好的顺序依次增加键值对
            }
        }
        return newObj;//返回排好序的新对象
    },
    getKey(obj2){
        let key = "1A2AA5E996990C2DCB3E9F8E7BCD8144";
        let obj_ = scts.objKeySort(obj2?$.extend({}, obj, obj2):obj);
        var param = obj_;
        var arr = [];
        for (let i in obj_) {
            let str = ""+i+"="+obj_[i];
            arr.push(str)
        }
        param["sign"] = secret.md5(arr.join("&")+key).toString().toUpperCase();
        return param;
    },
};
window.chuangkitComplete = function(res){
    console.log(res)
    if(res.type && res.type=="interrupted"){
      //在该处根据自身需要实现相应功能
      alert(res.msg+"现在应该跳转到第三方购买页");
      location.href='https://ckt.cn';
    }
    // let p= scts.getKey({
    //     appId:"0d68eeb82eaf46aa9206718d7e7fdc2a",
    //     designId:res.designId,
    //     fileType:3,
    //     noticeUrl:"",
    //     sign:"",
    //     signType:"1A2AA5E996990C2DCB3E9F8E7BCD8144"
    // });
    // yhcReq("post","https://openapi.chuangkit.com/api/getSourceImage.do",p).then((res)=>{
    //      console.log(res);
    // })
}
export {scts} ;