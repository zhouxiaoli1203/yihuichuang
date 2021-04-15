<template>
  <div id="index" class="main">
    <div class="center">
      <!-- 轮播图 -->
      <section class="bannerBox">
        <BannerNav></BannerNav>
        <div class="block banner">
          <div class="searchBox">
            <div class="input">
                <div class="inputInner">
                  <i class="el-icon-search"></i>
                  <input type="text" v-model="input"   placeholder="请输入内容" @focus="searchFocus"  @blur="searchBlur" @keyup.enter="searchBtn($event)">
                </div>
                <el-button type="primary">搜索</el-button>
            </div>
            <div class="search" v-if="searchList==true">
              <div class="link" v-if="historyList!=''">
                <span v-for="item in historyList">{{item}}</span>
              </div>
              <ul class="list">
                <template v-for="item in hotList">
                  <li>
                    <span :class="item.sty">{{item.val}}</span>
                    <p>{{item.tit}}</p>
                  </li>
                </template>
              </ul>
            </div>
          </div>
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
            <img :src="banner" alt="">
            <p>电商淘宝</p>
          </li>
           <li>
            <img :src="banner" alt="">
            <p>教育培训</p>
          </li>
          <li>
            <img :src="banner" alt="">
            <p>公司包装</p>
          </li>
          <li>
            <img :src="banner" alt="">
            <p>餐饮美食</p>
          </li>
          <li>
            <img :src="banner" alt="">
            <p>房产商业</p>
          </li>
        </ul>
        <ul class="anli1">
          <li>
            <img :src="banner" alt="">
          </li>
          <li>
            <img :src="banner" alt="">
          </li>
          <li>
            <img :src="banner" alt="">
          </li>
          <li>
            <img :src="banner" alt="">
          </li>
        </ul>
        <ul class="anli2">
          <li>
            <img :src="banner" alt="">
          </li>
          <li>
            <img :src="banner" alt="">
          </li>
          <li>
            <img :src="banner" alt="">
          </li>
        </ul>
        <div class="btns">
          <button>立即体验</button>
        </div>
      </section>


      <!-- 新闻中心 -->
      <section class="newsBox">
        <h1 class="titH1">新闻中心</h1>
        <template>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="行业动态" name="first">
              <div class="newInfo">
                <div class="top">
                  <img :src="banner" alt="">
                  <div class="info">
                    <h3>将已知的事物陌生化，更是一种创造</h3>
                    <span>2020-02-22</span>
                    <p>机他装斯次何领设该思因院事华采无面车法关比复色处装红人物知生厂称联公维它手其身群政期指想每得被此立标生层口断果比中外安场油支很外半心象天再把与格火。越别住难表上清切看回市研离以只新按此自事车入着况计物本</p>
                    <button>立即查看</button>
                  </div>
                </div>
                <ul class="bot">
                  <li>
                    <img :src="banner" alt="">
                    <div class="info">
                      <h3>将已知的事物陌生化，更是一种创造</h3>
                      <p>机他装斯次何领设该思因院事华采无面车法关比复色处装红人物知生厂称联公维它手其身群政期指想每得被此立标生层口断果比中外安场油支很外半心象天再把与格火。越别住难表上清切看回市研离以只新按此自事车入着况计物本</p>
                      <span>2020-02-22</span>
                      <button>立即查看</button>
                    </div>
                  </li>
                   <li>
                    <img :src="banner" alt="">
                    <div class="info">
                      <h3>将已知的事物陌生化，更是一种创造</h3>
                      <p>机他装斯次何领设该思因院事华采无面车法关比复色处装红人物知生厂称联公维它手其身群政期指想每得被此立标生层口断果比中外安场油支很外半心象天再把与格火。越别住难表上清切看回市研离以只新按此自事车入着况计物本</p>
                      <span>2020-02-22</span>
                      <button>立即查看</button>
                    </div>
                  </li>
                   <li>
                    <img :src="banner" alt="">
                    <div class="info">
                      <h3>将已知的事物陌生化，更是一种创造</h3>
                      <p>机他装斯次何领设该思因院事华采无面车法关比复色处装红人物知生厂称联公维它手其身群政期指想每得被此立标生层口断果比中外安场油支很外半心象天再把与格火。越别住难表上清切看回市研离以只新按此自事车入着况计物本</p>
                      <span>2020-02-22</span>
                      <button>立即查看</button>
                    </div>
                  </li>
                </ul>
              </div>
            </el-tab-pane>
            <el-tab-pane label="客户动态" name="second">客户动态</el-tab-pane>
            <el-tab-pane label="公搜动态" name="third">公搜动态</el-tab-pane>
          </el-tabs>
        </template>

      </section>
    </div>
  </div>
</template>
<script>
import BannerNav from '../../components/bannerNav'

export default {
    name: 'index',
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
        activeName: 'first',
        input: '',
        searchList:false, //搜索记录列表
        hotList:[  //热门搜索
          {
            val:1,
            tit:'产品手册',
            sty:"red"
          },
          {
            val:2,
            tit:'宣传单页',
            sty:"reds"
          },
          {
            val:3,
            tit:'展架',
            sty:"org"
          },
          {
            val:4,
            tit:'名片',
            sty:"gray"
          },
          {
            val:5,
            tit:'不干胶',
            sty:"gray"
          },
          {
            val:6,
            tit:'联单',
            sty:"gray"
          }
        ],
        historyList:[], //历史搜索记录
      };
    },
    components: {
      BannerNav,
    },
    created(){

    },
    methods: {
      searchFocus(){ //搜索获取焦点
        this.searchList=true
        this.getSearchArr() 

      },
      searchBlur(){  //搜索失去焦点
        this.searchList=false
      },

      handleClick(tab, event) {  // 新闻中心
        console.log(tab, event);
      },
      // 点击搜索
      searchBtn(e){
        let val = e.currentTarget.value
        this.setHistoryItems(val)
        this.$router.push("/index/indexSearch");

      },

      // 存入历史搜索记录
      setHistoryItems(keyword){
        var shuzu = []
        keyword = keyword.trim();
        shuzu = JSON.parse(localStorage.getItem('historyItems'));//取
				shuzu = shuzu?shuzu:[] 
				if(shuzu!=null){

					var retreat = shuzu.indexOf(keyword); 

					if(retreat==-1){

						shuzu[shuzu.length] = keyword;

						if(shuzu.length>5){

							shuzu = shuzu.slice(Number(shuzu.length)-5,shuzu.length)

							localStorage.setItem('historyItems', JSON.stringify(shuzu));

							return false

						}

						localStorage.setItem('historyItems', JSON.stringify(shuzu));

					}

				}else{

					shuzu[shuzu.length] = keyword;

					if(shuzu.length>5){

						shuzu = shuzu.slice(Number(shuzu.length)-5,shuzu.length)

						localStorage.setItem('historyItems', JSON.stringify(shuzu));

						return false

					}

					localStorage.setItem('historyItems', JSON.stringify(shuzu));

				}

      },

      // 循环搜索历史
      getSearchArr(){
        let list= JSON.parse(localStorage.getItem('historyItems'));//取
        this.historyList = list?list:[]
      }
    }

  }
</script>
<style lang="less" scoped>
  #index{
    background: #f6f6f6;
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


      .searchBox{
        position: absolute;
        top: 32px;
        right: 32px;
        z-index: 11;
        width: 400px;

        .input{
          display: flex;
          align-items: center;
          background: #FFF9F9;
          border: none;
          border-radius: 100px;
          overflow: hidden;

          .inputInner{
            display: flex;
            align-items: center;
            flex: 1;
            padding-left: 20px;
            input{
              flex: 1;
              height: 100%;
              margin-left: 8px;
            }
          }
        }

        .el-button{
          border-radius: 0;
          width: 102px;
        }

        .el-button--primary{
          background-color: #4E9F5B;
          border-color: #4E9F5B;
        }
      }

    }
    .search{
      background: #fff;
      border-radius: 8px;
      // padding: 16px;

      .link{
        // margin-bottom: 15px;
        padding: 16px 16px 10px;
        span{
          font-size: 12px;
          color: #999;
          display: inline-block;
          margin-right: 12px;
          cursor: pointer;
          max-width: 60px;
          display: inline-block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        span:last-child{
          margin-right: 0;
        }
        span:hover{
          color:#4E9F5B;
        }
      }

      .list{
        padding-bottom: 15px;
        li{
          display: flex;
          align-items: center;
          height: 32px;
          padding: 0 16px;
          span{
            width: 16px;
            height: 16px;
            border-radius: 4px;
            display: inline-block;
            text-align: center;
            line-height: 16px;
            color: #fff;
            font-size: 12px;
            margin-right: 16px;
          }
          .red{
             background: #FF3333;
          }
          .reds{
             background: #FF6948;
          }
          .org{
             background: #FFCF3E;
          }
          .gray{
            background: #D3D3D3;
          }
          p{
            font-size: 12px;
            color: #333;
            cursor: pointer;
          }
        }
        li:hover{
          background: #f1f1f1;
        }
      }
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
      button{
        background: #4E9F5B;
        color: #fff;
        width: 140px;
        height: 46px;
        line-height: 46px;
        text-align: center;
        border-radius: 8px;
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
      }
    }

    .bot{
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 32px;

      li{
        width: 378px;

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
    }
  }




</style>
