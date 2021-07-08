<template>
  <div class="main connonBg">
    <div class="conmontBanner center">
      <img :src="banner1" alt="">
    </div>
    <section class="center">
        <div class="crumbsHeader">
          <div class="crumbs">
              <router-link to="/"> <span>首页 / </span></router-link>
              <span>联系我们</span>
          </div>
        </div>
        <div class="publicCenter">
            <MenuLeft></MenuLeft>
            <div class="contList wenzhnagContList">
              <ArticleDetail :title='titleInfo'></ArticleDetail>

                <div class="amap-page-container" style="width:100%;height:600px">
                     <el-amap class="amap-box" :zoom="zoom" :center="center" >
                        <el-amap-marker
                                v-for="marker in markers"
                                :position="marker.position"
                                :key="marker.id"
                                :events="marker.events"
                                :icon="marker.icon"
                        ></el-amap-marker>
                        <el-amap-info-window
                                v-if="window"
                                :position="window.position"
                                :visible="window.visible"
                                :content="window.content"
                                :offset="window.offset"
                        ></el-amap-info-window>
                    </el-amap>   
                    </div>


            </div>
            
        </div>
    </section>
  </div>
</template>

<script>
  import MenuLeft from '../../components/menuLeft'
  import ArticleDetail from '../../components/articleDetail'
  export default {
    name: 'aboutContact',
    components: {
      MenuLeft,
      ArticleDetail
    },
    metaInfo: {
      title: '易绘创官网关于我们',
      meta: [
        { name:"keywords",content:'易绘创线下门店,易绘创广告图文店'},
        { name:"description",content:'易绘创（yihuichuang.com）是集图文、广告、印刷、策划和文创于一体的综合性加盟连锁品牌。一直致力于用“互联网+”的手段和通过领先的O2O经营理念及自研的行业操作系统，解决用户在设计、印刷过程中遇到的问题，提高了工作效率并节省了顾客的时间，逐步实现行业的标准化、专业化、智慧化和惠民化。' },

      ]
    },
    data () {
      return {
        banner1: require('../../assets/img/about/banner.jpg'),
        titleInfo:{
          title:'aboutContact',
          types:'about'
        },
        center:[116.797853,33.976148],
        zoom:12,
        markers: [],
        windows:[],
        window:'',
        city:[],
      }
    },
    created(){
    },
    mounted() {
      this.point();
    },
    methods: {
      point(){
        let markers = [];
        let windows=[];
        let that=this;
        markers.push({
            position: [116.797853,33.976148],
            events: {
                click() {
                    that.windows.forEach(window => {
                        window.visible = false; //关闭窗体
                    });
                    that.window = that.windows[0];
                    that.$nextTick(() => {
                        that.window.visible = true;//点击点坐标，出现信息窗体
                    });
                }
            }
        })
        windows.push({
            position: [116.797853,33.976148],
            content:"" +
                "<div>"+"地 址：安徽省淮北市相山区古城路与洪山路交叉口红绿灯路口68-5号</div>" 
            ,
            offset:[5,-15],//窗体偏移
            visible: true//初始是否显示
        })
       
        //添加点标注
        this.markers = markers;
        //生成弹窗
        this.windows=windows
    },
    }
  }
</script>


<style lang="less" scoped>
</style>

