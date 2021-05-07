<template>
  <div class='print-online main bgray'>
    <div class="banner center">
      <div class="column">
        <BannerNav></BannerNav>
      </div>
      <div class="lunbo">
        <el-carousel height="500px">
            <el-carousel-item v-for="item in 4" :key="item">
              <h3 class="small">{{ item }}</h3>
            </el-carousel-item>
          </el-carousel>
      </div>
    </div>
    <div class="print-items">
      <ul class="items">
        <li class="items-li center" v-for="(x,index) in items">
            <div class="items-header">
              <div class="items-header-t fl">{{x.title}}</div>
              <div class="items-header-m fr cursor_p" @click="gotoMore(x)">更多</div>
              <!-- <div class="items-header-m fr cursor_p" ><router-link to="/print/more">更多</router-link></div> -->
            </div>
            <div class="items-lunbo">
              <el-carousel arrow="always" :autoplay="false" height="400px">
                <el-carousel-item v-for="item in 6" :key="item">
                  <ul class="card-style">
                    <li class="cursor" @click="goDetail(x)">
                      <div class="image"></div>
                      <div class="title">海报印刷</div>
                      <div class="number">
                        <span>34元</span>/<span>100张</span>
                      </div>
                    </li>
                    <li></li>
                    <li></li>
                  </ul>
                </el-carousel-item>
            </el-carousel>
            </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import BannerNav from '@/components/bannerNav'
export default {
  name: 'print',
  data(){
    return {
      items:[
        {title:"广告物料",arr:12,id:"2"},
        {title:"企业定制",arr:16,id:"2"},
        {title:"标识标牌店招",arr:12,id:"4"},
        {title:"常用印刷品",arr:12,id:"5"},
        {title:"其他印刷",arr:12,id:"6"},
      ],
    }
  },
  components: {BannerNav},
  created(){},
  mounted(){},
  methods: {
    gotoMore:function(data){
      this.$store.state.moredata = {
        title:data.title,
        items:Array(data.arr)
      };
      this.$router.push({  //核心语句
        path:'/print/more',   //跳转的路径
        query:{           //路由传参时push和query搭配使用 ，作用时传递参数
        }
      })
    },
    goDetail:function(x){
      this.$router.push({  //核心语句
        path:'/print/detial',   //跳转的路径
        query:{           //路由传参时push和query搭配使用 ，作用时传递参数
            type:x.id
        }
      })
    }
  }
}
</script>
<style lang='less' scoped>
  .banner{
    height: 500px;
    display: flex;
    border: 1px solid;
    margin-top: 25px;
    justify-content: space-between;
    .column{
      width: 190px;
      height: 100%;
    }
    .lunbo{
      width: 1010px;
      height: 100%;
    }
  }
  .print-items{
    .items{
      margin:0 auto 68px;
      display: flex;
      flex-direction:column;
      .items-li{
        .items-header{
          padding:30px 0px 25px;
          height: 88px;
          vertical-align: bottom;
          .items-header-t{
            font-size: 24px;
            font-weight: 500;
            color: #333333;
            line-height: 33px;
          }
          .items-header-m{
            font-size: 16px;
            font-weight: 400;
            color: #666;
            line-height: 33px;
          }
        }
        .items-lunbo{
          width: 100%;
          border: 1px solid;
        .el-carousel--horizontal {
          width: 100%;
        }
        /deep/.el-carousel__indicators--horizontal{
          display: none;
        } 
          
        }
      }
    }
  }
</style>
