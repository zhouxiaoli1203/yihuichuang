<template>
  <div class="main connonBg">
    <div class="conmontBanner center">
      <img :src="banner1" alt="">
    </div>
    <section class="center">
       <div class="crumbsHeader">
            <div class="crumbs">
              <a href="/index"><span>首页 / </span></a>
              <a href="javascript:history.go(-1)"><span>{{crumbsName}} /  </span></a>
              <span>详情页</span>
          </div>
        </div>

      <div class="publicCenter">
        <MenuLeft></MenuLeft>
        <ArticleDetail></ArticleDetail>
      </div>
    </section>
  </div>
</template>

<script>
  import MenuLeft from '../../components/menuLeft'
  import ArticleDetail from '../../components/articleDetail'
  export default {
    name: 'newsDetail',
    components: {
      MenuLeft,
      ArticleDetail
    },
    data(){
      return {
        banner1: require('../../assets/img/news/banner1.jpg'),
        crumbsName:'',
      }
    },
    mounted(){
      this.crumbsName = this.$route.query.name
      // window.onload = function () {
      //   setTimeout(function () {
      //     var href = window.location.href;
      //     var html = document.getElementsByTagName("html")[0].innerHTML;
      //     var ajax = new XMLHttpRequest();
      //     ajax.onreadystatechange = function (){
      //       if(ajax.readyState == 4 && ajax.status == 200) {
      //         console.log(ajax.responseText);
      //       }
      //     }
      //     ajax.open("post", "https://api.yihuichuang.com/Seo/html", true);
      //     ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      //     ajax.send("href=" + encodeURIComponent(href) + "&html=" + encodeURIComponent(html));
      //   }, 3000);
      // }
    },
    methods: {
    }
  }
</script>

<style lang="less" scoped>
</style>
