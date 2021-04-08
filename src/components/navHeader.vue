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
                <el-menu-item index="/unique">定制服务</el-menu-item>
                <el-menu-item index="/service">服务保障</el-menu-item>
                <el-menu-item index="/news">新闻中心</el-menu-item>
                <el-menu-item index="/help">帮助支持</el-menu-item>
                <el-menu-item index="/about">关于我们</el-menu-item>
            </el-menu>
            <div class="hraderInfo">
                <div class="cart cursor_p"><img :src="cart" alt=""></div>
                <div class="head cursor_p" @click="userLnk">
                  <img :src="head" alt="">
                  <p>在线证件照制作</p>
                </div>
                <!-- <p class="login cursor_p"  @click="dialogTableVisible = true">登录/注册</p> -->
            </div>
      </div>
      <!-- 登陆 -->
      <section class="loginBoxPorp" v-show="dialogTableVisible" >
        <div class="loginBox">
          <img :src="loginBg" alt="" class="loginBg">
          <div class="colBox">
            <!-- 登录 -->
            <div class="col" v-if="loginType == 1">
              <div class="inputBox">
                <div class="title">
                  <h3 v-if="modeNum == 1">密码登录</h3>
                  <h3 v-else>手机验证码登录</h3>
                  <p @click="loginTypeClick(2)">注册</p>
                </div>
                <form>
                  <div class="input">
                      <input type="number" v-model="smsCheckForm.name" placeholder="手机号">
                  </div>

                  <div class="input" v-if="modeNum == 1">
                      <input type="password" v-model="smsCheckForm.password" placeholder="输入密码">
                  </div>
                  
                  <div class="input codeBox"  v-else>
                    <input type="text" v-model="smsCheckForm.code" placeholder="验证码">
                    <span class="cursor_p code">获取验证码</span>
                  </div>
                </form>
                <div class="operate">
                  
                  <p class="cursor_p" @click="loginMode(0)" v-if="modeNum == 1">手机验证码登录</p>
                  <p class="cursor_p" @click="loginMode(1)" v-else>密码登录</p>

                  <p class="cursor_p" @click="loginTypeClick(3)">忘记密码？</p>
                </div>
                <div class="btns">
                  <button>登录</button>
                </div>
              </div>
            </div>
            <!-- 注册 -->
            <div class="col registerCol" v-if="loginType == 2">
              <div class="inputBox">
                <div class="title">
                  <h3>账号注册</h3>
                  <p @click="loginTypeClick(1)">返回登陆</p>
                </div>
                <form>
                  <div class="input">
                      <input type="number" v-model="smsCheckForm.name" placeholder="手机号">
                  </div>

                  <div class="input codeBox">
                    <input type="text" v-model="smsCheckForm.code" placeholder="验证码">
                    <span class="cursor_p code" @click="smsSend">获取验证码</span>
                  </div>

                  <div class="input">
                      <input type="password" v-model="smsCheckForm.password" placeholder="输入6-18位密码">
                  </div>

                  <div class="input">
                      <input type="password" v-model="smsCheckForm.password" placeholder="确认密码">
                  </div>
                </form>
                <div class="btns">
                  <button>登录</button>
                </div>
              </div>
            </div>

            <!-- 忘记密码 -->
            <div class="col registerCol resetCol" v-if="loginType == 3">
              <div class="inputBox">
                <div class="title">
                  <h3>重置密码</h3>
                  <p @click="loginTypeClick(1)">返回登陆</p>
                </div>
                <form v-if="resetClick == 0">
                  <div class="input">
                      <input type="number" v-model="smsCheckForm.name" placeholder="手机号">
                  </div>                  
                  <div class="input codeBox">
                    <input type="text" v-model="smsCheckForm.code" placeholder="验证码">
                    <span class="cursor_p code">获取验证码</span>
                  </div>
                </form>
                <form v-else>
                  <div class="input">
                      <input type="number" v-model="smsCheckForm.name" placeholder="输入6-18位密码">
                  </div>                  
                  <div class="input codeBox">
                    <input type="text" v-model="smsCheckForm.code" placeholder="确定密码">
                  </div>
                </form>

                <div class="btns" @click="btnReset(1)" v-if="resetClick == 0">
                  <button>下一步</button>
                </div>
                <div class="btns" @click="btnResetrue" v-else>
                  <button>确定</button>
                </div>
              </div>
            </div>

            <!-- 重置成功 -->
            <div class="col registerCol successCol" v-if="loginType == 4">
              <div class="inputBox">
                <div class="title">
                  <p @click="loginTypeClick(1)">返回登陆</p>
                </div>
              </div>
              <div class="tips" >
                <img :src="loginSuccess" alt="">
                <p>密码重置成功</p>
                <span>5秒后自动登录</span>
              </div>              
            </div>
            <div class="link">
                登录即同意 
                <a href="#">用户协议</a>
                和
                <a href="#">隐私政策</a>
              </div>
          </div>
        </div>
        <div class="img" @click="LognClose">
          <img :src="loginClose" alt="">
        </div>
      </section>
      <div class="mask" v-show="dialogTableVisible" @click="LognClose"></div>
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
      loginClose: require('../assets/img/common/loginClose.png'),
      loginSuccess: require('../assets/img/common/loginSuccess.png'),
      activeIndex:'/index',
      dialogTableVisible: false,
      modeNum:1,
      loginType:1, //1登陆，2注册，3重置，4成功提示
      resetClick:0, //0下一步， 1提交
      smsCheckForm:{
          "phone":"",
          "code":"",
          "password":"",
      },
    }
  },
  created(){
    this.activeIndex = this.$store.state.currentIndex;
    this.$post("post",this.baseUrl+"user/reg",
      {
        phone:17752560527,
        password:123456,
      }
    ).then(res => {
      console.log(res+'111')
    });





  },
  methods: {
    handleSelect(index) {
      this.activeIndex = index;
      this.$store.state.currentIndex = index; //导航高亮
      this.$store.state.publicHome = index; //记录跳转路径
    },
    LognClose(){
      this.dialogTableVisible=false
    },
    loginMode(val){
      this.modeNum = val
    },
    loginTypeClick(val){
      this.loginType = val
    },
    btnReset(val){
      console.log(val)
      this.resetClick = val
    },
    btnResetrue(){
      this.loginType = 4
    },
    userLnk(){ //点击个人中心
      this.activeIndex = '';
      this.$store.state.currentIndex = '';
      this.$store.state.publicHome = '/user'
      this.$router.push("/user");
    },
    // 获取短信验证码
    smsSend(){
      this.$post("post",this.baseUrl+"sms/send",{
        phone:17752560527,
        template:123456,
      }).then(res => {
        console.log(res+'111')
      });
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

    .loginBoxPorp{
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      width: 750px;
      height: 530px;
      z-index: 113;

      .img{
        position: absolute;
        width: 50px;
        height: 50px;
        right: -50px;
        top: -25px;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
    .loginBox{
      display: flex;
      background: #FFFFFF;
      border-radius: 30px;
      overflow: hidden;


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

        .btns{
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

      .registerCol{
        .inputBox{
           .title{
             p{
              color: #4E9F5B;
             }
           }
        }

      }

      .resetCol{
        .btns{
          margin-top: 170px;
        }
      }

      .colBox{
        position: relative;
        width: 422px;
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

      .successCol{
        text-align: center;
        .inputBox{
          .title{
            justify-content: flex-end;
          }
        }
        .tips{
          margin-top: 120px;
            img{
              width: 72px;
              height: 72px;
            }

            p{
              color: #333;
              font-weight: 600;
              margin: 8px 0;
            }
            
            span{
              color: #999;
            }
        }
      }

    }
</style>
