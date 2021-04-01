<template>
  <div class="navHeader">
      <div class="center headerCenter">
            <div class="img cursor_p">
                <img :src="logo" alt="">
            </div>
            <!-- router -->
            <el-menu :default-active="activeIndex" active-text-color="#4E9F5B" class="el-menu-demo" mode="horizontal" @select="handleSelect"  theme="dark"  router>
                <el-menu-item index="/index">首页</el-menu-item>
                <el-menu-item index="/print">在线印刷</el-menu-item>
                <el-menu-item index="">设计模板</el-menu-item>
                <el-menu-item index="">定制服务</el-menu-item>
                <el-menu-item index="/service">服务保障</el-menu-item>
                <el-menu-item index="/news">新闻中心</el-menu-item>
                <el-menu-item index="/help">帮助支持</el-menu-item>
                <el-menu-item index="/about">关于我们</el-menu-item>
            </el-menu>
            <div class="hraderInfo">
                <div class="cart cursor_p"><img :src="cart" alt=""></div>
                <!-- <div class="head">
                  <img :src="head" alt="">
                  <p>在线证件照制作</p>
                </div> -->
                <p class="login cursor_p"  @click="dialogVisible = true">登录/注册</p>
            </div>
      </div>
      <!-- <section class="loginBox" >
        <img :src="loginBg" alt="" class="loginBg">

        <div class="colBox">
          <div class="col">
            <div class="inputBox">
              <div class="title">
                <h3>密码登录</h3>
                <p>注册</p>
              </div>
              <form>
                <div class="input">
                    <input type="number" v-model="smsCheckForm.name" placeholder="手机号">
                </div>
                
                <div class="input codeBox">
                  <input type="text"  v-model="smsCheckForm.code" placeholder="验证码">
                  <span class="cursor_p code">获取验证码</span>
                </div>
              </form>
              <div class="operate">
                <p class="cursor_p">手机验证码登录</p>
                <p class="cursor_p">忘记密码？</p>
              </div>
              <div class="btn">
                <button>登录</button>
              </div>
            </div>
          </div>
          <div class="link">
              登录即同意 
              <a href="#">用户协议</a>
              和
              <a href="#">隐私政策</a>
            </div>
        </div>

      </section> -->
  </div>
</template>

<script>
export default {
  name: 'navHeader',
  data () {
    return {
      logo: require('../assets/img/common/logo.png'),
      cart: require('../assets/img/common/cart.png'),
      head: require('../assets/img/common/head.png'),
      loginBg: require('../assets/img/common/loginBg.jpg'),
      activeIndex:'/index',
      dialogVisible: false,
      smsCheckForm:{
          "phone":"",
          "code":"",
      },
    }
  },
  created(){
    this.activeIndex = this.$store.state.currentIndex;
  },
  methods: {
    handleSelect(index) {
      this.activeIndex = index;
      this.$store.state.currentIndex = index;
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  },
}
</script>


<style lang="less" scoped >

    .navHeader{
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 111;
      background: #fff;
      
    }
    .headerCenter{
        display: flex;
        align-items: center;
        justify-content: space-between;

        .img{
            margin-right: 50px;
        }

        .el-menu-demo{
          margin-right: 50px;
        }


        .hraderInfo{
            display: flex;
            align-items: center;
           

            
            .head{
              position: relative;
               margin-left: 100px;
              img{
                width: 32px;
                height: 32px;
                border-radius: 50%;
              }
              p{
                position: absolute;
                font-size: 12px;
                background: #FFDE33;
                border-radius: 50px;
                color: #333;
                top: -10px;
                right: -80px;
                width: 96px;
                text-align: center;
                height: 26px;
                line-height: 26px;
              }
            }

          .login{
            margin-left: 100px;
          }
        }
    }

    .loginBox{
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      width: 750px;
      height: 530px;
      background: #FFFFFF;
      border-radius: 30px;
      overflow: hidden;
      display: flex;

      .loginBg{
        width: 328px;
        height: 100%;
      }

      .col{
        position: relative;
        .inputBox{
          padding: 40px 40px 0;
          flex: 1;
          .title{
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 40px;

            h3{
              font-size: 20px;
              color: #333;
            }

            p{
              color: #999999;
              font-size: 20px;
              cursor: pointer;
            }
          }
        }

        form{
          .input{
            display: flex;
            align-items: center;
            margin-bottom: 32px;

            input{
              flex: 1;
              padding-left: 16px;
              height: 44px;
              background: #fff;
              border-radius: 4px;
              border: 1px solid #E5E8F8;
            }

            .code{
              width: 140px;
              height: 44px;
              background: #4E9F5B;
              border-radius: 4px;
              text-align: center;
              line-height: 44px;
              color: #fff;
            }
          }

          .codeBox{
            input{
               margin-right: 8px;
            }
           
          }
        }

        .operate{
          display: flex;
          align-items: center;
          justify-content: space-between;

          p:first-child{
            color: #4E9F5B;
          }
          p:last-child{
            color: #999999;
          }
        }

        .btn{
          margin-top: 32px;
          width: 342px;
          height: 44px;
          background: #4E9F5B;
          border-radius: 4px;
          text-align: center;
          cursor: pointer;

          button{
            color: #fff;
            line-height: 44px;
          }
        }

        .link{

        }
      }

      .colBox{
        position: relative;
      }

      .link{
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        width: 422px;
        height: 44px;
        background: #F3F3F3;
        text-align: center;
        line-height: 44px;
        color: #999999;

        a{
          color: #6B6B6B;
          text-decoration: underline;
        }
      }
    }
</style>
