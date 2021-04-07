<template>
<div class="detail-btns">
  <div class="assess-btn">
    <div class="btn orange assess" @click="checkpop = !checkpop ">在线评估</div>
    <div class="assess-pop" v-show="checkpop">
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
              <li><label for="name">收件人姓名</label>
                <el-input placeholder=""></el-input>
              </li>
              <li><label for="name">收件人姓名</label>
                <el-input placeholder=""></el-input>
              </li>
              <li><label for="name">收件人姓名</label>
                <el-input placeholder=""></el-input>
              </li>
            </ul>
          </div>
          <div class="part-line"
               v-if="currentTab == 1"></div>
          <div class="address">
            <el-cascader class="width100"
                         size="large"
                         :options="options"
                         placeholder="请选择省市区"
                         @change="cityChange">
            </el-cascader>
            <el-form-item>
              <el-select class="width100"
                         placeholder="请选择详细地址" v-model="cityValue">
                <el-option v-for="i in outer"
                           :label="i.name"
                           :value="i.value"
                           :key="i.value"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div v-if="currentTab == 2"
               class="fz14 weight500 mb15">凭该账号手机尾号后4位到店提取</div>
          <div class="price">
            <label class="fz14">价格:</label>
            <span class="main-red fz16">6666.00</span>
          </div>
        </div>
        <div class="btn-box">
          <div class="btn cancel">取消</div>
          <div class="btn sure">确定</div>
        </div>

      </el-form>
    </div>
  </div>
  <div class="buy-btn">
      <div class="btn green">加入购物车</div>
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
      checkpop:false,
       outer: [
        { name: '户外背胶', value: '1' },
        { name: '白胶车贴', value: '2' },
        { name: '黑胶车贴', value: '3' },
        { name: '户外单透贴', value: '4' },
        { name: '户外相纸', value: '5' },
      ],
      cityValue:"",

    }
  },
  components: {},
  created() {},
  mounted() {},
  methods: {
    changTab: function (n) {
      this.currentTab = n.val
    },
    cityChange:function(){
        
    },

  }
}
</script>
<style lang='less' scoped>
.detail-btns{
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
          .el-input {
            margin-top: 8px;
          }
          //   margin-right: 10px;
        }
      }
      .el-select {
        margin-top: 15px;
      }
    }
  }
}
</style>
