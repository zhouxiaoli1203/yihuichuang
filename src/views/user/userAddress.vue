<template>
  <div class="main connonBg">
    <section class="center">
        <div class="crumbsHeader">
          <div class="crumbs">
              <span @click="pathIndex()">首页 / </span>
              <!-- <span @click="pathNews()">帮助支持 /</span> -->
              <span>收货地址</span>
          </div>
          <div class="operateBox">
            <span class="add" @click="addAreaBox = true">添加</span>
          </div>
        </div>
        <div class="publicCenter">
            <MenuLeft></MenuLeft> 
            <div class="contList">
              <div class="notice">
                <img :src="notice" alt="">
                <p>已保存9条地址，还能保存9条地址</p>
              </div>
              <div class="tabBox">
                <table border = "1" class="tableBox"  width="100%">
                  <tbody>
                    <tr>
                      <th>收货人</th>
                      <th>所在地区</th>
                      <th>详细地址</th>
                      <th>邮编</th>
                      <th>电话/手机</th>
                      <th>操作</th>
                      <th></th>
                    </tr>
                    <tr v-for="item in list">
                      <td>{{item.name}}</td>
                      <td>
                        <p>{{item.prov + item.city + item.dist}}</p>
                      </td>
                      <td>
                        <p>{{item.detail}}</p>
                      </td>
                      <td>{{item.postcode}}</td>
                      <td>{{item.phone}}</td>
                      <td class="btns">
                        <span @click="AddrDelete(item.id)">修改</span>
                        <span @click="AddrDelete(item.id)">删除</span>
                      </td>
                      <td class="default" v-if="item.default=='y'">
                        <span>默认地址</span>
                      </td>
                      <td class="cursor_p" v-else>设为默认地址</td>
                    </tr>
                    
                  </tbody>   
                </table>
              </div>
              <div class="paging">
                  <el-pagination
                      background
                      layout="prev, pager, next"
                      :page-size="12"
                      :total="count">
                  </el-pagination>
                </div>
            </div>
        </div>
    </section>


    <section class="addAreaBox publicPorp" v-show="addAreaBox">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="地址信息" prop="city">
          <el-cascader class="width100"
                      v-model="ruleForm.city"
                      size="large"
                      :options="options"
                      placeholder="请选择省市区"
                      @change="cityChange">
          </el-cascader>

        </el-form-item>
        <el-form-item label="详细地址" prop="detail">
          <el-input type="textarea" v-model="ruleForm.detail"></el-input>
        </el-form-item>
        <el-form-item label="邮政编码" prop="postcode">
          <el-input v-model.number="ruleForm.postcode" maxlength="6"></el-input>
        </el-form-item>
        <el-form-item label="收货姓名" prop="name">
          <el-input type="input" v-model="ruleForm.name"></el-input>
        </el-form-item>

        <el-form-item  prop="phone" label="手机号" >
          <el-row type="flex" class=""justify="space-between">
            <el-col :span="10">
              <el-input type="input" value="中国大陆+86" readonly></el-input>
            </el-col>
            <el-col :span="13">
              <el-input type="input" v-model="ruleForm.phone"></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item  prop="default">
          <el-checkbox v-model="ruleForm.default">设置为默认收货地址</el-checkbox>
        </el-form-item>
        <div class="btnBox">
          <span @click="closePorp">取消</span>
          <span  @click="submitForm('ruleForm')">保存</span>
        </div>
      </el-form>
    </section>
    <div class="mask" v-show="addAreaBox" @click="closePorp"></div>
  </div>
</template>

<script>
  import MenuLeft from '../../components/menuLeft'
  import { provinceAndCityData, regionData, provinceAndCityDataPlus, regionDataPlus, CodeToText, TextToCode } from 'element-china-area-data'
  export default {
    name: 'userAddress',
    components: {
      MenuLeft,
    },
    data () {
      return {     
        notice: require('../../assets/img/user/notice.png'), 
        options: regionData,
        addAreaBox:false,
        CodeToText,
        ruleForm: {
          name: '',
          default: true, 
          detail: '',
          phone:'',
          city:'',
          postcode:'',
        },
        rules: {
          city: [
            { required: true, message: '请选择省市区' }
          ],
          name: [
            { required: true, message: '请输入收货姓名', trigger: 'blur' },
          ],
          phone: [
            { required: true, message: '请输入手机号', trigger: 'blur' }
          ],
          detail: [
            { required: true, message: '请填写详细地址', trigger: 'blur' }
          ],
          postcode: [
            { type: 'number', message: '邮编必须为数字', trigger: 'change' },
          ]
        },
        prov:'',
        city:'',
        dist:'',
        token:'',
        page:1,
        limit:12,
        list:[],
        count:''
      }
    },
    created(){
        let token  = this.$store.getters.getToken;
        this.token = token
        this.AddrSelect(token,this.page,this.limit)
    },
    methods: {
      submitForm(formName) { //地址提交
        this.$refs[formName].validate((valid) => {
          if (valid) {
             let {prov,city,dist,ruleForm,token} = this
             let moren = ruleForm.default
             if(moren==true){
               moren = 'y'
             }else{
               moren = 'n'
             }
            let data = {
              token,
              prov,
              city,
              dist,
              detail:ruleForm.detail,
              name:ruleForm.name,
              phone:ruleForm.phone,
              postcode:ruleForm.postcode,
              default:moren
            }
            this.$post("post",this.baseUrl+"Addr/insert",data)
            .then((res)=>{
              if(res.code==1){
                this.$message({
                  message:res.info,
                  type: 'success'
                });
                this.AddrSelect(token,1,12)
                this.addAreaBox = false                
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
      closePorp() { //关闭弹框
        this.addAreaBox=false;
      },
      cityChange(val){ //选择收货地址
        this.prov = this.CodeToText[val[0]]
        this.city = this.CodeToText[val[1]]
        this.dist = this.CodeToText[val[2]]
      }, 
      
      // 获取地址列表
      AddrSelect(token,page,limit){
        this.$post("post",this.baseUrl+"Addr/select",{
          token,
          page,
          limit
        })
          .then((res)=>{
            if(res.code==1){
              this.list = res.data.list
              this.count =  res.data.count
            }else{
              this.$message({
                message:res.info,
                type: 'warning'
              });
            }
        })
      },

      // 删除地址
      AddrDelete(id){
        
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
.contList{
  padding: 24px;
  position: relative;
}
.notice{
  background: rgba(78, 159, 91, 0.1);
  display: flex;
  align-items: center;
  height: 40px;
  padding-left: 16px;
  margin-bottom: 32px;
  img{
    width: 22px;
    height: 22px;
  }
  p{
    color: #4E9F5B;
    font-size: 14px;
    margin-left: 16px;
  }
}
.tabBox{
  width: 100%;
  table{
    th{
      height: 41px;
      line-height: 41px;
      text-align: center;
      background: #F5F6FA;
    }

    td{
      height: 45px;
      text-align: center;
      color: #333;
      max-width: 200px;

      p{
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
      }
        
    }

    .default{
      span{
        color: #4E9F5B;
        width: 84px;
        height: 34px;
        background: rgba(78, 159, 91, 0.1);
        border-radius: 4px;
        border: 1px solid #4E9F5B;
        text-align: center;
        line-height: 34px;
        display: inline-block;
      }
    }
    .btns{
      span{
        cursor: pointer;
        display: inline-block;
      }

      span:last-child{
        margin-left: 4px;
        border-left: 1px solid #666;
        padding-left: 8px;
      }
    }
  }
}

// 地址弹框
.addAreaBox{
  padding: 24px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  width: 559px;
  background: #FFFFFF;
  border-radius: 8px;
  overflow: hidden;
  min-height: 400px;
  min-width: 570px;
  z-index: 113;


  .btnBox{
    display: flex;
    align-items: center;
    justify-content: center;

    span{
      width: 85px;
      height: 34px;
      border-radius: 4px;
      color: #fff;
      text-align: center;
      line-height: 34px;
      cursor: pointer;
    }
    span:first-child{
      background: #DBDBDB;
      margin-right: 24px;
    }
    span:last-child{
      background: #4E9F5B;
    }
    
  }
  
}
</style>
