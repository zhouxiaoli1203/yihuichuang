<template>
  <div class="main connonBg">
    <section class="center">
        <div class="crumbsHeader">
            <div class="crumbs">
                <span @click="pathIndex()">首页 / </span>
                <span>个人资料</span>
            </div>
        </div>
        <div class="publicCenter">
            <MenuLeft></MenuLeft> 
            <div class="contList">
                <section class="headBox">
                    <div class="head">
                        <div class="infoBox">
                            <img :src="face" alt="">
                            <div class="info">
                                <p>{{nickname?nickname:'努力的阿发111'}}</p>
                                <p class="tel">
                                    <i class="el-icon-mobile-phone"></i>
                                    <span>{{phone?phone:'xxxxxxxxxx'}}</span>
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
                            <span v-if="info!='' && info.balance!=0">￥</span>
                            <span>{{info?info.balance:'0'}}</span>
                        </p>
                    </div>
                </section>
            </div>
        </div>
    </section>

    <!-- 修改资料弹框 -->
    <section class="modifyBox publicPorp"  v-show="userPublic" >
        <i class="el-icon-close" @click="userClose"></i>
        <div class="tabNav">
            <el-tabs tab-position="left" type="border-card" style="height: 100%;">
                <el-tab-pane label="个人资料">
                    <div class="editInput">
                        <h4>编辑用户名称</h4>
                    </div> 
    
                    <el-form :model="nicknameForm" ref="nicknameForm" class="demo-ruleForm">
                        <el-form-item
                            prop="nickname"
                            :rules="[
                                { required: true, message: '用户名称不能为空'},
                            ]"
                        >
                         <el-input type="text" v-model="nicknameForm.nickname" autocomplete="off" placeholder="请输入用户名称"></el-input>
                        </el-form-item>
                        <el-form-item class="btns">
                            <button  @click="userClose" class="spanBtn">取消</button>
                            <button  class="spanBtn" type="primary" @click="nicknameSubmit('nicknameForm')">确定</button>                           
                        </el-form-item>
                    </el-form>



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
                        <span @click="userClose">取消</span>
                        <span>确定</span>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="手机号">
                    <div class="editInput">
                        <h4>修改手机号</h4>
                    </div>

                    <el-form :model="phoneModifyForm" :rules="phoneModifyRules" ref="phoneModifyForm" class="editInput">
                        <el-form-item  prop="oldPhone" key="oldPhone">
                            <el-input v-model="phoneModifyForm.oldPhone" placeholder="请输入原手机号"></el-input>
                        </el-form-item>
                        <el-form-item  prop="newPhone" key="newPhone">
                            <el-input v-model="phoneModifyForm.newPhone" placeholder="请输入新手机号"></el-input>
                        </el-form-item>
                        <el-form-item  prop="code" class="input codeBox" key="wjCode">
                            <el-row type="flex" class=""justify="space-between">
                            <el-col :span="14">
                                <el-input v-model="phoneModifyForm.code" placeholder="请输入验证码"></el-input>
                            </el-col>
                            <el-col :span="10">
                                <!-- sendMsg('phoneModifyForm') -->
                                <span class="cursor_p code"  @click="sendMsg('phoneModifyForm')" v-if="timeSend==60">获取验证码</span>
                                <span class="cursor_p code" v-else>倒计时：{{timeSend}}</span>
                            </el-col>
                            </el-row>
                        </el-form-item>

                         <el-form-item class="btns">
                            <button  @click="userClose" class="spanBtn">取消</button>
                            <button  class="spanBtn" type="primary" @click="phoneModifySubmit('phoneModifyForm')">确定</button>                           
                        </el-form-item>
                    </el-form>
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
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入原手机号'));
            } else {
                if (this.phoneModifyForm.newPhone !== '') {
                this.$refs.phoneModifyForm.validateField('newPhone');
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入新手机号'));
            } else if (value == this.phoneModifyForm.oldPhone) {
                callback(new Error('两次输入的手机号一致!'));
            } else {
                callback();
            }
        };
            
      return {
        moneyIcon: require('../../assets/img/user/moneyIcon.png'),
        dialogImageUrl: '',
        dialogVisible: false,
        userPublic: false,
        info:'',
        nickname:'',
        phone:'',
        face:'',
        nicknameForm: {
          nickname: ''
        },
        phoneModifyForm:{
            oldPhone:'',
            newPhone:'',
            code:'',
        },
        phoneModifyRules: {
            oldPhone: [
                { validator: validatePass, trigger: 'blur' },
                { pattern: /^((1[3,5,8][0-9])|(14[5,7])|(17[0,5,6,7,8])|(19[7]))\d{8}$/, message: '请检查手机号是否正确', trigger: 'blur' },
            ],
            newPhone: [
                { validator: validatePass2, trigger: 'blur' },
                { pattern: /^((1[3,5,8][0-9])|(14[5,7])|(17[0,5,6,7,8])|(19[7]))\d{8}$/, message: '请检查手机号是否正确', trigger: 'blur' },
            ],
            code: [
                { required: true, message: '请输入验证码', trigger: 'blur' },
            ],
        
        },
        timeSend:60
      }
    },
    created(){
        let token  = this.$store.state.token;
        this.userInfoGet(token)
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


        gotoMore(){
            this.$router.push("/news/detail");
        },
        // 点击首页
        pathIndex(){
            this.$store.state.currentIndex = '/index';
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
            console.log(1211)
            this.userPublic=false
        },

        // 获取个人信息
        userInfoGet(token) {
            this.$post("post",this.baseUrl+'user/infoGet',{
                token,
            })
            .then((res)=>{
                let data = res.data
                if(data.code==1){
                    this.info = data.data
                    this.nickname = data.data.nickname
                    this.face = data.data.face
                    this.phone = data.data.phone
                }else{
                    this.$message({
                        message:data.info,
                        type: 'warning'
                    });
                }
            })
        },

        // 修改昵称
        nicknameSubmit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$post("post",this.baseUrl+"user/infoModify",{
                        token:this.token,
                        face:this.face,
                        nickname:this.nicknameForm.nickname
                    })
                    .then((res)=>{
                        let data = res.data
                        if(data.code==1){
                            this.nickname = data.data.nickname
                            this.face = data.data.face
                            this.$message({
                                message:data.info,
                                type: 'success'
                            });
                            this.$refs[formName].resetFields();
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

        // 修改图片

        // 获取验证码
        sendMsg(formName) {     
            this.$refs[formName].validateField('oldPhone',(phoneError) => {
                if(!phoneError){
                    this.$refs[formName].validateField('newPhone',(Errors) => {
                        if(!Errors){
                             this.timeSendNumber()
                              this.$post("post",this.baseUrl+"sms/send",{
                                phone:this.phoneModifyForm.newPhone,
                                template:'bgxx',
                            })
                            .then((res)=>{
                                let data = res.data
                                if(data.code==1){
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


                }
            })
        },

 
        // 修改手机号
        phoneModifySubmit(formName) {
            console.log(formName)
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$post("post",this.baseUrl+"user/phoneModify",{
                        token:this.token,
                        face:this.face,
                        nickname:this.nicknameForm.nickname
                    })
                    .then((res)=>{
                        let data = res.data
                        if(data.code==1){
                            this.nickname = data.data.nickname
                            this.face = data.data.face
                            this.$message({
                                message:data.info,
                                type: 'success'
                            });
                            this.$refs[formName].resetFields();
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
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
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
        z-index: 11;
    }

    .editInput{
        h4{
            color: #333;
            margin-bottom: 8px;
        }

        .input{
            // display: flex;
            // align-items: center;
            // margin-bottom: 16px;

            // input{
            //     flex: 1;
            //     height: 34px;
            //     background: #FFFFFF;
            //     border-radius: 4px;
            //     border: 1px solid #979797;
            //     text-indent: 8px;
               
            // }
            span{
                // width: 88px;
                height: 34px;
                background: #4E9F5B;
                border-radius:4px;
                color: #fff;
                margin-left: 5px;
                line-height: 34px;
                text-align: center;
                cursor: pointer;
                display: block;
            }
        }
    }

    .btns{
        position: absolute;
        bottom: 15px;
        left: 0;
        right: 0;
        text-align: center;

        .spanBtn{
            width: 84px;
            height: 34px;
            background: #4E9F5B;
            border-radius: 4px;
            color: #fff;
            cursor: pointer;
            display: inline-block;
            line-height: 34px;
        }
        .spanBtn:first-child{
            background: #DBDBDB;
            margin-right: 48px;
        }

        .spanBtn:last-child{
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
