<template>
  <div class="main connonBg">
    <section class="center">
        <div class="crumbsHeader">
          <div class="crumbs">
              <router-link to="/"><span>首页 / </span></router-link>
              <span>证件照</span>
          </div>
        </div>

        <div class="publicCenter">
            <MenuLeft></MenuLeft> 
            <div class="contList">
              <section class="photoBox">
                <div class="photolf">
                  <h3>在线制作证件照</h3>
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
                      <div  v-else :class="bgColor">
                        <el-image 
                          :src="imgResult" 
                          class="avatar"
                          >
                        </el-image>
                      </div>
                  </div>
                </div>
                
                <div class="photorg">
                  <h3>尺寸选择</h3>
                  <div class="radioBox">
                    <div class="title">
                      <span>尺寸</span>
                      <span>长*宽</span>
                      <span>大小</span>
                      <span>选择</span>
                    </div>
                    <ul>
                      <li v-for="(item,index) in sizeList" :key="index">
                        <p>{{item.name}}</p>
                        <p>{{item.size}}mm&nbsp&nbsp&nbsp&nbsp{{item.widths}}</p>
                        <p>{{item.kb}}</p>
                        <p>
                          <el-radio v-model="radio" :label="item.id" @change="sizeChange(item.id,item.size)" class="radioPublic"><br></el-radio>
                        </p>
                      </li>
                    </ul>
                  </div>
                  <div class="btnBox">
                    <ul class="btns">
                      <template v-for="item in colorList">
                        <li :class="item.name" @click="colorClick(item.index,item.name)">
                          <p v-if="colorIndex==item.index">
                            <i></i>
                          </p>
                        </li>
                      </template>
          
                    </ul>
                  </div>
                </div>
              </section>

              <div class="operationBtn">
                <span @click="downText('pdf')">文件打印或下载</span>
                <span @click="downText('img')">下载png图片</span>
              </div>
            </div>
        </div>
    </section>
  </div>
</template>

<script>
  import MenuLeft from '../../components/menuLeft'
  export default {
    name: 'userPhoto',
    components: {
      MenuLeft,
    },
    data () {
      return {     
        img: require('../../assets/img/user/img.png'), 
        file: require('../../assets/img/user/file.png'), 
        imageUrl: '',
        sizeList:[
          {
            name:'一寸',
            size:'25x35',
            widths:'295×413px ',
            kb:'432.26KB',
            id:1
          },
          {
            name:'大一寸',
            size:'33x48',
            widths:'389×566px ',
            kb:'500.26KB',
            id:2
          }, 
          {
            name:'小二寸',
            size:'35x45',
            widths:'413×531px ',
            kb:'500.26KB',
            id:3
          },
          {
            name:'二寸',
            size:'35x49',
            widths:'413×579px ',
            kb:'500.26KB',
            id:4
          },
          {
            name:'大二寸',

            size:'35x53',
            widths:'413×626px ',
            kb:'600.26KB',
            id:5
          }
        ],
        radio:'',
        colorList:[
          {
            name:'white',
            index:1
          },
          {
            name:'red',
            index:2
          },
          {
            name:'blue',
            index:3
          }
        ],
        colorIndex:2,
        token:'',
        imgResult:'',
        imgList:[],
        bgColor:'red',
        size:''
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
              this.imgResult = res.data.png
              this.name = res.data.name
            }else{
                this.$message({
                    message:res.info,
                    type: 'warning'
                });
            }
        })
      },
      sizeChange(id,size){
        console.log(id)
        this.size = size
      },
      // 选择颜色
      colorClick(index,col){
        console.log(col)
        this.colorIndex = index
        this.bgColor =col
      },

      // 下载文件
      downText(type){
        let {size,imgResult} = this
        if(imgResult==''){
          this.$message({
              message:'您还没有上传图片哦!',
              type: 'warning'
          });
          return false
        }
        if(size==''){
          this.$message({
              message:'请选择尺寸',
              type: 'warning'
          });
          return false
        }

        this.CertPrint(type)
      },

      // 照片打印
      CertPrint(type){
        let {token,name,bgColor,size} = this
        this.openFullScreen(); //调用加载中
        this.$post("post",'Cert/download',{
          token,
          name,
          color:bgColor,
          size
        }).then((res)=>{
          this.closeFullScreen(this.openFullScreen()); //关闭加载框
          if(res.code==1){
            console.log(type);
            if(type=='pdf'){
              let page = window.open(res.data.pdf);
              setTimeout(()=>{
                page.print(); //这一步就是在新窗口调出打印机
              },500)
            }else{
              window.open(res.data.pic,'download');
            }
          }else{
            this.$message({
                message:res.info,
                type: 'warning'
            });
          }
        })

      }

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
    width: 335px;

    .img{
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
        width: 150px;
        height: 200px;
      }

      .unClass{
        height: 304px;
        border-radius: 10px;
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: center;
        border: 1px dashed #ACC1FF;
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

    span{
      width: 140px;
      height: 34px;
      background: #4E9F5B;
      border-radius: 4px;
      color: #fff;
      text-align: center;
      line-height: 34px;
      cursor: pointer;
    }

    span:first-child{
      margin-right: 50px;
    }
  }

</style>
