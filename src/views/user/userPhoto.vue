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
                    <i class="el-icon-plus"></i>
                  </div>
                  <div class="btnBox">
                    <h3>&nbsp</h3>
                    <div class="btn">
                      <span>上传文件</span>
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
                      <li>
                        <p>一寸</p>
                        <p>25×35mm   295×413px </p>
                        <p>432.26KB</p>
                        <p>
                          <el-radio v-model="radio"></el-radio>
                        </p>

                      </li>
                      <li>
                        <p>一寸</p>
                        <p>25×35mm   295×413px </p>
                        <p>432.26KB</p>
                        <p>
                          <el-radio v-model="radio"></el-radio>
                        </p>

                      </li>
                    </ul>
                  </div>
                  <div class="btnBox">
                    <h3>底色选择</h3>
                    <ul class="btn">
                      <li class="white"></li>
                      <li class="red"></li>
                      <li class="blue"></li>
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
         radio: 3
      }
    },
    methods: {
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

      i{
        color: #e2e2e2;
        font-size: 150px;
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
      li{
        display: flex;
        align-items: center;

        p{
          flex: 0.5;
          text-align: center;
          border-right: 1px solid #D8D8D8;
          height: 50px;
          line-height: 50px;
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

  .btn{
    height: 113px;
    background: #F5F6FA;
    border-radius: 10px;
  }
  .photolf{
    .btn{
      width: 335px;
      display: flex;
      align-items: center;
      justify-content: center;
      span{
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
    .btn{
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
