<template>
  <div class='main bgray'>
    <div class="center cart-page">
      <div class="daohang clearfix">
        <div class="fl lineh34">
          <span class="main-gray">订单详情/商品详情/</span><span>购物车</span>
        </div>
        <div class="fr">
          <span class="cursor_p tip-badge"
                :class='{"main-red":total.count>0}' @click="delShangpin('all')">批量删除<i class="badge"
               v-show="total.count>0">{{total.count*1>99?"99+":total.count}}</i></span>
        </div>
      </div>
      <div class="cart-table">
        <ul class="cart-table-head">
          <li style="width:60px;">
            <el-checkbox class="yhc-checkbox"
                         v-model="checkAll"
                         @change="checkAllFn"
                         name="aaa">全选</el-checkbox>
          </li>
          <li class="t_a_c">商品信息</li>
          <li>材质</li>
          <li class="t_a_c">类型</li>
          <li>数量</li>
          <li>印刷价格</li>
          <li class="t_a_c">操作</li>
        </ul>
        <div class="cart-table-content">
          <el-checkbox-group v-model="checkedCities"
                             @change="checkedCitiesChange">
            <el-checkbox v-for="(item,i) in cartList"
                         :label="item.id"
                         :key="i">
              <div class="t_a_c"
                   style="">
                <img :src="item.icon"
                     alt=""
                     width="56px"
                     height="56px">
                <div class="title t_a_c"
                     style="margin:7px 0 4px 0; white-space: normal;">{{item.shangpin}}</div>
                <div class="rule t_a_c">{{item.chicun}}</div>
              </div>
              <div class="lineh105 t_a_c">{{item.caizhi}}</div>
              <div class="lineh105 t_a_c j_c_c">{{item.leixing}}</div>
              <div class="lineh105">{{item.num}}</div>
              <div class="lineh105">{{item.price}}</div>
              <div class="t_a_c lineh105 j_c_c">
                <span class="edit-icon el-icon-edit-outline mr10"
                      @click.stop="editShangpin(item)"></span>
                <span class="delete-icon el-icon-delete"
                      @click.stop="delShangpin(item)"></span>
              </div>
            </el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="table-pagination">
          <el-pagination class="t_a_c"
                         background
                         layout="prev, pager, next"
                         :page-size="10"
                         :current-page="page.current"
                         @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         :total="page.total">
          </el-pagination>
        </div>
        <div class="table-footer clearfix">
          <div class="footer-infos fl">
            <div class="select">
              <el-checkbox class="yhc-checkbox"
                           v-model="checkAll"
                           @change="checkAllFn"></el-checkbox><span class="main-red ml10">已选 ({{total.count}})</span>
            </div>
            <div>
              <span>实付金额：<span class="main-red">￥{{total.price|qf}}</span></span>
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
      checkAll: false,
      page: { current: 1, total: 0 },
      checkedCities: [],
      cartList: [],
    }
  },
  components: {},
  created() {
    this.getCartList()
  },
  computed: {
    total() {
      let count = 0
      let price = 0

      this.cartList.map((v) => {
        let jud = false
        this.checkedCities.forEach((v_) => {
          if (v_ == v.id) {
            jud = true
          }
        })
        if (jud) {
          count += 1
          price += v.price * 1
        }
      })
      return { count: count, price: price }
    },
  },
  mounted() {},
  methods: {
    getCartList() {
      let this_ = this
      let param = {
        token: this.$store.getters.getToken,
        limit: 10,
        page: this_.current || 1,
      }
      this_.$post('post', 'Goods/cartSelect', param).then((res) => {
        if (res.code == 1) {
          this_.cartList = res.data.list
          this_.cartList.map((v) => {
            v.hasChecked = false
          })
          this_.page = {
            total: res.data.count,
            current: res.data.page,
          }
        }
      })
    },
    delShangpin(x) {
      let this_ = this;
      let msg="";
      if(x=='all'){
          if(this.checkedCities.length>0){
              msg = "确定批量删除订单？"
          }else{
              msg = "确定清空购物车？"
          }
      }else{
          msg="确定删除该订单？";
      }
      this_
        .confirm_pop(msg, '确认信息')
        .then(() => {
          let param = {
            token: this.$store.getters.getToken,
            ids: this_.getIds() ? this_.getIds() : undefined,
          }
        //   if(x=='all'){
        //       param["ids"] = undefined;
        //   }
          this_.$post('post', 'Goods/cartDelete', param).then((res) => {
            if (res.code == 1) {
                this_.getCartList();
              this_.$message({
                type: 'success',
                message: '删除成功',
              })
            }
          })
        })
        .catch(() => {})
    },
    getIds() {
      let str = ''
      this.checkedCities.map((t) => {
        str += t + ','
      })
      return (str = str.substring(0, str.length - 1))
    },
    handleSizeChange(val) {
      // 当pageSize发生变化后需重新查询列表
      this.getCartList()
    },
    // currentPage 改变时会触发
    handleCurrentChange(val) {
      this.current = val
      // 当currentPage发生变化后需重新查询列表
      this.getCartList()
    },
    checkAllFn: function () {
      if (this.checkAll) {
        const arr = []
        this.cartList.map((v) => {
          arr.push(v.id)
        })
        this.checkedCities = arr
      } else {
        this.checkedCities = []
      }
    },
    checkedCitiesChange(val) {
      this.checkedCities = val
      this.checkAll =
        this.checkedCities.length == this.cartList.length ? true : false
      console.log(this.checkedCities)
    },
    editShangpin:function(x){
        if(this.$store.state.token){
            this.$router.push({  //核心语句
              path:'/print/detial',   //跳转的路径
              query:{           //路由传参时push和query搭配使用 ，作用时传递参数
                  page_id:x.page_id,
                  attrId:x.id
              }
            })
        }else{
            this.$message({
                type:"warning",
                message: '请先登录!'
            });
        }
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
/deep/.cart-table {
  .cart-table-head {
    display: flex;
    padding: 13px;
    background: #fff;
    > li {
      width: 16.67%;
    }
  }
  .cart-table-content {
    label {
      width: 100%;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      padding: 13px;
      background: #ffffff;
      border-radius: 4px;
      margin-top: 24px;
      border: 1px solid transparent;
      &.is-checked {
        border: 1px solid #4e9f5b;
      }
      .el-checkbox__input {
        width: 60px;
      }
    }
    .el-checkbox__label {
      display: flex;
      width: calc(100% - 60px);
      padding-left: 0;
      > div {
        width: 16.67%;
        &.lineh105 {
        display: flex;
        align-items: center;
        white-space: normal;
        }
      }
    }
    .el-checkbox__input.is-checked + .el-checkbox__label {
      color: #333;
    }
  }

  .el-checkbox__input.is-checked .el-checkbox__inner,
  .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #4e9f5b;
    border-color: #4e9f5b;
  }
  .el-checkbox__input.is-checked + .el-checkbox__label {
    color: #4e9f5b;
  }
}
</style>
