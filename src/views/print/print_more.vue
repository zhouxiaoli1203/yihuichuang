<template>
  <div class='print-more-page main bgray'>
    <div class="center">
      <div class="print-more-title">
        <span class="cursor_p" @click="goBack()">在线印刷</span><span class="current">&nbsp;/&nbsp;{{title}}</span>
      </div>
      <div class="banner">

      </div>
      <div class="print-more-items">
        <h3 class="title">{{title}}</h3>
        <ul class="card-style">
          <li v-for="(item,index) in moreList" :key="index" class="cursor_p" @click="goDetail(item)">
              <div class="image">
                  <img :src="item.img" alt="">
              </div>
              <div class="title">{{item.title}}</div>
              <div class="number">
                <span>{{item.price}}</span>
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
      title:"",
      moreList:[]
    }
  },
  components: {},
  created(){
    this.type = this.$route.query.type;
    switch (this.type){
        case "ggwl":this.title = "广告物料";
            break;
        case "qydz":this.title = "企业定制";
            break;
        case "bsbpdz":this.title = "标识标牌店招";
            break;
        case "cyysp":this.title = "常用印刷品";
            break;
        case "qtys":this.title = "其它印刷";
            break;
    }
    this.getmoreList(this.type);
 
  },
  mounted(){},
  methods: {
      getmoreList(x){
          let this_ = this;
         this_.$post("post","Zxys/select",{category:x}).then((res)=>{
          if(res.code == 1){
              this_.moreList = res.data;
          }
        });
      },
    goBack:function(){
      this.$router.push({  //核心语句
        path:'/print',   //跳转的路径
        query:{           //路由传参时push和query搭配使用 ，作用时传递参数
        }
      })
    },
    goDetail:function(x){
         if(this.$store.state.token){
            this.$router.push({  //核心语句
                path:'/print/detial',   //跳转的路径
                query:{
                    page_id: x.page_id          //路由传参时push和query搭配使用 ，作用时传递参数
                }
            })
        }else{
            this.$message({
                type:"warning",
                message: '请先登录!'
            });
        }
      
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
.card-style{
 
  li{
    margin-bottom: 48px;
  }
}
</style>
