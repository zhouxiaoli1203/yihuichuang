<template>
  <div class="main connonBg">
    <div class="conmontBanner center">
      <img :src="banner1" alt="">
    </div>
    <section class="center">
        <div class="crumbsHeader">
          <div class="crumbs">
            <router-link to="/"> <span>首页 / </span></router-link>
            <!-- <span @click="pathNews()">帮助支持 /</span> -->
            <span>退款说明</span>
          </div>
        </div>
        <div class="publicCenter">
            <MenuLeft></MenuLeft>
            <div  class="contList wenzhnagContList">
              <ArticleDetail :title='titleInfo'></ArticleDetail>
            </div>
        </div>
    </section>
  </div>
</template>

<script>
  import MenuLeft from '../../components/menuLeft'
  import ArticleDetail from '../../components/articleDetail'
  export default {
    name: 'helpRefund',
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
        titleInfo:{
          title:'helpRefund',
          types:'help'
        }
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
