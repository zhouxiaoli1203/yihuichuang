<template>
  <div class="navHeader">
      <div class="center headerCenter">
            <div class="img cursor_p">
                <img :src="logo" alt="">
            </div>
            <el-menu :default-active="activeIndex" active-text-color="#4E9F5B" class="el-menu-demo" mode="horizontal" @select="handleSelect"  theme="dark"  router>
                <el-menu-item index="/index">首页</el-menu-item>
                <el-menu-item index="/print">在线印刷</el-menu-item>
                <el-menu-item index="/design">设计模板</el-menu-item>
                <el-menu-item index="/unique">定制服务</el-menu-item>
                <el-menu-item index="/service">服务保障</el-menu-item>
                <el-menu-item index="/news">新闻中心</el-menu-item>
                <el-menu-item index="/help">帮助支持</el-menu-item>
                <el-menu-item index="/about">关于我们</el-menu-item>
            </el-menu>
            <div class="hraderInfo">
                <div class="cart cursor_p" @click="goCart"><img :src="cart" alt=""></div>
                <div class="head cursor_p" @click="userLnk" v-if="token!=''">
                  <div class="imgp">
                    <img :src="face" alt="">
                     <p>在线证件照制作</p>
                  </div>
                  <span>名字</span>
                </div>
                <p class="login cursor_p"  @click="dialogTableVisible = true" v-else>登录/注册</p>
            </div>
      </div>

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
                <el-form :model="userLoginForm" :rules="userLoginRules" ref="userLoginForm" class="form">
                  <el-form-item  prop="phone" class="input" key="dlPhone">
                    <el-input v-model="userLoginForm.phone" placeholder="手机号"></el-input>
                  </el-form-item>

                  <el-form-item  prop="password" class="input"  v-if="modeNum == 1" key="dlpassword">
                    <el-input v-model="userLoginForm.password" placeholder="输入密码" type="password"></el-input>
                  </el-form-item>

                  <el-form-item  prop="code" class="input codeBox" v-else  key="dlCode">
                    <el-row type="flex" class=""justify="space-between">
                      <el-col :span="13">
                        <el-input v-model="userLoginForm.code" placeholder="验证码"></el-input>
                      </el-col>
                      <el-col :span="10">
                        <span class="cursor_p code"  @click="sendMsg(userLoginForm.phone,'dl')" v-if="timeSend==60">获取验证码</span>
                        <span class="cursor_p code" v-else>倒计时：{{timeSend}}</span>
                      </el-col>
                    </el-row>
                  </el-form-item>
                  
                  <div class="operate">
                    <p class="cursor_p" @click="loginMode(0)" v-if="modeNum == 1">手机验证码登录</p>
                    <p class="cursor_p" @click="loginMode(1)" v-else>密码登录</p>
                    <p class="cursor_p" @click="loginTypeClick(3)">忘记密码？</p>
                  </div>
                  <div class="btns">
                    <button type="primary" @click="userLoginsub('userLoginForm')">登录</button>
                  </div> 
                </el-form>
              </div>
            </div>
            <!-- 注册 -->
            <div class="col registerCol" v-if="loginType == 2">
              <div class="inputBox">
                <div class="title">
                  <h3>账号注册</h3>
                  <p @click="loginTypeClick(1)">返回登陆</p>
                </div>
                <el-form :model="userRegForm" :rules="userRegRules" ref="userRegForm" class="form">
                   <el-form-item  prop="phone" class="input"  key="zcPhone">
                      <el-input v-model="userRegForm.phone" placeholder="手机号"></el-input>
                    </el-form-item>
                    <el-form-item  prop="code" class="input codeBox" key="zcCode">
                      <el-row type="flex" class=""justify="space-between">
                        <el-col :span="13">
                          <el-input v-model="userRegForm.code" placeholder="验证码"></el-input>
                        </el-col>
                        <el-col :span="10">
                          <span class="cursor_p code"  @click="sendMsg(userRegForm.phone,'zc')" v-if="timeSend==60">获取验证码</span>
                          <span class="cursor_p code" v-else>倒计时：{{timeSend}}</span>
                        </el-col>
                      </el-row>
                    </el-form-item>

                    <el-form-item  prop="password" class="input" key="zcPassword">
                      <el-input v-model="userRegForm.password" placeholder="输入6-18位密码" type="password"></el-input>
                    </el-form-item>
                    <el-form-item  prop="passwordTwo" class="input" key="zcPasswordTwo">
                      <el-input v-model="userRegForm.passwordTwo" placeholder="确认密码" type="password"></el-input>
                    </el-form-item>

                    <div class="btns">
                      <button type="primary" @click="userRegsub('userRegForm')">注册并登录</button>
                    </div>
                </el-form>
              </div>
            </div>
            <!-- 忘记密码 -->
            <div class="col registerCol resetCol" v-if="loginType == 3">
              <div class="inputBox">
                <div class="title">
                  <h3>重置密码</h3>
                  <p @click="loginTypeClick(1)">返回登陆</p>
                </div>

                <el-form :model="userWjForm" :rules="userWjRules" ref="userWjForm" class="form" v-if="resetClick == 0">
                  <el-form-item  prop="phone" class="input" key="wjPhone">
                    <el-input v-model="userWjForm.phone" placeholder="手机号"></el-input>
                  </el-form-item>
                  <el-form-item  prop="code" class="input codeBox" key="wjCode">
                    <el-row type="flex" class=""justify="space-between">
                      <el-col :span="13">
                        <el-input v-model="userWjForm.code" placeholder="验证码"></el-input>
                      </el-col>
                      <el-col :span="10">
                        <span class="cursor_p code"  @click="sendMsg(userLoginForm.phone,'wj')" v-if="timeSend==60">获取验证码</span>
                        <span class="cursor_p code" v-else>倒计时：{{timeSend}}</span>
                      </el-col>
                    </el-row>
                  </el-form-item>

                  <div class="btns" v-if="resetClick == 0">
                    <button type="primary" @click="userwjsub1('userWjForm',1)">下一步</button>
                  </div>
                </el-form>

                <el-form :model="userWjForm" :rules="userWjRules" ref="userWjForm" class="form" v-else>
                  <el-form-item  prop="password" class="input" key="wjPassword">
                    <el-input v-model="userWjForm.password" placeholder="输入6-18位密码" type="password"></el-input>
                  </el-form-item>
                  <el-form-item  prop="passwordTwo" class="input" key="wjPasswordTwo">
                    <el-input v-model="userWjForm.passwordTwo" placeholder="确认密码" type="password"></el-input>
                  </el-form-item>

                  <div class="btns">
                    <button type="primary" @click="userwjsub2('userWjForm')">确定</button>
                  </div>
                </el-form>
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
                <span v-if="timeShow==0">{{times}}秒后自动登录</span>
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
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.userRegForm.passwordTwo !== '') {
          this.$refs.userRegForm.validateField('passwordTwo');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.userRegForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };

    var wjPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.userWjForm.passwordTwo !== '') {
          this.$refs.userWjForm.validateField('passwordTwo');
        }
        callback();
      }
    };
    var wjPass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.userWjForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };


    return {
      logo: require('../assets/img/common/logo.png'),
      cart: require('../assets/img/common/cart.png'),
      face: require('../assets/img/common/head.png'),
      // face: '', //头像
      loginBg: require('../assets/img/common/loginBg.jpg'),
      loginClose: require('../assets/img/common/loginClose.png'),
      loginSuccess: require('../assets/img/common/loginSuccess.png'),
      activeIndex:'/index',
      dialogTableVisible: false,
      modeNum:1, //密码登录，0手机验证码登录
      loginType:1, //1登陆，2注册，3重置，4成功提示
      resetClick:0, //0下一步， 1提交
      formArr: [ // form表单的ref
        'userRegForm',
        'userLoginForm',
        'userWjForm'
      ],
      resultArr: [], // 用来接受返回结果的数组
      // 注册
      userRegForm: {
        phone: '',
        code: '',
        password: '',
        passwordTwo: '',
      },
      userRegRules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^((1[3,5,8][0-9])|(14[5,7])|(17[0,5,6,7,8])|(19[7]))\d{8}$/, message: '请检查手机号是否正确', trigger: 'blur' },
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
        ],
        password: [
          { validator: validatePass, trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ],
        passwordTwo: [
          { validator: validatePass2, trigger: 'blur' }
        ],
      },

      // 登录
      userLoginForm: {
        phone: '',
        password: '',
        code: '',
      },
      userLoginRules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^((1[3,5,8][0-9])|(14[5,7])|(17[0,5,6,7,8])|(19[7]))\d{8}$/, message: '请检查手机号是否正确', trigger: 'blur' },
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ],
      },

      // 忘记密码
      userWjForm:{
        phone: '',
        password: '',
        passwordTwo: '',
        code: '',
      },
      userWjRules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^((1[3,5,8][0-9])|(14[5,7])|(17[0,5,6,7,8])|(19[7]))\d{8}$/, message: '请检查手机号是否正确', trigger: 'blur' },
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
        ],
        password: [
          { validator: wjPass, trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ],
        passwordTwo: [
          { validator: wjPass2, trigger: 'blur' }
        ],
      },
      sms_token:'',
      times: 5,
      token:'',
      timeSend:'60', //验证码倒计时
      timeShow:1, //0显示倒计时，1不显示倒计时
    }
  },
  created(){
    this.activeIndex = this.$store.state.currentIndex;
    this.token = this.$store.state.token;
    console.log(this.token);
  },
  mounted () {
    // let href = window.location.href
    // this.activeIndex = href.split('/#')[1]
    // console.log(href.split('/#')[1])
    // this.$store.state.currentIndex = href.split('/#')[1]
  },
  methods: {
    // 获取验证码倒计时
    timeSendNumber() {
      this.timer = setInterval(()=>{
        this.timeSend--
        if(this.timeSend===0){
          this.timeSend=60
          clearInterval(this.timer)
        }
        console.log(this.timeSend)
      },1000)
    },

    // 获取个人信息
    userInfoGet(token) {
      this.$post("post",this.baseUrl+'user/infoGet',{
        token,
      })
      .then((res)=>{
        let data = res.data
        if(data.code==1){
          this.face = data.data.face
        }else{
          this.$message({
            message:data.info,
            type: 'warning'
          });
        }
      })
    },


    // 获取验证码
    sendMsg(phoneNum,type) {
      this.sms_token = ''
      let typeForm
      let template
      if(type=='dl'){
        typeForm = 'userLoginForm'
        template = 'dlqr'
      }

      if(type=='zc'){
        typeForm = 'userRegForm'
        template = 'zcyh'
      }

      if(type=='wj'){
        typeForm = 'userWjForm'
        template = 'czmm'
      }
      this.$refs[typeForm].validateField('phone', (phoneError) => {
        if(!phoneError){
          this.$post("post",this.baseUrl+"sms/send",{
          phone:phoneNum,
          template,
          })
          .then((res)=>{
            console.log(res);
            let data = res.data
            if(data.code==1){
              this.timeSendNumber()
              this.sms_token = data.data.sms_token
            }else{
              this.$message({
                message:data.info,
                type: 'warning'
              });
            }
          })
        }
      })
    },

    // 登录
    userLoginsub(userLoginForm){
      this.$refs[userLoginForm].validate((valid) => {
        if (valid) {
          let type = this.modeNum
          let data
          if(type==1){
            data = {
              phone:this.userLoginForm.phone,
              password:this.userLoginForm.password
            }
          }else{
            data = {
              phone:this.userLoginForm.phone,
              sms_token:this.sms_token
            }
          }
          this.$post("post",this.baseUrl+"user/login",data)
          .then((res)=>{
            let data = res.data
            if(data.code==1){
              // 存储token
              this.$store.state.token = data.data.token
              this.loginType = -1
              this.dialogTableVisible=false
              this.userInfoGet(data.data.token) //登录成功获取个人信息
            }else{
              this.$message({
                message:data.info,
                type: 'warning'
              });
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    // 忘记密码下一步
    userwjsub1(userWjForm,val){
      this.$refs[userWjForm].validate((valid) => {
        if (valid) {
          this.resetClick = val
        } else {
          console.log('error submit!!');
          return false;
        }
      });


    },

    // 重置成功
    userwjsub2(userWjForm){
      this.$refs[userWjForm].validate((valid) => {
        if (valid) {
          this.loginType = 4
          this.timeShow = 1 //不显示倒计时
          this.resetClick = 0
          this.$post("post",this.baseUrl+"user/passReset",{
            phone:this.userWjForm.phone,
            sms_token:this.sms_token
          })
          .then((res)=>{
            let data = res.data
            if(data.code==1){
              this.loginType = 4
              this.timeShow = 1 //不显示倒计时
            }else{
              this.$message({
                message:data.info,
                type: 'warning'
              });
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });


    },


    // 注册
    userRegsub(userRegForm){
      this.$refs[userRegForm].validate((valid) => {
        if (valid) {
          let sms_token = this.sms_token
          let password = this.userRegForm.password
          this.$post("post",this.baseUrl+"user/reg",{
            sms_token,
            password
          })
          .then((res)=>{
            let data = res.data
            if(data.code==1){
              // 存储token
              this.$store.state.token = data.data.token
              // 自动登录
              this.loginType = 4
              this.timeShow = 0 //显示倒计时
              this.getCode()
            }else{
              this.$message({
                message:data.info,
                type: 'warning'
              });
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    // 自动登录倒计时
    getCode() {
      this.timer = setInterval(()=>{
        this.times--
        if(this.times===0){
          clearInterval(this.timer)
          this.loginType = -1
          this.dialogTableVisible=false
          this.userInfoGet(this.$store.state.token) //倒计时结束后获取个人信息
        }
      },1000)
    },

    handleSelect(index) {
      this.activeIndex = index;
      this.$store.state.currentIndex = index; //导航高亮
      this.$store.state.publicHome = index; //记录跳转路径
      this.$store.state.menuLeft = ''
    },
    // 关闭登录注册弹框
    LognClose(){
      this.dialogTableVisible=false
      this.loginType = 1
      this.resetClick = 0
      this.clearAllForm()
    },

    // 密码登录/手机号登录
    loginMode(val){
      this.modeNum = val
    },

    // 切换登录/注册/忘记密码
    loginTypeClick(val){
      this.loginType = val
      this.resetClick = 0
      this.clearAllForm()
    },

    userLnk(){ //点击个人中心
      this.activeIndex = '';
      this.$store.state.currentIndex = '';
      this.$store.state.publicHome = '/user'
      this.$router.push("/user");
      this.$store.state.menuLeft = ''
    },

    // 清空form表单内容
    clearAllForm() { 
      let that = this
      that.formArr.forEach(item => {
        clearForm(item)
      })
      function clearForm (formName) {
        let result = new Promise(function (resolve, reject) {
          if (that.$refs[formName] !== undefined) {
            that.$refs[formName].resetFields();
          }
        })
        that.resultArr.push(result) 

      }
    },
    getPath () {  //解决浏览器后退导航高亮问题
      let href = this.$route.path
      let hrefUrl =  href.split('/')[1]
      console.log(111+'导航')
      this.activeIndex = '/'+ hrefUrl
      this.$store.state.currentIndex = '/'+ hrefUrl
      this.$store.state.publicHome = '/'+ hrefUrl
    },
    //购物车列表跳转
    goCart:function(){
        this.$router.push("/cart");
    }
  },
  computed: {
    aState: function () {
      return this.$store.state.token
    },
    activeState: function () {
      return this.$store.state.currentIndex
    },
    // publicHome: function () {
    //     return this.$store.state.publicHome //监听左侧导航
    // }
  },
  watch: {
    'aState': function (newVal) { //监听token
      this.token = newVal
    },
    'activeState': function (newVal) { //监听导航
      this.activeIndex = newVal
    },
    // 'publicHome': function (newVal) { //监听左侧导航
    //     console.log(newVal)
    // },
    '$route': 'getPath'  //监听浏览器后退导航高亮问题
  }
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
            
              margin-left: 100px;
              display: flex;
              align-items: center;
              .imgp{
                position: relative;
              }
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
                top: -14px;
                right: -80px;
                width: 96px;
                text-align: center;
                height: 26px;
                line-height: 26px;
              }

              span{
                display: inline-block;
                color: #666;
                font-size: 12px;
                margin-left: 5px;
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

        .form{
          .input{
            // display: flex;
            // align-items: center;
            margin-bottom: 32px;

            // input{
            //   flex: 1;
            //   padding-left: 16px;
            //   height: 44px;
            //   background: #fff;
            //   border-radius: 4px;
            //   border: 1px solid #E5E8F8;
            // }

            .code{
              width: 100%;
              height: 44px;
              background: #4E9F5B;
              border-radius: 4px;
              text-align: center;
              line-height: 44px;
              color: #fff;
              display: inline-block;
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
            width: 100%;
          }
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
