<template>
  <div class="main connonBg">
    <section class="center">
        <div class="crumbsHeader">
            <div class="crumbs">
                <span @click="pathIndex()">首页 / </span>
                <!-- <span @click="pathNews()">帮助支持 /</span> -->
                <span>个人资料</span>
            </div>
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
                        <i class="el-icon-edit-outline" @click="userPublic = true"></i>
                    </div>
                    <div class="btns">
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
    <section class="modifyBox publicPorp"  v-show="userPublic" >
        <i class="el-icon-close"></i>
        <div class="tabNav">
            <el-tabs tab-position="left" type="border-card" style="height: 100%;">
                <el-tab-pane label="个人资料">
                    <div class="editInput">
                        <h4>编辑用户名称</h4>
                        <div class="input">
                            <input type="text" placeholder="请输入用户名称">
                        </div>
                    </div>
                    <div class="btns">
                        <span  @click="userClose">取消</span>
                        <span>确定</span>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="头像">
                    <div class="upHead">
                        <div class="img">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </div>
                        <!-- :on-change="handleChange" -->
                        <!-- :file-list="fileList" -->
                        <el-upload
                            class="upload-demo "
                            :show-file-list="false"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            
                            >
                            <el-button size="small" type="primary">上传头像</el-button>
                        </el-upload>
                    </div>
                    <div class="btns">
                        <span>取消</span>
                        <span>确定</span>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="手机号">
                    <div class="editInput">
                        <h4>修改手机号</h4>
                        <div class="input">
                            <input type="text" placeholder="请输入原手机号">
                        </div>
                        <div class="input">
                            <input type="text" placeholder="请输入新手机号">
                        </div>
                        <div class="input">
                            <input type="text" placeholder="请输入验证码">
                            <span>短信验证码</span>
                        </div>
                    </div>
                    <div class="btns">
                        <span>取消</span>
                        <span>确定</span>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </section>
    <div class="mask" v-show="userPublic" @click="userClose"></div>
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
        dialogImageUrl: '',
        dialogVisible: false,
        userPublic: false,
      }
    },
    methods: {
        gotoMore(){
            this.$router.push("/news/detail");
        },
        // 点击首页
        pathIndex(){
            this.$store.state.currentIndex = '/index';
            this.$store.state.indexHome = '/index';
            this.$router.push("/index");
        },

        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            // this.dialogVisible = true;
        },
        userClose(){
            this.userPublic=false
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
        .btns{
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
    width: 30%;
    // height: 521px;
    height: 50%;
    background: #FFFFFF;
    overflow: hidden;
    min-height: 400px;
    min-width: 450px;

    .tabNav{
        height: 100%;
    }

    .el-icon-close{
        width: 82%;
        height: 40px;
        background: #F9F7F7;
        text-align: right;
        line-height: 40px;
        font-size: 24px;
        position: absolute;
        top: 0;
        right: 0;
        padding-right: 24px;
    }

    .editInput{
        h4{
            color: #333;
            margin-bottom: 8px;
        }

        .input{
            display: flex;
            align-items: center;
            margin-bottom: 16px;

            input{
                flex: 1;
                height: 34px;
                background: #FFFFFF;
                border-radius: 4px;
                border: 1px solid #979797;
                text-indent: 8px;
               
            }
            span{
                width: 88px;
                height: 34px;
                background: #4E9F5B;
                border-radius:4px;
                color: #fff;
                margin-left: 5px;
                line-height: 34px;
                text-align: center;
                cursor: pointer;
            }
        }
    }

    .btns{
        position: absolute;
        bottom: 15px;
        left: 0;
        right: 0;
        text-align: center;

        span{
            width: 84px;
            height: 34px;
            background: #4E9F5B;
            border-radius: 4px;
            color: #fff;
            cursor: pointer;
            display: inline-block;
            line-height: 34px;
        }
        span:first-child{
            background: #DBDBDB;
            margin-right: 48px;
        }

         span:last-child{
            background: #4E9F5B;
        }
    }

    .upHead{
        .img{
            width: 100%;
            height: 188px;
            background: #F5F6FA;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            img{
                width: 130px;
                height: 130px;
                border: 1px solid #fff;
                border-radius: 50%;
            }
        }
    }
  }
</style>
