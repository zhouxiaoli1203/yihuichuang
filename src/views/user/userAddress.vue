<template>
  <div class="main connonBg">
    <section class="center">
        <div class="crumbsHeader">
          <div class="crumbs">
              <router-link to="/"><span>首页 / </span></router-link>
              <span>收货地址</span>
          </div>
          <div class="operateBox">
            <template v-if="Number(count)>=20">
              <span class="add" @click="addNum">添加</span>
            </template>
            <template v-else>
              <span class="add" @click="addAreaBox = true">添加</span>
            </template>
          </div>
        </div>
        <div class="publicCenter">
            <MenuLeft></MenuLeft> 
            <div class="contList">
              <template v-if="list!=''">
                <div class="notice">
                  <img :src="notice" alt="">
                  <p>已保存{{count}}条地址，还能保存{{20-Number(count)}}条地址</p>
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
                          <span @click="AddrUpdate(item.id)">修改</span>
                          <span @click="AddrDelete(item.id)">删除</span>
                        </td>
                        <td class="default" v-if="item.default=='y'">
                          <span>默认地址</span>
                        </td>
                        <td class="cursor_p sheMoren" v-else @click="AddDefault(item.id)">设为默认地址</td>
                      </tr>
                      
                    </tbody>   
                  </table>
                </div>
                <div class="paging">
                    <el-pagination
                        background
                        @current-change="handleCurrentChange"
                        layout="prev, pager, next"
                        :page-size="13"
                        :total="count">
                    </el-pagination>
                </div>
              </template>
              <div v-if="noCont==true" class="NoCont">
                <img src="@/assets/img/common/noCont.png" alt="">
                <span>暂无数据</span>
              </div>
            </div>
        </div>
    </section>


    <section class="addAreaBox publicPorp" v-show="addAreaBox">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" @submit.native.prevent>
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
          <el-input type="textarea" v-model="ruleForm.detail" placeholder="请输入详细地址"></el-input>
        </el-form-item>
        <el-form-item label="邮政编码" prop="postcode">
          <el-input v-model="ruleForm.postcode" maxlength="6" placeholder="请输入邮政编码"></el-input>
        </el-form-item>
        <el-form-item label="收货姓名" prop="name">
          <el-input type="input" v-model="ruleForm.name" placeholder="请输入收货姓名"></el-input>
        </el-form-item>

        <el-form-item  prop="phone" label="手机号" class="phoneCodeBOX">
          <el-row type="flex" justify="space-between">
            <el-col :span="10" class="phoneCode">
              <!-- <el-input type="input" value="中国大陆+86" readonly></el-input> -->
              中国大陆+86
            </el-col>
            <el-col :span="13">
              <el-input type="input" v-model="ruleForm.phone" maxlength="13" minlength="11" placeholder="请输入手机号/座机号"></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item  prop="default">
          <el-checkbox v-model="ruleForm.default">设置为默认收货地址</el-checkbox>
        </el-form-item>
        <el-form-item class="btnBox buttonBox">
            <el-button @click.prevent="closePorp" class="span" >取消</el-button>
            <el-button @click.prevent="submitForm('ruleForm')" class="span" v-button>保存</el-button>
          </el-form-item>
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
      var postcodeRule = (rule,value,callback) => {
        if(value){
          console.log(value)
          let values = value.replace('/(^\s*)|(\s*$)','')  //去除字符串前后空格
          let num = Number(values)  //将字符串转换为数
          if(isNaN(num)){  //判断是否是非数字
            callback(new Error('邮编必须为数字'));
          }else if(value === ''|| value === null){  //空字符串和null都会被当做数字
            callback(new Error('邮编必须为数字类型'));
          }else{
            console.log(value.length)
            if(value.length==6){
              callback();
            }else{
              callback(new Error('邮编必须是6为数'));
            }
          }
        }else{
          callback();
        }
      };
      var checkPhone = (rule, value, callback) => {
	      if (value === '') {
	        callback(new Error('请输入联系人电话'));
	      } else {
	        let regPone = null;
	        let mobile = /^1(3|4|5|6|7|8|9)\d{9}$/; //最新16手机正则
	        let tel = /^(0[0-9]{2,3}\-)([2-9][0-9]{4,7})+(\-[0-9]{1,4})?$/; //座机
	        if (value.charAt(0) == 0) {    // charAt查找第一个字符方法，用来判断输入的是座机还是手机号
	          regPone = tel;
            if (!regPone.test(value)) {
              return callback(
                new Error("电话错误(座机格式'区号-座机号码')")
              );
            }  
	        } else {          
	          regPone = mobile;
            if (!regPone.test(value)) {
              return callback(
                new Error("手机号格式不正确")
              );
            } 
	        }
	        callback();        
	      }
	    };
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
            { required: true, validator: checkPhone, trigger: 'blur' }
          ],
          detail: [
            { required: true, message: '请填写详细地址', trigger: 'blur' }
          ],
          postcode: [
            { required: false, validator: postcodeRule, trigger: "blur"}
          ]
        },
        prov:'',
        city:'',
        dist:'',

        prov_code:'',
        city_code:'',
        dist_code:'',


        token:'',
        page:1,
        limit:13,
        list:[],
        count:0,
        AddModifyid:'',
        noCont:false
        
      }
    },
    created(){
        let token  = this.$store.getters.getToken;
        this.token = token
        this.AddrSelect(token,this.page,this.limit)
    },
    methods: {
      submitForm(formName) { //地址提交及修改
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let {prov,city,dist,ruleForm,token, AddModifyid,page,limit,prov_code,city_code,dist_code} = this
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
              prov_code,
              city_code,
              dist_code,
              detail:ruleForm.detail,
              name:ruleForm.name,
              phone:ruleForm.phone,
              postcode:ruleForm.postcode,
              default:moren,
              id:AddModifyid
            }
            let url = ''
            if(AddModifyid==''){
              url = "Addr/insert"
            }else{
              url = "Addr/update"
            }
            this.$post("post",url,data)
            .then((res)=>{
              if(res.code==1){
                this.$message({
                  message:res.info,
                  type: 'success'
                });
                this.AddrSelect(token,page,limit)
                this.addAreaBox = false
                this.AddModifyid = ''
                this.$refs[formName].resetFields();  
                this.ruleForm.city = ''              
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
        console.log(111111111);
        this.addAreaBox=false;
        this.AddModifyid = '' 
        this.$refs.ruleForm.resetFields();
        this.ruleForm.city = ''
      },
      cityChange(val){ //选择收货地址
      console.log(val);
        this.prov = this.CodeToText[val[0]]
        this.city = this.CodeToText[val[1]]
        this.dist = this.CodeToText[val[2]]

        this.prov_code = val[0]
        this.city_code = val[1]
        this.dist_code = val[2]


      }, 
      
      // 获取地址列表
      AddrSelect(token,page,limit){
        this.$post("post","Addr/select",{
          token,
          page,
          limit
        })
        .then((res)=>{
          if(res.code==1){
            this.list = res.data.list
            this.count =  res.data.count
            if(res.data.list.length==0){
              this.noCont = true
            }else{
              this.noCont = false
            }

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
        let {token, page, limit } = this
        this.confirm_pop("确认删除该条地址？").then(res=>{
          this.$post("post","Addr/delete",{
            token,
            id,
          })
          .then((res)=>{
            if(res.code==1){
              this.AddrSelect(token,page,limit)
              this.$message({
                  type: 'success',
                  message: '删除成功!'
              });
            }else{
              this.$message({
                message:res.info,
                type: 'warning'
              });
            }
          })
        })
      },

      // 获取地址信息
      AddrUpdate(id){
        this.AddModifyid = id    
        this.addAreaBox=true;
        let {token, page, limit } = this
        this.$post('post','Addr/get',{
          token,
          id
        })
        .then((res)=>{
          let data = res.data
          if(res.code==1){
            this.ruleForm={
              name:data.name,
              default:data.default=='y'?true:false, 
              detail: data.detail,
              phone:data.phone,
              city:[data.prov_code, data.city_code, data.dist_code],
              postcode:data.postcode,
            },
            this.prov = data.prov
            this.city = data.city
            this.dist = data.dist

            this.prov_code = data.prov_code
            this.prov_code = data.prov_code
            this.prov_code = data.prov_code


          }else{
            this.$message({
              message:res.info,
              type:'warning'
            })
          }
        })
      },
      // 设为默认地址
      AddDefault(id){
        this.confirm_pop("是否设置该条为默认地址？").then(res=>{
          let {token, page, limit } = this
          this.$post("post","Addr/update",{
            token,
            id,
            default:'y'
          })
          .then((res)=>{
            if(res.code==1){
              this.AddrSelect(token,page,limit)
              this.$message({
                  type: 'success',
                  message: '设置成功!'
              });
            }else{
              this.$message({
                message:res.info,
                type: 'warning'
              });
            }
          })
        })
      },
      // 点击页数
      handleCurrentChange(val) {
          this.page = val
          let {token,limit} = this
          this.AddrSelect(token,val,limit)
      },
      addNum(){
        this.$message({
          message: '只能添加20条地址哦，当前条数等于20条',
          type: 'warning'
        });
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
  background: #fff;
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

      span:hover{
        color: #4E9F5B;
      }

      span:last-child{
        margin-left: 4px;
        border-left: 1px solid #666;
        padding-left: 8px;
      }
    }

    .sheMoren:hover{
      color: red;
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

    button{
      width: 85px;
      height: 34px;
      border-radius: 4px;
      color: #fff;
      text-align: center;
      line-height: 34px;
      cursor: pointer;
    }
    button:first-child{
      background: #DBDBDB;
      margin-right: 24px;
    }
    button:last-child{
      background: #4E9F5B;
    }
    
  }

  .phoneCode{
    border-radius: 4px;
    border: 1px solid #DCDFE6;
    text-align: center;
  }





}
</style>
