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
          <div class="contList">
              <ul class="list">
                <li @click="gotoMore">
                    <div class="tit">
                    <h3>常见问题常见问题常见问题常见问题</h3>
                    <span>2020-02-02</span>
                    </div>
                    <p>温片达越保值步主一通地义青据打周书感记从选每候主光专化还国道九京般收无青易已军知一革门速通史义果中有温值交经华经好研几。美一风直们里真火文边青种听么况公西打接再成属她级即海工看主着特准志律构感三老水而等认下己克。张土除完斯连如济问段则当支自热记安并比器及使效列除办和酸代律回者西参收立思号西集思器成造要事</p>
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
