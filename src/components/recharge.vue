<template>
    <div>
        <section  class="modifyBox publicPorp" v-show="recharge">
            <div class="chargingtop">
                <div class="tit">
                    <h3>充值</h3>
                    <i class="el-icon-close"  @click="userClose"></i>
                </div>
                <div class="infoBox">
                    <img :src="face" alt="">
                    <div class="info">
                        <p>{{nickname}}</p>
                        <span>当前余额：{{money}}</span>
                    </div>
                </div>
            </div>
            <div class="chargingMod">
                <h2>充值金额</h2>
                <ul>
                    <li v-for="item in categoryList" :class="activeIndex == item.val?'active':''" @click="categoryClick(item.val)">
                        <p>￥<span>{{item.price}}</span></p>
                        <p>原价：<span>￥</span>{{item.costPrice}}</p>
                        <span class="lab">优惠价</span>
                    </li>
                </ul>
            </div>
            <div class="zhifuCode">
                <ul>
                    <li v-for="item in paymode" :class="paymodeIndex == item.val?'active':''" @click="paymodeClick(item.val)">
                        <!-- <img :src="item.img" alt=""> -->
                        <div id="qrcode" ref="qrcode"></div>
                        <p>{{item.name}}</p>
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
                        <router-link :to="{path:'/user/userPicture'}"  class="link">《易绘创服务协议》</router-link>
                    </div>
                    </div>
                </div>
            </div> 
        </section>
        <div class="mask" v-show="recharge" @click="userClose"></div>
    </div>
</template>

<script>
import QRCode from 'qrcodejs2'
export default {
    name: 'recharge',
    props:{},
    data() {
        return {
            recharge:false,
            face: require('../assets/img/common/head.png'),
            nickname:'',
            money:0,
            activeIndex:'A',
            categoryList:[
                {
                    price:180.00,
                    costPrice:200,
                    val:'A'
                },
                {
                    price:180,
                    costPrice:160.00,
                    val:'B'
                },
                {
                    price:150.00,
                    costPrice:200,
                    val:'C'
                }
            ],
            paymodeIndex:'alipay',
            paymode:[
                {
                    name:'支付宝',
                    img:require('@/assets/img/user/Alipay.png'),
                    val:'alipay'
                },
                {
                    name:'微信',
                    img:require('@/assets/img/user/weChat.png'),
                    val:'wxpay'
                },
            ],
            token:'',
        }
    },
    components: {
        QRCode
    },
    created() {
        let val = this.$store.getters.getUserInfo
        this.userinfoFn(val)
        let token  = this.$store.getters.getToken;
        this.token = token
    },
    mounted() {},
    methods: {
        qrcodeScan(text) {//生成二维码
            let qrcode = new QRCode('qrcode', {  
                width: 111,  // 二维码宽度 
                height: 111, // 二维码高度
                text,
                correctLevel : QRCode.CorrectLevel.H
            })  
        },
        // 父组件的点击事件
        onClick(param){
            this.recharge = true
            if(param == true){
                this.BillCz(this.paymodeIndex,this.activeIndex);
            }
        },
        userClose(){ 
            this.recharge = false
        },
        // 获取个人信息
        userinfoFn(val){
            let userInfo = val
            this.face = userInfo.face
            this.nickname = userInfo.nickname
            this.money = userInfo.balance
        },

        // 切换套餐
        categoryClick(val){
            this.activeIndex = val
            this.BillCz(this.paymodeIndex,val);
        },
        // 切换支付方式
        paymodeClick(val){
            this.paymodeIndex = val
            this.BillCz(val,this.activeIndex);
        },

        // 余额充值
        BillCz(paymode,category){
            this.$post('post','Bill/cz',{
                token:this.token,
                paymode,
                category
            }).then((res)=>{
                console.log(res);
                this.qrcodeScan(res.data.code_url)
            });
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
<style lang='less' scoped>
 .modifyBox{
    width: 35%;
    background: #FFFFFF;
    overflow: hidden;
    min-height: 400px;
    min-width: 570px;

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
</style>
