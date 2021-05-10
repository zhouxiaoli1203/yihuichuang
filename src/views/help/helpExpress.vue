<template>
  <div class="main connonBg">
    <div class="conmontBanner center">
      <img :src="banner1" alt="">
    </div>
    <section class="center">
      <div class="crumbsHeader">
        <div class="crumbs">
            <span @click="pathIndex()">首页 / </span>
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
                    <li @click="gotoMore(item.ID)">
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
    data () {
      return {
        banner1: require('../../assets/img/help/banner.jpg'),
        page:1,
        limit:5,
        list:[],
        count:0,
        noCont:false
      }
    },
    created(){
      this.industry(this.page,this.limit) 
    },
    methods: {
      gotoMore(id){
        this.$router.push({ 
            path: 'news/detail',   
            name: 'newsDetail',  
            query: {  
              name:'物流说明',
              id,
              type:'help'
            }
        })    
      },


       // 点击首页
      pathIndex(){
        this.$store.state.currentIndex = '/index';
        this.$router.push("/index");
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
