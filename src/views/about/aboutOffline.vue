<template>
  <div class="main connonBg">
    <div class="conmontBanner center">
      <img :src="banner1" alt="">
    </div>
    <section class="center">
        <div class="crumbsHeader">
          <div class="crumbs">
              <span @click="pathIndex()">首页 / </span>
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
                                  size="large"
                                  :options="options"
                                  placeholder="请选择省市区"
                                  @change="cityChange">
                      </el-cascader>
                    </el-col>
                    <el-col :span="6">
                      <el-autocomplete
                        class="inline-input"
                        v-model="state2"
                        :fetch-suggestions="querySearch"
                        placeholder="请输入内容"
                        :trigger-on-focus="false"
                        @select="handleSelect"
                        suffix-icon="el-icon-search"
                      ></el-autocomplete>
                    </el-col>
                </el-row>

              </div>
              <div class="offlineBOX">
                <section class="ulSE">
                  <ul >
                    <template  v-for="item in list">
                      <li :class="listIndex == item.val?'active':''" @click="selectAddress(item.val)">
                        <div>
                          <p>
                            <img :src="shopIcon" alt="">
                            <span>{{item.name}}</span>
                          </p>
                          <p>
                            <img :src="addressIcon" alt="">
                            <span>{{item.address}}</span>
                          </p>
                          <p>
                            <img :src="telIcon" alt="">
                            <span>{{item.tel}}</span>
                          </p>
                        </div>
                      </li>
                    </template>
                    <i class='shuxian' :style="'top:'+LITOP"></i>
                  </ul>
                  
                </section>
                <div class="mapBox"></div>
              </div>
            </div>
        </div>
    </section>
  </div>
</template>

<script>
  import MenuLeft from '../../components/menuLeft'
  import { regionData } from 'element-china-area-data'
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
      return {
        options: regionData,
        banner1: require('../../assets/img/about/banner.jpg'),
        shopIcon: require('../../assets/img/about/shop.png'),
        addressIcon: require('../../assets/img/about/address.png'),
        telIcon: require('../../assets/img/about/tel.png'),
        restaurants: [],
        state2: '',
        list:[
          {
            name:'店铺名称',
            address:'山西省晋中市榆次区幸福胡同928号',
            tel:'1258225822',
            val:0
          },
          {
            name:'店铺名称111111',
            address:'山西省晋中市榆次区幸福胡同928号',
            tel:'1258225822',
            val:1
          },
          {
            name:'店铺名称111111',
            address:'山西省晋中市榆次区幸福胡同928号',
            tel:'1258225822',
            val:2
          },
          {
            name:'店铺名称111111',
            address:'山西省晋中市榆次区幸福胡同928号',
            tel:'1258225822',
            val:3
          },
          {
            name:'店铺名称111111',
            address:'山西省晋中市榆次区幸福胡同928号',
            tel:'1258225822',
            val:4
          },
            {
            name:'店铺名称111111',
            address:'山西省晋中市榆次区幸福胡同928号',
            tel:'1258225822',
            val:5
          },
          
        ],
        listIndex:0,
        LITOP:'16px'
      }
    },
    methods: {
      gotoMore(){
        this.$router.push("/news/detail");
      },
      // 点击首页
      pathIndex(){
        this.$store.state.currentIndex = '/index';
        this.$router.push("/index");
      },
      querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      loadAll() {
        return [
          { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
          { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
          { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
          { "value": "泷千家(天山西路店)", "address": "天山西路438号" },
          { "value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },
          { "value": "贡茶", "address": "上海市长宁区金钟路633号" },
          { "value": "豪大大香鸡排超级奶爸", "address": "上海市嘉定区曹安公路曹安路1685号" },
          { "value": "茶芝兰（奶茶，手抓饼）", "address": "上海市普陀区同普路1435号" },
          { "value": "十二泷町", "address": "上海市北翟路1444弄81号B幢-107" },
          { "value": "星移浓缩咖啡", "address": "上海市嘉定区新郁路817号" },
          { "value": "阿姨奶茶/豪大大", "address": "嘉定区曹安路1611号" },
          { "value": "新麦甜四季甜品炸鸡", "address": "嘉定区曹安公路2383弄55号" },
          { "value": "Monica摩托主题咖啡店", "address": "嘉定区江桥镇曹安公路2409号1F，2383弄62号1F" },
          { "value": "浮生若茶（凌空soho店）", "address": "上海长宁区金钟路968号9号楼地下一层" },
          { "value": "NONO JUICE  鲜榨果汁", "address": "上海市长宁区天山西路119号" },
          { "value": "CoCo都可(北新泾店）", "address": "上海市长宁区仙霞西路" },
          { "value": "快乐柠檬（神州智绘店）", "address": "上海市长宁区天山西路567号1层R117号店铺" },
          { "value": "Merci Paul cafe", "address": "上海市普陀区光复西路丹巴路28弄6号楼819" },
          { "value": "猫山王（西郊百联店）", "address": "上海市长宁区仙霞西路88号第一层G05-F01-1-306" },
          { "value": "枪会山", "address": "上海市普陀区棕榈路" },
          { "value": "纵食", "address": "元丰天山花园(东门) 双流路267号" },
          { "value": "钱记", "address": "上海市长宁区天山西路" },
          { "value": "壹杯加", "address": "上海市长宁区通协路" },
          { "value": "唦哇嘀咖", "address": "上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元" },
          { "value": "爱茜茜里(西郊百联)", "address": "长宁区仙霞西路88号1305室" },
          { "value": "爱茜茜里(近铁广场)", "address": "上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺" },
          { "value": "鲜果榨汁（金沙江路和美广店）", "address": "普陀区金沙江路2239号金沙和美广场B1-10-6" },
          { "value": "开心丽果（缤谷店）", "address": "上海市长宁区威宁路天山路341号" },
          { "value": "超级鸡车（丰庄路店）", "address": "上海市嘉定区丰庄路240号" },
          { "value": "妙生活果园（北新泾店）", "address": "长宁区新渔路144号" },
          { "value": "香宜度麻辣香锅", "address": "长宁区淞虹路148号" },
          { "value": "凡仔汉堡（老真北路店）", "address": "上海市普陀区老真北路160号" },
          { "value": "港式小铺", "address": "上海市长宁区金钟路968号15楼15-105室" },
          { "value": "蜀香源麻辣香锅（剑河路店）", "address": "剑河路443-1" },
          { "value": "北京饺子馆", "address": "长宁区北新泾街道天山西路490-1号" },
          { "value": "饭典*新简餐（凌空SOHO店）", "address": "上海市长宁区金钟路968号9号楼地下一层9-83室" },
          { "value": "焦耳·川式快餐（金钟路店）", "address": "上海市金钟路633号地下一层甲部" },
          { "value": "动力鸡车", "address": "长宁区仙霞西路299弄3号101B" },
          { "value": "浏阳蒸菜", "address": "天山西路430号" },
          { "value": "四海游龙（天山西路店）", "address": "上海市长宁区天山西路" },
          { "value": "樱花食堂（凌空店）", "address": "上海市长宁区金钟路968号15楼15-105室" },
          { "value": "壹分米客家传统调制米粉(天山店)", "address": "天山西路428号" },
          { "value": "福荣祥烧腊（平溪路店）", "address": "上海市长宁区协和路福泉路255弄57-73号" },
          { "value": "速记黄焖鸡米饭", "address": "上海市长宁区北新泾街道金钟路180号1层01号摊位" },
          { "value": "红辣椒麻辣烫", "address": "上海市长宁区天山西路492号" },
          { "value": "(小杨生煎)西郊百联餐厅", "address": "长宁区仙霞西路88号百联2楼" },
          { "value": "阳阳麻辣烫", "address": "天山西路389号" },
          { "value": "南拳妈妈龙虾盖浇饭", "address": "普陀区金沙江路1699号鑫乐惠美食广场A13" }
        ];
      },
      handleSelect(item) {
        console.log(item);
      },
      selectAddress(val){
        this.listIndex = val
        this.LITOP = (val*150+16)+'px'
      },
    },
    mounted() {
      this.restaurants = this.loadAll();
    }
  }
</script>


<style lang="less" scoped>
  .contList {
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
            margin-bottom: 24px;
              display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
            img{
              width: 22px;
              height: 22px;
              margin-right: 10px;
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
