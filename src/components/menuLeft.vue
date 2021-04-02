<template>
  <div class="menuLeft">
       <div class="newNav commontMenuItem">
            <el-row class="tac">
            <el-col>
                <el-menu
                :default-active="activeIndex"
                @select="handleSelect"
                class="el-menu-vertical-demo"
                background-color="#fff"
                text-color="#333"
                active-text-color="#fff">
                <template v-for="(item, index) in commonList">
                    <el-menu-item :index="item.tit">
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
            activeIndex:'',
            commonList:[]
        }
    },
    mounted(){
        let navName = this.$store.state.publicHome;
        if(navName=='/news'){
            this.activeIndex='行业动态'
            this.commonList= [
                {
                    tit:'行业动态',
                    index:0
                },
                {
                    tit:'客户动态',
                    index:1
                },
                {
                    tit:'公司动态111',
                    index:2
                }
            ]
        }
        if(navName=='/help'){
            this.activeIndex='法律声明'
            this.commonList= [
                {
                    tit:'法律声明',
                    index:0
                },
                {
                    tit:'常见问题',
                    index:1
                },
                {
                    tit:'物流说明',
                    index:2
                },
                {
                    tit:'退款说明',
                    index:3
                }
            ]
        }
        if(navName=='/about'){
            this.activeIndex='关于我们'
            this.commonList= [
                {
                    tit:'关于我们',
                    index:0
                },
                {
                    tit:'用户协议',
                    index:1
                },
                {
                    tit:'联系我们',
                    index:2
                },
                {
                    tit:'线下店分布',
                    index:3
                }
            ]
        }
        if(navName=='/user'){
            this.activeIndex='个人资料'
            this.commonList= [
                {
                    tit:'个人资料',
                    index:0
                },
                {
                    tit:'订单管理',
                    index:1
                },
                {
                    tit:'收货地址',
                    index:2
                },
                {
                    tit:'发票管理',
                    index:3
                },
                {
                    tit:'文件打印',
                    index:4
                },
                {
                    tit:'证件照',
                    index:5
                },
                {
                    tit:'余额管理',
                    index:6
                }
            ]
        }
    },
    methods: {
        handleSelect(key, keyPath) {
            this.activeIndex=key
        }
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
