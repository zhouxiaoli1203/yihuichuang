<template>
  <div class='main'>
      <el-form>

        <el-form-item label="上传图片：">
        <el-upload action="" :http-request="qiniuUploadCover" list-type="picture-card" :limit="3" :disabled="false" :auto-upload="true" :on-exceed="exceed"
                        :before-upload="beforeUpload" :on-remove="onRemove" :on-preview="handlePictureCardPreview" ref="addEditUpload" :file-list="fileList" multiple="multiple">
            <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="showPic" size="tiny" :append-to-body="true">
            <img width="100%" :src="showPicUrl" alt="">
        </el-dialog>
        <span class="redFont" style="font-size:12px;">建议上传尺寸：宽750px 、高375px</span>
    </el-form-item>
      </el-form>
  </div>
</template>

<script>
var qiniu = require("qiniu-js");
export default {
  name: '',
  data(){
    return {
        fileList:[],
        showPic:false,
        showPicUrl:"",
        oldPicUrl:"",
        form:{imgs:""}
    }
  },
  components: {},
  created(){},
  mounted(){},
  methods: {
      //移除upload控件的图片url
            onRemove (file, fileList) {
                let _this = this;
                // file ： 当前被删除的图片
                // fileList : 删除后还剩下的图片
                //console.log(file);console.log(fileList);
                _this.oldPicUrl = file.url;//暂存被删掉的旧图片
                
                //删除一张图片之后的upload控件值
                var arr =[];
                fileList.forEach(function(ele){
                    arr.push(ele.url);
                })
                _this.form.imgs=arr.toString();
            },
            handlePictureCardPreview(file) {//放大查看图片
            let _this = this;
                _this.showPicUrl = file.url;
                _this.showPic = true;
            },
            qiniuUploadCover(event){
                /* 新增和编辑时上传图片到七牛都调用此方法，参数要求：
                新增：paramObj：{key:"tmp_bj_" + Date.parse(new Date()),url:""}
                编辑：paramObj：_this.getImagekey(_this.oldPicUrl);
                */
               //console.log(_this.oldPicUrl);debugger
               let _this = this;
                var paramObj=_this.getImagekey(_this.oldPicUrl);
                paramObj.key = paramObj.key + event.file.uid;
                // this.uptokencover(paramObj).then(res => {
                //     if(res.code==0){
                        var qiniu_token = "dyJNamMNBWbYjQjuwUpkELRJkmn7nOAtB9l2tBNT:9B-3-MWZr77Wl23GfietyDRsJpE=:eyJzY29wZSI6InloYzA1NjEiLCJkZWFkbGluZSI6MTYxODkzMDgzNH0=";
                        // var qiniu_token = res.data.uptoken;
 
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
                                //1、先把上传前的图片url保存为数组
                                var customaryImgArr = [],keyArr=[];
                                if(_this.form.imgs!=""){
                                    customaryImgArr = _this.form.imgs.split(",");
                                }
                                //2、把当前上传的图片插入数组
                                customaryImgArr.push( "http://qrndg83uk.hn-bkt.clouddn.com/"+paramObj.key+"?v="+Date.parse(new Date()));
                                keyArr.push(paramObj.key);
                                //3、把数组转换成string，给接口保存。
                                _this.form.imgs = keyArr.toString();
                                console.log(customaryImgArr);
                                console.log(_this.form.imgs);
                                
                            }
                        }) // 上传开始
                        // subscription.unsubscribe() // 上传取消
                //     }else{
                //         _this.$message({
                //             message: res.message,
                //             type: 'error',
                //             duration:1500,
                //             showClose: true,
                //         });
                //     }
                // });
            },
         uptokencover:function(data){
            return  this.$post("get","http://api.awbchina.com/v1/qn/get_token")
         }
  }
}

 

</script>
<style lang='less' scoped>
</style>
