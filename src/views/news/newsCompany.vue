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
    metaInfo: {
      title: '易绘创官网新闻中心',
      meta: [
        { name:"keywords",content:'图文广告店,印刷 ,易绘创加盟 ,易绘创公司,易绘创'},
        { name:"description",content:'易绘创（yihuichuang.com）新闻中心：更新图文广告店新闻、印刷行业动态、加盟信息、易绘创客户动态和易绘创公司活动。' },

      ]
    },
    data () {
      return {
        banner1: require('../../assets/img/news/banner1.jpg'),
        title:'newsCompany',
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
