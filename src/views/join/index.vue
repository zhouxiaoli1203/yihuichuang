<template>
  <div class="main connonBg">
    <div class="conmontBanner center">
      <img :src="banner1" alt="">
    </div>
    <section class="center joinCenter">
        <!-- 哪些人适合加盟易绘创 -->
        <section class="whoJoinSection">
            <h1 class="titH1">哪些人适合加盟易绘创</h1>
            <div class="whoJoin">
                <ul class="ul1">
                    <li>有门店却不知道做什么生意</li>
                    <li>高校教职员工、学生</li>
                    <li>招投标项目负责人</li>
                    <li>传媒广告业务从业人员</li>
                </ul>
                <div class="img">
                    <img :src="join1" alt="">
                </div>
                <ul class="ul2">
                    <li>各机关、企事业单位文件资料管理人</li>
                    <li>预算不足的创业人员</li>
                    <li>想低成本投资项目进行托管</li>
                    <li>掌握大量文件资源人员</li>
                </ul>
            </div>
        </section>
        <!-- 加盟易绘创能做那些事？ -->
        <section>
            <h1 class="titH1">加盟易绘创能做那些事？</h1>
            <ul class="workUL">
                <template v-for="item in workList">
                    <li :class="item.index == activeName?'cont active':'cont'" @mouseover='navMouseOver(item.index)'>
                        <img :src="item.img" alt="">
                        <p></p>
                        <span v-if="item.index == activeName">{{item.name}}</span>
                    </li>
                </template>
            </ul>
        </section>
        <!-- 为什么要加盟易绘创 -->
        <section class="wyhJoin">
            <h1 class="titH1">为什么要加盟易绘创</h1>
            <div class="ulBox">
                 <ul>
                    <li v-for="item in brandList">
                        <div class="cont">
                            <span>{{item.name}}</span>
                            <p :class="item.col">{{item.cont}}</p>
                        </div>
                    </li>
                </ul>
                <ul>
                    <li v-for="item in brandList">{{item.self}}</li>
                </ul>
            </div>
        </section>
        <!-- 加盟流程 -->
        <section class="pathBox">
            <h1 class="titH1">加盟易绘创的流程</h1>
            <ul class="path1">
                <li>
                    <div class="info">
                        <img :src="joinIcon1" alt="">
                        <p>投资咨询</p>
                    </div>
                    <img :src="joinLink1" alt="" class="joinLink1">
                </li>
                <li>
                    <div class="info">
                        <img :src="joinIcon2" alt="">
                        <p>参观总部/体验店</p>
                    </div>
                    <img :src="joinLink1" alt="" class="joinLink1">
                </li>
                <li>
                    <div class="info">
                        <img :src="joinIcon3" alt="">
                        <p>确定加盟意向</p>
                    </div>
                    <img :src="joinLink1" alt="" class="joinLink1">
                </li>
                <li>
                    <div class="info">
                        <img :src="joinIcon4" alt="">
                        <p>投资咨询</p>
                    </div>
                    <img :src="joinLink1" alt="" class="joinLink1">
                </li>
                <li>
                    <div class="info">
                        <img :src="joinIcon5" alt="">
                        <p>选择装修</p>
                    </div>
                    <img :src="joinLink3" alt="" class="joinLink3">
                </li>
                <li>
                    <div class="info">
                        <img :src="joinIcon9" alt="">
                        <p>开业</p>
                    </div>
                    <img :src="joinLink2" alt="" class="joinLink1">
                </li>
                <li>
                    <div class="info">
                        <img :src="joinIcon8" alt="">
                        <p>开通网店</p>
                    </div>
                    <img :src="joinLink2" alt="" class="joinLink1">
                </li>
                <li>
                    <div class="info">
                        <img :src="joinIcon7" alt="">
                        <p>开店筹备培训</p>
                    </div>
                    <img :src="joinLink2" alt="" class="joinLink1">
                </li>
                <li>
                    <div class="info">
                        <img :src="joinIcon6" alt="">
                        <p>选择装修</p>
                    </div>
                </li> 
            </ul>
        </section>
        <!--  -->
        <section class="advantageBox">
            <h1 class="titH1">关于易绘创</h1>
            <ul>
                <li v-for="item in advantageList">
                    <img :src="item.img" alt="">
                    <p>{{item.cont}}</p>
                </li>
            </ul>
        </section>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'join',
    data () {
      return {
        banner1: require('../../assets/img/join/banner.jpg'),
        join1: require('../../assets/img/join/join1.png'),
        work1: require('../../assets/img/join/work1.jpg'),
        work2: require('../../assets/img/join/work2.jpg'),
        work3: require('../../assets/img/join/work3.jpg'),
        work4: require('../../assets/img/join/work4.jpg'),
        work5: require('../../assets/img/join/work5.jpg'),
        joinLink1: require('../../assets/img/join/joinLink1.png'),
        joinLink2: require('../../assets/img/join/joinLink3.png'),
        joinLink3: require('../../assets/img/join/joinLink2.png'),
        joinIcon1: require('../../assets/img/join/joinIcon1.png'),
        joinIcon2: require('../../assets/img/join/joinIcon2.png'),
        joinIcon3: require('../../assets/img/join/joinIcon3.png'),
        joinIcon4: require('../../assets/img/join/joinIcon4.png'),
        joinIcon5: require('../../assets/img/join/joinIcon5.png'),
        joinIcon6: require('../../assets/img/join/joinIcon6.png'),
        joinIcon7: require('../../assets/img/join/joinIcon7.png'),
        joinIcon8: require('../../assets/img/join/joinIcon8.png'),
        joinIcon9: require('../../assets/img/join/joinIcon9.png'),
        activeName:1,
        workList:[
            {
                img:require('../../assets/img/join/work1.jpg'),
                index:1,
                name:'广告印刷',
            },
            {
                img:require('../../assets/img/join/work2.jpg'),
                index:2,
                name:'发光字'
            },
            {
                img:require('../../assets/img/join/work3.jpg'),
                index:3,
                name:'企业定制'
            },
            {
                img:require('../../assets/img/join/work4.jpg'),
                index:4,
                name:'图文快印'
            },
            {
                img:require('../../assets/img/join/work5.jpg'),
                index:5,
                name:'成长纪念册'
            }
        ],
        brandList:[
            {
                name:'',
                cont:'品牌连锁',
                col:'col',
                self:'自主开店', 
            },
            {
                name:'品牌加持',
                cont:'连锁加盟品牌，企业、政府等客户认可度高，总部提供运营、管理、设计、物流和印刷支持及售后服务',
                col:'col1',
                self:'无品牌，客户记不住',
            },
            {
                name:'门店选址',
                cont:'规划师给出选址意见',
                col:'col2',
                self:'作坊式门店，没有软件，人力成本大，用户体验差',
            },
            {
                name:'店面形象',
                cont:'统一、专业的VI形象识别系统，有标准化的管理体系，营造舒适、专业的经营环境',
                col:'col1',
                self:'自己设计，容易脏乱差',
            },
            {
                name:'人员管理',
                cont:'一人开店，总部提供设计、印刷和配送服务',
                col:'col2',
                self:'招聘不到人，亲戚入职难管理',
            },
            {
                name:'业务范围',
                cont:'拥有全类目广告印刷服务，处处皆可接单',
                col:'col1',
                self:'业务单一，无自研团队',
            },
            {
                name:'经营管理',
                cont:'总部提供行业资料、话术和营销资料，从业务学习-接单报价-制作安装-外协-渠道扩展全部都能掌握',
                col:'col2',
                self:'自己琢磨',
            },
            {
                name:'获客渠道',
                cont:'免费开通品牌网店，打造O2O品牌店，完成线上线下联动',
                col:'col1',
                self:'线下门店流量',
            },
            {
                name:'用户体验',
                cont:'智能化广告打印系统、智能下单系统、视频需求对接、全场景自提配送',
                col:'col2',
                self:'作坊式门店，没有软件，人力成本大，用户体验差',
            },
            {
                name:'设备耗材',
                cont:'总部自营印刷厂及设计团队、质量售后有保障',
                col:'col1',
                self: '自主寻找渠道，质量无保障',
            },
            {
                name:'市场推广',
                cont:'拥有完整的市场推广体系，有明确的行业推广计划，通过PC端和移动端双线引流，为品牌发声，用户均可反向搜索及到访就近门店',
                col:'col2',
                self:'被动等待，无推广',
            },
            {
                name:'广告支持',
                cont:'每年都有付费广告支持，确保品牌持续曝光，保障品牌自带流量',
                col:'col1',
                self:'无广告支持'
            }
        ],
        advantageList:[
            {
                img:require('../../assets/img/join/img1.jpg'),
                cont:'自营印刷厂'
            }, 
            {
                img:require('../../assets/img/join/img2.jpg'),
                cont:'强大的运营、设计管理团队'
            },
            {
                img:require('../../assets/img/join/img3.jpg'),
                cont:'通过IS09000质量体系认证'
            },
            {
                img:require('../../assets/img/join/img4.jpg'),
                cont:'统一门店服装和设计服务'
            },
            {
                img:require('../../assets/img/join/img5.jpg'),
                cont:'智能化操作系统'
            },
            {
                img:require('../../assets/img/join/img6.jpg'),
                cont:'O2O店铺引流'
            }
        ]
      }
    },
    methods: {
        navMouseOver: function(index) {
            this.activeName = index;
        },
    }
  }
</script>


<style lang="less" scoped>

.joinCenter{
    padding-bottom: 100px;

    .whoJoin{
        display: flex;
        align-items: center;
        justify-content: center;

        ul{
            li{
                background: rgba(78,159,91, 0.1);
                width: 302px;
                height: 44px;
                border-radius: 4px;
                text-align: center;
                line-height: 44px;
                font-size: 16px;
                margin-bottom: 50px;
            }

            li:last-child{
                margin-bottom: 0;
            }
        }
        
        .img{
            width: 380px;
            height: 380px;
            margin: 0 50px;

            img{
                width: 100%;
                height: 100%;
                border-radius: 50%;
            }
        }
    }

    .workUL{
        display: flex;
        align-items: center;

        .el-collapse-item{
            height: 452px;
            display: flex;
            align-items: center;
        }



        .tit{
            width: 173px;
            height: 452px;
        }

        .cont{
            width: 173px;
            height: 452px;
            position: relative;
            cursor: pointer;
            

            img{
                width: 100%;
                height: 100%;
                border-radius: 0 8px 8px 0;
            }

            img:last-child{
                border-radius:8px;
            }

            img:first-child{
                border-radius:8px;
            }

            span{
                position: absolute;
                font-size: 44px;
                color: #fff;
                bottom: 40px;
                right: 40px;
                display: inline-block;
            }

            p{
                background: #000;
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                opacity: 0.2;
                filter: blur(25px);
            }
            
        }

        .active{
            width: 543px;
            transition: all 0.8s ease;
           
            img{
                border-radius: 8px;
            }
        }
    }

    .wyhJoin{

        .ulBox{
            display: flex;
            width: 1044px;
            background: #FFFFFF;
            border-radius: 20px;
            margin:0 auto;
        }

        ul:first-child{
            width: 620px;
            box-shadow:2px 2px 5px #3333333d;
            border-radius: 20px;
            margin-left: 34px;
            li{
                display: flex;
                align-items: center;

                .cont{
                    display: flex;
                    align-items: center;
                
                    span{
                        width: 135px;
                        text-align: center;
                        color: #4E9F5B;
                        display: inline-block;
                        font-size: 16px;
                        font-weight: bold;
                    }

                    p{
                        width: 485px;
                        text-align: center;
                        padding: 0 50px;
                        color: #666666;
                        line-height: 20px;
                        border-left: 1px solid #D8D8D8;
                        height: 105px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }

                    .col1{
                        background: rgba(78, 159, 91, 0.1);
                    }
                    .col2{
                        background: rgba(175, 243, 74, 0.04);
                    }
                }

            }

            li:first-child{
                p{
                    color: #4E9F5B;
                }
            }
        }
        ul:last-child{
            flex: 1;
            li{
                text-align: center;
                height: 105px;
                line-height: 105px;
                border-bottom: 1px solid #CBCFE3;
            }

          

            li:last-child{
                border-bottom: none;
            }
        }
    }

    .pathBox{
        .path1{
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            justify-content: flex-end;
            li{
                display: flex;
                align-items: center;
                margin-bottom: 170px;

                .info{
                    text-align: center;
                    img{
                        width: 78px;
                        height: 78px;
                        margin-bottom: 11px;
                    }
                }

                .joinLink1{
                    width: 125px;
                    margin: -15px 31px 0;
                }
            }

            li:nth-child(5){
                position: relative;

                 .joinLink3{
                    height: 108px;
                    position: absolute;
                    left: 50%;
                    bottom: -135px;
                    transform: translate(-50%,0);
                }
            }
        }
    }

    .advantageBox{
        .titH1{
            margin-top: -30px;
        }
        ul{
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            justify-content: space-between;
            li{
                margin-bottom: 45px;
                img{
                    width: 370px;
                    height: 259px;
                    border-radius: 8px;
                }

                p{
                    font-size: 24px;
                    margin-top: 16px;
                    text-align: center;
                }
            }
        }
    }

}
  
</style>
