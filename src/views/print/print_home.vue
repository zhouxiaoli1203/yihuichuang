<template>
  <div class='print-online'>
    <div class="banner center">
      <div class="column"></div>
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
        <li class="items-li" v-for="(x,index) in items">
            <div class="items-header">
              <div class="items-header-t fl">{{x.title}}</div>
              <div class="items-header-m fr">更多</div>
            </div>
            <div class="items-lunbo">
              <el-carousel arrow="always" :autoplay="false" height="400px">
                <el-carousel-item v-for="item in 6" :key="item">
                  <ul class="carousel-item">
                    <li></li>
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
export default {
  name: 'print',
  data(){
    return {
      items:[
        {title:"广告物料"},
        {title:"企业定制"},
        {title:"标识标牌店招"},
        {title:"常用印刷品"},
        {title:"其他印刷"},
      ],
    }
  },
  components: {},
  created(){},
  mounted(){},
  methods: {}
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
      width:1382px;
      margin:0 auto 68px;
      display: flex;
      flex-direction:column;
      .items-li{
        width: 100%;
        .items-header{
          padding:30px 91px 25px;
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
        .carousel-item{
          display:flex;
          justify-content: space-between;
          li{
            width: 368px;
            height: 400px;
            background: #D8D8D8;
            border-radius: 8px;
          }
        }
        .el-carousel--horizontal {
          padding: 0 91px;
          width: 100%;
      }
      /deep/.el-carousel__arrow--left{
        left: -91px;
      }
      /deep/.el-carousel__arrow--right{
        right: -91px;
      }
      /deep/.el-carousel__indicators--horizontal{
        display: none;
      }  
          
        }
      }
    }
  }
</style>
