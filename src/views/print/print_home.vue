<template>
  <div class='print-online main bgray'>
    <div class="banner center">
      <div class="column">
        <BannerNav></BannerNav>
      </div>
      <div class="lunbo">
        <el-carousel height="500px">
            <el-carousel-item >
              <!-- <h3 class="small">{{ item }}</h3> -->
              <img src="@/assets/img/print/print.png" alt="" class="barimg">
            </el-carousel-item>
          </el-carousel>
      </div>
    </div>
    <div class="print-items">
      <ul class="items">
        <li class="items-li center" v-show="printList.ggwl">
            <div class="items-header">
              <div class="items-header-t fl">广告物料</div>
              <div class="items-header-m fr cursor_p" @click="gotoMore('ggwl')">更多</div>
            </div>
            <div class="items-lunbo">
              <el-carousel arrow="always" :autoplay="false" height="400px">
                <el-carousel-item v-for="(x,index) in printList.ggwl" :key="index">
                  <ul class="card-style">
                    <li class="cursor" v-for="(item,index_) in x" :key="index_"  @click="goDetail(item)">
                      <div class="image">
                          <img :src="item.view" alt="">
                      </div>
                      <div class="title">{{item.title}}</div>
                      <div class="number">
                        <span>{{item.price}}</span>
                      </div>
                    </li>
                  </ul>
                </el-carousel-item>
            </el-carousel>
            </div>
        </li>
          <li class="items-li center" v-show="printList.qydz">
            <div class="items-header">
              <div class="items-header-t fl">企业定制</div>
              <div class="items-header-m fr cursor_p" @click="gotoMore('qydz')">更多</div>
            </div>
            <div class="items-lunbo">
              <el-carousel arrow="always" :autoplay="false" height="400px">
                <el-carousel-item v-for="(x,index) in printList.qydz":key="index">
                  <ul class="card-style">
                    <li class="cursor" v-for="(item,index_) in x" :key="index_" @click="goDetail(item)">
                      <div class="image">
                          <img :src="item.view" alt="">
                      </div>
                      <div class="title">{{item.title}}</div>
                      <div class="number">
                        <span>{{item.price}}</span>
                      </div>
                    </li>
                  </ul>
                </el-carousel-item>
            </el-carousel>
            </div>
        </li>
        <li class="items-li center" v-show="printList.bsbpdz">
            <div class="items-header">
              <div class="items-header-t fl">标识标牌店招</div>
              <div class="items-header-m fr cursor_p" @click="gotoMore('bsbpdz')">更多</div>
            </div>
            <div class="items-lunbo">
              <el-carousel arrow="always" :autoplay="false" height="400px">
                <el-carousel-item v-for="(x,index) in printList.bsbpdz" :key="index">
                  <ul class="card-style">
                    <li class="cursor" v-for="(item,index_) in x" :key="index_" @click="goDetail(item)">
                      <div class="image">
                          <img :src="item.view" alt="">
                      </div>
                      <div class="title">{{item.title}}</div>
                      <div class="number">
                        <span>{{item.price}}</span>
                      </div>
                    </li>
                  </ul>
                </el-carousel-item>
            </el-carousel>
            </div>
        </li>
        <li class="items-li center" v-show="printList.cyysp">
            <div class="items-header">
              <div class="items-header-t fl">常用印刷品</div>
              <div class="items-header-m fr cursor_p" @click="gotoMore('cyysp')">更多</div>
            </div>
            <div class="items-lunbo">
              <el-carousel arrow="always" :autoplay="false" height="400px">
                <el-carousel-item v-for="(x,index) in printList.cyysp" :key="index">
                  <ul class="card-style">
                    <li class="cursor" v-for="(item,index_) in x" :key="index_" @click="goDetail(item)">
                      <div class="image">
                          <img :src="item.view" alt="">
                      </div>
                      <div class="title">{{item.title}}</div>
                      <div class="number">
                        <span>{{item.price}}</span>
                      </div>
                    </li>
                  </ul>
                </el-carousel-item>
            </el-carousel>
            </div>
        </li>
        <li class="items-li center" v-show="printList.qtys">
            <div class="items-header">
              <div class="items-header-t fl">其它印刷</div>
              <div class="items-header-m fr cursor_p" @click="gotoMore('qtys')">更多</div>
            </div>
            <div class="items-lunbo">
              <el-carousel arrow="always" :autoplay="false" height="400px">
                <el-carousel-item v-for="(x,index) in printList.qtys" :key="index">
                  <ul class="card-style">
                    <li class="cursor" v-for="(item,index_) in x" :key="index_" @click="goDetail(item)">
                      <div class="image">
                          <img :src="item.view" alt="">
                      </div>
                      <div class="title">{{item.title}}</div>
                      <div class="number">
                        <span>{{item.price}}</span>
                      </div>
                    </li>
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
  metaInfo: {
      title: '易绘创官网在线印刷：一站式采购平台',
      meta: [
        { name:"keywords",content:'名片制作,印刷厂,条幅制作,彩色画册印刷,喷绘,写真,宣传单印刷,名片印刷,特种纸,PVC卡,无碳联单,信纸表格,封套,手提袋,发光字,奖牌,展架,易拉宝, 易绘创'},
        { name:"description",content:'易绘创（yihuichuang.com）在线印刷一站式采购平台，能够实现在线评估报价、一键下单印刷品、包邮到家、线下门店自提等服务，满足广大客户对广告物料制作、企业定制、印刷品和标识标牌等宣传品的设计加工需求。' },
      ]

  },
  data(){
    return {
        printList:{
            ggwl:[],
            qydz:[],
            bsbpdz:[],
            cyysp:[],
            qtys:[]
        },
    //   items:[
    //     {title:"广告物料",arr:12,id:"2"},
    //     {title:"企业定制",arr:16,id:"2"},
    //     {title:"标识标牌店招",arr:12,id:"4"},
    //     {title:"常用印刷品",arr:12,id:"5"},
    //     {title:"其他印刷",arr:12,id:"6"},
    //   ],
    }
  },
  components: {BannerNav},
  created(){
      let this_ = this;
      this_.$post("post","Zxys/show").then((res)=>{
          if(res.code == 1){
             this.printList["ggwl"] = this.getLboArr(res.data.ggwl);
             this.printList["qydz"] = this.getLboArr(res.data.qydz);
             this.printList["bsbpdz"] = this.getLboArr(res.data.bsbpdz);
             this.printList["cyysp"] = this.getLboArr(res.data.cyysp);
             this.printList["qtys"] = this.getLboArr(res.data.qtys);
          }
      });
  },
  mounted(){},
  methods: {
    getLboArr(list){
         var arr= [];
        for(var i=0;i<list.length;i+=3){
        arr.push(list.slice(i,i+3));
        }
        return arr;
    },
    gotoMore:function(data){
      this.$router.push({  //核心语句
        path:'/print/more',   //跳转的路径
        query:{ 
            type:data          //路由传参时push和query搭配使用 ，作用时传递参数
        }
      })
    },
    goDetail:function(x){
        if(this.$store.state.token){
            this.$router.push({  //核心语句
              path:'/print/detial',   //跳转的路径
              query:{           //路由传参时push和query搭配使用 ，作用时传递参数
                  page_id:x.page_id
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
    display: flex;
    // border: 1px solid;
    // margin-top: 25px;
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
      margin:0 auto;
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
        //   border: 1px solid;
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
