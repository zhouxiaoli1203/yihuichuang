<template>
  <div class="menuLeft">
       <div class="newNav commontMenuItem">
            <el-row class="tac">
              
                <el-col>

                    <!-- <ul class="menuLeftnavUl">
                        <template v-for="(item, index) in commonList">
                            <li v-if="item.tit!='退出登录'" @click="handleSelect(item.url)" :class="activeIndexs == item.url?'activeClass':''">
                                <a :href="item.url"><span>{{item.tit}}</span></a>
                            </li>
                            <li v-else @click="logout">
                                <a href="javascript:;"><span>{{item.tit}}</span></a>
                            </li>
                        </template>
                    </ul> -->


                    <el-menu
                    :default-active="activeIndexs"
                    @select="handleSelect"
                    class="el-menu-vertical-demo menuLeftnavUl"
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
        let navName
        let name
        let urlName  = this.$route.query.name
        // let type  = this.$route.query.type
        // if(type == 'news'){
        //     navName = '/news'
        //     if(urlName=='公司动态'){
        //         name = '/news/newsCompany'
        //     }
        //     if(urlName=='印刷知识'){
        //         name = '/news/newsCustom'
        //     }
        // }

        if(urlName=='行业动态'){
            navName = '/news'
            name = '/news'
        }

        if(urlName=='公司动态'){
            navName = '/news'
            name = '/news/newsCompany'
        }

        if(urlName=='印刷知识'){
            navName = '/news'
            name = '/news/newsCustom'
        }

        if(urlName=='物流说明'){
            navName = '/help'
            name = '/help/helpExpress'
        }

        if(urlName=='常见问题'){
            navName = '/help'
            name = '/help/helpProblem'
        }


        // if(type == 'help'){
        //     navName = '/help'
        //     if(urlName=='物流说明'){
        //         name = '/help/helpExpress'
        //     }
        // }


        let href = this.$route.path

        console.log(href);
        let hrefs = href.split('/')[1]
        
        if(href=='/user/userPicture' || href=='/user/userFiledown' ){
            navName = '/user',
            name = '/user/userFile'
        }

        
        if(href!='/news/detail' && href!='/user/userPicture' && href!='/user/userFiledown' && href!='/help/detail'){
            console.log(104);
            console.log(hrefs,href);
            this.leftNav('/'+hrefs,href)
            if(href != '/'+hrefs){
                this.$store.state.menuLeft = href
            }else{
                this.$store.state.menuLeft = ''
            }
        }else{
            console.log(112);
            console.log(navName,name);
            this.leftNav(navName,name)
            
        }

        
        
    },
    mounted(){

    },
    methods: {
        handleSelect(key) {
            localStorage.removeItem('article')
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
                  
                    this.$post("post",'User/logout',{
                        token:this.$store.state.token,
                    })

                    // 清空token，userId
                    localStorage.removeItem('token');
                    this.$store.state.token = '';
                    localStorage.removeItem('userId');
                    this.$store.state.userId = '';
                    localStorage.removeItem('userInfo');
                    this.$store.state.userInfo = '';    
                    localStorage.removeItem('cartNum');
                    this.$store.state.cartNum = 0;       
                    this.$store.state.currentIndex="/",
                    this.$router.replace('/');
                    this.$message({
                        type: 'success',
                        message: '退出登录成功!'
                    });
                }).catch(() => {      
            });
        },

        // 给导航赋值
        leftNav(navName,name){
        //     this.name = name
        // this.navName = navName

        console.log(11144);
            console.log(navName,name + '---------176');
            // this.$store.state.currentIndex = navName; //导航高亮
            if(navName=='/news'){
                this.activeIndexs = name?name:'/news'
                this.commonList= [
                    {
                        tit:'行业动态',
                        url:'/news'
                    },
                    {
                        tit:'印刷知识',
                        url:'/news/newsCustom'
                    },
                    {
                        tit:'公司动态',
                        url:'/news/newsCompany'
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
                        url:'/help/helpRefund'
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
                        url:'/about/aboutUser',
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
                        tit:'一键抠图',
                        index:6,
                        url:'/user/matting'
                    },
                    {
                        tit:'余额管理',
                        index:7,
                        url:'/user/userBalance'
                    },
                    {
                        tit:'退出登录',
                        index:8,
                        url:'logout'
                    }
                ]
            }
        }
    },
    watch:{
       
    }
}
</script>


<style lang="less" scoped>
  .newNav{
    width: 200px;
    height: 923px;
    background: #FFFFFF;
  }

  .menuLeftnavUl{
      li:hover{
        background-color: rgba(78, 159, 91, 0.1) !important;
      }
    // li{
    //     height: 56px;
    //     line-height: 56px;
    //     text-align: center;

    //     a{
    //         display: block;
    //         width: 100%;
    //         height: 100%;
    //         span{
    //             color: #333;
    //         }
    //     }
    // }

    // .activeClass{
    //     background: #4E9F5B;
    //     a{
    //         span{
    //             color: #fff;
    //         }
    //     }
    // }
  }

</style>
