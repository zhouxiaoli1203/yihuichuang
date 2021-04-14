<template>
  <div class="main connonBg">
    <section class="center">
        <div class="crumbsHeader">
          <div class="crumbs">
              <span @click="pathIndex()">首页 / </span>
              <!-- <span @click="pathNews()">帮助支持 /</span> -->
              <span>发票管理</span>
          </div>
          <div class="operateBox">
            <span class="add" @click="BillingPorp = true">开发票</span>
          </div>
        </div>
        <div class="publicCenter">
            <MenuLeft></MenuLeft> 
            <div class="contList">
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
                    <tr>
                      <td>安徒徒鸽网络科技有限责任公司</td>
                      <td>500.00</td>
                      <td>普通发票和增值税专用发票</td>
                      <td>2020-03-29 14:43:45</td>
                      <td>申请完成</td>
                      <td class="default">
                        <span>下载</span>
                      </td>
                    </tr>
                  </tbody>   
                </table>
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

    <section class="publicPorp BillingPorp"  v-show="BillingPorp">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="开具类型">
          <el-radio-group v-model="form.resource" class="radioPublic">
            <el-radio label="增值税普通发票"></el-radio>
            <el-radio label="增值税专用发票"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="发票抬头">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="税务登记证号">
          <el-input v-model="form.name" placeholder="请输入税务登记账号"></el-input>
        </el-form-item>
        <el-form-item label="开户银行名称">
          <el-input v-model="form.name" placeholder="请输入开户银行名称"></el-input>
        </el-form-item>
        <el-form-item label="基本开户账号">
          <el-input v-model="form.name" placeholder="请输入基本开户账号"></el-input>
        </el-form-item>
        <el-form-item label="注册场所地址">
          <el-input v-model="form.name" placeholder="请输入注册场所地址"></el-input>
        </el-form-item>
        <el-form-item label="注册手机号码">
          <el-input v-model="form.name" placeholder="请输入注册手机号码"></el-input>
        </el-form-item>
        <el-form-item label="开票金额">
          <el-input v-model="form.name" placeholder="请输入注册开票金额"></el-input>
        </el-form-item>
        <div class="btnBox">
          <span @click="closePorp">取消</span>
          <span  @click="onSubmit">提交</span>
        </div>
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
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      closePorp() { //关闭弹框
        this.BillingPorp=false;
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

    .default{
      span{
        color: #4E9F5B;
        cursor: pointer;
      }
    }
  }
}

.BillingPorp{
  width: 471px;
  background: #fff;
  padding: 24px
}
</style>
