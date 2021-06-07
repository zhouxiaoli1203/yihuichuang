<template>
  <div class="main connonBg">
    <section class="center">
        <div class="crumbsHeader">
            <div class="crumbs">
                <router-link to="/"><span>首页 / </span></router-link>
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
                                <p>{{nickname}}</p>
                                <p class="tel">
                                    <i class="el-icon-mobile-phone"></i>
                                    <span>{{phone}}</span>
                                </p>
                            </div>
                        </div>
                        <i class="el-icon-edit-outline" @click="userPublic = true"></i>
                    </div>
                    <div class="btns">
                        <span  @click="RechargeClick">充值</span>
                        <span  @click="recordBoxClick">消费</span>
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
                            <span v-if="info.balance!=0">￥</span>
                            <span>{{info.balance/100}}</span>
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
                    <el-form :model="nicknameForm" ref="nicknameForm" class="demo-ruleForm" @submit.native.prevent>
                        <el-form-item
                            prop="nickname"
                            :rules="[
                                { required: true, message: '用户名称不能为空'},
                            ]"
                        >
                         <el-input type="text" v-model="nicknameForm.nickname" autocomplete="off" placeholder="请输入用户名称"></el-input>
                        </el-form-item>
                        <el-form-item class="btns buttonBox">
                            <el-button  class="spanBtn" type="primary" @click.prevent="nicknameSubmit('nicknameForm')" v-button>确定</el-button>
                            <el-button  @click.prevent="userClose" class="spanBtn">取消</el-button>                           
                        </el-form-item>
                    </el-form>



                </el-tab-pane>
                <el-tab-pane label="头像">
                    <div class="upHead">
                        <div class="img">
                            <el-upload 
                             v-if="imgResult==''"
                            action='' 
                            :limit="1" 
                            list-type="picture" 
                            :auto-upload="true" 
                            name='face'  
                            style="text-align:center"  
                            :show-file-list="false" 
                            :before-upload="beforeAvatarUpload"
                            accept=".jpg,.jpeg,.png,.gif,.JPG,.JPEG"
                            >
                                <div class="shangchuanBOX"> 
                                    <i class="el-icon-plus avatar-uploader-icon"></i>
                                    <span class="shangchuan">上传头像</span>
                                </div>
                            </el-upload>
                            <el-image 
                                v-else
                                :src="imgResult" 
                                :preview-src-list="srcList"
                                class="avatar"
                                >
                            </el-image>
                        </div>
                    </div>
                    <div class="btns">
                        <button  class="spanBtn" type="primary" @click.prevent="modifyFace" v-button>确定</button>    
                        <button  @click.prevent="userClose" class="spanBtn">取消</button>
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
                                <span class="cursor_p code"  @click="sendMsg('phoneModifyForm')" v-if="timeSend==60">获取验证码</span>
                                <span class="cursor_p code" v-else>倒计时：{{timeSend}}</span>
                            </el-col>
                            </el-row>
                        </el-form-item>

                         <el-form-item class="btns buttonBox">
                            <el-button  class="spanBtn" type="primary" @click.prevent="phoneModifySubmit('phoneModifyForm')" v-button>确定</el-button>   
                            <el-button  @click.prevent="userClose" class="spanBtn">取消</el-button>                        
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
        </div>
    </section>
    <div class="mask" v-show="userPublic" @click="userClose"></div>

    <!-- 充值 -->
    <rechargePorp ref="chongzhiPorp"></rechargePorp>
    <!-- 消费记录 -->
    <consumePorp ref="xiaofeiPorp" ></consumePorp>
    
  </div>
</template>

<script>
import MenuLeft from '../../components/menuLeft'
import rechargePorp from '../../components/recharge'
import consumePorp from '../../components/consume'
export default {
    name: 'user',
    components: {
        MenuLeft,
        rechargePorp,
        consumePorp,
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
            face:require('../../assets/img/common/head.png'),
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
            timeSend:60,
            token:'',
            imgResult:'',
            imgList:[],
            srcList: []
        }
    },
    created(){
        let token  = this.$store.getters.getToken;
        this.token = token
        this.userInfoGet(token)
    },
    mounted() {
    },
    methods: {
        beforeAvatarUpload(file) {
            console.log(file.type)
            const isJPG = file.type === 'image/jpg';
            const isJPEG = file.type === 'image/jpeg';
            const isGIF = file.type === 'image/gif'
            const isPNG = file.type === 'image/png'
            const isLt2M = file.size / 1024 / 1024 < 5;
            if (!isJPG  && !isGIF && !isPNG && !isJPEG) {
                return this.$message.error('上传头像图片只能JPG,PNG,GIF格式!');
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
            this.imgList = []
            let {imgList, srcList} = this
            imgList.push(file)
            this.getBase64(file).then(res => {
                this.imgResult = res
                srcList.push(res)
            });
        },

        // 充值
        RechargeClick(){
            this.$refs.chongzhiPorp.onClick(true); //给子组件传递点击事件
        },
        // 消费
        recordBoxClick(){
            this.$refs.xiaofeiPorp.xiaoFeiClick(true); //给子组件传递点击事件
        },

        // 获取验证码倒计时
        timeSendNumber() {
            this.timer = setInterval(()=>{
                this.timeSend--
                if(this.timeSend===0){
                    this.timeSend=60
                    clearInterval(this.timer)
                }
            },1000)
        },

        gotoMore(){
            this.$router.push("/news/detail");
        },

        userClose(){
            console.log(1211)
            this.userPublic=false
            this.imgResult = ''
        },

        // 获取个人信息
        userInfoGet(token) {
            let {srcList} = this
            this.openFullScreen(); //关闭加载框
            this.$post("post",'User/infoGet',{
                token,
            })
            .then((res)=>{
                this.closeFullScreen(this.openFullScreen()); //关闭加载框
                if(res.code==1){
                    this.info = res.data
                    this.nickname = res.data.nickname
                    this.face = res.data.face
                    this.phone = res.data.phone
                    this.$store.commit('setUserInfo',res.data)
                    srcList.push(res.data.face)
                }else{
                    this.$message({
                        message:res.info,
                        type: 'warning'
                    });
                }
            })
        },

        // 修改昵称
        nicknameSubmit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$post("post","User/infoUpdate",{
                        token:this.token,
                        nickname:this.nicknameForm.nickname
                    })
                    .then((res)=>{
                        if(res.code==1){
                            this.userInfoGet(this.token)
                            this.$message({
                                message:res.info,
                                type: 'success'
                            });
                            this.$refs[formName].resetFields();
                            this.userPublic = false
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

        // 修改头像
        modifyFace() {
            let param = new FormData(); // 创建form对象
            let file = this.imgList // 获取图片数据
            console.log(file.length)
            if(file.length==0){
                this.$message({
                    message:'请上传头像',
                    type: 'warning'
                });
                return false
            }
            file.forEach((item,index)=>{
                param.append("face[]", file[index]); // 通过append向form对象添加数据
            })
            param.append("token", this.token); // 添加form表单中其他数据
            this.$post("post",'/User/infoUpdate',param)
            .then((res)=>{
                if(res.code==1){
                    this.userInfoGet(this.token)
                    this.$message({
                        message:res.info,
                        type: 'success'
                    });
                    this.userPublic = false
                    this.imgResult = ''
                }else{
                    this.$message({
                        message:res.info,
                        type: 'warning'
                    });
                }
            })
        },

        // 获取验证码
        sendMsg(formName) {     
            this.$refs[formName].validateField('oldPhone',(phoneError) => {
                if(!phoneError){
                    this.$refs[formName].validateField('newPhone',(Errors) => {
                        if(!Errors){
                            this.$post("post","Sms/send",{
                                phone:this.phoneModifyForm.newPhone,
                                template:'ghsj',
                            })
                            .then((res)=>{
                                if(res.code==1){
                                    this.timeSendNumber()
                                    this.sms_token = res.data.sms_token
                                    this.$message({
                                        message:res.info,
                                        type: 'success'
                                    });
                                }else{
                                    this.$message({
                                        message:res.info,
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
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$post("post","User/infoUpdate",{
                        token:this.token,
                        phone:this.phoneModifyForm.oldPhone,
                        code:this.phoneModifyForm.code,
                        sms_token:this.sms_token
                    })
                    .then((res)=>{
                        if(res.code==1){
                            // this.phone = res.data.phone
                            this.userInfoGet(this.token)
                            this.$message({
                                message:res.info,
                                type: 'success'
                            });
                            this.$refs[formName].resetFields();
                            this.userPublic = false
                        }else{
                            this.$message({
                                message:res.info,
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
      background: #FAFBFF;
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
        top: 40px;
        right: 0;
        left: 0;
        bottom: 0;
    }

    .el-icon-close{
        width: 100%;
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
        
            span{
            
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
        bottom: 43px;
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
            background: #4E9F5B;
            margin-right: 48px;
        }

        .spanBtn:last-child{
            background: #DBDBDB;
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
            .avatar{
                width: 130px;
                height: 130px;
                border: 1px solid #fff;
                border-radius: 50%;
            }

            i{
                font-size: 56px;
                color: #4E9F5B;
            }

            .shangchuanBOX{
                width: 130px;
                height: 118px;
                border-radius: 8px;
                border: 1px dashed #4E9F5B;
                display: flex;
                flex-flow: column;
                align-items: center;
                justify-content: center;
            }

            .shangchuan{
                margin-top: 8px;
                display: block;
                text-align: center;
                font-size: 16px;
                color: #4E9F5B;
            }
        }
        
    }
  }
</style>
