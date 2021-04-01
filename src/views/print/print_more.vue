<template>
  <div class='print-more-page main bgray'>
    <div class="center">
      <div class="print-more-title">
        <span class="cursor_p" @click="goBack()">在线印刷</span><span class="current">&nbsp;/&nbsp;{{currentQuery.title}}</span>
      </div>
      <div class="banner">

      </div>
      <div class="print-more-items">
        <h3 class="title">{{currentQuery.title}}</h3>
        <ul class="card-style">
          <li v-for="x in currentQuery.items" class="cursor_p" @click="goDetail()">
              <div class="image"></div>
              <div class="title">海报印刷</div>
              <div class="number">
                <span>34元</span>/<span>100张</span>
              </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'more',
  data(){
    return {
      currentQuery:this.$store.state.moredata,
      items:[]
    }
  },
  components: {},
  created(){
    // this.currentQuery = this.$route.query;
    // console.log(this.currentQuery);
    // this.items = Array(12);
  },
  mounted(){},
  methods: {
    goBack:function(){
      this.$router.push({  //核心语句
        path:'/print',   //跳转的路径
        query:{           //路由传参时push和query搭配使用 ，作用时传递参数
        }
      })
    },
    goDetail:function(){
      this.$router.push({  //核心语句
        path:'/print/detial',   //跳转的路径
        query:{           //路由传参时push和query搭配使用 ，作用时传递参数
        }
      })
    }
  }
}
</script>
<style lang='less' scoped>

.banner{
  height: 500px;
  border: 1px solid;
}
.print-more-items{
  .title{
    font-size: 24px;
    font-weight: 500;
    color: #333333;
    line-height: 33px;
    margin: 32px 0 25px;
  }

}
</style>
