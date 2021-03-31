<template>
  <div class="navHeader">
      <div class="center headerCenter">
            <div class="img">
                <img :src="logo" alt="">
            </div>
            <!-- router -->
            <el-menu :default-active="activeIndex" active-text-color="#4E9F5B" class="el-menu-demo" mode="horizontal" @select="handleSelect"  theme="dark"  router>
                <el-menu-item index="index">首页</el-menu-item>
                <el-menu-item index="2">在线印刷</el-menu-item>
                <el-menu-item index="">设计模板</el-menu-item>
                <el-menu-item index="">定制服务</el-menu-item>
                <el-menu-item index="">服务保障</el-menu-item>
                <el-menu-item index="news">新闻中心</el-menu-item>
                <el-menu-item index="">帮助支持</el-menu-item>
                <el-menu-item index="">关于我们</el-menu-item>
            </el-menu>
            <div class="hraderInfo">
                <div class="cart"><img :src="cart" alt=""></div>
                <!-- <div class="head">
                  <img :src="head" alt="">
                  <p>在线证件照制作</p>
                </div> -->
                <p class="login">登录/注册</p>
            </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'navHeader',
  computed: {
    activeIndex: function(){
      return this.$route.path.replace('/', '');
    }
  },
  data () {
    return {
      logo: require('../assets/img/common/logo.png'),
      cart: require('../assets/img/common/cart.png'),
      head: require('../assets/img/common/head.png')
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  }
}
</script>


<style lang="less" scoped >

    .navHeader{
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 111;
      background: #fff;
      
    }
    .headerCenter{
        display: flex;
        align-items: center;
        justify-content: space-between;

        .img{
            margin-right: 50px;
        }

        .el-menu-demo{
          margin-right: 50px;
        }


        .hraderInfo{
            display: flex;
            align-items: center;
           

            
            .head{
              position: relative;
               margin-left: 100px;
              img{
                width: 32px;
                height: 32px;
                border-radius: 50%;
              }
              p{
                position: absolute;
                font-size: 12px;
                background: #FFDE33;
                border-radius: 50px;
                color: #333;
                top: -10px;
                right: -80px;
                width: 96px;
                text-align: center;
                height: 26px;
                line-height: 26px;
              }
            }

          .login{
            margin-left: 100px;
          }
        }
    }
</style>
