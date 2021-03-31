<template>
  <div id="index">
    <div class="center">
      <!-- 轮播图 -->
      <div class="bannerBox">
        <div class="nav">
        </div>
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
      </div>
      <!-- 服务特点 -->
      <div class="center serviceBox">
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
            <img :src="service1" alt="">
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
      </div>
    </div>
  </div>
</template>
<script>
// import  banner from '../../components/banner'
export default {
    name: 'index',
    data() {
      return {
        service1: require('../../assets/img/index/service1.png'),
        service2: require('../../assets/img/index/service2.png'),
        service4: require('../../assets/img/index/service4.png'),
        service5: require('../../assets/img/index/service5.png'),

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
      // banner,
    },
    computed: {
      activeIndex: function(){
        return this.$route.path.replace('/', '');
      }
    },
    methods: {
      searchFocus(){
        this.searchList=true
      },
      searchBlur(){
        this.searchList=false
      },
    
    }

  }
</script>
<style lang="less" scoped>
  #index{
    background: #f6f6f6;
    padding-top: 24px;
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



    .nav{
      width: 190px;
      height: 100%;
      background: #666;
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




</style>
