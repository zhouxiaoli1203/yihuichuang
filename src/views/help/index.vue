<template>
  <div class="main connonBg">
    <div class="conmontBanner center">
      <img :src="banner1" alt="">
    </div>
    <section class="center">
        <div class="crumbsHeader">
          <div class="crumbs">
              <span @click="pathIndex()">首页 / </span>
              <!-- <span @click="pathNews()">帮助支持 /</span> -->
              <span>法律声明</span>
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
    name: 'help',
    components: {
      MenuLeft,
      ArticleDetail
    },
    data () {
      return {
        banner1: require('../../assets/img/help/banner.jpg'),
        title:'help'
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
