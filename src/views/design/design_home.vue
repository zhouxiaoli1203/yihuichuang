<template>
  <div class='design main bgray'>
    <div class="center">
      <div class="design-head">
        <ul class="design-tab">
            <!-- 分类 -->
          <li class="design-tab-li">
            <div class="search-head">
              <img src='@/assets/img/design/head_icon1.png'
                   width="18px"
                   height="18px">
              <span style='color:#8C8CBC;'>分类</span>
            </div>
            <ul class="search-item">
              <li v-for="(y,index_) in cnst.designSearch" @click="changeSearch(y)" >
                <span class="name" :class="{'active':y.name == search.current}">{{y.name}}</span>
              </li>
            </ul>
          </li>
          <!-- 用途 -->
          <li class="design-tab-li">
            <div class="search-head">
              <img src='@/assets/img/design/head_icon2.png'
                   width="18px"
                   height="18px">
              <span style='color:#FD5392;'>用途</span>
            </div>
            <ul class="search-item" v-if="levelist.length>0">
              <li v-for="(y,index) in levelist" @click="changeSearch1(y)" v-if="index<=4">
                <span class="name" :class="{'active':y.name == search.current1}">{{y.name}}</span>
              </li>
              <li v-if="(levelist.length-5)>0" v-clickoutside="handleClose_1">
                  <span @click="checkpop1 = !checkpop1">更多</span>
                    <div class="dropmore" v-show="checkpop1">
                        <ul>
                            <li v-for="(x,index) in levelist" v-if="index>4"  @click="changeSearch1(x)" :class="{'active':x.name == search.current1}">
                                {{x.name}}
                            </li>
                        </ul>
                        </div>
              </li>
            </ul>
          </li>
          <!-- 行业 -->
          <li class="design-tab-li">
            <div class="search-head">
              <img src='@/assets/img/design/head_icon3.png'
                   width="18px"
                   height="18px">
              <span style='color:#2334E0;'>行业</span>
            </div>
            <ul class="search-item" v-if="leve2list.length>0">
              <li v-for="(y,index) in leve2list" v-if="index<=4" @click="changeSearch2(y)">
                <span class="name" :class="{'active':y.name == search.current2}">{{y.name}}</span>
              </li>
              <li v-if="(leve2list.length-5)>0" v-clickoutside="handleClose_2">
                  <span @click="checkpop2 = !checkpop2">更多</span>
                    <div class="dropmore" v-show="checkpop2">
                        <ul>
                            <li v-for="(x,index) in leve2list" v-if="index>4" @click="changeSearch2(x)" :class="{'active':x.name == search.current2}">
                                {{x.name}}
                            </li>
                        </ul>
                        </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="part-line"></div>
      <div class="design-content">
        <div v-if="templates.length!=0">
          <ul class="clearfix">
            <li v-for="(x,index) in searchBtns"
              class="fl cursor_p"
              @click="changeSort(x)"
              :style='{color:x.id==""?"#666666":x.id=="hot"?"#FF3333":"#4E9F5B"}'>{{x.name}}<i><img :src='"@/assets/img/design/search_icon"+(index+1)+".png"'
                    alt=""></i></li>
          </ul>
          <ul class="displayFl design-content-item">
            <li v-for="x in templates"
                @click="openCkt(x)">
              <img :src="`http:${x.designTemplateImageUrl}`"
                  alt="">
              <h5 class="mt15 t_a_c">{{x.templateTitle}}</h5>
            </li>
          </ul>
          <el-pagination background
            layout="prev, pager, next"
            :page-size="12"
            :current-page="current"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :total="total">
          </el-pagination>
        </div>
        <div v-if="noCont==true" class="NoCont" style="margin-top:83px;margin-bottom:109px">
          <img src="@/assets/img/common/noCont.png" alt="">
          <span>暂无数据</span>
        </div>
      </div>
    </div>
    <!-- 详情页面的入口选择弹框 -->
        <Dialog ref="rukou_pop"
            :config="rkconfig"
            :beforeClose="beforeClose"
            modal-append-to-body="false"
            @close="resetForm">
            <ul class="rukou_select">
                <li v-for="x in rukouList" @click="gotoDetail(x)">
                    <img :src="x.icon" alt="" width="68px" height="68px">
                    <div class="title">{{x.title}}</div>
                </li>
            </ul>
    </Dialog>
  </div>
</template>

<script>
import CKT from '@/utils/useCkt'
import Dialog from '@/components/dialog-pop'
export default {
  name: 'design',
  metaInfo: {
      title: '易绘创官网广告设计印刷：在线设计|自助设计',
      meta: [
        { name:"keywords",content:'名片制作,印刷厂,条幅制作,彩色画册印刷,喷绘,写真,宣传单印刷,名片印刷,特种纸,PVC卡,无碳联单,信纸表格,封套,手提袋,发光字,奖牌,展架,易拉宝, 易绘创广告设计印刷,自助设计,在线设计, 在线ps,海报设计,平面设计,在线图片编辑,在线图片制作,在线图片设计,在线作图,图片编辑器,易绘创'},
        { name:"description",content:'易绘创（yihuichuang.com）广告设计印刷：能够实现在线自助设计、在线编辑和一键生成。设计有名片、海报、写真、喷绘、贺卡、宣传单、展架、条幅等印刷品图片。' },

      ]
  },
  data() {
    return {
      checkpop1:false,
      checkpop2:false,
      levelist:[],
      leve2list:[],
      templates:[],
      current:1,
      total:0,
      search:{
          fl:undefined,
          yt:undefined,
          hy:undefined,
          current:null,
          current1:null,
          current2:null,
          order:undefined,
      },
      searchBtns: [
        { name: '热门排序', id: 'hot' },
        { name: '最新上传', id: 'new' },
      ],
      rkconfig:{
        width: '600px',
        title: '',
        center: false,
        btnTxt: [],
      },
      design_id:"",
      rukouList:[],
      noCont:false
    }
  },
  components: {Dialog},
  created() {
    //   this.confirm_pop("确定要删除吗").then(res=>{
    //      this.$message({
    //             type: 'success',
    //             message: '删除成功!'
    //         });
    //   })
    this.geTemplates();
  },
  mounted() {},
  methods: {
    openCkt: function (x) {
        let params={
            // kind_id:x.designKindId,
            template_id:x.designTemplateId
            // "design_id": "5e1ba825-6864-4943-96eb-65600d418ac5"
            // keywords:x.keywords
        };
        
        let this_ = this;
        this_.$post("post","Ckt/templateClick",{designTemplateId:x.designTemplateId}).then((res)=>{
            if(res.code == 1){

            }
        });
     this_.CKT.useCkt(params,function(ckt){
         console.log(ckt);
          if(ckt.kind == 2){
                this_.design_id = ckt["design-id"];
                if(!this_.$store.state.token){
                    return this_.$message.error("请重新登录");
                }
                this_.openFullScreen(); //调用加载中
                this_.$post("post","Ckt/templateDownload",{token:this_.$store.state.token,designId:this_.design_id}).then((res)=>{
                    if(res.code == 1){
                        this_.closeFullScreen(this_.openFullScreen()); //关闭加载框
                        window.open(res.data.url)
                    }
                });
            //  "219393"  x.designTemplateId
        //       this_.$post("post","Goods/page",{token:this_.$store.state.token,template_id:x.designTemplateId}).then((res)=>{
        //        if(res.code == 1){
        //            if(res.data.total == 0){
        //                return this_.$message({
        //                    type: 'warning',
        //                    message: '无效模板'
        //                });
        //            }else if(res.data.total == 1){
        //                this_.$router.push({
        //                    //核心语句
        //                    path:'/print/detial',   //跳转的路径
        //                    query:{           //路由传参时push和query搭配使用 ，作用时传递参数
        //                        page_id:res.data.list[0].page_id,
        //                        design_id:ckt["design-id"]
        //                    }
        //                })
        //            }else{
        //                this_.rukouList = res.data.list;
                       
        //                 this_.$refs.rukou_pop.open((cancel) => {

        //                    }).then(() => {
   
        //                    }) 
        //            }
        //        }
        //    });
          }
  
      });
    },
    gotoDetail(x){
        let this_ = this;
        this.resetForm();
        this_.$router.push({
                           //核心语句
            path:'/print/detial',   //跳转的路径
            query:{           //路由传参时push和query搭配使用 ，作用时传递参数
                page_id:x.page_id,
                design_id:this_.design_id
            }
        })
    },
    resetForm(){

    },
    beforeClose(){},
    changeSearch(x){
        this.search.current = x.name;
        this.levelist = x.level;
        if(x.name == "全部"){
            this.levelist = [];
        }
        this.leve2list = [];
        this.search.fl = x.name;
        this.search.yt = undefined;
        this.search.hy = undefined;
         this.search.current1 = null;
         this.search.current2 = null;
        this.geTemplates();
    },
    changeSearch1(y){
         this.search.current1 = y.name;
        this.checkpop1 = false;
        this.leve2list = y.level?y.level:[];
         if(y.name == "全部"){
            this.leve2list = [];
        }
        this.search.yt = y.name == "全部"?undefined: y.name;
        this.search.hy = undefined;
        this.search.current2 = null;
        this.current = 1;
        this.geTemplates();
    },
    changeSearch2(y){
         this.search.current2 = y.name;
        this.checkpop2 = false;
        this.search.hy = y.name == "全部"?undefined: y.name;
        this.current = 1;
        this.geTemplates();
    },
    changeSort(x){
        this.current = 1;
        this.search.order = x.id;
        this.geTemplates();
    },
    geTemplates(){
        let this_ = this;
        let params={
            limit:12,
            page:this.current,
            fl:this.search.fl,
            yt:this.search.yt,
            hy:this.search.hy,
            order:this.search.order,
        };
         this_
        .$post('post', 'Ckt/template', params)
        .then((res) => {
          if (res.code == 1) {
            this_.templates = res.data.list;
            this_.current = res.data.page;
            this_.total = res.data.count;

            if(res.data.list.length==0){
              this.noCont = true
            }else{
              this.noCont = false
            }
          }
        })
    },
    handleSizeChange(val) {
      // 当pageSize发生变化后需重新查询列表
      this.geTemplates()
    },
        // currentPage 改变时会触发
    handleCurrentChange(val) {
      this.current = val
      // 当currentPage发生变化后需重新查询列表
      this.geTemplates()
    },
    handleClose_1(){
        this.checkpop1 = false;
    },
    handleClose_2(){
        this.checkpop2 = false;
    },
  },
  
}
</script>
<style lang='less' scoped>
.design-head {
  margin-top: 32px;
  .design-tab {
    display: flex;
    justify-content: space-between;
    .design-tab-li {
      padding: 16px 24px;
      width: 342px;
      height: 129px;
      background: #ffffff;
      border-radius: 20px;
      .search-head {
        font-size: 16px;
        margin-bottom: 15px;
      }
      .search-item {
        > li {
          margin-right: 24px;
          margin-bottom: 20px;
          display: inline-block;
          cursor: pointer;
          padding: 1px 4px;
          border-radius: 4px;
          position: relative;
           span.active,span:hover{
            color: #409eff;
          }
          .dropmore{
              position: absolute;
              top: 24px;
              left: -47px;
              min-width: 130px;
              overflow: hidden;
              background: #fff;
              border-radius: 4px;
              box-shadow: 0 0 40px 0 #ddd;
              padding: 15px 0 5px;
              >ul{
                  width:100% ;
                  height: inherit;
                  max-height: 240px;
                  display: flex;
                  flex-direction: column;
                  overflow: auto;
                >li{
                    width: 100%;
                    height: 24px;
                    line-height: 24px;
                    padding: 0 5px;
                    margin-bottom: 10px;
                    text-align: center;
                    &.active,&:hover{
                        background-color:rgba(219,219,219,0.5);
                    }
                }
              }
          }
        }
      }
    }
  }
}
.part-line {
  margin: 32px 0;
}
.design-content {
  ul > li {
    cursor: pointer;
    margin-right: 32px;
    font-size: 16px;
    img {
      width: 18px;
      height: 18px;
    }
  }
  .design-content-item {
    justify-content: flex-start;
    flex-wrap: wrap;
    margin-top: 30px;
    li {
      width: 368px;
      height: 250px;
      margin-bottom: 30px;
      img {
        width: 100%;
        height: 213px;
        border-radius: 8px;
      }
    }
  }
  .el-pagination {
    margin-top: 64px;
    padding-bottom: 104px;
    text-align: center;
  }
}
.rukou_select{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 345px;
    margin: 50px auto;
    li{
        width: 68px;
        height: 98px;
        cursor: pointer;
        img{
            margin-bottom: 16px;
        }
        div.title{
            text-align: center;
            font-size: 14px;
        }
    }
}
</style>
