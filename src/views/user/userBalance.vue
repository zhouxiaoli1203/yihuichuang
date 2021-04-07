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
                        <div class="btn">
                            <span>充值</span>
                            <span>消费</span>
                        </div>
                    </div>
                </section>
                <section class="billBox">
                    <div class="tit">
                        <h4>账单记录</h4>
                        <img :src="close" alt="">
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

    <!-- 修改资料弹框 -->
    <section class="modifyBox"  v-show="userPublic" >
        <div class="chargingtop">
             <div class="tit">
                <h3>充值</h3>
                <i class="el-icon-close"></i>
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
                <li>
                    <p>￥<span>180.00</span></p>
                    <p>原价：<span>￥</span>200</p>
                    <span class="lab">优惠价</span>
                </li>
            </ul>
        </div>
        <div class="">
            
        </div>
    </section>
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
        dialogImageUrl: '',
        dialogVisible: false,
        userPublic: false,
      }
    },
    methods: {
        gotoMore(){
            this.$router.push("/news/detail");
        },
        // 点击首页
        pathIndex(){
            this.$store.state.currentIndex = '/index';
            this.$store.state.indexHome = '/index';
            this.$router.push("/index");
        },

        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            // this.dialogVisible = true;
        },
        userClose(){
            this.userPublic=false
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

              .btn{
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
    width: 30%;
    // height: 521px;
    height: 50%;
    background: #FFFFFF;
    border-radius: 8px;
    overflow: hidden;
    min-height: 400px;
    min-width: 450px;
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
        }
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
