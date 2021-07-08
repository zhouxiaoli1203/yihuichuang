var qiniu = require('qiniu-js');

import { uploadChunk } from 'qiniu-js/esm/api';
import Vue from 'vue'

import store from '@/store/store'
import router from '@/router/index'

const Fns = {
    formatDate(date, fmt) {
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        let o = {
            'M+': date.getMonth() + 1,
            'd+': date.getDate(),
            'h+': date.getHours(),
            'm+': date.getMinutes(),
            's+': date.getSeconds()
        };
        for (let k in o) {
            if (new RegExp(`(${k})`).test(fmt)) {
                let str = o[k] + '';
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : Fns.padLeftZero(str));
            }
        }
        return fmt;
    },
    padLeftZero(str) {
        return ('00' + str).substr(str.length);
    },
    formatDate_addDay(AddDayCount){
        var dd = new Date();
        dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
        return dd.getTime();
    },
    confirm_pop(cnt){
        return new Promise((resolve, reject) => {
            this.$confirm(cnt, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                callback:function(action, instance){
                    // instance.close
                    // function(action, instance)，action 的值为'confirm', 'cancel'或'close', instance 为 MessageBox 实例，可以通过它访问实例上的属性和方法
                    action == "confirm"?resolve(true):instance.close;
                }
              })
        })
    },


    // 登录过期时
    tokenInvalid(){
        console.log('过期了');
        localStorage.removeItem('token');
        store.state.token = '';
        localStorage.removeItem('userId');
        store.state.userId = '';
        localStorage.removeItem('userInfo');
        store.state.userInfo = '';  
        localStorage.removeItem('cartNum');
        store.state.cartNum = 0;      
        store.state.currentIndex="/" 
        router.replace('/');
        store.state.loginPorp=true
    },


    // 获取购物车的数量
    GoodsCartNum(){
        this.$post("post",'Goods/cartNum',{
        token:store.getters.getToken,
        }).then((res)=>{
            if(res.code==1){
                this.$store.commit('setCartNum',res.data.count)
            }
        })
    },

    // 获取门店地址表
    StoreaAddr(fn){
        this.$post("post",'Store/addr').then((res)=>{
            if(res.code==1){
            //   this.options = res.data
              fn(res.data)
            }
        })
    },

    // 获取门店列表
    StoreSelect(prov,city,dist,keyword,fn){
        this.$post("post","Store/select",{
            prov,
            city,
            dist,
            keyword
        }).then((res)=>{
            if(res.code==1){
                // this.storeList = res.data

                fn(res.data)
            }
        })
    },

          

    // 打印文件请求
    PrintsSubmit(ciyt,store_id,file_ids,fn){
        if(ciyt==''){
            this.$message({
              message:'请选择省市区',
              type: 'warning'
            });
            return
        }
  
        if(store_id==''){
            this.$message({
              message:'请选择打印门店',
              type: 'warning'
            });
            return
        }

        this.$post("post","Prints/submit",{
            token:store.getters.getToken,
            file_ids,
            store_id,
        }).then((res)=>{
            if(res.code==1){
                this.$message({
                    message:'文件已同步该门店，请及时到门店自提打印件',
                    type: 'success'
                });

                fn(false)
            }
        })
            

        
       
    },

    // // 获取门店地址表
    // StoreaAddr(){
    //     this.$post("post",'Store/addr').then((res)=>{
    //         if(res.code==1){
    //             // this.$store.commit('setCartNum',res.data.count)
    //         }
    //     })
    // },


    /* 七牛插件公用的函数：
    * 图片上传前的钩子,对图片进行限制
    */
    beforeUpload(file){
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
    },
 
    /* 得到图片中间的key
     * 新增和编辑时上传图片到七牛都调用 _this.getImagekey(_this.oldPicUrl) 方法，参数要求：
     * 新增：_this.oldPicUrl=""
     * 编辑：_this.oldPicUrl 值为修改前的图片url
    */
    getImagekey(url){
        var key="tmp_bj_" + Date.parse(new Date());
        var count="0";
        if(url!="" && url!=undefined){
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
    },
    //文件超出个数限制时的钩子
    exceed(files, fileList){
        // console.log(fileList);
        this.$message({
            message: '上传的图片数量超出限制!',
            type: 'warning',
            duration:1500,
            showClose: true,
        });
    },
    upFiles(param_,fn){
        let paramObj = param_.paramObj;
        let event = param_.e;
        let imgs = param_.imgs;
        this.uptokencover().then(res => {
            if(res.code==1){
                var qiniu_token = res.data.token;

                /*  file: blob对象，上传的文件; 
                    key: string, 文件资源名
                    token: string, 上传验证信息，前端通过接口请求后端获得
                    putExtra: object, 
                    config: object
                */
                var putExtra={
                    fname: "",//文件原文件名
                    params: {},//用来放置自定义变量
                    mimeType: ["image/png", "image/jpeg", "image/gif"],//用来限定上传文件类型，指定null时自动判断文件类型。
                }
                var config={
                    useCdnDomain: true,//表示是否使用 cdn 加速域名，为布尔值，true 表示使用，默认为 false。
                    region: qiniu.region.z2,//选择上传域名区域；当为 null 或 undefined 时，自动分析上传域名区域
                }
                var observable  = qiniu.upload(event.file, paramObj.key, qiniu_token, putExtra, config);
                var subscription = observable.subscribe({
                    next(res){
                        // next: 接收上传进度信息，res 参数是一个带有 total 字段的 object，包含loaded、total、percent三个属性，提供上传进度信息。
                        //console.log(res);
                        
                    },
                    error(err){
                        // 上传错误后触发，当不是 xhr 请求错误时，会把当前错误产生原因直接抛出，诸如 JSON 解析异常等；当产生 xhr 请求错误时，参数 err 为一个包含 code、message、isRequestError 三个属性的 object
                        //console.log(err);
                    }, 
                    complete(res){
                        //console.log(res);
                        // 接收上传完成后的后端返回信息，res 参数为一个 object， 为上传成功后后端返回的信息，具体返回结构取决于后端sdk的配置
                        // 1、先把上传前的图片url保存为数组
                        // var customaryImgArr = [],keyArr=[];
                        // if(_this.form.imgs!=""){
                        //     customaryImgArr = _this.form.imgs.split(",");
                        // }
                        // //2、把当前上传的图片插入数组
                        // customaryImgArr.push( "http://qrndg83uk.hn-bkt.clouddn.com/"+paramObj.key+"?v="+Date.parse(new Date()));
                        // keyArr.push(paramObj.key);
                        // //3、把数组转换成string，给接口保存。
                        // _this.form.imgs = keyArr.toString();
                        fn(res);
                        
                    }
                }) // 上传开始
                // subscription.unsubscribe() // 上传取消
            }else{
                _this.$message({
                    message: res.info,
                    type: 'error',
                    duration:1500,
                    showClose: true,
                });
            }
        });
    },
    uptokencover(){
        return this.$post("post","Qiniu/uploadToken",{token:this.$store.state.token});
    },

    getBase64(file) {
        return new Promise(function(resolve, reject) {
            let imgResult = ''
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function() {
                imgResult = reader.result;
            };
            reader.onerror = function(error) {
                reject(error);
            };
            reader.onloadend = function() {
                resolve(imgResult);
            };
        });
    },

    // 图片上传 base(64)
    uploadimg(file){
        let that = this
        return new Promise(function(resolve, reject) {
            that.getBase64(file).then(res => {
                return res
                // this.imgResult = res
                // srcList.push(res)

                // console.log(res)
            });
        });


    },
    changeAmount (n) {
        n = n.replace(/[^d.]/g, '')
    },
    validateChangbian(rule,value,callback){
        let reg = /^\d+$|^\d*\.\d+$/g;
        if(!value){
            callback(new Error('请输入长边'))
         }else if(!reg.test(value)){
            callback(new Error('请输入正确格式的数字'))
         }else if(value.indexOf(".") != -1 && value.split('.')[1].length > 3){
           callback(new Error('最多可输入小数点后三位')) //小数点后两位
        }else{
          callback();
        }
    },
    validateDuanbian(rule,value,callback){
        let reg = /^\d+$|^\d*\.\d+$/g;
        if(!value){
            callback(new Error('请输入短边'))
         }else if(!reg.test(value)){
            callback(new Error('请输入正确格式的数字'))
         }else if(value.indexOf(".") != -1 && value.split('.')[1].length > 3){
           callback(new Error('最多可输入小数点后三位')) //小数点后两位
        }else{
          callback();
        }
    },
    validateNum(rule,value,callback){
        let reg = /^\d+$/g;
        if(!value){
            callback(new Error('请输入内容'))
         }else if(!reg.test(value)){
            callback(new Error('请输入正确格式的数字'))
         }else{
          callback();
        } 
    },
    // 加载中
    openFullScreen() {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        return loading;
    },
    closeFullScreen(loading){
      loading.close();
    },
    getParams(params,page){
        let obj = JSON.parse(JSON.stringify(params));
        if(page == 2001){//宣传册

            let a = obj.attr;
            if(a.gongyi){
                a.gongyi = a.gongyi.filter((v)=>{
                    return v.checkbox;
                });
            }
        }
        console.log(obj);
        return obj;
    }

}


export default Fns