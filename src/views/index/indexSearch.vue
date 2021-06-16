<template>
  <div class='design main bgray'>
    <div class="center">
      <div class="search">
        <Search @func="getVal"></Search>
      </div>
      <div class="design-content">
        <div v-if="templates.length!=0">
          <ul class="clearfix">
            <li v-for="(x,index) in searchBtns"
              class="fl cursor_p"
              @click="changeSort(x)"
              :style='{color:x.id==undefined?"#666666":x.id=="hot"?"#FF3333":"#4E9F5B"}'>
              {{x.name}}
                <i>
                  <img :src='"@/assets/img/design/search_icon"+(index+1)+".png"' alt="">
                </i>
            </li>
          </ul>
          <ul class="displayFl design-content-item">
            <li v-for="x in templates" @click="openCkt(x)">
              <img :src="`http:${x.designTemplateImageUrl}`" alt="">
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

        <div v-show="noCont==true" class="NoCont" style="margin-top:103px;margin-bottom:109px">
          <img src="@/assets/img/common/noCont.png" alt="">
          <span>暂无数据</span>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import Search from '../../components/search'
export default {
  name: 'indexSearch',
  components: {
    Search
  },
  data() {
    return {
      templates:[],
      current:1,  //页码
      total:0, ///总条数
      order:undefined,
      searchBtns: [
        { name: '热门排序', id: 'hot' },
        { name: '最新上传', id: 'new' },
      ],
      design_id:"",
      keyword:'', //搜索的内容
      noCont:false
    }
  },
  created() {
    let keyword = this.$route.query.keyword
    this.keyword = keyword
    this.geTemplates(this.order,keyword,this.current);
  },
  mounted() {},
  methods: {
    // 点击弹出模板
    openCkt: function (x) {
      let params={
        template_id:x.designTemplateId
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
              this_.openFullScreen(); //调用加载中
              this_.$post("post","Ckt/templateDownload",{token:this_.$store.state.token,designId:this_.design_id}).then((res)=>{
                  if(res.code == 1){
                      this_.closeFullScreen(this_.openFullScreen()); //关闭加载框
                      window.open(res.data.url)
                  }
              })
            }
    
        });
    },
    // 点击排序
    changeSort(x){
      this.current = 1; //页码
      this.order = x.id;
      this.geTemplates(x.id,this.keyword,1);
    },
    
    // 获取搜索列表
    geTemplates(order,search,page){
        let this_ = this;
        let params={
          limit:12,
          page,
          order,
          search,
        };
        this_.$post('post', 'Ckt/template', params).then((res) => {
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
      console.log(val + '---------112');
      // 当pageSize发生变化后需重新查询列表
      this.geTemplates()
    },
    // 点击分页
    handleCurrentChange(val) {
      this.current = val
      this.geTemplates(this.order,this.keyword,this.current)
    },

    getVal(val){
      console.log(val);
      let valName
      if(val==undefined){
        valName = this.$route.query.keyword
        this.geTemplates(this.order,valName,this.current)
        this.keyword = valName
      }else{
        this.keyword = val
        this.geTemplates(this.order,val,this.current)  
      }
     
      
    },
  },
}
</script>
<style lang='less' scoped>

.search{
  position: relative;
  width: 100%;
  height: 100px;
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
  .el-pagination{
      margin-top: 64px;
    padding-bottom: 104px;
    text-align: center;
  }
}
</style>
