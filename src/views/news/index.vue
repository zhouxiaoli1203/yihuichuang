<template>
  <div class="main connonBg">
    <div class="conmontBanner center">
      <img :src="banner1" alt="">
    </div>
    <section class="center publicCenter">
      <MenuLeft></MenuLeft>
      <div class="contList">
        <ul class="list">
          <template v-for="item in list">
            <li @click="gotoMore(item.ID)">
              <div class="tit">
                <h3>{{item.Title}}</h3>
                <span>{{item.PostTime | formatDate_('yyyy-MM-dd hh:mm') }}</span>
              </div>
              <p>{{item.Intro}}</p>
            </li>
          </template>
        </ul>
        <div class="paging">
          <el-pagination
            background
            :current-page.sync="page"
            layout="prev, pager, next"
            @current-change="handleCurrentChange"
            :page-size="1"
            :total="count">
          </el-pagination>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import MenuLeft from '../../components/menuLeft'
  export default {
    name: 'news',
    components: {
      MenuLeft,
    },
    data () {
      return {
        banner1: require('../../assets/img/news/banner1.jpg'),
        page:1,
        limit:1,
        list:[],
        count:0,
      }
    },
    created(){
      let article = localStorage.getItem('article')
      if (article) {
        this.page = Number(article)
        this.industry(article,this.limit) 
      }else{
        this.industry(this.page,this.limit) 
      }
    },
    methods: {
      gotoMore(id){
        this.$router.push({ 
            path: 'news/detail/18',   
            name: 'newsDetail',  
            query: {  
              name: '行业动态',
              id,
              type:'news'
            }
        })    
      },
      // 行业动态
      industry(page,limit){
        this.$post("post",'Article/select',{
          category_id:5,
          limit,
          page,
        })
        .then((res)=>{
          if(res.code==1){
            this.list = res.data.list
            this.count = res.data.count
            localStorage.setItem('article',page)
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
    li{
      margin: 24px;
      border-bottom: 1px solid #D6DAEC;
      padding-bottom: 28px;
      .tit{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 24px;

        h3{
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
