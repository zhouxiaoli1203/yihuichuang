<template>
  <div class='print-detail-page main bgray'>
    <div class="center">
      <div class="print-more-title">
        <span class="cursor_p" @click="goBack()">在线印刷</span><span class="current">&nbsp;/&nbsp;商品详情</span>
      </div>
      <div class="print-detail-operate">
        <div class="operate-left">
               <myComponent  :title=title  :addFormData=addFormData > </myComponent>
        </div>
        <div class="operate-right">
        <img src="" alt="">
      </div>
      </div>
      <div class="print-detail-info">
        <div class="fl relation">
          <div class="rel-title">相关产品</div>
          <ul class="card-style rel-products">
            <li v-for="x in relItems">
              <div class="image"></div>
              <div class="title">海报印刷</div>
              <div class="number">
                <span>34元</span>/<span>100张</span>
              </div>
            </li>
          </ul>
        </div>
        <div class="fr infos">
          <el-tabs type="border-card" v-model="editableTabsValue">
            <el-tab-pane :key="item.name"
              v-for="(item, index) in editableTabs"
              :label="item.title"
              :name="item.name">{{item.content}}
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import myComponent from "@/components/operatePart"
export default {
  name: 'pdetial',
  data(){
    return {
      relItems:Array(4),
      editableTabsValue:"detail",
      editableTabs:[
        {name:"detail",title:"产品详情",content:"11111111111"},
        {name:"server",title:"售后服务",content:"22222222222"},
      ],
      title:"测试动态组件",
      show:true,
      addFormData:[]
    }
  },
  components: {myComponent},
  created(){
    this.addFormData = JSON.parse(this.$route.query.data).formData;
    console.log(this.addFormData);
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
  }
}
</script>
<style lang='less' scoped>
.print-detail-operate{
    
}
.print-detail-info{
  margin:58px auto 0;
  padding-bottom: 88px;
  display: flex;
  justify-content: space-between;
  .relation{
    width: 226px;
    background:#fff;
    height: -webkit-fill-available;
    .rel-title{
      height: 44px;
      line-height: 44px;
      text-align: center;
      font-size: 14px;
      border-bottom: 1px solid #615858;
    }
    .rel-products{
      display: flex;
      flex-direction:column;
      >li{
        width: 100%;
        height: 318px;
        border-bottom:1px solid #615858 ;
        border-radius: 0px;
        margin-bottom: 0px;
        background: #fff;
        .image{
          width: 134px;
          height: 134px;
          margin:75px auto 8px;
          border: 1px solid #666;
        }
        .title{
          margin-bottom: 8px;
        }
      }
    }
  }
  .infos{
    width: 927px;
    height: -webkit-fill-available;
  }
  
  /deep/.el-tabs--border-card{
    border:none;
    .el-tabs__item{
      height: 44px;
      border-top:3px solid transparent;
    }
    .el-tabs__item.is-active{
      color:#4E9F5B;
      border-top-color: #4E9F5B;
    }
  }
}
</style>
