<template>
  <div class="commonNav">
    <ul class="navList">
    <template  v-for="(item, index) in navList" >
        <li @mouseover='navMouseOver(index)' @mouseleave='navMouseLeave(index)' :class="index === navActive?'active listLI':'listLI'">
        <div class="nav">
            <p>{{item.name}}</p>
            <i class="el-icon-arrow-right"></i>
        </div>
        <ul class="navCont" v-show="navActive == index">
            <li class="oneNav" v-if="item.id!=3">
                <span v-for="(value, vo) in item.children" @click="goDetail(value)">{{value.value}}</span>
            </li>
            <template v-else>
                <li class="twoNav" v-for="(value, vo) in item.children">
                    <p>{{value.title}}</p>
                    <div class="link">
                    <span v-for="(tit, index) in value.cont" @click="goDetail(tit)">{{tit.value}}</span>
                    </div>
                </li> 
            </template>
        </ul>
        </li>
    </template>
    </ul>
</div>

</template>

<script>
export default {
  name: 'commonNav',
    data(){
        return{
            navList: [
                { 
                    name: '广告物料',
                    id:0,
                    children: [
                    {value: '写真',id:"1001"}, 
                    // {value: '车贴',id:"1002"}, 
                    {value: '喷绘',id:"1003"}, 
                    // {value: '反光贴',id:"1004"}, 
                    // {value: '展板',id:"1005"}, 
                    {value: '旗帜',id:"1006"}, 
                    {value: '条幅',id:"1007"}, 
                    {value: '展架',id:"1008"}, 
                    {value: '绶带',id:"1009"}, 
                    // {value: '吊旗',id:"1010"}, 
                    // {value: '桌牌席卡',id:"1011"}, 
                    // {value: '相纸',id:"1012"}, 
                    {value: '袖标',id:"1013"}, 
                    ]
                },
                { 
                    name: '企业定制',
                    id:1,
                    children: [
                    {value: '企业宣传册',id:"2001"}, 
                    // {value: '工作证',id:"2002"}, 
                    // {value: '产品手册',id:"2003"}, 
                    // {value: '笔记本',id:"2004"}, 
                    // {value: '明信片',id:"2005"}, 
                    // {value: '纪念册',id:"2006"}, 
                    ]
                },
                { 
                    name: '常用印刷品',
                    id:2,
                    children: [
                    {value: '宣传单页',id:"3001"}, 
                    {value: '折页',id:"3002"}, 
                    {value: '名片',id:"3003"}, 
                    // {value: 'PVC卡',id:"3004"}, 
                    {value: '不干胶',id:"3005"}, 
                    // {value: '手提袋',id:"3006"}, 
                    // {value: '无纺布袋',id:"3007"}, 
                    // {value: '纸杯',id:"3008"}
                    ]
                },
                { 
                    name: '标识标牌店招',
                    id:3,
                    children: [
                    // {
                    //     title:'雕刻字类',
                    //     cont:[
                    //         {value: '水晶字 雪弗板字(30公分以上/以下)',id:"4001"}, 
                    //         {value: '精品发光字(50公分以下)',id:"4002"}, 
                    //         {value: '普通发光字(1米以上/以下）',id:"4003"}, 
                    //     ],
                    // }, 
                    {
                        title:'铜牌奖牌',
                        cont:[
                            {value: '木托授权牌',id:"4004"}, 
                            // {value: '钛金牌',id:"4005"}, 
                        ],
                    }, 
                    ]
                },
                { 
                    name: '其他印刷',
                    id:4,
                    children: [
                    {value: '菜单',id:"5001"}, 
                    // {value: '信封',id:"5002"}, 
                    // {value: '档案袋',id:"5003"}, 
                    // {value: '联单',id:"5004"}, 
                    // {value: '红头文件',id:"5005"}, 
                    // {value: '标签纸',id:"5006"}, 
                    // {value: '红包对联',id:"5007"}, 
                    ]
                },  
            ],
            navActive: -1,
        }
    },
    methods: {
      navMouseOver: function(index) {
        this.navActive = index
      },
      navMouseLeave: function(index) {
        this.navActive = -1
      },
      goDetail(x){
          if(this.$store.state.token){
            this.$router.push({  //核心语句
              path:'/print/detial',   //跳转的路径
              query:{           //路由传参时push和query搭配使用 ，作用时传递参数
                  page_id:x.id
              }
            })
        }else{
            this.$message({
                type:"warning",
                message: '请先登录!'
            });
        }
      }
    }

  
}
</script>


<style lang="less" scoped>
    .commonNav{
        width: 190px;
        height: 100%;
        background: #fff;
    }
    .navList{
        .listLI{
            position: relative;
            padding: 0 34px;
            color: #333;
            cursor: pointer;
            margin: 50px 0;

            .nav{
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 52px;
            }

            .navCont{
            position: absolute;
            z-index: 1111;
            left: 190px;
            width: 440px;
            border-radius: 0 8px 8px 0;
            padding: 24px;
            background: #fff;
            top: 50%;
            transform: translate(0, -50%);
            .oneNav{
                display: flex;
                align-items: center;
                flex-wrap: wrap;
                span{
                margin: 0 48px 24px 0;
                color: #333333
                }

                span:hover{
                color: #4E9F5B;
                }
            }
            .twoNav{
                p{
                color: #333333
                }
                .link{
                display: flex;
                flex-wrap: wrap;
                span{
                    color: #999999;
                    font-size: 12px;
                    line-height: 17px;
                    margin: 8px 8px 8px 0;
                }
                span:hover{
                    color: #4E9F5B;
                }
                }
            }
            .twoNav:not(:last-child){
                margin-bottom: 24px;
            }
            }


        }
        .listLI:first-child{
            margin-top: 0;
            .navCont{
            top: 0;
            transform: translate(0, 0);
            }
        }
        .active{
            background: #4E9F5B;
            color: #fff;
        }
    }
</style>
