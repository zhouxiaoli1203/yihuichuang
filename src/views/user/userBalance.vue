<template>
  <div class="main connonBg">
    <section class="center">
        <div class="crumbsHeader">
            <div class="crumbs">
                <span @click="pathIndex()">首页 / </span>
                <!-- <span @click="pathNews()">帮助支持 /</span> -->
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
                            <img :src="bill" alt="">
                        </div>
                        <p>
                            <span>￥</span>
                            <span>323.00</span>
                        </p>
                        <div class="btns">
                            <span  @click="RechargeClick">充值</span>
                            <span  @click="recordBoxClick">消费</span>
                        </div>
                    </div>
                </section>
                <section class="billBox">
                    <div class="tit">
                        <h4>账单记录</h4>
                        <img :src="close" alt="" >
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
    <section class="modifyBox"  v-show="Recharge" >
        <div class="chargingtop">
             <div class="tit">
                <h3>充值</h3>
                <i class="el-icon-close"  @click="userClose"></i>
            </div>
            <div class="infoBox">
                <img src="" alt="">
                <div class="info">
                    <p>努力的阿发</p>
                    <span>当前余额：222.00</span>
                </div>
            </div>
        </div>
        <div class="chargingMod">
            <h2>充值金额</h2>
            <ul>
                <li class="active">
                    <p>￥<span>180.00</span></p>
                    <p>原价：<span>￥</span>200</p>
                    <span class="lab">优惠价</span>
                </li>
                <li>
                    <p>￥<span>180.00</span></p>
                    <p>原价：<span>￥</span>200</p>
                    <span class="lab">优惠价</span>
                </li>
                <li>
                    <p>￥<span>180.00</span></p>
                    <p>原价：<span>￥</span>200</p>
                    <span class="lab">优惠价</span>
                </li>
            </ul>
        </div>
        <div class="zhifuCode">
            <ul>
                <li class="active">
                    <img :src="Alipay" alt="">
                    <p>支付宝</p>
                </li>
                <li>
                    <img :src="weChat" alt="">
                    <p>微信</p>
                </li>
            </ul>
            <div class="codeBox">
                <img src="" alt="">
                <div class="info">
                   <div class="tp">
                        <div>
                            <span>￥</span>
                            <span>180.00</span>
                        </div>
                        <p>已经优惠20.00元</p>
                   </div>
                   <div class="bt">
                       <p>支持使用支付宝、微信付款方式</p>
                        <router-link :to="{path:'/user/userPicture'}"  class="link">《易慧创服务协议》</router-link>
                   </div>
                </div>
            </div>
        </div>
    </section>
    <!-- 消费记录 -->
    <div class="recordBox" v-show="recordBox">
        <div class="tp">
            <h2>消费记录</h2>

            <img :src="close" alt="" @click="userClose">

        </div>
        <ul>
            <li>
                <div class="infoBox">
                    <img src="" alt="">
                    <div class="info">
                        <p>购买******商品消费余额***元</p>
                        <span>2021-02-11</span>
                    </div>
                </div>
                <div class="money">
                    <p>2021-02-11</p>
                    <span>成功</span>
                </div>
            </li>
             <li>
                <div class="infoBox">
                    <img src="" alt="">
                    <div class="info">
                        <p>购买******商品消费余额***元</p>
                        <span>2021-02-11</span>
                    </div>
                </div>
                <div class="money">
                    <p>2021-02-11</p>
                    <span>成功</span>
                </div>
            </li>
             <li>
                <div class="infoBox">
                    <img src="" alt="">
                    <div class="info">
                        <p>购买******商品消费余额***元</p>
                        <span>2021-02-11</span>
                    </div>
                </div>
                <div class="money">
                    <p>2021-02-11</p>
                    <span>成功</span>
                </div>
            </li>
             <li>
                <div class="infoBox">
                    <img src="" alt="">
                    <div class="info">
                        <p>购买******商品消费余额***元</p>
                        <span>2021-02-11</span>
                    </div>
                </div>
                <div class="money">
                    <p>2021-02-11</p>
                    <span>成功</span>
                </div>
            </li> <li>
                <div class="infoBox">
                    <img src="" alt="">
                    <div class="info">
                        <p>购买******商品消费余额***元</p>
                        <span>2021-02-11</span>
                    </div>
                </div>
                <div class="money">
                    <p>2021-02-11</p>
                    <span>成功</span>
                </div>
            </li>
            
            <li>
                <div class="infoBox">
                    <img src="" alt="">
                    <div class="info">
                        <p>购买******商品消费余额***元</p>
                        <span>2021-02-11</span>
                    </div>
                </div>
                <div class="money">
                    <p>2021-02-11</p>
                    <span>成功</span>
                </div>
            </li>
        </ul>
         <div class="paging">
            <el-pagination
                background
                layout="prev, pager, next"
                :total="1000">
            </el-pagination>
        </div>
    </div>
    <div class="mask" v-show="userPublic" @click="userClose"></div>
  </div>
</template>

<script>
  import MenuLeft from '../../components/menuLeft'
  export default {
    name: 'user',
    components: {
      MenuLeft,
    },
    data () {
      return {
        bill: require('../../assets/img/user/bill.png'),
        close: require('../../assets/img/user/close.png'),
        Alipay: require('../../assets/img/user/Alipay.png'),
        weChat: require('../../assets/img/user/weChat.png'),
        userPublic: false,
        recordBox:false,
        Recharge:false
      }
    },
    methods: {
        // 充值
        RechargeClick(){
            this.userPublic=true
            this.Recharge=true
        },
        // 消费
        recordBoxClick(){
            this.userPublic=true
            this.recordBox=true
        },
        gotoMore(){
            this.$router.push("/news/detail");
        },
        // 点击首页
        pathIndex(){
            this.$store.state.currentIndex = '/index';
            this.$router.push("/index");
        },

        userClose(){
            this.userPublic=false;
            this.Recharge=false;
            this.recordBox=false;
            
        },

    }
  }
</script>


<style lang="less" scoped>
  .contList {
      background: #f6f6f6;
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

  .modifyBox{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 35%;
    background: #FFFFFF;
    border-radius: 8px;
    overflow: hidden;
    min-height: 400px;
    min-width: 570px;
    z-index: 11;

    .chargingtop{
        height: 108px;
        background: linear-gradient(132deg, #86CD94 0%, #4E9F5B 100%);
        border-radius: 8px 8px 0px 0px;
        padding: 16px;
        
        .tit{
            display: flex;
            align-items: center;
            justify-content: space-between;
            
            h3{
                font-size: 16px;
                color: #333;
            }
            i{
                font-size: 24px;
                color: #fff;
                cursor: pointer;
            }

        }

        .infoBox{
            display: flex;
            align-items: center;
            margin-top: 13px;
            img{
                width: 36px;
                height: 36px;
                border: 1px solid #FFFFFF;
                border-radius: 50%;
                margin-right: 10px;
            }

            .info{
                color: #fff;
                p{
                    margin-bottom: 5px;
                }
            }
        }
    }

    .chargingMod{
        padding: 16px;

        h2{
            font-size: 16px;
            color: #333;
            margin-bottom: 24px;
        }
        ul{
            display: flex;
            align-items: center;
            justify-content: space-between;
            li{
                width: 30%;
                border-radius: 8px;
                border: 1px solid #D3D3D3;
                text-align: center;
                position: relative;
                padding: 6% 0;
                cursor: pointer;

                .lab{
                    position: absolute;
                    width: 62px;
                    height: 28px;
                    background: #FFAC48;
                    border-radius: 0px 8px 0px 15px;
                    color: #fff;
                    top: 0;
                    right: 0;
                    text-align: center;
                    line-height: 28px;
                }

                p:first-child{
                    color: #FF2828;
                    margin-bottom: 17px;
                    span{
                        font-size: 24px;
                    }
                }
                p:nth-child(2){
                   text-decoration: line-through;
                   color: #333;
                }
            }
            .active{
                background: rgba(78, 159, 91, 0.08);
                border: 1px solid #4E9F5B;
            }
        }
    }

    .zhifuCode{
        border-radius: 8px;
        border: 1px solid #CBCFE3;
        margin: 16px;
        display: flex;
        align-items: center;
        height: 206px;
        overflow: hidden;
        ul{
            width: 121px;
            background: #F6F6F6;
            height: 100%;
        }
        li{
            display: flex;
            align-items: center;
            height: 44px;
            justify-content: center;
            cursor: pointer;
            
            img{
                width: 17px;
                height: 17px;
            }
            p{
                width: 50px;
                text-align: left;
                margin-left: 15px;
            }
        }
        .active{
            background: #fff;
            border: 1px solid rgba(78, 159, 91, 0.41);
        }

        .codeBox{
            display: flex;
            align-items: center;
            margin-left: 41px;
            img{
                width: 111px;
                height: 111px;
                margin-right: 16px;
            }
        }
        .tp{
            display: flex;
            align-items: center;
            div{
                margin-right: 8px;
                color: #FF2D2D;
                span:first-child{
                    font-size: 16px;
                }
                span:last-child{
                    font-size: 24px;
                    margin-left: -5px;
                    display: inline-block;
                }
            }

            p{
                color: #DF8F2D;
            }
        }
        .bt{
            p{
                color: #333;
                margin-top: 8px;
                margin-bottom: 31px;
            }

            .link{
                color: #999999;
            }
        }
    }

  
   
    
  }

  .recordBox{
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        width: 550px;
        background: #FFFFFF;
        border-radius: 8px;
        z-index: 11;
        padding: 16px;
        min-height: 570px;

        .tp{
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid #F5F6FA;
            padding-bottom: 16px;
            h2{
                font-size: 16px;
            }
            img{
                width: 24px;
                height: 24px;
                cursor: pointer;
            }
        }
        ul{
            li{
                display: flex;
                align-items: center;
                padding: 13px 0;
                border-bottom: 1px solid #F5F6FA;

                .infoBox{
                    flex: 1;
                    margin-right: 16px;
                    display: flex;
                    align-items: center;

                    img{
                        width: 42px;
                        height: 42px;
                        border-radius: 50%;
                        margin-right: 16px;
                    }

                    p{
                        font-size: 16px;
                        color: #333;
                        margin-bottom: 18px;
                    }
                    span{
                        color: #999999;
                    }
                }
                .money{
                    text-align: right;
                    p{
                        font-size: 16px;
                        color: #333;
                        margin-bottom: 18px;
                    }
                    span{
                        color: #999999;
                    }
                }
            }
        }

        .paging{
            position: absolute;
            left: 50%;
            transform: translate(-50%,0);
            bottom: 16px;
        }
  }

   .mask{
      position: fixed;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
    }
</style>
