<template>
  <div class="main connonBg">
    <section class="center">
        <div class="crumbsHeader">
          <div class="crumbs">
              <router-link to="/"><span>首页 / </span></router-link>
              <span>发票管理</span>
          </div>
          <div class="operateBox">
            <span class="add" @click="BillingPorp = true">开发票</span>
          </div>
        </div>
        <div class="publicCenter">
            <MenuLeft></MenuLeft> 
            <div class="contList">
              <template v-if="list!=''">
                <div class="tabBox">
                  <table border = "1" class="tableBox"  width="100%">
                    <tbody>
                      <tr>
                        <th>公司名称</th>
                        <th> 金额（元）</th>
                        <th>发票类型</th>
                        <th>申请时间</th>
                        <th>状态</th>
                        <th>操作</th>
                      </tr>
                      <tr v-for="item in list">
                        <td>{{item.title}}</td>
                        <td>{{item.money/100}}</td>
                        <td>{{item.type}}</td>
                        <td>{{item.create_time  | formatDate_('yyyy-MM-dd hh:mm:ss') }}</td>
                        <td v-if="item.state=='申请完成'">{{item.state}}</td>
                        <td v-else class="waittd">{{item.state}}</td>
                        <td class="default" v-if="item.state=='申请完成'">
                          <span @click="downloadClick(item.download)">下载</span>
                        </td>
                        <td class="wait" v-else>
                          <span>下载</span>
                        </td>
                      </tr>
                    </tbody>   
                  </table>
                </div>
                <div class="paging">
                    <el-pagination
                        background
                        @current-change="handleCurrentChange"
                        layout="prev, pager, next"
                        :page-size="limit"
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

    

    <section class="publicPorp BillingPorp"  v-show="BillingPorp">
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="开具类型" prop="type">
          <el-radio-group v-model="form.type" class="radioPublic">
            <el-radio label="增值税普通发票"></el-radio>
            <el-radio label="增值税专用发票"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="发票抬头" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="税务登记证号" prop="number">
          <el-input v-model="form.number" placeholder="请输入税务登记账号"></el-input>
        </el-form-item>
        <el-form-item label="开户银行名称" prop="bank_name">
          <el-input v-model="form.bank_name" placeholder="请输入开户银行名称"></el-input>
        </el-form-item>
        <el-form-item label="基本开户账号" prop="bank_account">
          <el-input v-model="form.bank_account" placeholder="请输入基本开户账号"></el-input>
        </el-form-item>
        <el-form-item label="注册场所地址" prop="reg_addr">
          <el-input v-model="form.reg_addr" placeholder="请输入注册场所地址"></el-input>
        </el-form-item>
        <el-form-item label="注册手机号码" prop="reg_phone">
          <el-input v-model="form.reg_phone" placeholder="请输入注册手机号码"></el-input>
        </el-form-item>
        <el-form-item label="开票金额" prop="money">
          <el-input v-model="form.money" placeholder="请输入注册开票金额"></el-input>
        </el-form-item>
        <el-form-item class="btnBox buttonBox">
          <el-button @click.prevent="closePorp" class="span"  v-button>取消</el-button>
          <el-button @click.prevent="submitForm('form')" class="span" v-button>提交</el-button>
        </el-form-item>
      </el-form>
    </section>
    <div class="mask" v-show="BillingPorp" @click="closePorp"></div>
  </div>
</template>

<script>
  import MenuLeft from '../../components/menuLeft'
  export default {
    name: 'userInvoice',
    components: {
      MenuLeft,
    },
    data () {
      return {     
        notice: require('../../assets/img/user/notice.png'), 
        BillingPorp:false,
        form: {
          type: '', //开票类型
          title: '',
          number: '',
          bank_name: '',
          bank_account: '',
          reg_addr:'',
          reg_phone: '',
          money: ''
        },
        rules: {
          type: [
            { required: true, message: '请选择开具类型', trigger: 'change' }
          ],
          title: [
            { required: true, message: '请输入发票抬头', trigger: 'blur' },
          ],
          number: [
            { required: true, message: '请输入税务登记证号', trigger: 'blur' },
          ],
          bank_name: [
            { required: true, message: '请输入开户银行名称', trigger: 'blur' },
          ],
          bank_account: [
            { required: true, message: '请输入基本开户账号', trigger: 'blur' },
          ],
          reg_addr: [
            { required: true, message: '请输入注册场所地址', trigger: 'blur' },
          ],
          reg_phone: [
            { required: true, message: '请输入注册手机号码', trigger: 'blur' },
          ],
          money: [
            { required: true, message: '请输入开票金额', trigger: 'blur' },
          ],
          
        },
        token:'',
        page:1,
        limit:15,
        list:[],
        count:0,
        noCont:false
        
      }
    },
    created(){
        let token  = this.$store.getters.getToken;
        this.token = token
        this.InvoiceSelect(token,this.page,this.limit)
    },
    methods: {

      closePorp() { //关闭弹框
        this.BillingPorp=false;
      },

      // 提交开发票
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let {form,token,page,limit} = this
            let data = {
              token,
              type:form.type,
              title:form.title,
              number:form.number,
              bank_name:form.bank_name,
              bank_account:form.bank_account,
              reg_addr:form.reg_addr,
              reg_phone:form.reg_phone,
              money:form.money*100
            }
            this.$post("post","Invoice/insert",data).then((res)=>{
              if(res.code==1){
                this.$message({
                  message:res.info,
                  type: 'success'
                });
                this.InvoiceSelect(token,page,limit)
                this.BillingPorp = false
                this.$refs[formName].resetFields();            
              }
            })
          }
        });
      },
    

      // 获取发票列表
      InvoiceSelect(token,page,limit){
        this.$post("post","Invoice/select",{
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

      // 点击页数
      handleCurrentChange(val) {
          this.page = val
          let {token,limit} = this
          this.InvoiceSelect(token,val,limit)
      },

      //点击下载
      downloadClick(url){
        window.open(url,'download');
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
  background: #fff;
}

.tabBox{
  width: 100%;
  table{
    th{
      height: 41px;
      line-height: 41px;
      text-align: center;
    }

    td{
      height: 45px;
      text-align: center;
      color: #333;
    }

    .waittd{
      color: #999;
    }

    .default{
      span{
        color: #4E9F5B;
        cursor: pointer;
      }
    }

    .wait{
       span{
        color: #4e9f5b54;
      }
    }
  }
}

.BillingPorp{
  width: 520px;
  background: #fff;
  padding: 24px
}
</style>
