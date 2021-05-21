<template>
  <div class='print-detail-page main bgray'>
    <div class="center">
      <div class="print-more-title">
        <span class="cursor_p"
              @click="goBack()">在线印刷</span><span class="cursor_p">&nbsp;/&nbsp;{{infos.category}}</span><span class="current">&nbsp;/&nbsp;{{infos.title}}</span>
      </div>
      <div class="print-detail-operate"
           v-if="infos">
        <div class="operate-left">
          <div class="operate-left-head">
            <h3 class="title">{{infos.name}}</h3>
            <h5 class="introl">{{infos.desc}}</h5>
            <Server></Server>
          </div>
          <!-- 每个页面的属性 -->
          <!-- <Armband v-if="detailType == 1"></Armband>
          <Banner v-if="detailType == 2"></Banner> -->
          <component ref="child"
                     v-bind:is="attrViews"
                     @detailChange="attrDetails"
                     v-if="params_"
                     :datas="params_"
                     :files="params.files"
                     :models="params.models"
                    ></component>

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
                         :file-list="params.files"
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
            </el-form-item>
            <el-form-item label="我没文件">
              <el-button class="yhc_btn fl"
                         size="small"
                         type="success"
                         @click="openCkt"
                         style="width:110px;">挑选模版设计</el-button>
              <ul class="el-upload-list el-upload-list--text">
                <li v-for="(x,index) in params.models"
                    class="el-upload-list__item is-success">
                  <a class="el-upload-list__item-name"
                     @click="viewModel(x)"><i class="el-icon-document"></i>我的模板
                  </a>
                  <label class="el-upload-list__item-status-label"><i class="el-icon-upload-success el-icon-circle-check"></i></label><i class="el-icon-close"
                     @click="onRemove_modl(index)"></i>
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
          <div class="detail-btns">
            <div class="assess-btn">
              <div class="btn orange assess"
                   @click="initPop">在线评估</div>
              <span class="tips">获取价格</span>
              <div class="assess-pop"
                   v-show="checkpop">
                <div class="title">订单详情</div>
                <div class="title-detial">铝合金底座易拉宝 / 100张 / 尺寸：300m*200m</div>
                <el-form width="100%" :rules="addRules" :model="payAddr"  ref="addrForm">
                  <div class="tabs-box">
                    <div v-for="x in tabs"
                         class="tab-plane cursor_p"
                         :class="{'active':x.val == currentTab}"
                         @click="changTab(x)">{{x.name}}</div>
                    <span class="selectAddr"
                          @click="openAddr">选择收货地址</span>
                  </div>
                  <div class="tabs-content"
                       v-if="payAddr">
                    <div v-if="currentTab == 1"
                         class="mail">
                      <ul class="person-info">
                        <li>
                          <el-form-item prop="name">
                            <label for="name">收件人姓名</label>
                            <el-input placeholder="收件人姓名"
                                      v-model="payAddr.name"></el-input>
                          </el-form-item>
                        </li>
                        <li>
                          <el-form-item prop="phone">
                            <label for="name">收件人电话</label>
                            <el-input placeholder="收件人电话"
                                      v-model="payAddr.phone" maxLength='11'></el-input>
                          </el-form-item>
                        </li>
                        <li>
                          <el-form-item prop="postcode">
                            <label for="name">邮政编码</label>
                            <el-input placeholder="邮政编码"
                                      v-model="payAddr.postcode"  maxLength='6'></el-input>
                          </el-form-item>
                        </li>
                      </ul>
                    </div>
                    <div v-if="currentTab == 1"
                         class="address">
                      <div class="part-line"></div>
                      <el-form-item prop="ssq">
                        <el-cascader class="width100"
                                     size="large"
                                     :options="options"
                                     placeholder="请选择省市区"
                                     v-model="payAddr.ssq"
                                     @change="cityChange">
                        </el-cascader>
                      </el-form-item>
                      <el-form-item v-if="currentTab == 1" prop="detail"
                                    class="mt15">
                        <el-input placeholder="请输入详细地址"
                                  v-model="payAddr.detail"></el-input>
                      </el-form-item>
                    </div>

                    <div class="address"
                         v-if="currentTab == 2">
                      <el-form-item>
                        <el-cascader class="width100"
                                     size="large"
                                     :options="options"
                                     placeholder="请选择省市区"
                                     v-model="payAddr_.ssq_"
                                     disabled
                                     @change="cityChange_ziti">
                        </el-cascader>
                      </el-form-item>
                      <el-form-item>
                        <el-select class="width100"
                                   placeholder="请选择详细地址"
                                   v-model="payAddr_.addr_">
                          <el-option v-for="i in zitiList"
                                     :label="i.name"
                                     :value="i.value"
                                     :key="i.value"></el-option>
                        </el-select>
                      </el-form-item>
                      <div class="fz14 weight500 mb15 mt15">凭该账号手机尾号后4位到店提取</div>
                    </div>
                    <div class="price mt15">
                      <label class="fz14">价格:</label>
                      <span class="main-red fz16">6666.00</span>
                    </div>
                  </div>
                  <div class="btn-box">
                    <div class="btn cancel"
                         @click="checkpop=false">取消</div>
                    <div class="btn sure"
                         @click="calculateFun">确定</div>
                  </div>

                </el-form>
              </div>
            </div>
            <div class="buy-btn displayFl" v-if="isCaculate">
                 <h3 style="line-height:42px;margin-right:14px;"><span class="fuhao">￥</span><span class="jine">{{caculate.price/100 | qf}}</span></h3>
              <div class="btn orange mr15"
                   @click="dialogVisible = true">立即购买</div>
              <div class="btn green"
                   @click="addBuy">加入购物车</div>
            </div>
            <div class="mask"
                 v-show="dialogVisible"
                 @click="closeDialog($event)">
              <div class="mask-content"
                   ref="msk">
                <div class="pay-pop">
                  <div class="pay-title">支付订单</div>
                  <ul class="pay-icons displayFl">
                    <li v-for="(x,index) in pay_icons"
                        @click="changePay(x)">
                      <img :src="x.big_icon"
                           alt=""
                           width="54px"
                           height="54px">
                    </li>
                  </ul>
                  <div class="pay-content clearfix">
                    <div class="erweima fl">
                      <img :src="payInfos.iconUrl"
                           alt="">
                    </div>
                    <ul class="pay-info fl">
                      <li><img :src="payInfos.sicon"
                             alt=""><span>{{payInfos.title}}</span></li>
                      <li>应付金额<span class="main-red">￥6666.00</span></li>
                      <li class="main-gray">昵称：奋斗的阿斗</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- <Price  :datas="params" :pageId="page_id" @submitForm="validateForm"></Price> -->

        </div>
        <div class="operate-right">
          <img :src="infos.right"
               alt=""
               width="100%"
               height="100%">
        </div>
      </div>
      <div class="print-detail-info">
        <div class="fl relation">
          <div class="rel-title">相关产品</div>
          <ul class="card-style rel-products">
            <li v-for="x in infos.xgcp">
              <div class="image" >
                <img :src="x.icon" width="100%" height="100%"
                     alt="">
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
                <ul class="prod-detail">
                  <li v-for="(x,index) in infos.cpxq"
                      :key="index">
                    <img :src="x"
                         alt=""
                         width="100%"
                         height="100%">
                  </li>
                </ul>
              </div>
              <div v-show="item.title == '售后服务'">
                  <img src="@/assets/img/common/shfw.jpg" alt="">
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
    <!-- 选择收货地址弹框 -->
    <Dialog ref="addr_pop"
            :config="addrconfig"
            :beforeClose="beforeClose"
            modal-append-to-body="false"
            @close="resetForm">
      <el-table ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                highlight-current-row
                @row-click="rowClick">
        <el-table-column width="55">
          <template slot-scope="scope">
            <el-radio :label="scope.row.id"
                      v-model="radioId">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column label="收货人"
                         prop="name"
                         width="150">
        </el-table-column>
        <el-table-column prop="phone"
                         label="手机号"
                         width="150">
        </el-table-column>
        <el-table-column prop="detail"
                         label="详细地址"
                         show-overflow-tooltip>
        </el-table-column>
      </el-table>
    </Dialog>
  </div>
</template>

<script>
// 广告物料
import Armband from '@/views/print/materiel/armband_dtl' //袖章
import ZhanJia from '@/views/print/materiel/zhanjia' //条幅--展架
import Banner from '@/views/print/materiel/banner_dtl' //条幅
import Qizhi from '@/views/print/materiel/qizhi_dtl' //旗帜
import Paint from '@/views/print/materiel/paint_dtl' //喷绘
import Photo from '@/views/print/materiel/photo_dtl' //写真
import Ribbon from '@/views/print/materiel/ribbon_dtl' //绶带

// 企业定制
import Xuanchuance from '@/views/print/company/xuanchuance_dtl' //企业宣传册
// 常用印刷
import Buganjiao from '@/views/print/comnPrint/buganjiao_dtl' //不干胶
import Danye from '@/views/print/comnPrint/danye_dtl' //宣传单页
import Mingpian from '@/views/print/comnPrint/mingpian_dtl' //名片
import Zheye from '@/views/print/comnPrint/zheye_dtl' //折页
// 标牌
import Mutuopai from '@/views/print/biaopai/mutuopai_dtl' //标识标牌店招-木托授权牌
// 其他印刷
import Caidan from '@/views/print/otherPrint/caidan_dtl' //菜单
//以下是公用组件--调取创客贴useCkt--在线估价pricePop
import { regionData } from 'element-china-area-data'
import Server from '@/components/servertip'
// import Price from '@/components/pricePop'
import Dialog from '@/components/dialog-pop'
export default {
  name: 'pdetial',
  data() {
    return {
      files: {
        showPic: false,
        showPicUrl: '',
        oldPicUrl: '',
        imgs: '',
      },
      page_id: '',
      infos: {},
      attrViews: Ribbon,
      detailType: '',
      relItems: Array(4),
      editableTabsValue: 'detail',
      editableTabs: [
        { name: 'detail', title: '产品详情' },
        { name: 'server', title: '售后服务' },
      ],
      title: '测试动态组件',
      show: true,
      arr: [
        { cmpt: Photo, id: 1001 },
        { cmpt: Paint, id: 1003 },
        { cmpt: Qizhi, id: 1006 },
        { cmpt: Banner, id: 1007 },
        { cmpt: ZhanJia, id: 1008 },
        { cmpt: Ribbon, id: 1009 },
        { cmpt: Armband, id: 1013 },

        { cmpt: Xuanchuance, id: 2001 },

        { cmpt: Danye, id: 3001 },
        { cmpt: Zheye, id: 3002 },
        { cmpt: Mingpian, id: 3003 },
        { cmpt: Buganjiao, id: 3005 },

        { cmpt: Mutuopai, id: 4004 },

        { cmpt: Caidan, id: 5001 },
      ],
      params: {
        attr: {},
        files: [],
        models: [],
      },
      params_:{},
      //以下是算价，购买单子
      options: regionData,
      tabs: [
        { name: '邮寄', val: 1 },
        { name: '自提', val: 2 },
      ],
      addRules:{
          name: [
            { required: true, message: '请输入姓名', trigger: 'change'},
          ],
          phone: [
            { required: true,  trigger: 'change', validator:this.validateNum },
          ],
        //   postcode: [
        //     { required: false, trigger: 'change', validator:this.validateNum },
        //   ],
          ssq: [
            {type:"array", required: true, message: '请选择省市区', trigger: 'change' },
          ],
          detail: [
            { required: true, message: '请输入详细地址', trigger: 'blur' },
          ],
      },
      currentTab: 1,
      checkpop: false, //弹框显示
      isCaculate: false, //是否已算价
      caculate:{},//计算的总金额
      payAddr: {},
      payAddr_: {},
      dialogVisible: false,
      pay_icons: [
        {
          big_icon: require('@/assets/img/common/zhifubao1.png'),
          s_icon: require('@/assets/img/common/zhifubao2.png'),
          title: '支付宝',
        },
        {
          big_icon: require('@/assets/img/common/weixin1.png'),
          s_icon: require('@/assets/img/common/weixin2.png'),
          title: '微信',
        },
        {
          big_icon: require('@/assets/img/common/yue1.png'),
          s_icon: require('@/assets/img/common/yue1.png'),
          title: '余额',
        },
      ],
      payInfos: {
        iconUrl: '',
        sicon: require('@/assets/img/common/zhifubao2.png'),
        title: '支付宝',
      },
      addrconfig: {
        width: '760px',
        title: '收货地址',
        center: false,
        btnTxt: ['取消', '确认'],
      },
      tableData: [],
      radioId: '',
      selectedRow: {},
      zitiList: [
        {
          name:
            '易慧创 · 淮北 · NO 0001：淮北市相山区古城路（二马路）与洪山路交叉口 红绿灯路口',
          value: '1',
        },
      ],
    }
  },
  components: {
    Armband,
    Banner,
    Qizhi,
    ZhanJia,
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
    // Price,
    Server,
    Dialog,
  },
  created() {
    this.page_id = this.$route.query.page_id
    this.attrId = this.$route.query.attrId;
    this.design_id = this.$route.query.design_id
    if (this.design_id) {
      this.params.models.push({ name: '我的模板', designId: this.design_id })
    } else {
      this.params.models = []
    }
    this.getDetails(this.page_id);//获取页面信息
    this.getAttrs(this.attrId);//编辑获取商品属性
    let arr = []
    arr = this.arr.filter((v) => {
      return this.page_id == v.id
    })
    if (arr.length > 0) {
      this.attrViews = arr[0].cmpt
    }
  },
  mounted() {},
  computed: {},
  methods: {
    getDetails(page, temp) {
      let this_ = this
      if (!this_.$store.state.token) {
        return this_.$message({
          type: 'warning',
           offset:"68",
          message: '请先登录!',
        })
      }
      let param = {
        token: this_.$store.state.token,
        page_id: page ? page : undefined,
        // template_id:temp?temp:undefined
      }
      this_.$post('post', 'Goods/detail', param).then((res) => {
        if (res.code == 1) {
          this_.infos = res.data
        }
      })
    },
    getAttrs(id){
        let this_ = this
        if(id){
            if (!this_.$store.state.token) {
                return this_.$message({
                type: 'warning',
                 offset:"68",
                message: '请先登录!',
                })
            }
            let param = {
                token: this_.$store.state.token,
                id: id,
            }
           this_.$post('post', 'Goods/cartGet', param).then((res) => {
                if (res.code == 1) {
                    this_.params_ = res.data.data.data;
                    this_.params.files = res.data.data.data.files;
                    this_.params.models = res.data.data.data.models;
                    if(res.data.data.data.address){
                        let adr = res.data.data.data.address;
                        this_.currentTab = adr.qhtype;
                        if(adr.qhtype==1){
                            this_.payAddr = res.data.data.data.address;
                        }else{
                            this_.payAddr_ = res.data.data.data.address;
                        }
                    }
                    
                }
            }) 
        }
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
      this.params.files = this.params.files.filter((i) => {
        return i.uid != file.uid
      })
    },
    onRemove_modl(ind) {
      this.params.models.splice(ind, 1)
    },
    handlePreview(file) {
      let _this = this
      _this.files.showPicUrl = file.url
      _this.files.showPic = true
    },
    beforeUpload(file) {},
    qiniuUploadCover(event) {
      let _this = this
      var paramObj = _this.getImagekey('')
      paramObj.key = paramObj.key + event.file.uid
      paramObj.name = event.file.name
      _this.upFiles({ paramObj: paramObj, e: event }, (res) => {
        let _this = this
        _this.params.files.push({
          name: paramObj.name,
          uid: event.file.uid,
          key: res.key,
          url:
            'http://qrndg83uk.hn-bkt.clouddn.com/' +
            res.key +
            '?v=' +
            Date.parse(new Date()),
        })
      })
    },
    handleClick: function () {},
    openCkt: function () {
      let this_ = this
      if (this_.params.models.length >= 1) {
        return this_.$message({
          type: 'warning',
           offset:"68",
          message: '只可选择一个模板',
        })
      }
      if (this.infos.kind_id <= 0) {
        return this_.$message.error('暂时没有此类模板可供选择')
      }
      this_.CKT.useCkt({ kind_id: this.infos.kind_id }, function (res) {
        let arr = []
        if (res.kind == 2) {
          arr.push({ name: '我的模板', designId: res['design-id'] })
          this_.params.models = this_.params.models.concat(arr)
        }
      })
    },
    viewModel(x) {
      let this_ = this
      this_.CKT.useCkt({ design_id: x.designId }, function (res) {
        if (res.kind == 2) {
          x = { name: '我的模板', designId: res['design-id'] }
        }
      })
    },
    attrDetails: function (d, o) {
      this.params.attr = d
      // console.log(this.param);
    },
    //以下是算价、购买
    changTab: function (n) {
      this.currentTab = n.val
      if (n.val == 2) {
        this.payAddr_.ssq_ = ['340000', '340600', '340603']
        this.payAddr_.addr_ = '1'
      }
    },
    cityChange: function () {
      console.log()
    },
    cityChange_ziti: function () {
      // console.log(this.payAddr.ssq_);
    },
    changePay: function (x) {
      this.payInfos = {
        iconUrl: x.iconUrl,
        sicon: x.s_icon,
        title: x.title,
      }
    },
    closeDialog: function (e) {
      console.log(e)
      if (!this.$refs.msk.contains(e.target)) {
        this.dialogVisible = false
      }
    },
    handleClose: function () {
      this.checkpop = false
    },
    addBuy: function () {
      // console.log(this.datas);
            let this_ = this
         this_.$refs.addrForm.validate((valid) => {
        if (valid) {
           
            let param = {
                token: this_.$store.state.token,
                page_id: this_.page_id,
                data: this_.getData(),
                id:this_.caculate.id,
                cart_id:this_.attrId
            }
            console.log(param)
            this_.$post('post', 'Goods/cartCreate', param).then((res) => {
                if (res.code == 1) {
                    this_.$message({
                        type:"success",
                        message:res.info
                    });
                }
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    calculateFun() {
         let this_ = this
         this_.$refs.addrForm.validate((valid) => {
        if (valid) {
            let param = {
                token: this_.$store.state.token,
                page_id: this_.page_id,
                data: this_.getData(),
            }
            console.log(param)
            this_.$post('post', 'Goods/price', param).then((res) => {
                if (res.code == 1) {
                    this_.caculate = res.data;
                    this_.checkpop = false;
                    this_.isCaculate = true
                }
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })


    },
    //重构请求数据
    getData() {
      let obj = {}
      let this_ = this
      let addr = {address:""} //取货方式1邮寄 2自提
      if (this_.currentTab == 1) {
        addr.address = this_.payAddr
        // delete addr.ssq
      } else {
        addr.address = this_.payAddr_
        // delete addr.ssq_
      }
      addr.address['qhtype'] = this_.currentTab
      obj = { ...this_.params, ...addr }
    //   if (obj.files && obj.files.length > 0) {
    //     let f = obj.files
    //     let str = ''
    //     f.map((v, i) => {
    //       str += v.key + ','
    //     })
    //     str = str.substring(0, str.length - 1)
    //     obj.fileStr = str
    //   }
      return obj
    },
    // 以下是收货地址弹框
    openAddr() {
      let this_ = this
      this_.$refs.addr_pop
        .open((cancel) => {
          this.payAddr = this.selectedRow
          this.payAddr.ssq = [
            this.selectedRow.prov_code,
            this.selectedRow.city_code,
            this.selectedRow.dist_code,
          ];
           this_.$refs.addrForm.resetFields();
        })
        .then(() => {
          this.radioId = ''
          this.payAddr.ssq = []
          //打开弹框后
          this.getAddrs()
        })
    },
    getAddrs() {
      let this_ = this
      let param = {
        token: this.$store.getters.getToken,
        limit: '20',
      }
      this_.$post('post', 'Addr/select', param).then((res) => {
        if (res.code == 1) {
          this_.tableData = res.data.list
        }
      })
    },
    rowClick(row) {
      this.radioId = row.id
      this.selectedRow = row
    },
    beforeClose() {},
    resetForm() {
      // 这里可以写重置表单的实现
      console.log(this.form)
    },
    initPop() {

      this.$refs.child.$refs.ruleForm.validate((valid) => {
        if (valid) {
            // if(parseInt((this.params.files?this.params.files.length:0)  + (this.params.models?this.params.models.length:0)) == 0){
            //     return this.$message({
            //         type:"error",
            //         offset:"68",
            //         message:"模板或稿件不能为空"
            //     })
            // }
            this.checkpop = !this.checkpop;
            if(!this.checkpop){
                this.currentTab = 1;
                this.payAddr = {
                    name:"",
                    phone:"",
                    postcode:"",
                    ssq:[],
                    detail:""
                }
            }
        } else {
          console.log('error submit!!')
          return false
        }
      })
      
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
    .operate-left-head {
      padding-top: 16px;
      background-color: rgba(78, 159, 91, 0.03);
      // border-radius: 4px;
      h3.title {
        padding: 0 16px;
        font-size: 22px;
        font-weight: 500;
        color: #333333;
        line-height: 30px;
      }
      h5.introl {
        padding: 0 16px;
        margin-top: 8px;
        margin-bottom: 24px;
        font-size: 14px;
        font-weight: 400;
        color: #ff3333;
        line-height: 20px;
      }
    }
  }
  .operate-right {
    width: 456px;
    height: 559px;
    background: #333333;
    border-radius: 8px;
    overflow: hidden;
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
          border: none;
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
.prod-detail {
  li {
    &:not(:last-child) {
      margin-bottom: 24px;
    }
  }
}
.detail-btns {
  display: flex;
  justify-content: space-between;
}
.buy-btn {
    .fuhao{
         font-size: 14px;
        color: #ff3333;
    }
    .jine{
        font-size: 24px;
        color: #ff3333;
    }

  .btn {
    height: 42px;
    line-height: 28px;
  }
}
.assess-btn {
  position: relative;
  .tips {
    position: absolute;
    top: -9px;
    right: -47px;
    width: 72px;
    height: 29px;
    line-height: 29px;
    text-align: center;
    background: #ff3333;
    border-radius: 20px 20px 20px 3px;
    border: 1px solid #ffffff;
    color: #fff;
  }
  .assess {
    width: 226px;
    height: 44px;
    line-height: 30px;
  }
  .assess-pop {
    position: absolute;
    top: 52px;
    width: 550px;
    //   height: 300px;
    box-shadow: 2px 3px 20px #ccc;
    z-index: 100;
    background: #fff;
    padding: 16px;
    .title {
      font-size: 16px;
      font-weight: 500;
      color: #333;
      margin-bottom: 8px;
    }
    .title-detial {
      font-size: 14px;
      color: #333;
      margin-bottom: 24px;
    }
    .tabs-content {
      margin-top: 16px;
      .person-info {
        display: flex;
        justify-content: space-between;
        li {
          width: 162px;
        }
      }
      .el-select {
        margin-top: 15px;
      }
    }
    .el-form-item {
      margin-bottom: 0;
    }
  }
}
.mask-content {
  width: 474px;
  height: 421px;
  background: #ffffff;
  padding: 32px 32px 60px 32px;
  margin-left: -237px;
  margin-top: -210px;
  border-radius: 12px;
  .pay-pop {
    .pay-title {
      font-size: 16px;
      font-weight: 500;
      color: #333333;
      line-height: 22px;
      margin-bottom: 24px;
    }
    .pay-icons {
      justify-content: space-between;
      padding: 0 68px 32px;
      border-bottom: 1px dashed #cbcfe3;
      li {
        width: 54px;
        height: 54px;
        cursor: pointer;
      }
    }
    .pay-content {
      margin-top: 48px;
      padding-left: 40px;
      .erweima {
        width: 148px;
        height: 148px;
        padding: 13px;
        background: #d8d8d8;
        border-radius: 20px;
        opacity: 0.4;
        margin-right: 32px;
      }
      .pay-info {
        padding-top: 25px;
        display: flex;
        flex-direction: column;
        li {
          line-height: 26px;
          margin-bottom: 17px;
          img {
            width: 26px;
            height: 26px;
            margin-right: 17px;
          }
        }
      }
    }
  }
}
</style>
