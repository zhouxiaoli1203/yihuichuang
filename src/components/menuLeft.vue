<template>
  <div class="menuLeft">
       <div class="newNav commontMenuItem">
            <el-row class="tac">
            <el-col>
                <el-menu
                :default-active="activeIndexs"
                @select="handleSelect"
                class="el-menu-vertical-demo"
                background-color="#fff"
                text-color="#333"
                active-text-color="#fff" router>
                    <template v-for="(item, index) in commonList">
                        <el-menu-item :index="item.url" v-if="item.tit!='退出登录'">
                        <span slot="title">{{item.tit}}</span>
                        </el-menu-item>

                        <el-menu-item v-else @click="logout">
                            <span slot="title">{{item.tit}}</span>
                        </el-menu-item>
                            
                    </template>
                </el-menu>
            </el-col>
            </el-row>
        </div>
    </div>

</template>

<script>
export default {
  name: 'menuLeft',
    data(){
        return{
            activeIndexs:'',
            commonList:[],
            navName:'',
            name:'',

        }
    },
    created(){
        let navName = this.$store.state.publicHome;
        let name = this.$store.state.menuLeft;
        this.leftNav(navName,name)
    },
    mounted(){

    },
    methods: {
        handleSelect(key) {
            // console.log(key)
            let navName = this.$store.state.publicHome;
            let val =  this.$store.state.menuLeft
            if(navName=='/user'){
                if(key==null){
                    if(val==''){
                        this.activeIndexs =  '/user'
                    }else{
                        this.activeIndexs =  this.$store.state.menuLeft
                    }
                }else{
                    this.activeIndexs=key
                    this.$store.state.menuLeft = key; //导航高亮
                }
            }else{
                this.activeIndexs=key
                this.$store.state.menuLeft = key; //导航高亮
            }
           
        },
        logout(){
            this.$confirm('确定要退出登录吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {  
                    this.$message({
                        type: 'success',
                        message: '退出登录成功!'
                    });
                    this.$post("post",this.baseUrl+'user/logout',{
                        token:this.token,
                    })
                    this.$store.state.token = '';
                    this.$store.state.currentIndex="/index",
                    this.$router.replace('/');
                }).catch(() => {      
            });
        },

        // 给导航赋值
        leftNav(navName,name){
            if(navName=='/news'){
                this.activeIndexs = name?name:'/news'
                this.commonList= [
                    {
                        tit:'行业动态',
                        url:'/news'
                    },
                    {
                        tit:'客户动态',
                        url:'/news/newsCustom'
                    },
                    {
                        tit:'公司动态',
                        url:'/news/frc'
                    }
                ]
            }
            if(navName=='/help'){
                this.activeIndexs = name?name:'/help'
                this.commonList= [
                    {
                        tit:'法律声明',
                        url:'/help'
                    },
                    {
                        tit:'常见问题',
                        url:'/help/helpProblem'
                    },
                    {
                        tit:'物流说明',
                        url:'/help/helpExpress'
                    },
                    {
                        tit:'退款说明',
                    }
                ]
            }
            if(navName=='/about'){
                this.activeIndexs = name?name:'/about'
                this.commonList= [
                    {
                        tit:'关于我们',
                        url:'/about'
                    },
                    {
                        tit:'用户协议',
                        url:'/about1',
                    },
                    {
                        tit:'联系我们',
                        url:'/about/aboutContact'
                    },
                    {
                        tit:'线下店分布',
                        url:'/about/aboutOffline'
                    }
                ]
            }

            if(navName=='/user'){
                this.activeIndexs = name?name:'/user'
                this.commonList= [
                    {
                        tit:'个人资料',
                        index:0,
                        url:'/user'
                    },
                    {
                        tit:'订单管理',
                        index:1,
                        url:'/user/userOrder'
                    },
                    {
                        tit:'收货地址',
                        index:2,
                        url:'/user/userAddress'
                    },
                    {
                        tit:'发票管理',
                        index:3,
                        url:'/user/userInvoice'
                    },
                    {
                        tit:'文件打印',
                        index:4,
                        url:'/user/userFile'
                    },
                    {
                        tit:'证件照',
                        index:5,
                        url:'/user/userPhoto'
                    },
                    {
                        tit:'余额管理',
                        index:6,
                        url:'/user/userBalance'
                    },
                    {
                        tit:'退出登录',
                        index:7,
                        url:'logout'
                    }
                ]
            }
        }


        // getPath () {  //解决浏览器后退导航高亮问题
        //     // this.activeIndexs = this.$route.path
        //     // this.$store.state.menuLeft = this.$route.path

        //     let href = this.$route.path
        //     let hrefUrl =  href.split('/')[1]
        //     // this.activeIndexs = '/'+ hrefUrl
        //     // this.$store.state.currentIndex = '/'+ hrefUrl
        //     // this.$store.state.publicHome = '/'+ hrefUrl
        //     console.log(hrefUrl)

        // }
    },
    watch: {
        // '$route': 'getPath'  //监听浏览器后退导航高亮问题
    }
  
}
</script>


<style lang="less" scoped>
  .newNav{
    width: 200px;
    height: 923px;
    background: #FFFFFF;
  }

</style>
