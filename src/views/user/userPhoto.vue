<template>
  <div class="main connonBg">
    <section class="center">
        <div class="crumbsHeader">
          <div class="crumbs">
              <span @click="pathIndex()">首页 / </span>
              <!-- <span @click="pathNews()">帮助支持 /</span> -->
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
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </div>
                  <div class="btnBox">
                    <h3>&nbsp</h3>
                      <el-upload
                        class="avatar-uploader btns"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <span class="span">上传文件</span>
                      </el-upload>
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
                        <p>{{item.widths}}</p>
                        <p>{{item.size}}</p>
                        <p>
                          <el-radio v-model="radio" :label="item.id" @change="sizeChange(item.id)" class="radioPublic"><br></el-radio>
                        </p>
                      </li>
                    </ul>
                  </div>
                  <div class="btnBox">
                    <h3>底色选择</h3>
                    <ul class="btns">
                      <template v-for="item in colorList">
                        <li :class="item.name" @click="colorClick(item.index)">
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
                <span>下载文件</span>
                <span>打印文件</span>
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
            widths:'25×35mm   295×413px ',
            size:'432.26KB',
            id:1
          },
          {
            name:'大一寸',
            widths:'33×48mm  389×566px ',
            size:'500.26KB',
            id:2
          }, 
          {
            name:'小二寸',
            widths:'35×45mm  413×531px ',
            size:'500.26KB',
            id:3
          },
          {
            name:'二寸',
            widths:'35×49mm  413×579px ',
            size:'500.26KB',
            id:4
          },
          {
            name:'大二寸',
            widths:'35×53mm  413×626px ',
            size:'600.26KB',
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
        colorIndex:-1,
      }
    },
    methods: {
       handleAvatarSuccess(res, file) {
        console.log(res)
        console.log(file)
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      sizeChange(id){
        console.log(id)
      },
      colorClick(index){
        this.colorIndex = index
      }
    }
  }
</script>


<style lang="less" scoped>

.contList{
  padding: 24px;
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
      height: 364px;
      background: #F5F6FA;
      border-radius: 10px;
      text-align: center;
      margin-bottom: 24px;
      display: flex;
      align-items: center;
      justify-content: center;

      img{
        width: 209px;
        height: 228px;
        border-radius: 10px;
      }

      i{
        color: #e2e2e2;
        font-size: 98px;
        line-height: 354px;
      }
    }
  }

  .radioBox{
    width: 557px;
    height: 364px;
    background: #F5F6FA;
    margin-bottom: 24px;

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
      height: 314px;
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
    height: 113px;
    background: #F5F6FA;
    border-radius: 10px;
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
        width: 58px;
        height: 58px;
        border-radius: 16px;
        border: 1px solid #BCCCFF;
        cursor: pointer;
        position: relative;

        p{
          width: 100%;
          height: 5px;
          border-radius: 50px;
          position: absolute;
          bottom: -27.5px;

          i{
            width: 0;
            height: 0;
            border-top: 6px solid transparent;
            border-right: 6px solid transparent;
            border-left: 6px solid transparent;
            position: absolute;
            left: 50%;
            bottom: 5px;
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
    margin-top: 180px;

    span{
      width: 87px;
      height: 34px;
      background: #4E9F5B;
      border-radius: 4px;
      color: #fff;
      text-align: center;
      line-height: 34px;
      cursor: pointer;
    }
    span:first-child{
      margin-right: 88px;
    }
  }

</style>
