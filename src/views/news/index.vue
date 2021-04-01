<template>
  <div id="news" class="main connonBg">
    <div class="conmontBanner center">
      <img :src="banner1" alt="">
    </div>
    <section class="center">
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
    </section>
  </div>
</template>

<script>
export default {
  name: 'news',
  data () {
    return {
      banner1: require('../../assets/img/news/banner1.jpg'),
      activeIndex:'行业动态',
      commonList:[]
    }
  },
  mounted(){
    let navName = window.sessionStorage.getItem('navName');
    console.log(navName+'2222222')
    if(navName=='news'){
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
  },
  methods: {
    handleSelect(key, keyPath) {
      this.activeIndex=key
    }
  }
}
</script>


<style lang="less" >
  .newNav{
    width: 200px;
    height: 939px;
    background: #FFFFFF;
  }
</style>
