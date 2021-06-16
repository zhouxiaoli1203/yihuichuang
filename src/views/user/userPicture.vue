<template>
  <div class="main connonBg">
    <section class="center">
        <div class="crumbsHeader">
          <div class="crumbs">
              <router-link to="/"><span>首页 / </span></router-link>
              <span @click="pathNews()">文件打印 /</span>
              <span>图片</span>
          </div>
          <div class="operateBox">
            <span class="add">上传文件</span>
            <input type="file" @change="getFile($event)" multiple="multiplt" accept="image/jpeg,image/gif,image/png" >
          </div>
        </div>
        <div class="publicCenter">
            <MenuLeft></MenuLeft> 
            <div class="contList">
              <div v-if="list!=''">
                <ul class="pictureBox">
                  <li v-for="item in list">
                    <div class="img">
                      <img :src="item.url" alt="">
                      <div class="downBox">
                        <el-dropdown trigger="click"  @command="(command)=>{handleCommand(command,item.id,item.url)}">
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
                    <!-- <h3>{{item.call + item.ext}}</h3> -->
                    <div class="nameH3">
                      <h3>{{item.call}}</h3>
                      <p>{{item.ext}}</p>
                    </div>
                    <span>{{item.upload_time  | formatDate_('yyyy-MM-dd hh:mm:ss') }}</span>
                  </li>
                </ul>
                <div class="paging">
                    <el-pagination
                        background
                        :current-page.sync="page"
                        @current-change="handleCurrentChange"
                        layout="prev, pager, next"
                        :page-size="limit"
                        :auto-upload="false"
                        :total="total">
                    </el-pagination>
                </div>
              </div>
              <div v-if="noCont==true" class="NoCont">
                <img src="@/assets/img/common/noCont.png" alt="">
                <span>暂无数据</span>
              </div>
            </div>
        </div>
    </section>

    <!-- 编辑图片弹框 -->
    <section class="modifyBox publicPorp userPicturePorp"  v-show="userPublic" >
      <i class="el-icon-close" @click="userClose"></i>
      <div class="tabNav">
          <el-tabs tab-position="left" type="border-card" style="height: 100%;" v-model="activeName" >
              <el-tab-pane label="编辑" name="编辑">
                  <div class="editInput">
                      <h4>编辑照片信息</h4>
                  </div> 
                  <el-form :model="nicknameForm" ref="nicknameForm" class="demo-ruleForm" @submit.native.prevent>
                      <el-form-item
                        prop="callName"
                        :rules="[
                            { required: true, message: '照片名称不能为空'},
                        ]"
                      >
                        <el-input type="text" v-model="nicknameForm.callName" autocomplete="off" placeholder="请输入照片名称" maxlength="9" show-word-limit></el-input>
                      </el-form-item>
                      <el-form-item class="btns buttonBox" style="margin-bottom:0;height:auto">
                        <el-button  @click="userClose" class="spanBtn">取消</el-button>
                        <el-button  class="spanBtn" type="primary" @click="nicknameSubmit('nicknameForm')">确定</el-button>                           
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
                      <button  @click.prevent="userClose" class="spanBtn">取消</button>
                      <button  class="spanBtn" type="primary" @click.prevent="nicknameSubmit('nicknameForm')">确定</button>                           
                  </el-form-item>
                </el-form>
                <img :src="downImg" alt="" class="phoneLook">
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
          callName: ''
        },
        activeName:'编辑',
         ruleForm: {
          region: '',
        },
        rules: {
          region: [
            {message: '请选择活动区域', trigger: 'change' }
          ],
        },
        token:'',
        page:1,
        limit:20,
        list:[],
        total:0,
        wenjianList:[],
        downImg:'',  //下载路径
        noCont:false,
        fileId:0,
      }
    },
    created(){
      this.token = this.$store.getters.getToken;
      this.PrintsSelect(this.page,this.limit)
    },
    methods: {
      getFile(event){
        console.log(event);
        var file = event.target.files;
        console.log(file.length);
        if(file.length>0){
          for(var i = 0;i<file.length;i++){
            const reg = /\/(?:jpeg|png|jpg)/i;//判断文件类型是不是图片
            const fileType = reg.test(file[i].type)
            const isLt5M = file[i].size / 1024 / 1024 < 5;
            if (!fileType) {
              return this.$message.error('上传图片只能是JPG,PNG,GIF格式!');
            }

            if (!isLt5M) {
              return this.$message.error('上传图片大小不能超过 5MB!');
            }
          }
          this.FileUpload(file)
        }        
      },
      // 上传图片
      FileUpload(file){
        let param = new FormData(); // 创建form对象
        for (var k in file) {
          param.append("file[]", file[k]); // 通过append向form对象添加数据
          if (k == file.length-1) {//循环到5那项后，停止循环
            break;
          }
        }
        param.append("token", this.token); // 添加form表单中其他数据

        this.openFullScreen(); //调用加载中
        this.$post("post",'File/upload',param).then((res)=>{
          this.closeFullScreen(this.openFullScreen()); //关闭加载框
          if(res.code==1){
            this.PrintsUpload(res.data.list)
          }
        })
      },

      // 文件code
      PrintsUpload(codes){
        this.$post("post",'Prints/upload',{
          token:this.token,
          codes
        }).then((res)=>{
          if(res.code==1){
            this.page = 1
            this.PrintsSelect(1,this.limit)
            this.$message({
              message:'上传成功',
              type: 'success'
            });
          }
        })
      },

      // 获取文件列表
      PrintsSelect(page,limit){
        this.openFullScreen(); //调用加载中
        this.$post("post",'Prints/select',{
          token:this.token,
          category:'img',
          page,
          limit
        }).then((res)=>{
          this.closeFullScreen(this.openFullScreen()); //关闭加载框
          if(res.code==1){
            this.list = res.data.list
            this.total = res.data.count
            if(res.data.list.length==0){
              this.noCont = true
            }else{
              this.noCont = false
            }
          }
        })
      },

      // 点击页数
      handleCurrentChange(val) {
        this.page = val
        this.PrintsSelect(val,this.limit);
      },
      handleCommand(command,id,url) {
        if(command=='下载'){
          window.open(url,'download');
        }

        if(command=='删除'){
          this.confirm_pop("此操作将永久删除该文件, 是否继续?").then(res=>{
            this.PrintsDelete(id);
          })
        }

        if(command=='编辑' || command=='打印'){
          this.downImg = url
          this.userPublic = true
          this.activeName = command
          this.fileId = id
        }
      },

      // 删除文件
      PrintsDelete(ids){
        this.$post("post",'Prints/delete',{
          token:this.token,
          ids
        }).then((res)=>{
          if(res.code==1){
            this.page = 1
            this.PrintsSelect(1,this.limit)
            this.$message({
              message:'删除成功',
              type: 'success'
            });
          }
        })
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
              console.log(this.callName);
                this.$post("post","Prints/update",{
                    token:this.token,
                    id:this.fileId,
                    call:this.nicknameForm.callName
                }).then((res)=>{
                  if(res.code==1){
                    this.PrintsSelect(this.page,this.limit)
                    this.$message({
                      message:'修改成功',
                      type: 'success'
                    });
                    this.userPublic = false
                  }
                })
            }
        });
      },
    }
  }
</script>


<style lang="less" scoped>
  .crumbsHeader{
    justify-content: space-between;

    .operateBox{
      width: 102px;
      height: 34px;
      position: relative;
      overflow: hidden;
      input{
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        opacity: 0;
      }
    }
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
    background: #fff;
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

      .nameH3{
        margin-bottom: 4px;
        line-height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      h3{
        font-weight: bold;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space:nowrap;
      }

      p{
        font-weight: bold;
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
            margin-right: 16px;
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
