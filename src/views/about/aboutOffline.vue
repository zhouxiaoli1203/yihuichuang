<template>
  <div class="main connonBg">
    <div class="conmontBanner center">
      <img :src="banner1" alt="">
    </div>
    <section class="center">
        <div class="crumbsHeader">
          <div class="crumbs">
              <router-link to="/"> <span>首页 / </span></router-link>
              <span>线下店分布</span>
          </div>
        </div>
        <div class="publicCenter">
            <MenuLeft></MenuLeft>
            <div class="contList">
              <div class="screenBox">
                <el-row class="demo-autocomplete" type="flex" justify="space-between">
                    <el-col :span="10">
                      <el-cascader class="width100"
                        ref="cascaderAddr"
                        size="large"

                        v-model="city"
                        :options="options"
                        placeholder="请选择省市区"
                        @change="cityChange">
                      </el-cascader>

                    </el-col>
                    <el-col :span="6">
                        <el-input
                          @change="inputChange"
                          placeholder="请输入内容"
                          v-model="keyword">
                          <i slot="prefix" class="el-input__icon el-icon-search"></i>
                        </el-input>
                    </el-col>
                </el-row>

              </div>
              <div class="offlineBOX">
                <section class="ulSE">
                  <ul >
                    <template  v-for="(item,index) in storeList">
                      <li :class="listIndex == index?'active':''" @click="selectAddress(index,item)">
                        <div>
                          <p>
                            <img :src="shopIcon" alt="">
                            <span :title="item.name">{{item.name}}</span>
                          </p>
                          <p>
                            <img :src="addressIcon" alt="">
                            <span :title="item.prov + item.city + item.dist + item.addr">{{item.prov + item.city + item.dist + item.addr}}</span>
                          </p>
                          <p>
                            <img :src="telIcon" alt="">
                            <span>{{item.phone}}</span>
                          </p>
                        </div>
                      </li>
                    </template>
                    <i class='shuxian' :style="'top:'+LITOP"></i>
                  </ul>
                  
                </section>
                <div class="mapBox">
                   <div class="amap-page-container" style="width:100%;height:100%">
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
            </div>
        </div>
    </section>
  </div>
</template>

<script>
  import MenuLeft from '../../components/menuLeft'
  export default {
    name: 'aboutOffline',
    components: {
      MenuLeft,
    },
    metaInfo: {
      title: '易绘创官网关于我们',
      meta: [
        { name:"keywords",content:'易绘创线下门店,易绘创广告图文店'},
        { name:"description",content:'易绘创（yihuichuang.com）是集图文、广告、印刷、策划和文创于一体的综合性加盟连锁品牌。一直致力于用“互联网+”的手段和通过领先的O2O经营理念及自研的行业操作系统，解决用户在设计、印刷过程中遇到的问题，提高了工作效率并节省了顾客的时间，逐步实现行业的标准化、专业化、智慧化和惠民化。' },

      ]
    },
    data () {
      let self = this;
      return {
        options: [],
        banner1: require('../../assets/img/about/banner.jpg'),
        shopIcon: require('../../assets/img/about/shop.png'),
        addressIcon: require('../../assets/img/about/address.png'),
        telIcon: require('../../assets/img/about/tel.png'),
        keyword: '',
        listIndex:0,
        LITOP:'16px',
        storeList:[],
        center:  [121.126757,31.140653],
        zoom:12,
        markers: [],
        windows:[],
        window:'',
        city:[],

      }
    },
    created(){
      // 获取门店地址
      this.StoreaAddr((res) => {
        this.options = res
      })

      //获取所有的店铺
      this.StoreSelect(undefined,undefined,undefined,undefined,(res) => {
        this.storeList = res
        this.center = [res[0].lon,res[0].lat];
        this.point(res[0])
      })

     

      // 
    },
    mounted() {
    },
    methods: {
      point(pointMarker){
        //自定义map点坐标图标
        // let icon = new AMap.Icon({
        //     image: location,
        //     size: new AMap.Size(2, 2),
        //     imageSize: new AMap.Size(2, 2)
        // });

        let markers = [];
        let windows=[];
        let that=this;
        markers.push({
            position: [pointMarker.lon,pointMarker.lat],
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
          position: [pointMarker.lon,pointMarker.lat],
          content:"" +
            "<div>"+"店名："+pointMarker.name+"</div>" +
            "<div>"+"地 址："+pointMarker.addr+"</div>" +
            "<div>"+"手机号："+pointMarker.phone+"</div>" 
          ,
          offset:[5,-15],//窗体偏移
          visible: true,//初始是否显示
        })
      
        //添加点标注
        this.markers = markers;
        //生成弹窗
        this.windows=windows
      },

      // 点击某个列表
      selectAddress(val,item){
        this.listIndex = val
        this.LITOP = (val*150+16)+'px'
        this.center = [item.lon,item.lat];
        this.point(item)
      },
      //选择省市区
      cityChange(val){

        this.listIndex = 0
        let thsAreaCode='' // 拼接 三级联动地址代码
        thsAreaCode = val// 注意1：获取value值
        thsAreaCode = this.$refs.cascaderAddr.getCheckedNodes()[0].pathLabels  //注意2： 获取label值

        let prov = thsAreaCode[0]
        let city = thsAreaCode[1]
        let dist = thsAreaCode[2]


        this.keyword = ''

        // 获取门店列表
        this.StoreSelect(prov,city,dist,undefined,(res) => {
          this.storeList = res
          this.center = [res[0].lon,res[0].lat];  //获取经纬度
          this.point(res[0])
        })

      },

      // 搜索门店
      inputChange(val){
        this.StoreSelect(undefined,undefined,undefined,val,(res) => {
          if(res.length==0){
            this.$message({
              message:'您输入的信息无法查询到具体门店，请核实搜索内容是否为：城市、区/县等地区关键词',
              type: 'warning'
            });
            return
          }
          this.city= [];
          this.storeList = res
          this.center = [res[0].lon,res[0].lat];  //获取经纬度
          this.point(res[0])
        })
      },
    },
  }
</script>


<style lang="less" scoped>
  .contList {
    background: #fff;
    padding: 24px;
    .offlineBOX{
      display: flex;
      justify-content: space-between;
      margin-top: 24px;

      .ulSE{
        position: relative;
        width: 304px;
        height: 768px;
        overflow: hidden;
        background: #E4EAF5;
        border-radius: 10px;

         i{
            position: absolute;
            right: 0;
            height: 150px;
            width: 2px;
            background: #404A78;
            -webkit-transition: all 0.5s ease;
            transition: all 0.5s ease;
            border-radius: 3px;
          }
      }
      ul{
        padding: 16px 0;
        position: absolute;
        overflow-y: scroll;
        top:0;
        bottom:0;   /*相当于height:100%时的高度*/
        left: 0;
        right:-17px;  /*图层宽度大于width:100%,滚动条的宽度刚刚好被隐藏 */      
        li{
          width: 286px;
          height: 150px;
          border-radius: 10px;
          margin: 0 auto;
          display: flex;
          flex-flow: column; //垂直排列
          justify-content: center;//两端对齐
          padding: 0 13px;
          cursor: pointer;
          p{
            display: flex;
            align-items: center;
            margin-bottom: 20px;
            img{
              width: 22px;
              height: 22px;
              margin-right: 10px;
            }

            span{
              flex: 1;
                
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 1;
              overflow: hidden;
            }
          }
          p:last-child{
            margin-bottom: 0;
          }
        }
        .active{
          background: #fff;
        }
      }

      .mapBox{
        width: 608px;
        height: 768px;
        background: #D8D8D8;
        border-radius: 10px;
      }
    }
  }
</style>
