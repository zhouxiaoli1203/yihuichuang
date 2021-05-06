<template>
  <div class="main connonBg">
    <section class="center">
        <div class="crumbsHeader">
          <div class="crumbs">
              <span @click="pathIndex()">首页 / </span>
              <span @click="pathNews()">文件打印 /</span>
              <span>图片</span>
          </div>
          <div class="operateBox">
            <span class="add">上传文件</span>
          </div>
        </div>

        <!-- <div>时间</div> -->
        <div class="publicCenter">
            <MenuLeft></MenuLeft> 
            <div class="contList">
              <ul class="pictureBox">
                <li>
                  <div class="img">
                    <img src="" alt="">
                    <div class="downBox">
                      <el-dropdown trigger="click"  @command="(command)=>{handleCommand(command,1)}">
                        <i class="el-icon-arrow-down el-icon-caret-bottom"></i>
                        <el-dropdown-menu slot="dropdown" class="editBox">
                          <el-dropdown-item command="编辑">编辑</el-dropdown-item>
                          <el-dropdown-item command="删除">删除</el-dropdown-item>
                          <el-dropdown-item command="打印">打印</el-dropdown-item>
                          <el-dropdown-item command="下载">下载</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </div>
                  <h3>要么是态度问题的是</h3>
                  <span>2020-02-02</span>
                </li>
                <li>
                  <div class="img">
                    <img src="" alt="">
                    <div class="downBox">
                      <el-dropdown trigger="click" @command="handleCommand(e,2)">
                        <i class="el-icon-arrow-down el-icon-caret-bottom"></i>
                        <el-dropdown-menu slot="dropdown"  class="editBox">
                          <el-dropdown-item command="编辑">编辑</el-dropdown-item>
                          <el-dropdown-item command="删除">删除</el-dropdown-item>
                          <el-dropdown-item command="打印">打印</el-dropdown-item>
                          <el-dropdown-item command="下载">下载</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </div>
                  <h3>要么是态度问题的是</h3>
                  <span>2020-02-02</span>
                </li>
    
     

              </ul>
              <div class="paging">
                  <el-pagination
                      background
                      layout="prev, pager, next"
                      :total="1000">
                  </el-pagination>
                </div>
            </div>
        </div>
    </section>

    <!-- 编辑图片弹框 -->
    <section class="modifyBox publicPorp userPicturePorp"  v-show="userPublic" >
      <i class="el-icon-close" @click="userClose"></i>
      <div class="tabNav">
          <el-tabs tab-position="left" type="border-card" style="height: 100%;" v-model="activeName">
              <el-tab-pane label="编辑" name="编辑">
                  <div class="editInput">
                      <h4>编辑照片信息</h4>
                  </div> 
  
                  <el-form :model="nicknameForm" ref="nicknameForm" class="demo-ruleForm">
                      <el-form-item
                        prop="nickname"
                        :rules="[
                            { required: true, message: '照片名称不能为空'},
                        ]"
                      >
                        <el-input type="text" v-model="nicknameForm.nickname" autocomplete="off" placeholder="请输入照片名称" maxlength="9" show-word-limit></el-input>
                      </el-form-item>
                      <el-form-item class="btns">
                          <button  @click="userClose" class="spanBtn">取消</button>
                          <button  class="spanBtn" type="primary" @click="nicknameSubmit('nicknameForm')">确定</button>                           
                      </el-form-item>
                  </el-form>
              </el-tab-pane>
              <el-tab-pane label="打印" name="打印">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
                  <el-form-item>
                    <el-cascader class="width100"
                                size="large"
                                :options="options"
                                placeholder="请选择省市区"
                                @change="cityChange">
                    </el-cascader>
                  </el-form-item>

                  <el-form-item label="取件地址" prop="region">
                    <el-select v-model="ruleForm.region" placeholder="请选择店铺名称" class="width100">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item class="btns">
                      <button  @click="userClose" class="spanBtn">取消</button>
                      <button  class="spanBtn" type="primary" @click="nicknameSubmit('nicknameForm')">确定</button>                           
                  </el-form-item>
                </el-form>

                <img src="" alt="" class="phoneLook">

              </el-tab-pane>
              <el-tab-pane label="下载" name="下载">
                  <img src="" alt="" class="phoneLook xiazai"> 
                  <div class="btns">
                    <button  @click="userClose" class="spanBtn">取消</button>
                    <button  class="spanBtn" type="primary" >确定</button> 
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
  import { regionData } from 'element-china-area-data'
  export default {
    name: 'userPicture',
    components: {
      MenuLeft,
    },
    data () {
      return {   
        userPublic: false, 
        options: regionData,
        nicknameForm: {
          nickname: ''
        },
        activeName:'编辑',
         ruleForm: {
          region: '',
        },
        rules: {
          region: [
            {message: '请选择活动区域', trigger: 'change' }
          ],
        }
      }
    },
    methods: {
      handleCommand(command,id) {
        if(command=='删除'){
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }).catch(() => {       
          });
        }else{
          this.userPublic = true
          this.activeName = command
        }
      },
      pathNews(){
        this.$router.replace("/user/userFile");
      },
      userClose(){
          this.userPublic=false
      },
      cityChange(val){ //选择收货地址
        console.log(val)
      },

      // 修改文件名
      nicknameSubmit(formName) {
        this.$refs[formName].validate((valid) => {
            if (valid) {
                this.$post("post","user/infoModify",{
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
  .crumbsHeader{
    justify-content: space-between;


    .add{
      width: 102px;
      height: 34px;
      background: #4E9F5B;
      border-radius: 4px;
      display: inline-block;
      text-align: center;
      line-height: 34px;
      color: #fff;
      cursor: pointer;
    }
  }
  .contList{
    padding: 24px;
    position: relative;
  }

  .pictureBox{
    display: flex;
    flex-wrap: wrap;
    
    li{
      text-align: center;
      width: 134px;
      margin: 0 63px 24px 0;
      .img{
        width: 134px;
        height: 134px;
        border-radius: 8px;
        position: relative;
        margin-bottom: 8px;
        img{
          width: 100%;
          height: 100%;
          border-radius: 8px;
        }

        .downBox{
          position: absolute;
          top: 3px;
          right: 3px;

          i{
            font-size: 24px;
            cursor: pointer;
          }
        }
      }

      h3{
        font-weight: bold;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        margin-bottom: 4px;
      }

      span{
        color: #666;
        font-size: 12px;
      }
    }
    li:nth-child(5n+5){
      margin-right: 0;
    }
  }

  .modifyBox{
    width: 30%;
    height: 60%;
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
        bottom: 15px;
        left: 0;
        right: 0;
        text-align: center;
        margin-bottom: 0;

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

    .phoneLook{
      width: 100%;
      height: 65%;
      border-radius: 8px;
      max-height:239px;
    }

    .xiazai{
      height:239px;
    }
  }



</style>
