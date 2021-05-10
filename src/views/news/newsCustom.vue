<template>
  <div class="main connonBg">
    <div class="conmontBanner center">
      <img :src="banner1" alt="">
    </div>
    <section class="center publicCenter">
      <MenuLeft></MenuLeft>
      <ArticleList :title='title'></ArticleList>
    </section>
  </div>
</template>

<script>
  import MenuLeft from '../../components/menuLeft'
  import ArticleList from '../../components/articleList'
  export default {
    name: 'newsCompany',
    components: {
      MenuLeft,
      ArticleList
    },
    data () {
      return {
        banner1: require('../../assets/img/news/banner1.jpg'),
        title:'newsCustom',
      }
    },
    created(){
    },
    methods: {
    }
  }
</script>


<style lang="less" scoped>
</style>

