<template>
  <div class="navFooter">
      <div class="center footerCenter">
        <div class="footerTop">
            <div class="footerLeft">
                    <div class="link">
                        <el-link :underline="false" v-for="(item,index) in linkLIst" :key="index">{{item}}</el-link>
                    </div>
                    <div class="contact">
                        <p>电话：400 049 9904</p>
                        <p>手机：13155613029</p>
                        <p>微信：yihuichuang001</p>
                        <p>QQ：474336503</p>
                        <p>邮箱：474336503@qq.com</p>
                    </div>
                    <p class="address">地址：安徽省淮北市相山区古城路与洪山路交叉口红绿灯路口 68-5号</p>
            </div>
            <div class="footerRight">
                <img src="@/assets/img/common/kefuCode.jpg" alt="">
                <p>联系客服</p>
            </div>
        </div>
        <div class="Record">Copyright © 2021 安徽印屿设广告传媒有限公司 版权所有 备案号：皖ICP备18045741号-1</div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'navFooter',
  data () {
    return {
        linkLIst:['广告印刷','包装印刷','画册印刷','厂家价格定做定制各类企业宣传册','产品手册','笔记本','纪念册','手提袋','海报','点菜单','不干胶','红包对联','包装盒']
    }
  }
}
</script>


<style lang="less" >
    .navFooter{
        background: #333333;
        height: 254px;

        .center{
            color: #fff;
        }

        .footerCenter{
            height: 254px;
            padding-top: 35px;
            .Record{
                color: #fff;
                margin:0 auto;
                text-align: center;
                border-top: 1px solid #fff;
                margin: 0 200px;
                font-size: 14px;
                margin-top: 32px;
                padding-top: 32px;
            }
        }

        .footerTop{
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .footerLeft{
            .el-link{
                color: #fff;
                font-size: 14px;
                border-right: 1px solid #fff;
                padding: 0 5px;
            }

            .contact{
                display: flex;
                align-items: center;
                justify-content: center;
                color: #fff;
                font-size: 14px;
                margin: 24px 0;

                p:not(:last-child){
                    margin-right: 35px;
                }
            }

            .address{
                text-align: center;
                color: #fff;
                font-size: 14px;
            }
        }
        .footerRight{
            margin-left: 39px;

            img{
                width: 70px;
                height: 70px;
            }

            p{
                color: #fff;
                font-size: 14px;
                margin-top: 16px;
                text-align: center;
            }
        }
    }
    

</style>
