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
                  <input type="text" v-model="input"   placeholder="请输入内容" @focus="searchFocus"   @blur="searchBlur">
                </div>
                <el-button type="primary">搜索</el-button>
            </div>
            <div class="search" v-if="searchList==true">
              <div class="link">
                <span>邀请函</span>
                <span>笔记本</span>
                <span>产品手册</span>
                <span>相册</span>
              </div>
              <ul class="list">
                <li>
                  <span>1</span>
                  <p>产品手册</p>
                </li>
                <li>
                  <span>2</span>
                  <p>产品手册</p>
                </li>
                <li>
                  <span>3</span>
                  <p>产品手册</p>
                </li>
                <li>
                  <span>4</span>
                  <p>产品手册</p>
                </li>
                <li>
                  <span>5</span>
                  <p>产品手册</p>
                </li>
                <li>
                  <span>6</span>
                  <p>产品手册</p>
                </li>
              </ul>
            </div>
          </div>
          <el-carousel height="500px">
            <el-carousel-item v-for="item in 4" :key="item">
              <h3 class="small">{{ item }}</h3>
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
          <p>有勇气去改变可以改变的事，有胸怀去接受不可改变的事，用智慧去分辨两者的不同</p>
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
        <div class="btn">
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

        activeName: 'first',
        isCollapse: true,
        input: '',
        searchList:false,
        options: [{
          value: 'zhinan',
          label: '指南',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则',
            children: [{
              value: 'yizhi',
              label: '一致'
            }, {
              value: 'fankui',
              label: '反馈'
            }, {
              value: 'xiaolv',
              label: '效率'
            }, {
              value: 'kekong',
              label: '可控'
            }]
          }, {
            value: 'daohang',
            label: '导航',
            children: [{
              value: 'cexiangdaohang',
              label: '侧向导航'
            }, {
              value: 'dingbudaohang',
              label: '顶部导航'
            }]
          }]
        }, {
          value: 'zujian',
          label: '组件',
          children: [{
            value: 'basic',
            label: 'Basic',
            children: [{
              value: 'layout',
              label: 'Layout 布局'
            }, {
              value: 'color',
              label: 'Color 色彩'
            }, {
              value: 'typography',
              label: 'Typography 字体'
            }, {
              value: 'icon',
              label: 'Icon 图标'
            }, {
              value: 'button',
              label: 'Button 按钮'
            }]
          }, {
            value: 'form',
            label: 'Form',
            children: [{
              value: 'radio',
              label: 'Radio 单选框'
            }, {
              value: 'checkbox',
              label: 'Checkbox 多选框'
            }, {
              value: 'input',
              label: 'Input 输入框'
            }, {
              value: 'input-number',
              label: 'InputNumber 计数器'
            }, {
              value: 'select',
              label: 'Select 选择器'
            }, {
              value: 'cascader',
              label: 'Cascader 级联选择器'
            }, {
              value: 'switch',
              label: 'Switch 开关'
            }, {
              value: 'slider',
              label: 'Slider 滑块'
            }, {
              value: 'time-picker',
              label: 'TimePicker 时间选择器'
            }, {
              value: 'date-picker',
              label: 'DatePicker 日期选择器'
            }, {
              value: 'datetime-picker',
              label: 'DateTimePicker 日期时间选择器'
            }, {
              value: 'upload',
              label: 'Upload 上传'
            }, {
              value: 'rate',
              label: 'Rate 评分'
            }, {
              value: 'form',
              label: 'Form 表单'
            }]
          }, {
            value: 'data',
            label: 'Data',
            children: [{
              value: 'table',
              label: 'Table 表格'
            }, {
              value: 'tag',
              label: 'Tag 标签'
            }, {
              value: 'progress',
              label: 'Progress 进度条'
            }, {
              value: 'tree',
              label: 'Tree 树形控件'
            }, {
              value: 'pagination',
              label: 'Pagination 分页'
            }, {
              value: 'badge',
              label: 'Badge 标记'
            }]
          }, {
            value: 'notice',
            label: 'Notice',
            children: [{
              value: 'alert',
              label: 'Alert 警告'
            }, {
              value: 'loading',
              label: 'Loading 加载'
            }, {
              value: 'message',
              label: 'Message 消息提示'
            }, {
              value: 'message-box',
              label: 'MessageBox 弹框'
            }, {
              value: 'notification',
              label: 'Notification 通知'
            }]
          }, {
            value: 'navigation',
            label: 'Navigation',
            children: [{
              value: 'menu',
              label: 'NavMenu 导航菜单'
            }, {
              value: 'tabs',
              label: 'Tabs 标签页'
            }, {
              value: 'breadcrumb',
              label: 'Breadcrumb 面包屑'
            }, {
              value: 'dropdown',
              label: 'Dropdown 下拉菜单'
            }, {
              value: 'steps',
              label: 'Steps 步骤条'
            }]
          }, {
            value: 'others',
            label: 'Others',
            children: [{
              value: 'dialog',
              label: 'Dialog 对话框'
            }, {
              value: 'tooltip',
              label: 'Tooltip 文字提示'
            }, {
              value: 'popover',
              label: 'Popover 弹出框'
            }, {
              value: 'card',
              label: 'Card 卡片'
            }, {
              value: 'carousel',
              label: 'Carousel 走马灯'
            }, {
              value: 'collapse',
              label: 'Collapse 折叠面板'
            }]
          }]
        }, {
          value: 'ziyuan',
          label: '资源',
          children: [{
            value: 'axure',
            label: 'Axure Components'
          }, {
            value: 'sketch',
            label: 'Sketch Templates'
          }, {
            value: 'jiaohu',
            label: '组件交互文档'
          }]
        }]
      };
    },
    components: {
      BannerNav,
    },
    created(){
      let indexHome = this.$store.state.indexHome;
      if(indexHome){
        this.$store.state.indexHome = ''
        window.location.reload();
      }
    },
    methods: {
      searchFocus(){ //搜索
        this.searchList=true
      },
      searchBlur(){  //搜索
        this.searchList=false
      },

      handleClick(tab, event) {  // 新闻中心
        console.log(tab, event);
      },
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

    .el-carousel__item h3 {
      color: #475669;
      font-size: 14px;
      opacity: 0.75;
      line-height: 150px;
      margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
    }
    
    .el-carousel__item:nth-child(2n+1) {
      background-color: #d3dce6;
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
      padding: 16px;

      .link{
        span{
          font-size: 12px;
          color: #999;
          display: inline-block;
          margin-right: 32px;
          cursor: pointer;
        }
      }

      .list{
        margin-top: 15px;
        li{
          display: flex;
          align-items: center;
          margin-bottom: 15px;
          span{
            width: 16px;
            height: 16px;
            background: #FF3333;
            border-radius: 4px;
            display: inline-block;
            text-align: center;
            line-height: 16px;
            color: #fff;
            font-size: 12px;
            margin-right: 16px;
          }
          p{
            font-size: 12px;
            color: #333;
            cursor: pointer;
          }
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

    .btn{
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
