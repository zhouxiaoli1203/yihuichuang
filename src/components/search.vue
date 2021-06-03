<template>
    <div class="searchBox">
        <div class="input">
            <div class="inputInner">
                <input type="text" v-model="input"   placeholder="设计模板/在线印刷" @focus="searchFocus"  @blur="searchBlur" @keyup.enter="searchBtn($event)">
                <i class="el-icon-search"  @click="searchBtn"></i>
            </div>
            <!-- <el-button type="primary" @click="searchBtn">搜索</el-button> -->
        </div>
        <div class="search" v-if="searchList==true">
            <div class="link" v-if="historyList!=''">
                <span v-for="item in historyList" @click="searchKey(item)" @mousedown="preventBlur($event)">{{item}}</span>
            </div>
            <ul class="list">
            <template v-for="item in hotList">
                <li>
                <span :class="item.sty">{{item.val}}</span>
                <p>{{item.tit}}</p>
                </li>
            </template>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
  name: 'orderInfo',
  data() {
    return {
        input: '',
        searchList:false, //搜索记录列表
        hotList:[  //热门搜索
        {
            val:1,
            tit:'产品手册',
            sty:"red"
        },
        {
            val:2,
            tit:'宣传单页',
            sty:"reds"
        },
        {
            val:3,
            tit:'展架',
            sty:"org"
        },
        {
            val:4,
            tit:'名片',
            sty:"gray"
        },
        {
            val:5,
            tit:'不干胶',
            sty:"gray"
        },
        {
            val:6,
            tit:'联单',
            sty:"gray"
        }
        ],
        historyList:[], //历史搜索记录
    }
  },
  components: {},
  created() {},
  mounted() {},
  methods: {
    searchFocus(){ //搜索获取焦点
        this.searchList=true
        this.getSearchArr() 
    },
    searchBlur(){  //搜索失去焦点
        this.searchList=false
    },
    // 点击搜索
    searchBtn(e){
        let val = this.input
        if(val=='') return
        this.setHistoryItems(val)
        this.$router.push({  
            path: '/index/indexSearch',   
            name: 'indexSearch',  
            query: {  
              keyword:val,
            }
        })  
    },
    // 点击搜索记录
    searchKey(val){
        console.log(111)
        this.$router.push({  
            path: '/index/indexSearch',   
            name: 'indexSearch',  
            query: {  
              keyword:val,
            }
        })
        this.searchList=false  
    },

    preventBlur(event){
        console.log(event)
        event.preventDefault();
    },

    // 存入历史搜索记录
    setHistoryItems(keyword){
        var shuzu = []
        keyword = keyword.trim();
        shuzu = JSON.parse(localStorage.getItem('historyItems'));//取
        shuzu = shuzu?shuzu:[] 
        if(shuzu!=null){

            var retreat = shuzu.indexOf(keyword); 

            if(retreat==-1){

                shuzu[shuzu.length] = keyword;

                if(shuzu.length>5){

                    shuzu = shuzu.slice(Number(shuzu.length)-5,shuzu.length)

                    localStorage.setItem('historyItems', JSON.stringify(shuzu));

                    return false

                }

                localStorage.setItem('historyItems', JSON.stringify(shuzu));

            }

        }else{

            shuzu[shuzu.length] = keyword;

            if(shuzu.length>5){

                shuzu = shuzu.slice(Number(shuzu.length)-5,shuzu.length)

                localStorage.setItem('historyItems', JSON.stringify(shuzu));

                return false

            }

            localStorage.setItem('historyItems', JSON.stringify(shuzu));

        }

    },

    // 循环搜索历史
    getSearchArr(){
        let list= JSON.parse(localStorage.getItem('historyItems'));//取
        this.historyList = list?list:[]
    }
  },
}
</script>
<style lang='less' scoped>
 .searchBox{
    position: absolute;
    top: 32px;
    right: 32px;
    z-index: 11;
    width: 400px;
    box-shadow: 0px 2px 6px rgb(83 88 101 / 30%);

    .input{
        display: flex;
        align-items: center;
        background: #fff;
        border: none;
        border-radius: 8px;
        overflow: hidden;
        height: 40px;
        padding: 0 16px;

        .inputInner{
          display: flex;
          align-items: center;
          flex: 1;

          i{
            font-size: 22px;
            cursor: pointer;
          }
          input{
              flex: 1;
              height: 100%;
          }
        }
    }

    .el-button{
        border-radius: 0;
        width: 102px;
    }

    .el-button--primary{
        background-color: #4E9F5B;
        border-color: #4E9F5B;
    }
}
.search{
      background: #fff;
      border-radius: 8px;
      margin-top: 1px;
      // padding: 16px;

      .link{
        // margin-bottom: 15px;
        padding: 16px 16px 10px;
        span{
          font-size: 12px;
          color: #999;
          display: inline-block;
          margin-right: 12px;
          cursor: pointer;
          max-width: 60px;
          display: inline-block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        span:last-child{
          margin-right: 0;
        }
        span:hover{
          color:#4E9F5B;
        }
      }

      .list{
        padding-bottom: 15px;
        li{
          display: flex;
          align-items: center;
          height: 32px;
          padding: 0 16px;
          span{
            width: 16px;
            height: 16px;
            border-radius: 4px;
            display: inline-block;
            text-align: center;
            line-height: 16px;
            color: #fff;
            font-size: 12px;
            margin-right: 16px;
          }
          .red{
             background: #FF3333;
          }
          .reds{
             background: #FF6948;
          }
          .org{
             background: #FFCF3E;
          }
          .gray{
            background: #D3D3D3;
          }
          p{
            font-size: 12px;
            color: #333;
            cursor: pointer;
          }
        }
        li:hover{
          background: #f1f1f1;
        }
      }
    }
</style>
