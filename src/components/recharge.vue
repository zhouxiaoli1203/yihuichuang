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
                    <li v-for="item in categoryList" :class="activeIndex == item.val?'active':''" @click="categoryClick(item.val,item.price)">
                        <p>￥<span>{{item.price}}</span></p>
                    </li>
                </ul>
            </div>
            <div class="chargingMod zidingyiMod">
                <h2>自定义充值</h2>
                <el-input v-model="moneyinput" placeholder="请输入充值金额，最低1元" style="width:40%" @change="moneyChang" clearable></el-input>
            </div>
            <div class="zhifuCode">
                <ul>
                    <li v-for="item in paymode" :class="paymodeIndex == item.val?'active':''" @click="paymodeClick(item.val)">
                        <img :src="item.img" alt="">
                        <p>{{item.name}}</p>
                    </li>
                </ul>
                <div class="codeBox">
                    <div id="qrcode" ref="qrcode"></div>
                    <div class="info">
                    <div class="tp">
                            <div>
                                <span>￥</span>
                                <span>{{moneyNum}}</span>
                            </div>
                    </div>
                    <div class="bt">
                        <p>支持使用支付宝、微信付款方式</p>
                        <span @click="dialogVisible = true">《易绘创服务协议》</span>
                    </div>
                    </div>
                </div>
            </div> 
        </section>
        <div class="mask" v-show="recharge" @click="userClose"></div>

        <el-dialog
            class="fueuxieui"
            title="易绘创服务协议"
            :visible.sync="dialogVisible"
            width="35%"
            >
            <div v-html="info.Content"></div>
            <span slot="footer" class="dialog-footer" style="">
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
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
                    price:50.00,
                    val:'A'
                },
                {
                    price:100.00,
                    val:'B'
                },
                {
                    price:500.00,
                    val:'C'
                }
            ],
            paymodeIndex:'wxpay',
            paymode:[
                {
                    name:'微信',
                    img:require('@/assets/img/user/weChat.png'),
                    val:'wxpay'
                },
                {
                    name:'支付宝',
                    img:require('@/assets/img/user/Alipay.png'),
                    val:'alipay'
                },
            ],
            token:'',
            moneyinput:'',
            moneyNum:50,
            timer: null,
            Billid:0,
            dialogVisible: false,
            info:'',
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
        this.detail();
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
            clearInterval(this.timer)
            this.timer = null
            console.log(4111);
            this.recharge = false
        },
        // 获取个人信息
        userinfoFn(val){
            let userInfo = val
            this.face = userInfo.face
            this.nickname = userInfo.nickname
            this.money = userInfo.balance/100
        },

        // 切换套餐
        categoryClick(val,num){
            this.activeIndex = val
            this.moneyNum  = num
            this.moneyinput  = ''
            this.BillCz(this.paymodeIndex,val,'');
        },
        
        // 切换支付方式
        paymodeClick(val){
            this.paymodeIndex = val
            this.BillCz(val,this.activeIndex,this.moneyinput);
        },


        // 输入金额   
        moneyChang(val){
            if(val){
                let values = val.replace('/(^\s*)|(\s*$)','')  //去除字符串前后空格
                let num = Number(values)  //将字符串转换为数

                if(isNaN(num)){  //判断是否是非数字
                    return this.$message({
                        message: '自定义金额必须是大于1的数字',
                        type: 'warning'
                    }); 
                }
                console.log(num%1);
                if(num%1!=0){
                    return this.$message({
                        message: '自定义金额必须是大于1的整数',
                        type: 'warning'
                    }); 
                }

                if(num<1){
                    return this.$message({
                        message: '自定义金额必须大于1元',
                        type: 'warning'
                    }); 
                }
               
            }
            let {paymodeIndex} = this
            if(val!=''){
                this.activeIndex = ''
                this.moneyNum  = val
                this.moneyinput  = val
                this.BillCz(paymodeIndex,'',val);
            }else{
                this.activeIndex = 'A'
                this.moneyNum  = 50
                this.moneyinput  = ''
                this.BillCz(paymodeIndex,'A','');
            }
            
        },

        // 余额充值
        BillCz(type,category,money){
            clearInterval(this.timer)
            this.timer = null
            document.getElementById("qrcode").innerHTML = "";
            console.log(category);
            let data
            if(category==''){
                data = {
                    token:this.token,
                    type,   //支付方式
                    money:money*100,   //金额
                }
            }else{
                data = {
                    token:this.token,
                    type,   //支付方式
                    category,  //支付套餐
                }
            }
            this.$post('post','Bill/cz',data).then((res)=>{
                if(res.code==1){
                    this.qrcodeScan(res.data.code_url)
                    this.Billid = res.data.id
                    this.timer = setInterval(() => {
                        this.BillJc();
                    }, 3000)
                }
                
            });
        },

        // 检测是否充值成功
        BillJc(){
            this.$post('post','Bill/jc',
            {
                id:this.Billid
            }).then((res)=>{
                if(res.code==1){
                    let status = res.info
                    if(status=='已支付'){
                        clearInterval(this.timer)
                        this.timer = null
                        this.$message({
                            message:'充值成功',
                            type: 'success'
                        });
                        setTimeout(() => {
                            location.reload()
                        }, 1000);
                    }
                }else{
                    clearInterval(this.timer)
                    this.timer = null
                }
            });
        },

        // 服务协议
        detail(){
            this.$post("post",'Article/get',{id:'26'}).then((res)=>{
                if(res.code==1){
                    this.info = res.data
                }
            })
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
    },
    beforeDestroy() {
        console.log('关闭了');
        clearInterval(this.timer)
        this.timer = null
    },
}
</script>
<style lang='less' scoped>
 .modifyBox{
    width: 35%;
    background: #FFFFFF;
    overflow: hidden;
    min-height: 400px;
    min-width: 570px;
    max-height: 648px;
    max-width: 718px;

    .chargingtop{
        background:url(../assets/img/user/rechargeBg.png) no-repeat;
        background-size: cover;
        padding: 2% 3%;
        background-position: center;
        
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
                color: #333;
                p{
                    margin-bottom: 5px;
                    font-weight: bold;
                }
            }
        }
    }

    .chargingMod{
        padding: 3%;

        h2{
            font-size: 16px;
            color: #333;
            margin-bottom: 2%;
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
                padding: 5% 0;
                cursor: pointer;


                p:first-child{
                    color: #6E4913;
                    span{
                        font-size: 24px;
                    }
                }
            }
            .active{
                background:url(../assets/img/user/rechargeBg2.png) no-repeat;
                background-size: cover;
                background-position: center;
                border: 1px solid #6E4913;
            }
        }
    }

    .zidingyiMod{
        h2{
            margin-bottom: 2%;
        }
        padding-top: 0;
        padding-bottom: 0;
        input{
            width: 30%;
        }
    }

    .zhifuCode{
        height: 152px;
        border-radius: 8px;
        border: 1px solid #CBCFE3;
        margin: 3%;
        display: flex;
        align-items: center;
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
            #qrcode{
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

            span{
                color: #999999;
                cursor: pointer;
            }
            span:hover{
                color: #4E9F5B;
            }
        }
    }

  }
</style>
