<template>
  <div class="main connonBg">
    <section class="center">
        <div class="crumbsHeader">
          <div class="crumbs">
              <span @click="pathIndex()">首页 / </span>
              <span @click="pathNews()">文件打印 /</span>
              <span>文件</span>
          </div>
          <div class="operateBox">
            <!-- <p @click="handleBatchDownload">下载</p> -->
            <div class="downBox">
              <el-dropdown trigger="click" @command="handleCommand" style="width:100%;padding:9px 0">
                <span>编辑</span>
                <i class="el-icon-arrow-down el-icon-caret-bottom"></i>
                <el-dropdown-menu slot="dropdown"  class="editBox wenjianEdit">
                  <el-dropdown-item command="重命名">重命名</el-dropdown-item>
                  <el-dropdown-item command="删除">删除</el-dropdown-item>
                  <el-dropdown-item command="打印">打印</el-dropdown-item>
                  <!-- <el-dropdown-item command="下载">下载</el-dropdown-item> -->
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <span class="add" @click="selectAll" v-if="checkAll==false">全选</span>
            <span class="add" @click="notatAll" v-if="checkAll==true">全不选</span>
            <div class="shangChuan">
              <span class="add">上传文件</span>
              <input type="file" @change="getFile($event)" multiple="multiplt" accept=".doc,.docx,.xls,.xlsx"/>
            </div>
          </div>
        </div>

        <div class="publicCenter">
            <MenuLeft></MenuLeft> 
            <div class="contList">
              <div  v-if="list!=''">
                <div class="fileTitle">
                  <span>文件名</span>
                  <span>大小</span>
                  <span>日期</span>
                </div>
                <div class="checkboxBox">
                  <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                    <div v-for="(item,i) in list" :key="i" class="li">
                      <el-checkbox :label="item.id" >
                        <div class="info">
                          <img :src="file1" alt="">
                          <p>{{item.name}}</p>
                        </div>
                        <span class="kb" v-if="item.size / 1024 / 1024 < 1">{{Number(item.size/1024).toFixed(1)}}KB</span>
                        <span class="kb" v-else>{{Number(item.size / 1024 / 1024).toFixed(1)}}MB</span>
                        <p class="time">{{item.upload_time | formatDate_('yyyy-MM-dd hh:mm:ss') }}</p>
                      </el-checkbox>
                      <button class="spanBtn" type="primary" @click.prevent="downImgClick(item.url)">下载</button> 
                    </div>
                  </el-checkbox-group>
                </div>
                <div class="paging">
                    <el-pagination
                      background
                      :current-page.sync="page"
                      @current-change="handleCurrentChange"
                      layout="prev, pager, next"
                      :page-size="limit"
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

     <!-- 编辑文件弹框 -->
    <section class="modifyBox publicPorp userPicturePorp"  v-show="userPublic" >
      <i class="el-icon-close" @click="userClose"></i>
      <div class="tabNav">
          <el-tabs tab-position="left" type="border-card" style="height: 100%;" v-model="activeName">
              <el-tab-pane label="重命名" name="重命名">
                  <div class="editInput">
                      <h4>编辑文件信息</h4>
                  </div> 
                  <el-form :model="nicknameForm" ref="nicknameForm" class="demo-ruleForm" @submit.native.prevent>
                      <el-form-item
                        prop="nickname"
                        :rules="[
                            { required: true, message: '文件名称不能为空'},
                        ]"
                      >
                        <el-input type="text" v-model="nicknameForm.nickname" autocomplete="off" placeholder="请输入文件名称" maxlength="9" show-word-limit></el-input>
                      </el-form-item>
                      <el-form-item class="btns buttonBox">
                          <el-button  @click.prevent="userClose" class="spanBtn">取消</el-button>
                          <el-button  class="spanBtn" type="primary" @click.prevent="nicknameSubmit('nicknameForm')">确定</el-button>                           
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
                <div class="wenjianDayin xiazaiSection">
                  <div class="editInput">
                      <h3>文件详情</h3>
                      <p>(共打印{{checkedCities.length}})</p>
                  </div> 
                  <section class="sectionUL">
                    <ul class="wenjianLIst">
                      <li>
                        <div class="name">
                          <img :src="file1" alt="">
                          <p>梦里花落知多少</p>
                        </div>
                        <span>2020-02-02 22:22:22</span>
                      </li>
                      <li>
                        <div class="name">
                          <img :src="file1" alt="">
                          <p>梦里花落知多少</p>
                        </div>
                        <span>2020-02-02 22:22:22</span>
                      </li>
                          <li>
                        <div class="name">
                          <img :src="file1" alt="">
                          <p>梦里花落知多少</p>
                        </div>
                        <span>2020-02-02 22:22:22</span>
                      </li>
                      <li>
                        <div class="name">
                          <img :src="file1" alt="">
                          <p>梦里花落知多少</p>
                        </div>
                        <span>2020-02-02 22:22:22</span>
                      </li>    <li>
                        <div class="name">
                          <img :src="file1" alt="">
                          <p>梦里花落知多少</p>
                        </div>
                        <span>2020-02-02 22:22:22</span>
                      </li>
                      <li>
                        <div class="name">
                          <img :src="file1" alt="">
                          <p>梦里花落知多少</p>
                        </div>
                        <span>2020-02-02 22:22:22</span>
                      </li>    <li>
                        <div class="name">
                          <img :src="file1" alt="">
                          <p>梦里花落知多少</p>
                        </div>
                        <span>2020-02-02 22:22:22</span>
                      </li>
                      <li>
                        <div class="name">
                          <img :src="file1" alt="">
                          <p>梦里花落知多少</p>
                        </div>
                        <span>2020-02-02 22:22:22</span>
                      </li>    <li>
                        <div class="name">
                          <img :src="file1" alt="">
                          <p>梦里花落知多少</p>
                        </div>
                        <span>2020-02-02 22:22:22</span>
                      </li>
                      <li>
                        <div class="name">
                          <img :src="file1" alt="">
                          <p>梦里花落知多少</p>
                        </div>
                        <span>2020-02-02 22:22:22</span>
                      </li>    <li>
                        <div class="name">
                          <img :src="file1" alt="">
                          <p>梦里花落知多少</p>
                        </div>
                        <span>2020-02-02 22:22:22</span>
                      </li>
                      <li>
                        <div class="name">
                          <img :src="file1" alt="">
                          <p>梦里花落知多少</p>
                        </div>
                        <span>2020-02-02 22:22:22</span>
                      </li>
                    </ul>
                  </section>
                </div>
  
              </el-tab-pane>
              <!-- <el-tab-pane label="下载" name="下载">
                <div class="wenjianDayin  xiazaiWenjianDayin">
                  <section class="sectionUL">
                    <ul class="wenjianLIst">
                      <li>
                        <div class="name">
                          <img :src="file1" alt="">
                          <p>梦里花落知多少</p>
                        </div>
                        <span>2020-02-02 22:22:22</span>
                      </li>
                      <li>
                        <div class="name">
                          <img :src="file1" alt="">
                          <p>梦里花落知多少</p>
                        </div>
                        <span>2020-02-02 22:22:22</span>
                      </li>
                          <li>
                        <div class="name">
                          <img :src="file1" alt="">
                          <p>梦里花落知多少</p>
                        </div>
                        <span>2020-02-02 22:22:22</span>
                      </li>
                      <li>
                        <div class="name">
                          <img :src="file1" alt="">
                          <p>梦里花落知多少</p>
                        </div>
                        <span>2020-02-02 22:22:22</span>
                      </li>    <li>
                        <div class="name">
                          <img :src="file1" alt="">
                          <p>梦里花落知多少</p>
                        </div>
                        <span>2020-02-02 22:22:22</span>
                      </li>
                      <li>
                        <div class="name">
                          <img :src="file1" alt="">
                          <p>梦里花落知多少</p>
                        </div>
                        <span>2020-02-02 22:22:22</span>
                      </li>    <li>
                        <div class="name">
                          <img :src="file1" alt="">
                          <p>梦里花落知多少</p>
                        </div>
                        <span>2020-02-02 22:22:22</span>
                      </li>
                      <li>
                        <div class="name">
                          <img :src="file1" alt="">
                          <p>梦里花落知多少</p>
                        </div>
                        <span>2020-02-02 22:22:22</span>
                      </li>    <li>
                        <div class="name">
                          <img :src="file1" alt="">
                          <p>梦里花落知多少</p>
                        </div>
                        <span>2020-02-02 22:22:22</span>
                      </li>
                      <li>
                        <div class="name">
                          <img :src="file1" alt="">
                          <p>梦里花落知多少</p>
                        </div>
                        <span>2020-02-02 22:22:22</span>
                      </li>    <li>
                        <div class="name">
                          <img :src="file1" alt="">
                          <p>梦里花落知多少</p>
                        </div>
                        <span>2020-02-02 22:22:22</span>
                      </li>
                      <li>
                        <div class="name">
                          <img :src="file1" alt="">
                          <p>梦里花落知多少</p>
                        </div>
                        <span>2020-02-02 22:22:22</span>
                      </li>
                    </ul>
                  </section>
                </div>
                <div class="btns">
                  <button  @click="userClose" class="spanBtn">取消</button>
                  <button  class="spanBtn" type="primary" >确定</button> 
                </div>
              </el-tab-pane> -->
          </el-tabs>
      </div>
    </section>
    <div class="mask" v-show="userPublic" @click="userClose"></div>
  </div>
</template>

<script>
  import MenuLeft from '../../components/menuLeft'
  import { regionData } from 'element-china-area-data'
   import JSZip from 'jszip'
  import FileSaver from 'file-saver'
  export default {
    name: 'userFiledown',
    components: {
      MenuLeft,
    },
    data () {
      return {
        file1: require('../../assets/img/user/file1.png'), 
        //全选
        checkAll: false,
        checkedCities:[], //绑定默认选中
        userPublic: false, 
        options: regionData,
        nicknameForm: {
          nickname: ''
        },
        activeName:'重命名',
        ruleForm: {
          region: '',
        },
        rules: {
          region: [
            {message: '请选择活动区域', trigger: 'change' }
          ],
        },
        token:'',
        list: [], //数据源
        page:1,
        limit:20,
        total:0,
        noCont:false,
      }
    },
    created(){
      this.token = this.$store.getters.getToken;
      this.PrintsSelect(this.page,this.limit)


    },
    methods: {
      handleBatchDownload() {
         let filename = 'yasyoi'
         let arrImages = [
           {fileUrl:'https://yhc0561.oss-cn-hangzhou.aliyuncs.com/uploads/202106/0115415996058211.docx',renameFileName:'11'},
           {fileUrl:'https://yhc0561.oss-cn-hangzhou.aliyuncs.com/uploads/202106/0115415996058211.docx',renameFileName:'11'}
          ]
        let _this = this;
        let zip = new JSZip();
        let cache = {};
        let promises = [];
        _this.title = '正在加载压缩文件';
        for (let item of arrImages) {
          const promise= _this.getImgArrayBuffer(item.fileUrl).then(data => {
            console.log(11111);
            // 下载文件, 并存成ArrayBuffer对象(blob)
            console.log(item.renameFileName, data, { binary: true });
            zip.file(item.renameFileName, data, { binary: true }); // 逐个添加文件
            cache[item.renameFileName] = data;
          });
          console.log(promises);
          promises.push(promise);
        }
        Promise.all(promises).then(() => {
          zip.generateAsync({ type: "blob" }).then(content => {
            _this.title = '正在压缩';
            // 生成二进制流
            FileSaver.saveAs(content, filename); // 利用file-saver保存文件  自定义文件名
            _this.title = '压缩完成';
          });
        }).catch(res=>{
          console.log(res);
          _this.$message.error('文件压缩失败');
        });
      },
    //获取文件blob
      getImgArrayBuffer(url){
        console.log(111522);
        let _this=this;
        return new Promise((resolve, reject) => {
          //通过请求获取文件blob格式
          let xmlhttp = new XMLHttpRequest();
          xmlhttp.open("GET", url, true);
          xmlhttp.responseType = "blob";
          // axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
          // xmlhttp.setRequestHeader("Content-Type", "application/json");
          // xmlhttp.setRequestHeader("=Content-Type", "Basic a2VybWl0Omtlcm1pdA==");
          // xmlhttp.setRequestHeader("Authorization", "Basic a2VybWl0Omtlcm1pdA==");
          xmlhttp.onload = function () {
            if (this.status == 200) {
              resolve(this.response);
            }else{
              reject(this.status);
            }
          }
          xmlhttp.send();
        });

      },
      selectAll() {
        this.list.forEach(item=>{  //当全选被选中的时候，循环遍历源数据，把数据的每一项加入到默认选中的数组去
          this.checkedCities.push(item.id)
        })
        this.checkAll = true
      },
      notatAll() {
        this.checkedCities = [];
        this.checkAll = false
      },
      // checkbox选中 --- 当绑定值变化时触发的事件
      handleCheckedCitiesChange(value) {
        console.log(this.list);
        console.log(value)
        let checkedCount = value.length;   //选中值的长度
        this.checkAll = checkedCount === this.list.length;  //如果选中值的长度和源数据的长度一样，返回true，就表示你已经选中了全部checkbox，那么就把true赋值给this.checkAll
      },
      pathNews(){
        this.$router.replace("/user/userFile");
      },
      handleCommand(command) {
        let { checkedCities } = this
        const newList = []
        if(checkedCities==''){
          return this.$message({
            message: '您还没有选择要操作的文件哦',
            type: 'warning'
          });
        }
        
        checkedCities.forEach(i => {
        　　newList.push(i)
        })

        let str = newList.join(",")   // 字符串一,字符串二,字符串三
        if(command=='删除'){
          this.confirm_pop("此操作将永久删除该文件, 是否继续?").then(res=>{
            console.log(str) 
            this.PrintsDelete(str); //多选删除文件
          })
        }else{
          this.userPublic = true
          this.activeName = command
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

      // 获取文件列表
      PrintsSelect(page,limit){
        this.openFullScreen(); //调用加载中
        this.$post("post",'Prints/select',{
          token:this.token,
          category:'doc',
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

      // 点击上传
      getFile(event){
        console.log(event);
        var file = event.target.files;
        console.log(file.length);
        if(file.length>0){
          for(var i = 0;i<file.length;i++){

            const fileType = file[i].name.endsWith('.xlsx') || file[i].name.endsWith('.xls') || file[i].name.endsWith('.doc') || file[i].name.endsWith('.docx')

            const isLt5M = file[i].size / 1024 / 1024 < 5;

            if (!fileType) {
              return this.$message.error('上传文件只能是DOC,XLS格式!');
            }

            if (!isLt5M) {
              return this.$message.error('上传文件大小不能超过 5MB!');
            }
          }
          this.FileUpload(file)
        }        
      },

      // 上传图片
      FileUpload(file){
        let param = new FormData(); 
        for (var k in file) {
          param.append("file[]", file[k]); 
          if (k == file.length-1) {
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

      // 下载文件
      downImgClick(url){
        window.open(url,'download');
      }

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

.operateBox{
  display: flex;
  align-items: center;
  .downBox{
    border-radius: 4px;
    border: 1px solid #CBCFE3;
    width: 86px;
    // padding: 9px 0;
    background: #FFFFFF;
    text-align: center;
    margin-right: 54px;
    cursor: pointer;
  }
  .shangChuan{
    width: 102px;
    height: 34px;
    overflow: hidden;
    position: relative;
    margin-left: 54px;

    input{
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      opacity: 0;
    }
  }
}
.contList{
  position: relative;
}
.fileTitle{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 24px 24px 52px;
  border-bottom: 1px solid #F5F6FA;
  padding-right: 148px;
  span:first-child{
    width: 60%;
  }
  span:nth-child(2){
    width: 20%;
  }
  span:last-child{
    width: 20%;
    text-align: right;
  }
}
.checkboxBox{
  .li{
    display: flex;
    align-items: center;
    border-bottom: 1px solid #F5F6FA;
  }
  label{
    flex: 1;
    display: flex;
    align-items: center;
    height: 40px;
    padding: 0 24px
  }
  .info{
    display: flex;
    align-items: center;
    width: 52%;
    img{
      width: 28px;
      height: 28px;
      margin-right: 24px;
    }
  }
  .kb{
    width: 20%;
  }
  .time{
    width: 20%;
    text-align: right;
  }
  .kb, .time{
    color: #666;
    font-size: 12px;
  }
  button{
    cursor: pointer;
    margin: 0 24px;
    color: #4E9F5B;
  }
  button:hover{
    text-decoration: underline;
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
.wenjianDayin{
  height:43%;
  .editInput{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  ul{
    margin-top: 16px;
    overflow-y: scroll;
    li{
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 97%;
      height: 40px;
      background: #FFFFFF;
      border-radius: 4px;
      border: 1px solid rgba(151, 151, 151, 0.52);
      padding: 10px 8px;
      margin-bottom: 8px;

      .name{
        display: flex;
        align-items: center;
      }

      img{
        width: 18px;
        height: 16px;
        margin-right: 8px;
      }

      span{
        font-size: 12px;
        color: #999;
      }
    }
  }
}
.xiazaiSection{
  .sectionUL{
    height: 76%;
    overflow: hidden;
    position: relative;
  }

  ul{
    overflow-y:scroll;
    position: absolute;  /*不能使用relative和fixed定位*/
    top:0;
    bottom:0;   /*相当于height:100%时的高度*/
    left: 0;
    right:-17px;  /*图层宽度大于width:100%,滚动条的宽度刚刚好被隐藏 */    
  }
}



.xiazaiWenjianDayin{
  height: 100%;

  .sectionUL{
    margin-top: 0;
    height: 91%;
    overflow: hidden;
    position: relative;
  }

  ul{
    overflow-y:scroll;
    position: absolute;  /*不能使用relative和fixed定位*/
    top:0;
    bottom:0;   /*相当于height:100%时的高度*/
    left: 0;
    right:-17px;  /*图层宽度大于width:100%,滚动条的宽度刚刚好被隐藏 */    
  }
}


</style>
