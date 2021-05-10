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
                <span v-for="(value, vo) in item.children">{{value.value}}</span>
            </li>
            <template v-else>
                <li class="twoNav" v-for="(value, vo) in item.children">
                    <p>{{value.title}}</p>
                    <div class="link">
                    <span v-for="(tit, index) in value.cont">{{tit.value}}</span>
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
                    {value: '写真'}, 
                    {value: '车贴'}, 
                    {value: '喷绘'}, 
                    {value: '反光贴'}, 
                    {value: '展板'}, 
                    {value: '旗帜'}, 
                    {value: '条幅'}, 
                    {value: '展架'}, 
                    {value: '绶带'}, 
                    {value: '吊旗'}, 
                    {value: '桌牌席卡'}, 
                    {value: '相纸'}, 
                    {value: '袖标'}, 
                    ]
                },
                { 
                    name: '企业定制',
                    id:1,
                    children: [
                    {value: '企业宣传册'}, 
                    {value: '工作证'}, 
                    {value: '产品手册'}, 
                    {value: '笔记本'}, 
                    {value: '明信片'}, 
                    {value: '纪念册'}, 
                    ]
                },
                { 
                    name: '常用印刷品',
                    id:2,
                    children: [
                    {value: '宣传单页'}, 
                    {value: '折页'}, 
                    {value: '名片'}, 
                    {value: 'PVC卡'}, 
                    {value: '不干胶'}, 
                    {value: '手提袋'}, 
                    {value: '无纺布袋'}, 
                    {value: '纸杯'}
                    ]
                },
                { 
                    name: '标识标牌店招',
                    id:3,
                    children: [
                    {
                        title:'雕刻字类',
                        cont:[
                            {value: '水晶字 雪弗板字(30公分以上/以下)'}, 
                            {value: '精品发光字(30公分以上)'}, 
                            {value: '普通发光字(1米以上/以下）'}, 
                        ],
                    }, 
                    {
                        title:'铜牌奖牌',
                        cont:[
                            {value: '木托授权牌'}, 
                            {value: '钛金牌'}, 
                        ],
                    }, 
                    ]
                },
                { 
                    name: '其他印刷',
                    id:4,
                    children: [
                    {value: '菜单'}, 
                    {value: '信封'}, 
                    {value: '档案袋'}, 
                    {value: '联单'}, 
                    {value: '红头文件'}, 
                    {value: '标签纸'}, 
                    {value: '红包对联'}, 
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
