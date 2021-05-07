<template>
  <div class="detail-btns" >
    <div class="assess-btn" v-clickoutside = "handleClose">
      <div class="btn orange assess" @click="checkpop = !checkpop " >在线评估</div>
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
          </div>
          <div class="tabs-content">
            <div v-if="currentTab == 1"
                 class="mail">
              <ul class="person-info">
                <li>
                  <el-form-item>
                    <label for="name">收件人姓名</label>
                    <el-input placeholder=""></el-input>
                  </el-form-item>
                </li>
                <li>
                  <el-form-item>
                    <label for="name">收件人姓名</label>
                    <el-input placeholder=""></el-input>
                  </el-form-item>
                </li>
                <li>
                  <el-form-item>
                    <label for="name">收件人姓名</label>
                    <el-input placeholder=""></el-input>
                  </el-form-item>
                </li>
              </ul>
            </div>
            <div class="part-line"
                 v-if="currentTab == 1"></div>
            <div class="address">
              <el-form-item>
                <el-cascader class="width100"
                             size="large"
                             :options="options"
                             placeholder="请选择省市区"
                             @change="cityChange">
                </el-cascader>
              </el-form-item>
              <el-form-item>
                <el-select class="width100"
                           placeholder="请选择详细地址"
                           v-model="cityValue">
                  <el-option v-for="i in outer"
                             :label="i.name"
                             :value="i.value"
                             :key="i.value"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div v-if="currentTab == 2"
                 class="fz14 weight500 mb15 mt15">凭该账号手机尾号后4位到店提取</div>
            <div class="price mt15">
              <label class="fz14">价格:</label>
              <span class="main-red fz16">6666.00</span>
            </div>
          </div>
          <div class="btn-box">
            <div class="btn cancel">取消</div>
            <div class="btn sure" @click="calculate">确定</div>
          </div>

        </el-form>
      </div>
    </div>
    <div class="buy-btn displayFl">
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
  </div>
</template>

<script>
import { regionData } from 'element-china-area-data'

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
      checkpop: false,
      outer: [
        { name: '户外背胶', value: '1' },
        { name: '白胶车贴', value: '2' },
        { name: '黑胶车贴', value: '3' },
        { name: '户外单透贴', value: '4' },
        { name: '户外相纸', value: '5' },
      ],
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
    }
  },
  props:["datas"],
  components: {},
  created() {
    //   console.log(this.datas);
  },
  mounted() {},
  methods: {
    changTab: function (n) {
      this.currentTab = n.val
    },
    cityChange: function () {},
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
        console.log(this.datas);
    }
  },
}
</script>
<style lang='less' scoped>
.detail-btns {
  display: flex;
  justify-content: space-between;
}
.assess-btn {
  position: relative;
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
