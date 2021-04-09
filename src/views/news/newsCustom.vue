<template>
  <div class="main connonBg">
    <div class="conmontBanner center">
      <img :src="banner1" alt="">
    </div>
    <section class="center publicCenter">
      <MenuLeft></MenuLeft>
      <div class="contList" @click="gotoMore">
        客户动态
      </div>
    </section>
  </div>
</template>

<script>
  import MenuLeft from '../../components/menuLeft'
  export default {
    name: 'newsCustom',
    components: {
      MenuLeft,
    },
    data () {
      return {
        banner1: require('../../assets/img/news/banner1.jpg'),
      }
    },
    methods: {
      gotoMore(){
          this.$router.push({  
              path: '/news/detail',   
              name: 'detail',  
              query: {  
                name: '客户动态',
              }
          }) 
      }
    }
  }
</script>


<style lang="less" scoped>
  .contList {
    position: relative;
    li{
      margin: 24px;
      border-bottom: 1px solid #D6DAEC;
      padding-bottom: 28px;
      .tit{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 24px;

        h3{
          font-size: 16px;
          color: #333;
          font-weight: 600;
        }
        span{
          font-size: 12px;
          color: #999;
        }
      }
      p{
        color: #666666;
        line-height: 20px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
      }
    }
  }
</style>
