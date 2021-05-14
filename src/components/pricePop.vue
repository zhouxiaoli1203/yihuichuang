<template>
  <div class="detail-btns" >
    <div class="assess-btn">
      <div class="btn orange assess" @click="initPop" >在线评估</div>
      <span class="tips">获取价格</span>
      <div class="assess-pop"
           v-show="checkpop">
        <div class="title">订单详情</div>
        <div class="title-detial">铝合金底座易拉宝 / 100张 / 尺寸：300m*200m</div>
        <el-form width="100%">
          <div class="tabs-box">
            <div v-for="x in tabs"
                 class="tab-plane cursor_p"
                 :class="{'active':x.val == currentTab}"
                 @click="changTab(x)">{{x.name}}</div>
                 <span class="selectAddr" @click="openAddr">选择收货地址</span>
          </div>
          <div class="tabs-content" v-if="payAddr">
            <div v-if="currentTab == 1"
                 class="mail">
              <ul class="person-info">
                <li>
                  <el-form-item>
                    <label for="name">收件人姓名</label>
                    <el-input placeholder="收件人姓名" v-model="payAddr.name"></el-input>
                  </el-form-item>
                </li>
                <li>
                  <el-form-item>
                    <label for="name">收件人电话</label>
                    <el-input placeholder="收件人电话" v-model="payAddr.phone"></el-input>
                  </el-form-item>
                </li>
                <li>
                  <el-form-item>
                    <label for="name">邮政编码</label>
                    <el-input placeholder="邮政编码" v-model="payAddr.postcode"></el-input>
                  </el-form-item>
                </li>
              </ul>
            </div>
            <div v-if="currentTab == 1" class="address">
                <div class="part-line"></div>
                <el-form-item>
                <el-cascader class="width100"
                             size="large"
                             :options="options"
                             placeholder="请选择省市区"
                             v-model="payAddr.ssq"
                             @change="cityChange">
                </el-cascader>
              </el-form-item>
              <el-form-item v-if="currentTab == 1" class="mt15">
                <el-input placeholder="请输入详细地址" v-model="payAddr.detail"></el-input>
              </el-form-item>
            </div>
            
            <div class="address" v-if="currentTab == 2">
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
              <div  class="fz14 weight500 mb15 mt15">凭该账号手机尾号后4位到店提取</div>
            </div>
            <div class="price mt15">
              <label class="fz14">价格:</label>
              <span class="main-red fz16">6666.00</span>
            </div>
          </div>
          <div class="btn-box">
            <div class="btn cancel" @click="checkpop=false">取消</div>
            <div class="btn sure" @click="calculate">确定</div>
          </div>

        </el-form>
      </div>
    </div>
    <div class="buy-btn displayFl" v-if="isCaculate">
      <div class="btn orange mr15"
           @click="dialogVisible = true" >立即购买</div>
      <div class="btn green" @click="addBuy">加入购物车</div>
    </div>
    <div class="mask"
         v-show="dialogVisible" @click="closeDialog($event)">
      <div class="mask-content" ref="msk">
        <div class="pay-pop">
          <div class="pay-title">支付订单</div>
          <ul class="pay-icons displayFl">
            <li v-for="(x,index) in pay_icons"
                @click="changePay(x)">
              <img :src="x.big_icon"
                   alt="" width="54px" height="54px">
            </li>
          </ul>
          <div class="pay-content clearfix">
            <div class="erweima fl">
              <img :src="payInfos.iconUrl"
                   alt="">
            </div>
            <ul class="pay-info fl">
              <li><img :src="payInfos.sicon"
                     alt="" ><span>{{payInfos.title}}</span></li>
              <li>应付金额<span class="main-red">￥6666.00</span></li>
              <li class="main-gray">昵称：奋斗的阿斗</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- 选择收货地址弹框 -->
    <Dialog ref="addr_pop"
            :config="addrconfig"
            :beforeClose="beforeClose"
            modal-append-to-body="false"
            @close="resetForm">
         <el-table
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%"
    highlight-current-row
    @row-click="rowClick">
    <el-table-column
      width="55">
      <template slot-scope="scope">
        	<el-radio :label="scope.row.id" v-model="radioId">&nbsp;</el-radio>
        </template>
    </el-table-column>
    <el-table-column
      label="收货人"
      prop="name"
      width="150">
    </el-table-column>
    <el-table-column
      prop="phone"
      label="手机号"
      width="150">
    </el-table-column>
    <el-table-column
      prop="detail"
      label="详细地址"
      show-overflow-tooltip>
    </el-table-column>
  </el-table>
    </Dialog>
  </div>
</template>

<script>
import { regionData } from 'element-china-area-data'
import Dialog from '@/components/dialog-pop'
export default {
  name: 'pricePop',
  data() {
    return {
      options: regionData,
      tabs: [
        { name: '邮寄', val: 1 },
        { name: '自提', val: 2 },
      ],
      currentTab: 1,
      checkpop: false,//弹框显示
      isCaculate:false,//是否已算价
      outer: [
        { name: '户外背胶', value: '1' },
        { name: '白胶车贴', value: '2' },
        { name: '黑胶车贴', value: '3' },
        { name: '户外单透贴', value: '4' },
        { name: '户外相纸', value: '5' },
      ],
      payAddr:{},
      payAddr_:{},
      cityValue: '',
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
        btnTxt: ['取消','确认'],
      },
      tableData:[],
      radioId:"",
      selectedRow:{},
      zitiList:[{name:"易慧创 · 淮北 · NO 0001：淮北市相山区古城路（二马路）与洪山路交叉口 红绿灯路口",value:"1"}]
    }
  },
  props:["datas","pageId"],
  components: {Dialog},
  created() {
    //   console.log(this.datas);
  },
  mounted() {},
  methods: {
    changTab: function (n) {
      this.currentTab = n.val;
      if(n.val == 2){
        this.payAddr_.ssq_ = ["340000", "340600", "340603"];
        this.payAddr_.addr_ = "1";
      }
    },
    cityChange: function () {
        console.log();
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
    closeDialog:function(e){
       console.log(e);
        if (!this.$refs.msk.contains(e.target)) {
　　　　　　this.dialogVisible = false;
　　　　}
    },
    handleClose:function(){
        this.checkpop = false;
    },
    addBuy:function(){
        // console.log(this.datas);
    },
    calculate(){
        let this_ = this;

        let param = {
            token:this_.$store.state.token,
            page_id:this_.pageId,
            data:this_.getData()
        }
       console.log(param);
        this_.$post("post","Goods/price",param).then((res)=>{
            if(res.code == 1){
                this.isCaculate = true;
            }
        });
        
    },
    //重构请求数据
    getData(){
        let obj = {};
        let this_ = this;
        let addr = {};//取货方式1邮寄 2自提
        if(this_.currentTab == 1){
            addr =  this_.payAddr;
            delete addr.ssq;
        }else{
            addr =  this_.payAddr_;
            delete addr.ssq_;
        }
        addr["qhfs"] = this_.currentTab;
        obj = { ...this_.datas,...addr };
         if(obj.files && obj.files.length>0){
            let f = obj.files;
            let str = "";
            f.map((v,i)=>{
                str+=v.key+",";
            });
            str = str.substring(0,str.length-1);
            obj.files = str;
        }
        return obj;
    },
    // 以下是收货地址弹框
    openAddr(){
        let this_ = this

      this_.$refs.addr_pop
        .open((cancel) => {
            this.payAddr = this.selectedRow;
            this.payAddr.ssq=[this.selectedRow.prov_code, this.selectedRow.city_code, this.selectedRow.dist_code];
            console.log(this.payAddr.ssq);
        })
        .then(() => {
            this.radioId = "";
            this.payAddr.ssq=[];
            //打开弹框后
           this.getAddrs();
        }) 
    },
    getAddrs(){
        let this_ = this;
        let param = {
            token:this.$store.getters.getToken,
            limit:"20"
        }
        this_.$post("post","Addr/select",param).then((res)=>{
            if(res.code == 1){
                this_.tableData = res.data.list;
            }
        });
    },
    rowClick(row){
        this.radioId=row.id;
        this.selectedRow = row;
    },
    beforeClose() {},
    resetForm() {
      // 这里可以写重置表单的实现
      console.log(this.form)
    },
    initPop(){
        this.$emit("submitForm");

        // this.checkpop = !this.checkpop;
        // if(!this.checkpop){
        //     this.currentTab = 1;
        //     this.payAddr = {
        //         name:"",
        //         phone:"",
        //         postcode:"",
        //         ssq:[],
        //         detail:""
        //     }
        // }
    }
  },
}
</script>
<style lang='less' scoped>
.detail-btns {
  display: flex;
  justify-content: space-between;
}
.buy-btn{
    .btn{
        height: 42px;
        line-height: 28px;
    }
}
.assess-btn {
  position: relative;
  .tips{
      position: absolute;
      top: -9px;
      right: -47px;
      width: 72px;
      height: 29px;
      line-height: 29px;
      text-align: center;
      background: #FF3333;
      border-radius: 20px 20px 20px 3px;
      border: 1px solid #FFFFFF;
      color:#fff;
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
    .pay-content{
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
            img{
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
