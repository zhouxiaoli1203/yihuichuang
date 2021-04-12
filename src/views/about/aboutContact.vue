<template>
  <div class="main connonBg">
    <div class="conmontBanner center">
      <img :src="banner1" alt="">
    </div>
    <section class="center">
        <div class="crumbsHeader">
          <div class="crumbs">
              <span @click="pathIndex()">首页 / </span>
              <span>联系我们</span>
          </div>
        </div>
        <div class="publicCenter">
            <MenuLeft></MenuLeft>
            <div class="contList">
              <p class="brp">我们期待每一个和你交流的机会，无论是投诉还是祝福，意见或建议。</br>您都可以通过以下方式联系我们，我们保证会在第一时间回复您。</p>
                <ul class="list">
                  <li>邮箱：123412333@qq.com</li>
                  <li>微博：*****************8</li>
                  <li>QQ群：12341233321</li>
                  <li>微信公众号：12341233321</li>
                  <li>地址：贵州省黔东南苗族侗族自治州施秉县衡山街40号</li>
                </ul>
                <img src="" alt="">
            </div>
        </div>
    </section>
  </div>
</template>

<script>
  import MenuLeft from '../../components/menuLeft'
  export default {
    name: 'aboutContact',
    components: {
      MenuLeft,
    },
    data () {
      return {
        banner1: require('../../assets/img/about/banner.jpg'),
      }
    },
    methods: {
      gotoMore(){
        // this.$router.push("/news/details" + e.id+"/"+e.paperName);
        this.$router.push("/news/detail");
      },
       // 点击首页
      pathIndex(){
        this.$store.state.currentIndex = '/index';
        this.$router.push("/index");
      },
    }
  }
</script>


<style lang="less" scoped>
  .contList {
    padding: 24px;
    line-height: 22px;
    font-size: 16px;
    .brp{
      margin-bottom: 50px;
    }
    li{
      margin-bottom: 24px;
      font-size: 16px;
    }

    img{
      width: 100%;
      height: 521px;
      background: #D8D8D8;
      border-radius: 10px;
      margin-top: 24px;
    }
  }
</style>
