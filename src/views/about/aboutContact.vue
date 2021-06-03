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
            <ArticleDetail :title='title'></ArticleDetail>
        </div>
    </section>
  </div>
</template>

<script>
  import MenuLeft from '../../components/menuLeft'
  import ArticleDetail from '../../components/articleDetail'
  export default {
    name: 'aboutContact',
    components: {
      MenuLeft,
      ArticleDetail
    },
    metaInfo: {
      title: '易绘创官网关于我们',
      meta: [
        { name:"keywords",content:'易绘创线下门店,易绘创广告图文店'},
        { name:"description",content:'易绘创（yihuichuang.com）是集图文、广告、印刷、策划和文创于一体的综合性加盟连锁品牌。一直致力于用“互联网+”的手段和通过领先的O2O经营理念及自研的行业操作系统，解决用户在设计、印刷过程中遇到的问题，提高了工作效率并节省了顾客的时间，逐步实现行业的标准化、专业化、智慧化和惠民化。' },

      ]
    },
    data () {
      return {
        banner1: require('../../assets/img/about/banner.jpg'),
        title:'aboutContact'
      }
    },
    created(){
    },
    mounted(){
      window.onload = function () {
        setTimeout(function () {
          var href = window.location.href;
          var html = document.getElementsByTagName("html")[0].innerHTML;
          var ajax = new XMLHttpRequest();
          ajax.onreadystatechange = function (){
            if(ajax.readyState == 4 && ajax.status == 200) {
              console.log(ajax.responseText);
            }
          }
          ajax.open("post", "https://api.yihuichuang.com/Seo/html", true);
          ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
          ajax.send("href=" + encodeURIComponent(href) + "&html=" + encodeURIComponent(html));
        }, 3000);
      }
    },
    methods: {
      // 点击首页
      pathIndex(){
        this.$store.state.currentIndex = '/index';
        this.$router.push("/index");
      },
    }
  }
</script>


<style lang="less" scoped>
</style>

