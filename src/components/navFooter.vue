<template>
  <div class="navFooter">
      <div class="center footerCenter">
        <div class="footerTop">
            <div class="footerLeft">
                    <div class="link">
                        <el-link>广告印刷</el-link>
                        <el-link>包装印刷</el-link>
                        <el-link>画册印刷</el-link>
                        <el-link>厂家价格定做定制各类企业宣传册</el-link>
                        <el-link>产品手册</el-link>
                        <el-link>笔记本</el-link>
                        <el-link>纪念册</el-link>
                        <el-link>手提袋</el-link>
                        <el-link>海报</el-link>
                        <el-link>点菜单</el-link>
                        <el-link>不干胶</el-link>
                        <el-link>红包对联</el-link>
                        <el-link>包装盒</el-link>
                    </div>
                    <div class="contact">
                        <p>电话：12341233321</p>
                        <p>QQ：12341233321</p>
                        <p>邮箱：123412333@qq.com</p>
                    </div>
                    <p class="address">地址：贵州省黔东南苗族侗族自治州施秉县衡山街40号</p>
            </div>
            <div class="footerRight">
                <span></span>
                <p>微信公众号</p>
            </div>
        </div>
        <div class="Record">Copyright © 2021 安徽滚动永恒信息科技有公司 版权所有 备案号：皖ICP备18045741号-1</div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'navFooter',
  data () {
    return {
     
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
                padding-right: 5px;
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
            span{
                width: 63px;
                height: 63px;
                background: #666;
                display: inline-block;
            }

            p{
                color: #fff;
                font-size: 14px;
                margin-top: 16px;
            }
        }
    }
    

</style>
