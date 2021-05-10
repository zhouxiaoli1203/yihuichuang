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
            <div class="contList">
              <div class="tit">
                <h3>{{info.Title}}</h3>
                <span>{{info.PostTime | formatDate_('yyyy-MM-dd hh:mm') }}</span>
              </div>
              <p v-html="info.Content"></p>
            </div>
        </div>
    </section>
  </div>
</template>

<script>
  import MenuLeft from '../../components/menuLeft'
  export default {
    name: 'help',
    components: {
      MenuLeft,
    },
    data () {
      return {
        banner1: require('../../assets/img/help/banner.jpg'),
        info:''
      }
    },
    created(){
      this.detail()
    },
    methods: {
      // 点击首页
      pathIndex(){
        this.$store.state.currentIndex = '/index';
        this.$router.push("/index");
      },

      // 法律声明
      detail(){
        this.$post("post",'Article/get',{
          id:20,
        })
        .then((res)=>{
          if(res.code==1){
            this.info = res.data
          }else{
            this.$message({
              message:res.info,
              type: 'warning'
            });
          }
        })
      },

    }
  }
</script>


<style lang="less" scoped>
  .contList {
    padding: 54px 24px 0;
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
      line-height: 34px;
    }
  }
</style>
