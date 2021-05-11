<template>
  <div class='main bgray'>
    <div class="center cart-page">
      <div class="daohang clearfix">
        <div class="fl lineh34">
          <span class="main-gray">订单详情/商品详情/</span><span>购物车</span>
        </div>
        <div class="fr">
          <span class="cursor_p tip-badge" :class='{"main-red":checkedCities.length>0}'>批量删除<i class="badge" v-show="checkedCities.length>0">{{checkedCities.length*1>99?"99+":checkedCities.length}}</i></span>
        </div>
      </div>
      <div class="cart-table">
            <ul class="cart-table-head">
              <li style="width:60px;">
                <el-checkbox class="yhc-checkbox"
                             v-model="checkAll"
                             @change="checkAllFn" name="aaa">全选</el-checkbox>
              </li>
              <li class="t_a_c">商品信息</li>
              <li>材质</li>
              <li>类型</li>
              <li>数量</li>
              <li>印刷价格</li>
              <li class="t_a_c"
                  >操作</li>
            </ul>
          <div class="cart-table-content">
               <el-checkbox-group v-model="checkedCities" @change="checkedCitiesChange">
                  <el-checkbox v-for="(item,i) in fruits" :label="item.value" :key="i">
                    <div class="t_a_c" style="">
                            <img src=""
                                alt=""
                                width="56px"
                                height="56px">
                            <div class="title t_a_c"
                                style="margin:7px 0 4px 0;">三折页</div>
                            <div class="rule t_a_c">277.0mm*210.0mm</div>
                        </div>
                        <div class="lineh105">157g铜纸版·经济热销款</div>
                        <div class="lineh105">默认双面印刷不覆膜·包心折</div>
                        <div class="lineh105">99</div>
                        <div class="lineh105">{{item.price}}</div>
                        <div class="t_a_c lineh105">
                            <span class="edit-icon el-icon-edit-outline mr10"></span>
                            <span class="delete-icon el-icon-delete"></span>
                        </div>
                  </el-checkbox>
                </el-checkbox-group>
          </div>
        <div class="table-pagination">
          <el-pagination class="t_a_c"
                         background
                         layout="prev, pager, next"
                         :total="12">
          </el-pagination>
        </div>
        <div class="table-footer clearfix">
          <div class="footer-infos fl">
            <div class="select">
              <el-checkbox class="yhc-checkbox" v-model="checkAll" @change="checkAllFn"></el-checkbox><span class="main-red">已选 ({{total.count}})</span>
            </div>
            <div>
              <span>实付金额：<span class="main-red">￥{{total.price}}</span></span>
            </div>
          </div>
          <div class="fr">
            <span class="jiesuan">结算</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
        // total:{count:0,price:0},
      checkAll: false,
      fruits: [
        {
          label: 'Apple',
          value: 'apple',
          price: 2.5,
        },
        {
          label: 'Banana',
          value: 'banana',
          price: 3,
        },
        {
          label: 'Cherry',
          value: 'cherry',
          price: 5,
        },
        {
          label: 'Orange',
          value: 'orange',
          price: 1.5,
        },
      ],
      checkedCities: []
    }
  },
  components: {},
  created() {
    this.fruits.map((v) => {
      v.hasChecked = false
    })
  },
  computed: {
    total() {
      let count = 0
      let price = 0
     
      this.fruits.map((v) => {
          let jud = false;
         this.checkedCities.forEach((v_)=>{
          if(v_ == v.value){
              jud = true;
          }
      });
      if(jud){
          count += 1;
          price += v.price;
      }
      })
      return { count: count, price: price }
    },
  },
  mounted() {},
  methods: {
    checkAllFn: function () {
        if(this.checkAll){
            const arr = [];
            this.fruits.map((v) => {
                arr.push(v.value);
            })
            this.checkedCities = arr;
        }else{
            this.checkedCities = [];
        }
    },
    selectSingle: function (x) {
        },
     checkedCitiesChange(val) {
         this.checkedCities = val;
         this.checkAll = this.checkedCities.length == this.fruits.length?true:false;
        console.log(this.checkedCities);
      }
  },
}
</script>
<style lang='less' scoped>
.cart-page {
  padding-bottom: 100px;
}
.table-pagination {
  margin: 48px 0;
}
.table-footer {
  background: #fff;
  .footer-infos {
    width: 1087px;
    padding: 13px;
    height: 66px;
    line-height: 40px;
    display: flex;
    justify-content: space-between;
  }
  .jiesuan {
    width: 113px;
    height: 66px;
    line-height: 66px;
    text-align: center;
    color: #fff;
    font-size: 14px;
    background: #4e9f5b;
    display: inline-block;
  }
}
.edit-icon,
.delete-icon {
  font-size: 18px;
  display: inline-block;
  color: #666;
  cursor: pointer;
}
/deep/.cart-table{
    
    .cart-table-head{
        display: flex;
        padding: 13px;
        background:#fff;
        >li{
            width: 16.67%;
        }
    }
    .cart-table-content{
        label{
        width: 100%;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        padding: 13px;
        background: #FFFFFF;
        border-radius: 4px;
        margin-top: 24px;
        border: 1px solid transparent;
        &.is-checked{
     border: 1px solid #4E9F5B;
        }
        .el-checkbox__input {
        width: 60px;
    }
      }
      .el-checkbox__label{
          display: flex;
          width: calc(100% - 60px);
          padding-left: 0;
          >div{
              width: 16.67%;
              &.lineh105{
                  line-height: 105px;
              }
          }
      }
      .el-checkbox__input.is-checked+.el-checkbox__label{
          color:#333;
         
      }
      
    }
    
    .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
              background-color: #4E9F5B;
        border-color: #4E9F5B;
      }
      .el-checkbox__input.is-checked+.el-checkbox__label{
          color:#4E9F5B;
      }
}
</style>
