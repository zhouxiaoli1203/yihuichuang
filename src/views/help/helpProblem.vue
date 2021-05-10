<template>
  <div class="main connonBg">
    <div class="conmontBanner center">
      <img :src="banner1" alt="">
    </div>
    <section class="center">
      <div class="crumbsHeader">
        <div class="crumbs">
            <span @click="pathIndex()">首页 / </span>
            <span>常见问题</span>
        </div>
      </div>
      <div class="publicCenter">
        <MenuLeft></MenuLeft>
        <ArticleList :title='title'></ArticleList>
      </div>
    </section>
  </div>
</template>

<script>
  import MenuLeft from '../../components/menuLeft'
  import ArticleList from '../../components/articleList'
  export default {
    name: 'helpProblem',
    components: {
      MenuLeft,
      ArticleList
    },
    data () {
      return {
        banner1: require('../../assets/img/help/banner.jpg'),
        title:'helpProblem',
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

