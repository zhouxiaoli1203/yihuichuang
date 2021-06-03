<template>
  <div class="main connonBg">
    <section class="center">
        <div class="cont">
            <h1>设计·印刷·公关·营销一站式生态服务体系</h1>
            <p>易绘印拥有自营印刷厂和专业的设计、营销运营及技术开发人员，为了打造图文广告印刷的标准化、专业化、智绘化和惠民化的一站式服务品牌而努力。</p>
        </div>
        <ul class="uniqueNav">
            <template v-for="item in navList">
                <li :class="navActive == item.index?'active':''" @click="uniqueNav(item.index)">
                    <img :src="item.img" alt="">
                    <p>{{item.name}}</p>
                    <i class="triangle" v-if="navActive == item.index"></i>
                </li>
            </template>
        </ul>
        <div class="contentBox">
            <p class="intro">{{list[contActive].tit}}</p>
            <div :class="navActive ==6 || navActive == 4?'introBox':'flexintroBox introBox'">
                <img :src="list[contActive].img" alt="">
                <ul>
                    <template v-for="item in list">
                        <li @click="contNav(item.index)">
                            <el-radio v-model="radio" :label="item.index" border>{{item.name}}</el-radio>
                        </li>
                    </template>
                </ul>
            </div>
        </div>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'unique',
    metaInfo: {
      title: '易绘创官网企业定制服务：构建设计、印刷、公关和营销一站式生态服务体系',
      meta: [
        { name:"keywords",content:'品牌设计,包装设计,电商设计,网站设计,品牌策划,公关传媒,文创,易绘创'},
        { name:"description",content:'易绘创（yihuichuang.com）企业定制服务：能够满足企业私人定制的需求，涉及品牌设计、包装设计、电商设计、网站设计、品牌策划、公关传媒和文创等，构建设计、印刷、公关和营销一站式生态服务体系。' },

      ]
    },
    data () {
      return {
        icon1: require('../../assets/img/unique/icon1.png'),
        icon2: require('../../assets/img/unique/icon2.png'),
        icon3: require('../../assets/img/unique/icon3.png'),
        icon4: require('../../assets/img/unique/icon4.png'),
        icon5: require('../../assets/img/unique/icon5.png'),
        icon6: require('../../assets/img/unique/icon6.png'),
        radio: 0,
        navActive:1,
        navList:[
            {
                img:require('../../assets/img/unique/icon1.png'),
                name:'品牌设计',
                index:1
            },
            {
                img:require('../../assets/img/unique/icon2.png'),
                name:'包装设计',
                index:2
            },
            {
                img:require('../../assets/img/unique/icon3.png'),
                name:'电商设计',
                index:3
            },
            {
                img:require('../../assets/img/unique/icon4.png'),
                name:'网站设计',
                index:4
            },
            {
                img:require('../../assets/img/unique/icon5.png'),
                name:'品牌策划',
                index:5
            },
            {
                img:require('../../assets/img/unique/icon6.png'),
                name:'公关传媒',
                index:6
            }
        ],
        contActive:0,
        list:[
            {
                tit:'让您的企业形象深入人心',
                name:'LOGO设计',
                img:require('@/assets/img/unique/pinpai1.png'),
                index:0
            },
            {
                tit:'构建烙印消费者大脑的视觉锤',
                name:'VI设计',
                img:require('@/assets/img/unique/pinpai2.png'),
                index:1
            },
            {
                tit:'让品牌变身“吸粉神器”',
                name:'吉祥物设计',
                img:require('@/assets/img/unique/pinpai3.png'),
                index:2
            },
            {
                tit:'“看脸”时代企业的移动门面',
                name:'宣传品设计',
                img:require('@/assets/img/unique/pinpai4.png'),
                index:3
            }
        ]
      }
    },
    methods: {
        // 导航切换
        uniqueNav(index){
            this.navActive = index
            this.contActive = 0
            this.radio = 0
            if(index==1){
                this.list=[
                    {
                        tit:'让您的企业形象深入人心',
                        name:'LOGO设计',
                        img:require('@/assets/img/unique/pinpai1.png'),
                        index:0
                    },
                    {
                        tit:'构建烙印消费者大脑的视觉锤',
                        name:'VI设计',
                        img:require('@/assets/img/unique/pinpai2.png'),
                        index:1
                    },
                    {
                        tit:'让品牌变身“吸粉神器”',
                        name:'吉祥物设计',
                        img:require('@/assets/img/unique/pinpai3.png'),
                        index:2
                    },
                    {
                        tit:'“看脸”时代企业的移动门面',
                        name:'宣传品设计',
                        img:require('@/assets/img/unique/pinpai4.png'),
                        index:3
                    }
                ]
            }
            if(index==2){
                this.list=[
                    {
                        tit:'行走的品牌广告',
                        name:'包装袋设计',
                        img:require('@/assets/img/unique/baozhuang1.png'),
                        index:0
                    },
                    {
                        tit:'为产品销量保驾护航',
                        name:'包装盒设计',
                        img:require('@/assets/img/unique/baozhuang2.png'),
                        index:1
                    },
                    {
                        tit:'节庆货架上的畅销秘诀',
                        name:'礼盒设计',
                        img:require('@/assets/img/unique/baozhuang3.png'),
                        index:2
                    },
                    {
                        tit:'人手一瓶的实用美学',
                        name:'瓶型设计',
                        img:require('@/assets/img/unique/baozhuang4.png'),
                        index:3
                    }
                ]
            }
            if(index==3){
                this.list=[
                    {
                        tit:'网店销量好不好也要看门面',
                        name:'店铺首页设计',
                        img:'',
                        index:0
                    },
                    {
                        tit:'突出产品特征，已用户视觉设计页面',
                        name:'产品详情页设计',
                        img:'',
                        index:1
                    },
                    {
                        tit:'用设计带动活动销量',
                        name:'活动专题页设计',
                        img:'',
                        index:2
                    },
                    {
                        tit:'没有点设计功底如何玩转电商运营',
                        name:'运营素材设计',
                        img:'',
                        index:3
                    }
                ]
            }
            if(index==4){
                 this.list=[
                    {
                        tit:'为品牌产品打造专属网络名片',
                        name:'官网设计',
                        img:require('@/assets/img/unique/wangzhan1.png'),
                        index:0
                    },
                    {
                        tit:'方便实用的移动推广手册',
                        name:'H5设计',
                        img:require('@/assets/img/unique/wangzhan2.png'),
                        index:1
                    },
                    {
                        tit:'引流推广必备武器',
                        name:'落地页设计',
                        img:require('@/assets/img/unique/wangzhan1.png'),
                        index:2
                    },
                ]
            }
            if(index==5){
                 this.list=[
                    {
                        tit:'一“名”惊人，自带卖点',
                        name:'品牌命名',
                        img:'',
                        index:0
                    },
                    {
                        tit:'让您的品牌更值钱',
                        name:'品牌定位',
                        img:'',
                        index:1
                    },
                    {
                        tit:'戏剧化放大品牌价值',
                        name:'品牌故事',
                        img:'',
                        index:2
                    },
                    {
                        tit:'品牌一招制胜的杀手锏',
                        name:'品牌广告语',
                        img:'',
                        index:3
                    },
                    {
                        tit:'过目不忘，字字吸金',
                        name:'品牌文案',
                        img:'',
                        index:4
                    },
                       {
                        tit:'梳理品牌脉络，发现问题提出解决方案',
                        name:'品牌策划',
                        img:'',
                        index:5
                    },
                ]
            }
            if(index==6){
                this.list=[
                    {
                        tit:'为品牌发声，让品牌留下印记',
                        name:'日常传播维护',
                        img:'',
                        index:0
                    },
                    {
                        tit:'广告投放管家，精准投放目标人群',
                        name:'媒体广告投放',
                        img:'',
                        index:1
                    },
                ]
            }
        },
        // 内容切换
        contNav(index){
            this.contActive = index
        }
    }
  }
</script>


<style lang="less" scoped>
.main{
    padding-bottom: 83px;
}

.cont{
    h1{
        font-size: 24px;
        color: #000;
        text-align: center;
        margin-bottom: 24px;
    }
    p{
        text-align: center;
        width: 664px;
        color: #666666;
        line-height: 24px;
        margin: 0 auto;
    }
}

.uniqueNav{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 32px;
    li{
        width: 160px;
        height: 60px;
        background: #FFFFFF;
        border-radius: 8px;
        border: 1px solid #FFFFFF;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        position: relative;
        .triangle{
            width: 0;
            height: 0;
            border-top: 10px solid transparent;
            border-right: 10px solid transparent;
            border-bottom: 10px solid #fff;
            border-left: 10px solid transparent;
            position: absolute;
            left: 50%;
            bottom: -35px;
            transform: translate(-50%,0);
        }

        img{
            width: 26px;
            height: 26px;
        }
        p{
            color: #666;
            margin-left: 10px;
        }
    }
    .active{
        border: 1px solid #FF9D37
    }
}

.contentBox{
    background: #fff;
    margin-top: 34px;
    padding: 32px;
    border-radius: 8px;

    .intro{
        font-size: 16px;
        margin-bottom: 32px;
    }

    .introBox{
        display: flex;
        align-items: center;
        justify-content: space-between;
        img{
            width: 637px;
            height: 322px;
            border-radius: 10px;
        }

        ul{
            width: 340px;
            height: 322px;

            li{
                margin-bottom: 30px;
            }
        }
    }

    .flexintroBox{
        ul{
            display:flex;
            flex-flow: column; //垂直排列
            justify-content: space-between;//两端对齐

            li{
                margin-bottom: 0;
            }
        }
    }
}
  
</style>
