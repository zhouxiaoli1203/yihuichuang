<template>
    <div>
        <div class="recordBox publicPorp" v-show="recordBox">
            <div class="tp">
                <h2>消费记录</h2>
                <img :src="close" alt="" @click="userClose">
            </div>
            <ul>
                <li v-for="item in 6">
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
        <div class="mask" v-show="recordBox"  @click="userClose"></div>
    </div>
</template>

<script>
export default {
    name: 'consume',
    props:{
    },
    data() {
    return {
        bill: require('../assets/img/user/bill.png'),
        close: require('../assets/img/user/close.png'),
        recordBox:false
    }
    },
    components: {},
    created() {},
    mounted() {},
    methods: {
        userClose(){ 
            this.recordBox = false
        },
        // 父组件的点击事件
        xiaoFeiClick(param){
            this.recordBox = true
            if(param == true){
            }
        },
    },
    watch:{
    }
}
</script>
<style lang='less' scoped>
.recordBox{
    width: 550px;
    background: #FFFFFF;
    border-radius: 8px;
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
</style>
