<template>
  <div class="main connonBg">
    <section class="center">
        <div class="crumbs">
            <span @click="pathIndex()">首页 / </span>
            <!-- <span @click="pathNews()">帮助支持 /</span> -->
            <span>个人资料</span>
        </div>
        <div class="publicCenter">
            <MenuLeft></MenuLeft> 
            <div class="contList">
                <section class="headBox">
                    <div class="head">
                        <div class="infoBox">
                            <img src="" alt="">
                            <div class="info">
                                <p>努力的阿发</p>
                                <p class="tel">
                                    <i class="el-icon-mobile-phone"></i>
                                    <span>18233211211</span>
                                </p>
                            </div>
                        </div>
                        <i class="el-icon-edit-outline"></i>
                    </div>
                    <div class="btn">
                        <span>充值</span>
                        <span>消费</span>
                    </div>
                </section>
                <section class="assets">
                    <h4>我的资产</h4>
                    <div class="assetsBg">
                        <div class="tit">
                            <img :src="moneyIcon" alt="">
                            <span>余额</span>
                        </div>
                        <p>
                            <span>￥</span>
                            <span>323.00</span>
                        </p>
                    </div>
                </section>
            </div>
        </div>
    </section>

    <!-- 修改资料弹框 -->
    <section class="modifyBox">
        <div class="tabNav">
            <el-tabs tab-position="left" type="border-card" style="height: 521px;">
                <el-tab-pane label="用户管理">个人资料</el-tab-pane>
                <el-tab-pane label="配置管理">头像</el-tab-pane>
                <el-tab-pane label="角色管理">手机号</el-tab-pane>
            </el-tabs>
        </div>
    </section>
  </div>
</template>

<script>
  import MenuLeft from '../../components/menuLeft'
  export default {
    name: 'user',
    components: {
      MenuLeft,
    },
    data () {
      return {
          moneyIcon: require('../../assets/img/user/moneyIcon.png'),
      }
    },
    methods: {
      gotoMore(){
        // this.$router.push("/news/details" + e.id+"/"+e.paperName);
        this.$router.push("/news/detail");
      },
       // 点击首页
      pathIndex(){
        this.$store.state.currentIndex = '/index';
        this.$store.state.indexHome = '/index';
        this.$router.push("/index");
      },
    }
  }
</script>


<style lang="less" scoped>
  .contList {
      background: #f6f6f6;
      .headBox{
        background: #fff;
        padding: 24px;
        .head{
            display: flex;
            align-items: center;
            justify-content: space-between;
        
            .infoBox{
                display: flex;
                align-items: center;
                p:first-child{
                font-size: 24px;
                color: #333;
                margin-bottom: 16px;
                }
                .tel{
                    span{
                        color: #333;
                    }
            }

                img{
                width: 88px;
                height: 88px;
                border-radius: 50%;
                border: 1px solid #4E9F5B;
                margin-right: 16px;
            }

        }
        .el-icon-edit-outline{
            font-size: 30px;
            color: #999;
            cursor: pointer;
        }
        }
        .btn{
            margin-top: 20px;

            span{
                cursor: pointer;
            }

            span:first-child{
                color: #FEB357;
                border-right: 1px solid #999;
                padding-right: 5px;
                margin-right: 5px;
            }
        }
      }

      .assets{
          h4{
              color: #666;
              font-size: 16px;
              margin: 28px 0 16px;
          }

          .assetsBg{
              background-image: url(../../assets/img/user/assetsBg.png);
              background-repeat: no-repeat;
              width: 303px;
              height: 169px;
              background-size: cover;
                padding: 30px;

              .tit{
                  display: flex;
                  align-items: center;
                  margin-bottom: 17px;

                  img{
                      width: 16px;
                      height: 16px;
                      margin-right: 5px;
                  }

                  span{
                      color: #fff;
                      font-size: 16px;
                  }
              }

              p{
                  span{
                      color: #fff;
                  }

                  span:first-child{
                      font-size: 16px;
                  }
                  span:last-child{
                      font-size: 28px;
                  }
              }
          }
      }
  }

  .modifyBox{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 570px;
    height: 521px;
    background: #FFFFFF;
    border-radius: 8px;
  }
</style>
