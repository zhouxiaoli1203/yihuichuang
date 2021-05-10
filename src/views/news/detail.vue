<template>
  <div class="main connonBg">
    <div class="conmontBanner center">
      <img :src="banner1" alt="">
    </div>
    <section class="center">
       <div class="crumbsHeader">
            <div class="crumbs">
              <span @click="pathIndex()">首页 / </span>
              <span @click="pathNews()">{{crumbsName}} / </span>
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
    },
    methods: {
      // 点击首页
      pathIndex(){
        this.$store.state.currentIndex = '/index';
        this.$router.push("/index");
      },
      pathNews(){
        this.$router.go(-1)
      },
    }
  }
</script>

<style lang="less" scoped>
</style>
