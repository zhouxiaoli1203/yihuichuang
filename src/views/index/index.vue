<template>
  <div id="index" class="main bgray">
    <div class="center">
      <!-- 轮播图 -->
      <section class="bannerBox">
        <BannerNav></BannerNav>
        <div class="block banner">
          <Search></Search>
          <el-carousel height="500px">
            <el-carousel-item v-for="(item,index) in bannerList" :key="index">
              <img :src="item.img" alt="" class="barimg">
            </el-carousel-item>
          </el-carousel>
        </div>
      </section>
      <!-- 服务特点 -->
      <section class="serviceBox">
        <h1 class="titH1">服务特点</h1>
        <ul >
          <li>
            <img :src="service1" alt="">
            <p>丰富的行业模版</p>
          </li>
           <li>
            <img :src="service2" alt="">
            <p>专业的设计团队</p>
          </li>
           <li>
            <img :src="service3" alt="">
            <p>便捷的在线下单</p>
          </li>
           <li>
            <img :src="service4" alt="">
            <p>高效自提/配送物流</p>
          </li>
           <li>
            <img :src="service5" alt="">
            <p>完善的售后服务</p>
          </li>
        </ul>
      </section>

      <!-- 购买流程 -->
      <section class="purchaseBox">
        <h1 class="titH1">购买流程</h1>
        <ul>
          <li class="cont">
            <div class="infoBox">
              <h3>01</h3>
              <div class="info">
                <p>选择需求类型</p>
                <span>无论是广告物料还是公司定制，我们一应俱全</span>
              </div>
            </div>
          </li>
          <li class="img">
            <img :src="buyIcon1" alt="">
          </li>
          <li class="cont contTwo">
            <div class="infoBox">
              <h3>02</h3>
              <div class="info">
                <p>在线印刷</p>
                <span>根据自身条件选择上传素材或者模板编辑</span>
              </div>
            </div>
          </li>
          <li class="img imgTwo">
            <img :src="buyIcon2" alt="">
          </li>
          <li class="cont">
            <div class="infoBox">
              <h3>03</h3>
              <div class="info">
                <p>线上下单</p>
                <span>填写信息线上下单，配送或自提任您选择</span>
              </div>
            </div>
          </li>
        </ul>
      </section>

      <!-- 活动banner跳转 -->
      <section class="activityBox">
        <div class="activity">
          <h2>盖帽了老baby</h2>
          <p>有勇气去改变可以改变的事，有胸怀去接受不可改变的事，用智绘去分辨两者的不同</p>
        </div>
        <i class="el-icon-right"></i>
      </section>

      <!-- 服务领域 -->
      <section class="serviceArea">
        <h1 class="titH1">服务领域</h1>
        <ul class="hangye">
          <li>
            <img src="@/assets/img/index/sever1.png" alt="">
            
            <p>电商淘宝</p>
          </li>
           <li>
            <img src="@/assets/img/index/sever2.png" alt="">
            <p>教育培训</p>
          </li>
          <li>
            <img src="@/assets/img/index/sever3.png" alt="">
            <p>公司包装</p>
          </li>
          <li>
            <img src="@/assets/img/index/sever4.png" alt="">
            <p>餐饮美食</p>
          </li>
          <li>
            <img src="@/assets/img/index/sever5.png" alt="">
            <p>房产商业</p>
          </li>
        </ul>
        <ul class="anli1">
          <li>
            <img src="@/assets/img/index/sever6.png" alt="">
          </li>
          <li>
            <img src="@/assets/img/index/sever7.png" alt="">
          </li>
          <li>
            <img src="@/assets/img/index/sever8.png" alt="">
          </li>
          <li>
            <img src="@/assets/img/index/sever9.png" alt="">
          </li>
        </ul>
        <ul class="anli2">
          <li>
            <img src="@/assets/img/index/sever10.png" alt="">
          </li>
          <li>
            <img src="@/assets/img/index/sever11.png" alt="">
          </li>
          <li>
            <img src="@/assets/img/index/sever12.png" alt="">
          </li>
        </ul>
        <div class="btns">
           <router-link :to="{name:'print'}" class="button">立即体验 </router-link>
        </div>
      </section>


      <!-- 新闻中心 -->
      <section class="newsBox eleNwsBox">
        <h1 class="titH1">新闻中心</h1>
        <template>
          <el-tabs v-model="activeName" :before-leave="moreState">
            <el-tab-pane
              :key="item.name"
              v-for="(item, index) in editableTabs"
              :label="item.title"
              :name="item.name"
            >
              <div class="newInfo" v-if="list.length!=''">
                <div class="top">
                  <img :src="list[0].image" alt="">
                  <div class="info" @click="gotoMore(list[0].ID)">
                    <h3>{{list[0].Title}}</h3>
                    <span>{{list[0].PostTime | formatDate_('yyyy-MM-dd hh:mm') }}</span>
                    <p>{{list[0].Intro}}</p>
                    <button>立即查看</button>
                  </div>
                </div>
                <ul class="bot">
                  <template v-for="(item,index) in list">
                    <li v-if="index>0" @click="gotoMore(item.ID)">
                      <img :src="item.image" alt="">
                      <div class="info">
                        <h3>{{item.Title}}</h3>
                        <p>{{item.Intro}}</p>
                        <span>{{item.PostTime | formatDate_('yyyy-MM-dd hh:mm') }}</span>
                        <button>立即查看</button>
                      </div>
                    </li>
                  </template>
                </ul>
              </div>
              <div class="noCont" v-show="noCont" v-else style="border:none;padding:0">
                <img src="@/assets/img/common/wenzhang.png" alt="">
                <p>暂无文章内容</p>
              </div>

            </el-tab-pane>
            <el-tab-pane name="more" class="more-btn">
              <span slot="label">查看更多</span>
            </el-tab-pane>
          </el-tabs>
          
        </template>

      </section>
    </div>
  </div>
</template>
<script>
import BannerNav from '../../components/bannerNav'
import Search from '../../components/search'

export default {
    name: 'index',
    metaInfo: {
      title: '易绘创官网：一站式图文广告印刷O2O连锁品牌',
      meta: [
        { name:"keywords",content:'图文广告店 ,海报设计,图文快印加盟,在线设计,名片制作,印刷厂,条幅制作,彩色画册印刷,宣传单印刷,名片印刷,特种纸,PVC卡,无碳联单,信纸表格,封套,手提袋,易绘创'},
        { name:"description",content:'易绘创（yihuichuang.com）是集图文、广告、印刷、策划和文创于一体的综合性加盟连锁品牌。一直致力于用“互联网+”的手段和通过领先的O2O经营理念及自研的行业操作系统，解决用户在设计、印刷过程中遇到的问题，提高了工作效率并节省了顾客的时间，逐步实现行业的标准化、专业化、智慧化和惠民化。' },

      ]
    },
    components: {
      BannerNav,
      Search
    },
    data() {
      return {
        service1: require('../../assets/img/index/service1.png'),
        service2: require('../../assets/img/index/service2.png'),
        service3: require('../../assets/img/index/service3.png'),
        service4: require('../../assets/img/index/service4.png'),
        service5: require('../../assets/img/index/service5.png'),
        buyIcon1: require('../../assets/img/index/buyIcon1.png'),
        buyIcon2: require('../../assets/img/index/buyIcon2.png'),
        banner: require('../../assets/img/index/banner.jpg'),
        // 轮播图
        bannerList:[
          {
            img: require('../../assets/img/index/banner.jpg'),
          
          },
          {
            img:require('../../assets/img/index/banner2.jpg'),
         
          }
        ],
        activeName: '1',
        name: "HomeNewsList",
        editableTabs:[
          {
            title: '行业动态',
            name: '1',
          },
          {
            title: '客户动态',
            name: '2',
          },
          {
            title: '公司动态',
            name: '3',
          }
        ],
        list:[],
        name:'行业动态',
        noCont:false
      };
    },
    created(){
      this.industry('5')
    },
    methods: {
      // 文章列表
      industry(category_id){
        this.$post("post",'Article/select',{
          category_id,
          limit:4,
          page:1,
        })
        .then((res)=>{
          if(res.code==1){
            this.list = res.data.list
            if(res.data.list.length==0){
                this.noCont = true
            }
          }else{
            this.$message({
              message:res.info,
              type: 'warning'
            });
          }
        })
      },
      
      moreState(tab){
        console.log(tab);
        if(tab == 1){
          this.name = '行业动态'
          this.industry('5')
        }

        if(tab == 2){
          this.name = '客户动态'
          this.industry('6')
        }

        if(tab == 3){
          this.name = '公司动态'
          this.industry('7')
        }

        if(tab == 'more'){
          this.$store.state.currentIndex = '/news';
          this.$store.state.publicHome = '/news'
          this.$router.push("/news");
          this.$store.state.menuLeft = ''
          return false;
        }
      },

      // 查看详情
      gotoMore(id){
        this.$router.push({ 
            path: 'news/detail',   
            name: 'newsDetail',  
            query: {  
              name:this.name,
              id,
              type:'news'
            }
        })    
      },


      
    
  

    }

  }
</script>
<style lang="less" scoped>
  #index{
    padding-bottom: 248px;
  }

  // 轮播图
  .bannerBox{

    display: flex;
    align-items: center;
    height: 500px;

    .el-carousel__item{
      img{
        width: 100%;
        height: 100%;
      }
    }
    
    .banner{
      width: 1010px;
      height: 100%;
      position: relative;

    }
  }

  // 服务特点

  .serviceBox{

    ul{
      border-radius: 12px;
      padding: 50px 0;
      background: #fff;
      display: flex;
      align-items: center;

      li{
        flex: 1;
        text-align: center;

        p{
          font-size: 16px;
          color: #333330;
          margin-top: 16px;
        }
        
      }
    }
  }

  // 购买流程
  .purchaseBox {

    ul{
      width: 900px;
      margin: 0 auto;

      .img{
        text-align: center;
        margin: 14px 0;
      }
    }
    .cont{
  
      .infoBox{
        width: 393px;
        height: 122px;
        background: #FFFFFF;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      h3{
        font-weight: 600;
        color: #FED857;
        font-size: 24px;
        margin-right: 25px;
      }

      .info{
        p{
          font-size: 16px;
          color: #4E9F5B;
          margin-bottom: 13px;
        }
        span{
          font-size: 14px;
          color: #333;
        }
      }
    }

    .contTwo{
      display: flex;
      justify-content: flex-end;
    }
  }

  // 活动banner
  .activityBox{
    margin-top: 88px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 160px;
    border-radius: 10px;
    background: #666;
    .activity{
      margin-left: 88px;
      h2{
        font-size: 24px;
        color: #fff;
        margin-bottom: 16px;
      }
      p{
        color: #fff;
        font-size: 14px;
      }
    }

    .el-icon-right{
      margin-right: 88px;
      color:rgb(214, 214, 214);
      font-size: 40px;
      cursor: pointer;
    }
  }

  // 服务领域

  .serviceArea{

    .hangye, .anli1, .anli2{
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .hangye{
      margin-bottom: 50px;
      li{
        width: 138px;
        img{
          width: 138px;
          height: 116px;
          border-radius: 8px;
        }

        p{
          font-size: 16px;
          color: #333330;
          text-align: center;
          margin-top: 37px;
        }
      }
    }

    .anli1{
      margin-bottom: 32px;
      li{
        width: 267px;
        height: 340px;
        border-radius: 20px;
        overflow: hidden;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }

    .anli2{
       li{
        width: 382px;
        height: 240px;
        border-radius: 20px;
        overflow: hidden;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }

    .btns{
      text-align: center;
      margin-top: 35px;
      .button{
        background: #4E9F5B;
        color: #fff;
        width: 140px;
        height: 46px;
        line-height: 46px;
        text-align: center;
        border-radius: 8px;
        display: inline-block;
      }

    }
  }

  // 新闻中心
  .newInfo{
    .el-tabs__item:hover{
      color:#4E9F5B;
    }

    h3{
      font-size: 20px;
      color: #333;
      margin-bottom: 15px;
    }
    span{
      color: #666;
    }
    p{
      color: #666666;
      margin: 16px 0 28px;
      line-height: 28px;
      display: -webkit-box; 
      -webkit-box-orient: vertical; 
      -webkit-line-clamp: 3; 
      overflow: hidden;
      height: 56px;
    }
    button{
      width: 74px;
      height: 32px;
      border-radius: 4px;
      border: 1px solid #4E9F5B;
      color: #4E9F5B;
      line-height: 32px;    
    }


    .top{
      display: flex;
      align-items: center;
      background: #fff;
      border-radius: 8px;
      overflow: hidden;
      height: 272px;

      img{
        width: 426px;
        height: 272px;
        border-radius: 8px;
      }

      .info{
        flex: 1;
        margin: 0 32px;
        cursor: pointer;
      }
    }

    .bot{
      display: flex;
      align-items: center;
      margin-top: 32px;

      li{
        width: 378px;
        margin-right: 33px;
        cursor: pointer;

        img{
          width: 100%;
          border-radius: 20px;
          height: 228px;
          margin-bottom: 16px;
        }
        p{
          margin-bottom: 10px;
          -webkit-line-clamp: 2;
        }

        span{
          display: block; 
          color: #999;
          margin-bottom: 11px;
        }
      }
      li:last-child{
        margin-right: 0;
      }
    }
  }


.newsBox.el-tabs__item.is-top:last-child{
  color: #ff4949;
}




</style>
