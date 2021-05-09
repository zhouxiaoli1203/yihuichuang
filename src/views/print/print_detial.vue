<template>
  <div class='print-detail-page main bgray'>
    <div class="center">
      <div class="print-more-title">
        <span class="cursor_p"
              @click="goBack()">在线印刷</span><span class="current">&nbsp;/&nbsp;商品详情</span>
      </div>
      <div class="print-detail-operate" v-if="infos">
        <div class="operate-left">
          <!-- 每个页面的属性 -->
          <!-- <Armband v-if="detailType == 1"></Armband>
          <Banner v-if="detailType == 2"></Banner> -->
          <component v-bind:is="attrViews" @detailChange="attrDetails"></component>

          <!-- <Ribbon></Ribbon> -->
          <!-- 上传文件按钮 -->
          <el-form class="bgGreen_">
            <el-form-item label="我有文件">
              <el-upload class="upload-demo"
                         action=""
                         :on-exceed="exceed"
                         :http-request="qiniuUploadCover"
                         :on-preview="handlePreview"
                         :on-remove="onRemove"
                         :before-upload="beforeUpload"
                         :auto-upload="true"
                         :limit="3"
                         :disabled="false"
                         :file-list="files.fileList"
                         ref="addEditUpload"
                         multiple="multiple">
                <el-button class="yhc_btn"
                           slot="trigger"
                           size="small"
                           type="primary">上传稿件</el-button>
              </el-upload>
              <el-dialog :visible.sync="files.showPic"
                         size="tiny"
                         :append-to-body="true">
                <img width="100%"
                     :src="files.showPicUrl"
                     alt="">
              </el-dialog>
              <!-- <el-upload class="upload-demo" action=""
                   :http-request="qiniuUploadCover"
                   list-type="picture-card"
                   :limit="3"
                   :disabled="false"
                   :auto-upload="true"
                   :on-exceed="exceed"
                   :before-upload="beforeUpload"
                   :on-remove="onRemove"
                   :on-preview="handlePictureCardPreview"
                   ref="addEditUpload"
                   :file-list="fileList"
                   multiple="multiple">
                        <el-button class="yhc_btn"
                           slot="trigger"
                           size="small"
                           type="primary">上传稿件</el-button>
              </el-upload> -->
            </el-form-item>
            <el-form-item label="我没文件">
              <el-button class="yhc_btn fl"
                         size="small"
                         type="success"
                         @click="openCkt"
                         style="width:110px;">挑选模版设计</el-button>
              <ul class="el-upload-list el-upload-list--text">
                <li tabindex="0"
                    class="el-upload-list__item is-success">
                  <a class="el-upload-list__item-name"><i class="el-icon-document"></i>food.jpeg
                  </a>
                  <label class="el-upload-list__item-status-label"><i class="el-icon-upload-success el-icon-circle-check"></i></label><i class="el-icon-close"></i><i class="el-icon-close-tip">按 delete
                    键可删除</i>
                </li>
              </ul>
            </el-form-item>
            <el-form-item label="没有满意模板">
              <el-button class="yhc_btn"
                         size="small"
                         type="success">设计定制</el-button>
            </el-form-item>
          </el-form>
          <!-- 在线估价弹框 -->
          <Price  ></Price>

        </div>
        <div class="operate-right">
          <img :src="infos.right"
               alt="" width="100%" height="100%">
        </div>
      </div>
      <div class="print-detail-info">
        <div class="fl relation">
          <div class="rel-title">相关产品</div>
          <ul class="card-style rel-products">
            <li v-for="x in infos.xgcp">
              <div class="image">
                  <img :src="x.img" alt="">
              </div>
              <div class="title">{{x.title}}</div>
              <div class="number">
               {{x.price}}
              </div>
            </li>
          </ul>
        </div>
        <div class="fr infos yhc-el-tabs">
          <el-tabs type="border-card"
                   v-model="editableTabsValue">
            <el-tab-pane :key="item.name"
                         v-for="(item, index) in editableTabs"
                         :label="item.title"
                         :name="item.name">
                        <div v-show="item.title == '产品详情'">
                            <ul>
                                <li v-for="(x,index) in infos.cpxq" :key="index">
                                    <img :src="x" alt="" width="100%" height="100%">
                                </li>
                            </ul>
                        </div>
                        <div v-show="item.title == '售后服务'">1111</div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
// 广告物料
import Armband from '@/views/print/materiel/armband_dtl' //袖章
import BannerJia from '@/views/print/materiel/banner_dtl_jia' //条幅--展架
import Banner from '@/views/print/materiel/banner_dtl' //条幅
import Paint from '@/views/print/materiel/paint_dtl' //喷绘
import Photo from '@/views/print/materiel/photo_dtl' //写真
import Ribbon from '@/views/print/materiel/ribbon_dtl' //绶带
// 其他印刷
import Caidan from '@/views/print/otherPrint/caidan_dtl' //菜单
// 企业定制
import Xuanchuance from '@/views/print/company/xuanchuance_dtl' //企业宣传册
// 常用印刷
import Buganjiao from '@/views/print/comnPrint/buganjiao_dtl' //不干胶
import Danye from '@/views/print/comnPrint/danye_dtl' //宣传单页
import Mingpian from '@/views/print/comnPrint/mingpian_dtl' //名片
import Zheye from '@/views/print/comnPrint/zheye_dtl' //折页
// 标牌
import Mutuopai from '@/views/print/biaopai/mutuopai_dtl' //标识标牌店招-木托授权牌

//以下是公用组件--调取创客贴useCkt--在线估价pricePop
import { regionData } from 'element-china-area-data'
import Price from '@/components/pricePop'
import CKT from '@/utils/useCkt'
export default {
  name: 'pdetial',
  data() {
    return {
      files: {
        showPic: false,
        showPicUrl: '',
        oldPicUrl: '',
        imgs:'',
        fileList: []
      },
      kind:"",
      infos:{},
      attrViews: Ribbon,
      detailType: '',
      relItems: Array(4),
      editableTabsValue: 'detail',
      editableTabs: [
        { name: 'detail', title: '产品详情'},
        { name: 'server', title: '售后服务'},
      ],
      title: '测试动态组件',
      show: true,
      arr: [
        { cmpt: Armband, id: 3 },
        { cmpt: BannerJia, id: 2 },
        { cmpt: Photo, id: 1 },
        { cmpt: Mutuopai, id: 4 },
        { cmpt: Danye, id: 5 },
        { cmpt: Caidan, id: 6 },
      ],
    }
  },
  components: {
    Armband,
    Banner,
    BannerJia,
    Paint,
    Photo,
    Ribbon,
    Caidan,
    Xuanchuance,
    Buganjiao,
    Danye,
    Mingpian,
    Zheye,
    Mutuopai,
    Price,
  },
  created() {
    this.kind = this.$route.query.kind;
    this.getDetails(this.kind);
    // this.attrViews = this.arr.filter((v) => {
    //   return this.detailType == v.id
    // })[0].cmpt
  },
  mounted() {},
  computed: {},
  methods: {
      getDetails(kind,temp){
        let this_ = this;
        let param = {
            kind_id:kind?kind:undefined,
            template_id:temp?temp:undefined
        };
        this_.$post("post","Goods/detail",param).then((res)=>{
          if(res.code == 1){
              this_.infos = res.data;
          }
        });
      },
    goBack: function () {
      this.$router.push({
        //核心语句
        path: '/print', //跳转的路径
        query: {
          //路由传参时push和query搭配使用 ，作用时传递参数
        },
      })
    },
    onRemove(file, fileList) {
      this.files.fileList = this.files.fileList.filter((i)=>{
          return i.uid != file.uid;
      });
    },
    handlePreview(file) {
      let _this = this
      _this.files.showPicUrl = file.url
      _this.files.showPic = true
    },
    beforeUpload(file){

    },
    qiniuUploadCover(event) {

      let _this = this
      var paramObj = _this.getImagekey("")
      paramObj.key = paramObj.key + event.file.uid
      paramObj.name = event.file.name;
      _this.upFiles({ paramObj: paramObj, e: event }, (res) => {
           let _this = this;
          _this.files.fileList.push({
               name:paramObj.name,
               uid:event.file.uid,
               key:res.key,
               url:"http://qrndg83uk.hn-bkt.clouddn.com/"+res.key+"?v="+Date.parse(new Date())
           });
      })
    },
    handleClick: function () {},
    openCkt: function () {
      CKT.useCkt({ kind_id: '166' }, function (res) {
        console.log(res)
      })
    },
    attrDetails: function (d, o) {
        // this.param = d;
        // console.log(this.param);
    },
  },
}
</script>
<style lang='less' scoped>
.print-detail-operate {
  display: flex;
  justify-content: space-between;
  .operate-left {
    width: 707px;
  }
  .operate-right {
    width: 456px;
    height: 559px;
    background: #333333;
    border-radius: 8px;
  }
}
.print-detail-info {
  margin: 58px auto 0;
  padding-bottom: 88px;
  display: flex;
  justify-content: space-between;
  .relation {
    width: 226px;
    background: #fff;
    height: -webkit-fill-available;
    .rel-title {
      height: 44px;
      line-height: 44px;
      text-align: center;
      font-size: 14px;
      border-bottom: 1px solid #615858;
    }
    .rel-products {
      display: flex;
      flex-direction: column;
      > li {
        width: 100%;
        height: 318px;
        border-bottom: 1px solid #615858;
        border-radius: 0px;
        margin-bottom: 0px;
        background: #fff;
        .image {
          width: 134px;
          height: 134px;
          margin: 75px auto 8px;
          border: 1px solid #666;
        }
        .title {
          margin-bottom: 8px;
        }
      }
    }
  }
  .infos {
    width: 927px;
    height: -webkit-fill-available;
  }
}
</style>
