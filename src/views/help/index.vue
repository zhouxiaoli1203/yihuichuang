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
    metaInfo: {
      title: '易绘创官网常见问题',
      meta: [
        { name:"keywords",content:'易绘创注册账号,易绘创自助设计教程,使用教程,自助上传文件,CDR-X4下载 ,发货物流'},
        { name:"description",content:'易绘创（yihuichuang.com）常见问题：为您解决使用易绘创遇到的印刷品设计问题、印刷品下单问题、发货物流问题和易绘创服务等。' },

      ]
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
