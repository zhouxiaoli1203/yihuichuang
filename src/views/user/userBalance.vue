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
                        <h4>充值记录</h4>
                        <img :src="close" alt="" @click="billClose">
                    </div>
                    <div v-if="list.length!=0">
                        <table border = "1" class="tableBox"  width="100%">
                            <tbody>
                                <tr>
                                    <th>到账金额</th>
                                    <th>支付金额</th>
                                    <th>支付方式</th>
                                    <th>支付时间</th>
                                </tr>
                                <tr v-for="item in list">
                                    <td>{{item.balance/100}}</td>
                                    <td>{{item.money/100}}</td>
                                    <td v-if="item.type == 'wxpay'" class="type">
                                        <img src="@/assets/img/user/weChat.png" alt="">
                                        <span>微信</span>
                                    </td>
                                    <td v-else class="type">
                                        <img src="@/assets/img/user/Alipay.png" alt="">
                                        <span>支付宝</span>
                                    </td>
                                    <td>{{item.pay_time | formatDate_('yyyy-MM-dd hh:mm') }}</td>
                                </tr>
                            </tbody>   
                        </table>
                        <div class="paging">
                            <el-pagination
                                background
                                :current-page.sync="page"
                                layout="prev, pager, next"
                                @current-change="handleCurrentChange"
                                :page-size="limit"
                                :total="count">
                            </el-pagination>
                        </div>
                    </div>
                    <div v-if="noCont==true" class="NoCont" style="margin-top:50px">
                        <img src="@/assets/img/common/noCont.png" alt="">
                        <span>暂无数据</span>
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
        page:1,
        limit:2,
        list:[],
        count:0,
        noCont:false
      }
    },
    created() {
        let token  = this.$store.getters.getToken;
        this.token = token
        this.userInfoGet(token)
    },

    methods: {
        // 获取个人信息
        userInfoGet(token) {
            this.$post("post",'User/infoGet',{
                token,
            })
            .then((res)=>{
                if(res.code==1){
                    this.money = res.data.balance/100
                    this.$store.commit('setUserInfo',res.data)
                }
            })
        },

        // 充值记录
        BillCzjl(page,limit){
            this.$post("post",'Bill/czjl',{
                token:this.token,
                page,
                limit
            })
            .then((res)=>{
                if(res.code==1){
                    this.list = res.data.list
                    this.count = res.data.count
                    if(res.data.list.length==0){
                        this.noCont = true
                    }else{
                        this.noCont = false
                    }
                }
            })
        },

        // 充值
        RechargeClick(){
            this.$refs.chongzhiPorp.onClick(true); //给子组件传递点击事件
        },
        // 消费
        recordBoxClick(){
            this.$refs.xiaofeiPorp.xiaoFeiClick(true); //给子组件传递点击事件
        },

        // 充值记录
        billClick(){
            this.billPorp = true
            this.BillCzjl(this.page,this.limit);
        },

        // 点击页数
        handleCurrentChange(val) {
            this.page = val
            this.BillCzjl(val,this.limit);
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
          th{
            padding: 15px 0;
          }

          td{
              padding: 10px 0;
              img{
                  width: 25px;
                  height: 25px;
              }
          }

          .type{
              span{
                      line-height: 25px;
                  margin-left: 8px;
              }
          }
      }
  }

  
</style>
