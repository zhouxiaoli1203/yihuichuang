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
                            <span>{{info.balance}}</span>
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
                             <img width="100%" v-if="imgResult" :src="imgResult" class="avatar">
                             <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </div>
          

                        <el-upload action='' :on-change="getFile" :limit="5" list-type="picture" :auto-upload="false" name='face'  style="text-align:center"  multiple="multiple" :show-file-list="false" id="inf">
                            <el-button size="small" type="primary">上传头像</el-button>
                        </el-upload>
                    </div>
                    <div class="btns">
                        <button  @click="userClose" class="spanBtn">取消</button>
                        <button  class="spanBtn" type="primary" @click="modifyFace">确定</button>    
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

     <!-- 充值 -->
    <rechargePorp :chongzhiPorp="chongzhiPorp" @changeShow="showAddOrUpdate"></rechargePorp>
    <!-- 消费记录 -->
    <consumePorp :xiaofeiPorp="xiaofeiPorp" @xiaofeiShow="xiaofeiUpdate"></consumePorp>

  </div>
</template>

<script>
import MenuLeft from '../../components/menuLeft'
import rechargePorp from '../../components/recharge'
import consumePorp from '../../components/consume'
import $axios from 'axios';
export default {
    name: 'user',
    components: {
        MenuLeft,
        rechargePorp,
        consumePorp
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
            timeSend:60,
            xiaofeiPorp:false,
            chongzhiPorp:false,
            token:'',
            imgResult:'',
            imgface:'',
            imgList:[],
        }
    },
    created(){
        let token  = this.$store.getters.getToken;
        this.token = token
        this.userInfoGet(token)
    },

    methods: {

        upData(event) {
            var reader = new FileReader();
            let fileData = this.$refs.InputFile.files[0];
            reader.readAsDataURL(fileData);
            let _this = this;
            reader.onload = function(e) {
                //这里的数据可以使本地图片显示到页面
                _this.addimg = e.srcElement.result;
            };
            // 使用formapi打包
            // let formData = new FormData();
            // formData.append('file', fileData);
            console.log(fileData)

            let face =fileData
            let token = this.token
        
            this.axios.post(this.baseUrl+"User/infoUpdate", {
                token,
                face

            }).then(function(res) {
                console.log(res);
                // _this.addimgtijiao = res.data.path;
            });
        },

        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handleAvatarSuccess(file) {
   
        },

        beforeAvatarUpload(e){

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
            let list = this.imgList
            let info = file.raw
            list.push(info)
            this.getBase64(file.raw).then(res => {
                this.imgResult = res
            });
        },
        // 充值
        RechargeClick(){
            this.chongzhiPorp=true
        },
        // 监听 子组件弹窗关闭后触发，有子组件调用
        showAddOrUpdate(data){
            if(data === 'false'){
                this.chongzhiPorp = false
            }else{
                this.chongzhiPorp = true
            }
        },
        // 消费
        recordBoxClick(){
            this.xiaofeiPorp = true
        },

        xiaofeiUpdate(data){
            if(data === 'false'){
                this.xiaofeiPorp = false
            }else{
                this.xiaofeiPorp = true
            }
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
        // 点击首页
        pathIndex(){
            this.$store.state.currentIndex = '/index';
            this.$router.push("/index");
        },

    
        userClose(){
            console.log(1211)
            this.userPublic=false
        },

        // 获取个人信息
        userInfoGet(token) {
            this.$post("post",this.baseUrl+'User/infoGet',{
                token,
            })
            .then((res)=>{
                if(res.code==1){
                    this.info = res.data
                    this.nickname = res.data.nickname
                    this.face = res.data.face
                    this.phone = res.data.phone
                    this.$store.commit('setUserInfo',res.data)

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
                    this.$post("post",this.baseUrl+"User/infoUpdate",{
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
            file.forEach((item,index)=>{
                param.append("face[]", file[index]); // 通过append向form对象添加数据
            })
            param.append("token", this.token); // 添加form表单中其他数据


            
            this.$post("post",'https://api.yihuichuang.com/User/infoUpdate',param,'upload')
            .then((res)=>{
                if(res.code==1){
                    this.userInfoGet(this.token)
                    this.$message({
                        message:res.info,
                        type: 'success'
                    });
                    this.userPublic = false
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
                            this.$post("post",this.baseUrl+"Sms/send",{
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
                    this.$post("post",this.baseUrl+"User/infoUpdate",{
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
