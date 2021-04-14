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
            <div class="downBox">
              <el-dropdown trigger="click" @command="handleCommand" style="width:100%;padding:9px 0">
                <span>编辑</span>
                <i class="el-icon-arrow-down el-icon-caret-bottom"></i>
                <el-dropdown-menu slot="dropdown"  class="editBox wenjianEdit">
                  <el-dropdown-item command="重命名">重命名</el-dropdown-item>
                  <el-dropdown-item command="删除">删除</el-dropdown-item>
                  <el-dropdown-item command="打印">打印</el-dropdown-item>
                  <el-dropdown-item command="下载">下载</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <span class="add" @click="selectAll" v-if="checkAll==false">全选</span>
            <span class="add" @click="notatAll" v-if="checkAll==true">全不选</span>
          </div>
        </div>

        <div class="publicCenter">
            <MenuLeft></MenuLeft> 
            <div class="contList">
              <div class="fileTitle">
                <span>文件名</span>
                <span>大小</span>
                <span>日期</span>
              </div>
              <div class="checkboxBox">
                <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                  <el-checkbox v-for="(item,i) in flileList" :label="item.id" :key="i">
                    <div class="info">
                      <img :src="file1" alt="">
                      <p>{{item.tit}}</p>
                    </div>
                    <span class="kb">{{item.kb}}KB</span>
                    <p class="time">{{item.time}}</p>
                  </el-checkbox>
                </el-checkbox-group>
              </div>
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

     <!-- 编辑文件弹框 -->
    <section class="modifyBox publicPorp userPicturePorp"  v-show="userPublic" >
      <i class="el-icon-close" @click="userClose"></i>
      <div class="tabNav">
          <el-tabs tab-position="left" type="border-card" style="height: 100%;" v-model="activeName">
              <el-tab-pane label="重命名" name="重命名">
                  <div class="editInput">
                      <h4>编辑文件信息</h4>
                  </div> 
  
                  <el-form :model="nicknameForm" ref="nicknameForm" class="demo-ruleForm">
                      <el-form-item
                        prop="nickname"
                        :rules="[
                            { required: true, message: '文件名称不能为空'},
                        ]"
                      >
                        <el-input type="text" v-model="nicknameForm.nickname" autocomplete="off" placeholder="请输入文件名称" maxlength="9" show-word-limit></el-input>
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
                <div class="wenjianDayin">
                  <div class="editInput">
                      <h4>文件详情</h4>
                      <p>(共打印{{checkedCities.length}})</p>
                  </div> 
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
                </div>
  
              </el-tab-pane>
              <el-tab-pane label="下载" name="下载">
                <div class="wenjianDayin  xiazaiWenjianDayin">
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
                </div>
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
    name: 'userFiledown',
    components: {
      MenuLeft,
    },
    data () {
      return {
        file1: require('../../assets/img/user/file1.png'), 
        //全选
        checkAll: false,
        flileList: [
          {
            tit:"打不死的是信念，绕不开的是变化",
            kb:"928",
            time:"2006-10-16 20:22:22",
            val:"张",
            id:1
          },
          {
            tit:"打不死的是信念，绕不开的是变化",
            kb:"245",
            time:"2006-10-16 20:22:22",
            val:"李",
            id:2,
          },
        ], //数据源
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
        }
      }
    },
    methods: {
      selectAll() {
        this.flileList.forEach(item=>{  //当全选被选中的时候，循环遍历源数据，把数据的每一项加入到默认选中的数组去
          this.checkedCities.push(item.val)
        })
        this.checkAll = true
      },
      notatAll() {
        this.checkedCities = [];
        this.checkAll = false
      },
      // checkbox选中 --- 当绑定值变化时触发的事件
      handleCheckedCitiesChange(value) {
        console.log(value)
        let checkedCount = value.length;   //选中值的长度
        this.checkAll = checkedCount === this.flileList.length;  //如果选中值的长度和源数据的长度一样，返回true，就表示你已经选中了全部checkbox，那么就把true赋值给this.checkAll
      },
      pathNews(){
        this.$router.replace("/user/userFile");
      },
      handleCommand(command) {
        let { checkedCities } = this
        if(checkedCities==''){
          return this.$message({
            message: '您还没有选择要操作的文件哦',
            type: 'warning'
          });
        }
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
  label{
    width: 100%;
    display: flex;
    align-items: center;
    height: 40px;
    border-bottom: 1px solid #F5F6FA;
    padding: 0 24px
  }
  .info{
    display: flex;
    align-items: center;
    width: 60%;
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
.wenjianDayin{
  height:43%;
  .editInput{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  ul{
    margin-top: 16px;
    height: 76%;
    overflow-y: scroll;
    li{
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
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

.xiazaiWenjianDayin{
  height: 100%;

  ul{
    margin-top: 0;
    height: 91%;
  }
}


</style>
