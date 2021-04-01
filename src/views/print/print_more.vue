<template>
  <div class='print-more-page main bgray'>
    <div class="center">
      <div class="print-more-title">
        <span class="cursor_p" @click="goBack()">在线印刷</span><span>&nbsp;/&nbsp;物料广告</span>
      </div>
      <div class="banner">

      </div>
      <div class="print-more-items">
        <h3 class="title">广告物料</h3>
        <ul class="card-style">
          <li v-for="x in items" class="cursor_p" @click="goDetail()">
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
      items:[]
    }
  },
  components: {},
  created(){
    this.items = Array(12);
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
.print-more-title{
  margin-bottom: 24px;
  span{
    display: inline-block;
    color:#333333;
    font-size: 14px;
  }
  span.cursor_p{
    color:#999;    
  }
}
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
  .card-style{
    display:flex;
    justify-content: space-between;
    flex-wrap:wrap;
    >li{
      width: 368px;
      height: 400px;
      background: #D8D8D8;
      border-radius: 8px;
      margin-bottom: 48px;
      .image{
        width: 190px;
        height: 204px;
        margin:47px auto 32px;
        border: 1px solid #666;
      }
      .title{
        text-align: center;
        font-size: 16px;
        color:#333333;
        margin-bottom: 32px;
      }
      .number{
        text-align: center;
        font-size: 16px;
        color:#333333;
      }
    }
  }
}
</style>
