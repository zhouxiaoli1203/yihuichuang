<template>
  <div class="main connonBg">
    <section class="center">
        <div class="crumbsHeader">
          <div class="crumbs">
              <router-link to="/"><span>首页 / </span></router-link>
              <span>一键抠图</span>
          </div>
        </div>

        <div class="publicCenter">
            <MenuLeft></MenuLeft> 
            <div class="contList">
              <section class="photoBox">
                <div class="photolf">
                  <h3>原图</h3>
                  <div class="img">
                    <el-upload
                        v-if="!imgResult"
                        class="avatar-uploader btns"
                        action=""
                        name='cert' 
                        :show-file-list="false"
                        :before-upload="beforeAvatarUpload"
                         accept=".jpg,.jpeg,.png,.JPG,.JPEG"
                        >
                        <div class="unClass">
                          <i class="el-icon-plus avatar-uploader-icon"></i>
                          <p>点击上传照片</p>
                        </div>
                      </el-upload>
                      <div  v-else>
                        <el-image 
                          :src="imgResult" 
                          class="avatar"
                          >
                        </el-image>
                      </div>
                  </div>
                </div>
                
                <div class="photolf">
                  <h3>效果图</h3>
                  <div class="img">
                      <div v-if="imgURl">
                        <el-image 
                          :src="imgURl" 
                          class="avatar"
                          >
                        </el-image>
                      </div>
                  </div>
                </div>
              </section>

              <div class="operationBtn">
                <el-upload
                  class="avatar-uploader btns"
                  action=""
                  name='cert' 
                  :show-file-list="false"
                  :before-upload="beforeAvatarUpload"
                    accept=".jpg,.jpeg,.png,.JPG,.JPEG"
                  >
                  <span>{{imgResult?'重新上传':'点击上传'}}</span>
                </el-upload>
                <span @click="downImgClick">一键下载</span>
              </div>
            </div>
        </div>
    </section>
  </div>
</template>

<script>
  import MenuLeft from '../../components/menuLeft'
  export default {
    name: 'matting',
    components: {
      MenuLeft,
    },
    data () {
      return {     
        img: require('../../assets/img/user/img.png'), 
        file: require('../../assets/img/user/file.png'), 
        token:'',
        imgResult:'',
        imgList:[],
        imgURl:'',
        downHd:'',
      }
    },
    created(){
      this.token = this.$store.getters.getToken;
    },
    methods: {
      beforeAvatarUpload(file) {
          console.log(file.type)
          const isJPG = file.type === 'image/jpg';
          const isJPEG = file.type === 'image/jpeg';
          const isPNG = file.type === 'image/png'
          const isLt2M = file.size / 1024 / 1024 < 5;
          if (!isJPG  && !isPNG && !isJPEG) {
              return this.$message.error('上传头像图片只能JPG,PNG');
          }
          if (!isLt2M) {
              return this.$message.error('上传头像图片大小不能超过 5MB!');
          }
          this.getFile(file) 
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

      // 上传头像
      getFile(file, fileList) {
          this.getBase64(file).then(res => {
              this.imgResult = res
              this.modifyFace(file)
          });
      },

      modifyFace(file) {
        let param = new FormData(); // 创建form对象
        param.append("cert", file); 
        param.append("token", this.token); // 添加form表单中其他数据
        this.openFullScreen(); //调用加载中
        this.$post("post",'Cert/upload',param,'upload')
        .then((res)=>{
            this.closeFullScreen(this.openFullScreen()); //关闭加载框
            if(res.code==1){
              this.imgURl = res.data.png
              this.downHd = res.data.hd
            }
        })
      },



      // 下载文件
      downImgClick(){
        window.open(this.downHd,'download');
      },
    }
  }
</script>


<style lang="less" scoped>

.contList{
  padding: 24px;
  background: #fff;
}

.photoBox{
  display: flex;
  justify-content: space-between;
  h3{
    color: #333;
    font-size: 24px;
    margin-bottom: 24px;
  }

  .photolf{
    width: 443px;
    

    .img{
      border: 1px dashed #ACC1FF;
      width: 100%;
      height: 462px;
      background: #F5F6FA;
      border-radius: 10px;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;

      .red{
        background: #FF2525;
      }
      .blue{
        background: #2559FF;
      }
      .white{
        background: #fff;
      }
      .avatar{
        display: block;
        width: 180px;
      }

      .unClass{
        height: 304px;
        border-radius: 10px;
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: center;
        width: 220px;
        i{
          color: #ACC1FF;
          font-size: 70px;
        }
        p{
          color: #ACC1FF;
          margin-top: 24px;
        }
      }
    }
  }

  .radioBox{
    width: 557px;
    height: 360px;
    background: #F5F6FA;
    margin-bottom: 21px;

    .title{
      display: flex;
      align-items: center;
      background: #e8e8e8;
      span{
        flex:0.5;
        text-align: center;
        border-right: 1px solid #D8D8D8;
        height: 50px;
        line-height: 50px;
      }
      span:nth-child(2){
        flex: 1;
      }
      span:last-child{
        border: none;
      }
    }

    ul{
      height: 310px;
      display: flex;
      flex-flow: column;
      justify-content: space-between;
      li{
        display: flex;
        align-items: center;
        flex: 1;

        p{
          flex: 0.5;
          text-align: center;
          border-right: 1px solid #D8D8D8;
          height: 100%;
          padding-top: 4%;
        }
        p:nth-child(1){
          color: #2C62FF;
        }
        p:nth-child(2){
          flex: 1;
        }
        p:last-child{
          border: none;
        }
      }
    }
  }

  .btns{
    height: 81px;
    background: #F5F6FA;
    border-radius: 8px;
  }
  .photolf{
    .btns{
      width: 335px;
      display: flex;
      align-items: center;
      justify-content: center;
      .span{
        width: 125px;
        height: 40px;
        border-radius: 10px;
        border: 1px solid #4E9F5B;
        display: inline-block;
        cursor: pointer;
        color: #4E9F5B;
        text-align: center;
        line-height: 40px;
      }
    }
  }

  .photorg{
    .btns{
      width: 557px;
      display: flex;
      align-items: center;
      justify-content: center;

      li{
        width: 34px;
        height: 34px;
        border-radius: 8px;
        border: 1px solid #BCCCFF;
        cursor: pointer;
        position: relative;

        p{
          width: 100%;
          height: 3px;
          border-radius: 50px;
          position: absolute;
          bottom: -24.5px;

          i{
            width: 0;
            height: 0;
            border-top: 6px solid transparent;
            border-right: 6px solid transparent;
            border-left: 6px solid transparent;
            position: absolute;
            left: 50%;
            bottom: 2px;
            -webkit-transform: translate(-50%, 0);
            transform: translate(-50%, 0);
          }
        }
      }
      li:nth-child(1){
         background: #FFFFFF;
         margin-right: 88px;
      }
      li:nth-child(2){
        background: #FF2525;
        margin-right: 88px;
      }
      li:nth-child(3){
        background: #2559FF;
      }

      .white{
        p{
          background: #E6E9F1;
          i{
            border-bottom: 6px solid #E6E9F1;
          }
        }
      }

      .red{
        p{
          background: #FF2525;
          i{
            border-bottom: 6px solid #FF2525;
          }
        }
      }

      .blue{
        p{
          background: #2559FF;
          i{
            border-bottom: 6px solid #2559FF;
          }
        }
      }
    }
  }
 
}

  .operationBtn{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 100px;

    .btns{
      width: 88px;
      height: 36px;
      background: #4E9F5B;
      border-radius: 4px;
      color: #fff;
      text-align: center;
      line-height: 36px;
      cursor: pointer;
      margin-right: 16px;
    }

    span{
      width: 88px;
      height: 36px;
      background: #4E9F5B;
      border-radius: 4px;
      color: #fff;
      text-align: center;
      line-height: 36px;
      cursor: pointer;
    }
  }

</style>
