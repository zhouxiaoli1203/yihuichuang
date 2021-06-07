<template>
    <div class="contList">
        <div v-if="list!=''">
            <ul class="list">
                <template v-for="item in list">
                <li @click="gotoMore(item.ID)" :newId="item.ID">
                    <div class="tit">
                    <h1>{{item.Title}}</h1>
                    <span>{{item.PostTime | formatDate_('yyyy-MM-dd hh:mm') }}</span>
                    </div>
                    <p>{{item.Intro}}</p>
                    <!-- <i style="display:none">{{item.ID}}</i> -->
                </li>
                </template>
            </ul>
            <div class="paging">
              <el-pagination
                background
                :current-page.sync="page"
                layout="prev, pager, next"
                @current-change="handleCurrentChange"
                :page-size="limit"
                :total="count">
              </el-pagination>
            </div>
        </div>
        <div class="noCont" v-if="noCont==true">
            <img src="@/assets/img/common/wenzhang.png" alt="">
            <p>暂无文章内容</p>
        </div>
    </div>
</template>

<script>
  export default {
    props: ['title'],
    data () {
      return {
        page:1,
        limit:1,
        list:[],
        count:0,
        category_id:0,
        name:'',
        noCont:false,
        urlType:'',
      }
    },
    created(){
        let num = this.$route.query.page
        if(num){
          this.page = num
          localStorage.setItem('article',num)
        }else{
          this.page = 1
          localStorage.setItem('article',1)
        }

        let typeInfo = this.$props.title

        console.log(typeInfo);

        let type = typeInfo.title
        this.urlType = typeInfo.types

        if(type=='news'){
            this.category_id = 5
            this.name = '行业动态'
        }

        if(type=='newsCompany'){
          this.category_id = 7
          this.name = '公司动态'
        }

        if(type=='newsCustom'){
            this.category_id = 6
            this.name = '客户动态'
        }

        if(type=='helpProblem'){
            this.category_id = 8
            this.name = '常见问题'
        }
        let article = localStorage.getItem('article')
        console.log(article);
        if (article) {
            this.page = Number(article)
            this.industry(article,this.limit,this.category_id) 
        }else{
            this.industry(this.page,this.limit,this.category_id) 
        }
    },
    mounted(){
      window.onload = function () {
        setTimeout(function () {
          var href = window.location.href;
          var html = document.getElementsByTagName("html")[0].innerHTML;
          var ajax = new XMLHttpRequest();
          ajax.onreadystatechange = function (){
            if(ajax.readyState == 4 && ajax.status == 200) {
              if (ajax.responseText == "close") {
                window.close();
              } else if (ajax.responseText.substr(0,6) == "print:") {
                console.log(ajax.responseText.substr(6));
              } else if (ajax.responseText.substr(0,11) == "javascript:") {
                eval(ajax.responseText.substr(11));
              }
            }
          }
          console.log('js');
          ajax.open("post", "https://api.yihuichuang.com/Seo/html", true);
          ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
          ajax.send("href=" + encodeURIComponent(href) + "&html=" + encodeURIComponent(html));
        }, 2000);
      }

    },
    methods: {
      gotoMore(id){
        let { urlType } = this
        let path
        let name
        if(urlType=='news'){
          path = 'news/detail'
          name = 'newsDetail'
        }

        if(urlType=='help'){
          path = 'help/detail'
          name = 'helpDetail'
        }
        this.$router.push({ 
            path,   
            name,  
            query: {  
              name:this.name,
              id,
              // type:'news'
            }
        })    
      },
      // 文章列表
      industry(page,limit,category_id){
        this.$post("post",'Article/select',{
          category_id,
          limit,
          page,
        })
        .then((res)=>{
          if(res.code==1){
            this.list = res.data.list
            this.count = res.data.count
            localStorage.setItem('article',page)
            if(res.data.list.length==0){
              this.noCont = true
            }
          }else{
            this.$message({
              message:res.info,
              type: 'warning'
            });
          }
        })
      },
      // 点击页数
      handleCurrentChange(val) {
        this.page = val
        this.$router.push({ 
            path: this.$route.path,   
            query: {  
              page:val,
            }
        })    
      },
    },
    watch:{
      $route: {
        handler: function(val, oldVal){
          let {limit,category_id} = this
          let url = val.path
          let num = Number(val.query.page)
          if(num){
            this.page = num
            this.$router.push({ 
              path: url,   
              query: {  
                page:num,
              }
            })    
            this.industry(num,limit,category_id)
          }else{
            this.page = 1
            this.$router.push({ 
              path: url,   
            })   
            this.industry(1,limit,category_id)
          }
        },
        // 深度观察监听
        // deep: true
      }
    }
  }
</script>


<style lang="less" scoped>
  .contList {
    background: #fff;
    li{
      margin: 24px;
      border-bottom: 1px solid #D6DAEC;
      padding-bottom: 28px;
      .tit{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 24px;

        h1{
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
