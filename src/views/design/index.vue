<template>
  <div class='main'>
    <el-form>

      <el-form-item label="上传图片：">
        <el-upload action=""
                   :http-request="qiniuUploadCover"
                   list-type="picture-card"
                   :limit="3"
                   :disabled="false"
                   :auto-upload="true"
                   :on-exceed="exceed"
                   :before-upload="beforeUpload"
                   :on-remove="onRemove"
                   :on-preview="handlePictureCardPreview"
                   ref="addEditUpload"
                   :file-list="fileList"
                   multiple="multiple">
          <i clss="el-icon-plusa"></i>
        </el-upload>
        <el-dialog :visible.sync="showPic"
                   size="tiny"
                   :append-to-body="true">
          <img width="100%"
               :src="showPicUrl"
               alt="">
        </el-dialog>
        <span class="redFont"
              style="font-size:12px;">建议上传尺寸：宽750px 、高375px</span>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
    var customaryImgArr = [],
          keyArr = [];
export default {
  name: '',
  data() {
    return {
      fileList: [],
      showPic: false,
      showPicUrl: '',
      oldPicUrl: '',
      form: { imgs: '' },
    }
  },
  components: {},
  created() {},
  mounted() {},
  methods: {
    //移除upload控件的图片url
    onRemove(file, fileList) {
      let _this = this
      // file ： 当前被删除的图片
      // fileList : 删除后还剩下的图片
      //console.log(file);console.log(fileList);
      _this.oldPicUrl = file.url //暂存被删掉的旧图片

      //删除一张图片之后的upload控件值
      var arr = []
      fileList.forEach(function (ele) {
        arr.push(ele.url)
      })
      _this.form.imgs = arr.toString()
    },
    handlePictureCardPreview(file) {
      //放大查看图片
      let _this = this
      _this.showPicUrl = file.url
      _this.showPic = true
    },
    qiniuUploadCover(event) {
      console.log(event)
      /* 新增和编辑时上传图片到七牛都调用此方法，参数要求：
                新增：paramObj：{key:"tmp_bj_" + Date.parse(new Date()),url:""}
                编辑：paramObj：_this.getImagekey(_this.oldPicUrl);
                */
      //console.log(_this.oldPicUrl);
      let _this = this
      var paramObj = _this.getImagekey(_this.oldPicUrl)
      paramObj.key = paramObj.key + event.file.uid
  
      _this.upFiles({ paramObj: paramObj, e: event }, (res) => {
            if(_this.form.imgs!=""){
                customaryImgArr = _this.form.imgs.split(",");
            }
            //2、把当前上传的图片插入数组
            customaryImgArr.push( "http://qrndg83uk.hn-bkt.clouddn.com/"+paramObj.key+"?v="+Date.parse(new Date()));
            keyArr.push(paramObj.key);
            //3、把数组转换成string，给接口保存。
            _this.form.imgs = customaryImgArr.toString();
            console.log(customaryImgArr,111);
            // console.log(_this.form.imgs);
      })
    },
  },
}
</script>
<style lang='less' scoped>
</style>
