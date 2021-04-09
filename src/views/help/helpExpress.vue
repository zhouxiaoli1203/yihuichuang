<template>
  <div class="main connonBg">
    <div class="conmontBanner center">
      <img :src="banner1" alt="">
    </div>
    <section class="center">
      <div class="crumbsHeader">
        <div class="crumbs">
            <span @click="pathIndex()">首页 / </span>
            <span>物流说明</span>
        </div>
      </div>
      <div class="publicCenter">
          <MenuLeft></MenuLeft>
          <div class="contList">
              <h2>合作快递</h2>
              <ul class="list">
                <li @click="gotoMore">
                    <h3>中通停发区域通知</h3>
                    <span>2020-02-02</span>
                </li>
                <li @click="gotoMore">
                    <h3>中通停发区域通知</h3>
                    <span>2020-02-02</span>
                </li>
              </ul>
              <div class="paging">
              <el-pagination
                  background
                  layout="prev, pager, next"
                  :total="1000">
              </el-pagination>
              </div>
          </div>
      </div>
    </section>
  </div>
</template>

<script>
  import MenuLeft from '../../components/menuLeft'
  export default {
    name: 'helpProblem',
    components: {
      MenuLeft,
    },
    data () {
      return {
        banner1: require('../../assets/img/help/banner.jpg'),
      }
    },
    methods: {
      gotoMore(){
        this.$router.push("/news/detail");
      },
       // 点击首页
      pathIndex(){
        this.$store.state.currentIndex = '/index';
        this.$store.state.indexHome = '/index';
        this.$router.push("/index");
      },
    }
  }
</script>


<style lang="less" scoped>
  .contList {
    position: relative;
    padding: 24px;
    h2{
        font-size: 16px;
        color: #333;
        font-weight: bold;
        margin-bottom: 24px;
    }
    li{
        margin-bottom: 16px;
        border: 1px solid #D6DAEC;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        padding: 0 24px;
        border-radius: 4px;
     h3{
          font-size: 14px;
          color: #333;
        }
        span{
          color: #999;
        }

    }

    li:hover{
        background: rgba(78, 159, 91, 0.1);
    }
  }
</style>
