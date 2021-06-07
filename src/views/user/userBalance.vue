<template>
  <div class="main connonBg">
    <section class="center">
        <div class="crumbsHeader">
            <div class="crumbs">
                <router-link to="/"><span>首页 / </span></router-link>
                <span>余额管理</span>
            </div>
        </div>
        <div class="publicCenter">
            <MenuLeft></MenuLeft> 
            <div class="contList">
                <section class="assets">
                    <h4>我的资产</h4>
                    <div class="assetsBg">
                        <div class="tit">
                            <span>总资产</span>
                            <img :src="bill" alt="" @click="billClick">
                        </div>
                        <p>
                            <span v-if="money!=0">￥</span>
                            <span>{{money}}</span>
                        </p>
                        <div class="btns">
                            <span  @click="RechargeClick">充值</span>
                            <span  @click="recordBoxClick">消费</span>
                        </div>
                    </div>
                </section>
                <section class="billBox" v-show="billPorp">
                    <div class="tit">
                        <h4>账单记录</h4>
                        <img :src="close" alt="" @click="billClose">
                    </div>
                    <table border = "1" class="tableBox"  width="100%">
                        <tbody>
                            <tr>
                                <th>名称</th>
                                <th>购买日期</th>
                                <th>金额</th>
                                <th>状态</th>
                            </tr>
                            <tr>
                                <td>海报设计</td>
                                <td>2020-02-11</td>
                                <td>-29.00</td>
                                <td>购买成功</td>
                            </tr>
                        </tbody>   
                    </table>
                     <div class="paging">
                        <el-pagination
                            background
                            layout="prev, pager, next"
                            :total="1000">
                        </el-pagination>
                    </div>
                </section>
            </div>
        </div>
    </section>

    <!-- 充值 -->
    <rechargePorp ref="chongzhiPorp"></rechargePorp>
    <!-- 消费记录 -->
    <consumePorp ref="xiaofeiPorp"></consumePorp>
    
  </div>
</template>

<script>
import MenuLeft from '../../components/menuLeft'
import rechargePorp from '../../components/recharge'
import consumePorp from '../../components/consume'
  export default {
    name: 'user',
    components: {
      MenuLeft,
      rechargePorp,
      consumePorp
    },
    data () {
      return {
        bill: require('../../assets/img/user/bill.png'),
        close: require('../../assets/img/user/close.png'),
        billPorp:false,
        money:0,
      }
    },
    created() {
        let val = this.$store.getters.getUserInfo
        this.userinfoFn(val)
    },

    methods: {
        // 获取个人信息
        userinfoFn(val){
            let userInfo = val
            this.money = userInfo.balance
        },

        // 充值
        RechargeClick(){
            this.$refs.chongzhiPorp.onClick(true); //给子组件传递点击事件
        },
        // 消费
        recordBoxClick(){
            this.$refs.xiaofeiPorp.xiaoFeiClick(true); //给子组件传递点击事件
        },

        // 点击账单
        billClick(){
            this.billPorp = true
        },
        billClose(){
            this.billPorp = false
        },
        gotoMore(){
            this.$router.push("/news/detail");
        },

        userClose(){
            this.userPublic=false;
            this.Recharge=false;
            this.recordBox=false;
            
        },

    },
    computed:{
        headInfo: function () {
            return this.$store.getters.getUserInfo
        },
    },
    watch:{
        headInfo: function (val) {
           this.userinfoFn(val)
        },
    }
  }
</script>


<style lang="less" scoped>
  .contList {
      background: #FAFBFF;
      .assets{
          h4{
              color: #666;
              font-size: 16px;
              margin: 0 0 16px;
          }

          .assetsBg{
            background-image: url(../../assets/img/user/assetsBg1.png);
            background-repeat: no-repeat;
            width: 370px;
            height: 240px;
            background-size: cover;
            padding: 53px 30px 0;

              .tit{
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  margin-bottom: 17px;

                  img{
                      width: 32px;
                      height: 32px;
                      cursor: pointer;
                  }

                  span{
                      color: #fff;
                      font-size: 16px;
                  }
              }

              p{
                  margin-bottom: 45px;
                  span{
                      color: #fff;
                  }

                  span:first-child{
                      font-size: 24px;
                  }
                  span:last-child{
                      font-size: 34px;
                  }
              }

              .btns{
                  display: flex;
                  align-items: center;
                  span{
                    width: 64px;
                    height: 32px;
                    background: #FED857;
                    border-radius: 4px;
                    color: #333;
                    text-align: center;
                    line-height: 32px;
                    cursor: pointer;
                  }
                  span:first-child{
                      margin-right: 16px;
                  }
              }
          }
      }
  }

  .billBox{
      position: relative;
      width: 924px;
      height: 700px;

      .tit{
          display: flex;
          align-items: center;
          justify-content: space-between;
          img{
              width: 32px;
              height: 32px;
              cursor: pointer;
          }
          h4{
              color: #666;
              font-size: 16px;
              margin: 32px 0 16px;
          }
      }
      table{
          background: #fff;
          tr{
              height: 35px;
              text-align: center;
          }
      }
  }

  
</style>
