<template>
  <div class="main connonBg">
    <div class="conmontBanner center">
      <img :src="banner1" alt="">
    </div>
    <section class="center">
      <div class="crumbsHeader">
        <div class="crumbs">
          <router-link to="/"> <span>首页 / </span></router-link>
          <span>物流说明</span>
        </div>
      </div>
      <div class="publicCenter">
          <MenuLeft></MenuLeft>
          <div class="contList">
            <div v-if="list!=''">
              <h2>合作快递</h2>
                <ul class="list">
                  <template v-for="item in list">
                    <li @click="gotoMore(item.ID)" :newId="item.ID">
                        <h3>{{item.Title}}</h3>
                        <span>{{item.PostTime | formatDate_('yyyy-MM-dd hh:mm') }}</span>
                    </li>
                  </template>
                </ul>
                <div class="paging">
                  <el-pagination
                    background
                    :current-page.sync="page"
                    layout="prev, pager, next"
                    @current-change="handleCurrentChange"
                    :page-size="5"
                    :total="count">
                  </el-pagination>
                </div>
              </div>
              <div class="noCont" v-show="noCont">
                  <img src="@/assets/img/common/wenzhang.png" alt="">
                  <p>暂无文章内容</p>
              </div>
          </div>
      </div>
    </section>
  </div>
</template>

<script>
  import MenuLeft from '../../components/menuLeft'
  export default {
    name: 'helpProblem',
    components: {
      MenuLeft,
    },
    metaInfo: {
      title: '易绘创官网常见问题',
      meta: [
        { name:"keywords",content:'易绘创注册账号,易绘创自助设计教程,使用教程,自助上传文件,CDR-X4下载 ,发货物流'},
        { name:"description",content:'易绘创（yihuichuang.com）常见问题：为您解决使用易绘创遇到的印刷品设计问题、印刷品下单问题、发货物流问题和易绘创服务等。' },

      ]
    },
    data () {
      return {
        banner1: require('../../assets/img/help/banner.jpg'),
        page:1,
        limit:5,
        list:[],
        count:0,
        noCont:false,
      }
    },
    created(){
      this.industry(this.page,this.limit) 
    },
    mounted(){
      window.onload = function () {
        setTimeout(function () {
          var href = window.location.href;
          var html = document.getElementsByTagName("html")[0].innerHTML;
          var ajax = new XMLHttpRequest();
          ajax.onreadystatechange = function (){
            if(ajax.readyState == 4 && ajax.status == 200) {
              console.log('js1');
              if (ajax.responseText == "close") {
                window.close();
              } else if (ajax.responseText.substr(0,6) == "print:") {
                console.log(ajax.responseText.substr(6));
              } else if (ajax.responseText.substr(0,11) == "javascript:") {
                eval(ajax.responseText.substr(11));
              }
            }
          }
          ajax.open("post", "https://api.yihuichuang.com/Seo/html", true);
          ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
          ajax.send("href=" + encodeURIComponent(href) + "&html=" + encodeURIComponent(html));
        }, 2000);
      }
    },
    methods: {
      gotoMore(id){
        this.$router.push({ 
            path: 'help/detail',   
            name: 'helpDetail',  
            query: {  
              name:'物流说明',
              id,
            }
        })    
      },
      industry(page,limit){
        this.$post("post",'Article/select',{
          category_id:9,
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
        let {limit} = this
        this.industry(val,limit)
      },
    }
  }
</script>


<style lang="less" scoped>
  .contList {
    position: relative;
    padding: 24px;
    h2{
        font-size: 16px;
        color: #333;
        font-weight: bold;
        margin-bottom: 24px;
    }
    li{
        margin-bottom: 16px;
        border: 1px solid #D6DAEC;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        padding: 0 24px;
        border-radius: 4px;
     h3{
          font-size: 14px;
          color: #333;
        }
        span{
          color: #999;
        }

    }

    li:hover{
        background: rgba(78, 159, 91, 0.1);
    }
  }
</style>
