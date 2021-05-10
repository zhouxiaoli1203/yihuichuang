
<template>
  <div class="main connonBg">
    <div class="conmontBanner center">
      <img :src="banner1" alt="">
    </div>
    <section class="center">
        <div class="crumbsHeader">
          <div class="crumbs">
              <span @click="pathIndex()">首页 / </span>
              <span>用户协议</span>
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
    name: 'aboutUser',
    components: {
      MenuLeft,
      ArticleDetail
    },
    data () {
      return {
        banner1: require('../../assets/img/about/banner.jpg'),
        title:'aboutUser'
      }
    },
    created(){
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
