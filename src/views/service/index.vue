<template>
  <div class="main connonBg">
    <div class="conmontBanner center">
      <img :src="banner1" alt="">
    </div>
    <section class="center">
        <ul class="serviceCenter">
            <li>
                <img :src="service1" alt="">
                <div class="cont">
                    <h1>行业模板全免费</h1>
                    <p>注册即可免费使用各行业精美模板，满足您的设计需求。脱离广告公司，完成一站式自助服务，省心又省钱</p>
                </div>
            </li>
             <li>
                <div class="cont">
                    <h1>支持自提，且全国同城配送均免费</h1>
                    <p>在平台下单印刷的用户，支持到店自提和配送，无论您在天涯海角，我们都会迅速的将产品送到您的身边（新疆和西藏等偏远地区暂不包邮）</p>
                </div>
                <img :src="service2" alt="">
            </li>
            <li>
                <img :src="service3" alt="">
                <div class="cont">
                    <h1>7天质量问题包换</h1>
                    <p>在收到货后7天内，因工厂生产导致质量问题，例如色差、内容缺失、运输破损等，可咨询客服免费重做处理。</p>
                </div>
            </li>
             <li>
                <div class="cont">
                    <h1>免费开发票</h1>
                    <p>默认免费开具增值税普通发票（电子票），15个工作内发送到指定邮箱；如需纸质发票请咨询客服；</p>
                </div>
                <img :src="service4" alt="">
            </li>
        </ul>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'service',
    metaInfo: {
      title: '易绘创官网服务保障',
      meta: [
        { name:"keywords",content:'易绘创行业模板 ,易绘创自提,免费开发票,易绘创'},
        { name:"description",content:'易绘创（yihuichuang.com）服务保障：设计模板免费使用，下单的印刷品全国包邮配送，同城支持门店自提，质量问题7天包换，免费开发票。' },

      ]
    },
    data () {
      return {
        banner1: require('../../assets/img/service/banner.jpg'),
        service1: require('../../assets/img/service/service1.jpg'),
        service2: require('../../assets/img/service/service2.jpg'),
        service3: require('../../assets/img/service/service3.jpg'),
        service4: require('../../assets/img/service/service4.jpg'),
      }
    },
    methods: {
    }
  }
</script>


<style lang="less" scoped>

.serviceCenter{

    padding-bottom: 100px;
    li{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0 77px 50px;
        img{
            width: 432px;
            height: 306px;
            border-radius: 8px;
        }

        .cont{
            width: 566px;
            h1{
                font-size: 28px;
                color: #333;
                margin-bottom: 32px;
                line-height: 56px;
                
            }
            p{
                font-size: 16px;
                line-height: 28px;
                color: #999;
            }
        }
    }
}
  
</style>
