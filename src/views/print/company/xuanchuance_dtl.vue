<template>
  <div class='attr-operate banner-attr'>
    <el-form label-width="100px"
             class="bgGreen">
      <el-form-item label="产品"
                    class="chanpin">
        <el-col :span="15"
                class="yhc-attr-btns">
          <div class="btn"
               :class='{"active":currentVal == b.value}'
               v-for="b in cnst.xuanchuan_btns"
               @click="changeBtn(b)">{{b.name}}</div>
        </el-col>
      </el-form-item>
      <el-form-item label="材料"
                    class="cailiao">
        <el-col :span="15">

          <el-select class="form-contrl width100"
                     placeholder="选择材料"
                     v-model="params.mate">
            <el-option v-for="i in xuanchuan_mates"
                       :label="i.name"
                       :value="i.value"
                       :key="i.value"></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="尺寸(毫米)"
                    class="rules">
        <el-col :span="15"
                v-if="!zidingyi">
          <el-select class="form-contrl width100"
                     placeholder="选择尺寸"
                     v-model="params.mate">
            <el-option v-for="i in cnst.xuanchuan_rules"
                       :label="i.name"
                       :value="i.value"
                       :key="i.value"></el-option>
          </el-select>
        </el-col>
        <div v-if="zidingyi"
             class="rules_two">
          <el-col :span="6">
            <el-input v-model="params.rule"
                      placeholder="长边"></el-input>
          </el-col>
          <el-col class="t_a_c"
                  :span="2">×</el-col>
          <el-col :span="6">
            <el-input v-model="params.rule"
                      placeholder="短边"></el-input>
          </el-col>
        </div>
        <el-col :span="2">
          <el-checkbox class="zidingyi"
                       label="自定义"
                       v-model="zidingyi"
                       border>
          </el-checkbox>
        </el-col>
      </el-form-item>
      <el-form-item label="数量"
                    class="number mg-none">
        <el-col :span="2">
          <el-input-number v-model="params.num"
                           @change="handleChange"
                           :min="1"
                           :max="10"
                           label="描述文字"></el-input-number>
        </el-col>
      </el-form-item>

    </el-form>
    <div class="fengpi">
      <div class="ych-title-head">
        <span class="title">封皮</span>
      </div>
      <div class="fengpi-table">
        <ul class="fengpi-table-head">
          <li style="width:233px;">材料</li>
          <li style="width:130px;">印色</li>
          <li>印面</li>
        </ul>
        <div class="fengpi-table-content">
          <ul v-for="(x,index) in fengpiDatas">
            <li style="width:233px;">
              <el-select class="form-contrl yhc-el"
                         placeholder="选择材料"
                         v-model="x.mate">
                <el-option v-for="i in cnst.xuanchuan_mates"
                           :label="i.name"
                           :value="i.value"
                           :key="i.value"></el-option>
              </el-select>
            </li>
            <li style="width:130px;">
              <el-radio-group v-model="x.color"
                              class="yhc-el">
                <el-radio label="1">单黑</el-radio>
                <el-radio label="2"
                          class="mg-none">彩色</el-radio>
              </el-radio-group>
            </li>
            <li class="mg-none">
              <el-radio-group v-model="x.boolean"
                              class="yhc-el">
                <el-radio label="2">双面</el-radio>
                <el-radio label="1"
                          class="mg-auto">单面</el-radio>
              </el-radio-group>
            </li>
          </ul>
        </div>

        <el-form class="mt15">
          <div class="fengpi-table-content">
            <p>工艺</p>
            <el-form-item label=""
                          class="gongyiType mg-none">

              <div v-for="(x,index) in xuanchuan_gongyi"
                   v-show="!(currentVal==1 && (x.value == 12||x.value == 13))"
                   class="displayFl"
                   :class="{'width100':(x.name=='击凸' || x.name=='UV' || x.name=='烫金'|| x.name=='浮雕烫')}">
                <el-checkbox :label="x.name"
                             :value="x.value"
                             name="type"
                             :key="x.value"
                             v-model="x.model_">
                </el-checkbox>
                <el-select class="mini width78" placeholder="类型"
                           v-model="x.drop"
                           v-if="x.types">
                  <el-option v-for="i in x.types"
                             :label="i.name"
                             :value="i.value"
                             :key="i.value"></el-option>
                </el-select>
                <div class="yhc-el-input"
                     v-if="x.inputs">
                  <el-input class="mini"
                            v-for="(y,index) in x.inputs"
                            :key="index"
                            :placeholder="y.placeholder"></el-input>
                </div>
                <div class="yhc-el-input displayFl mt5 ml10"
                     v-show="x.name=='击凸' || x.name=='UV' || x.name=='烫金'|| x.name=='浮雕烫'">
                  <el-input class="mini mr10"
                            placeholder="长边mm"></el-input>
                  <el-input class="mini"
                            placeholder="短边mm"></el-input>
                  <div class="add-minus-box ml10">
                    <span class="minus"
                          @click="deleteItem(x,index)">-</span>
                    <span class="add"
                          @click="addItem(x,index)">+</span>
                  </div>
                </div>
              </div>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
    <div class="neiye">

      <div class="ych-title-head">
        <span class="title">内页</span>
      </div>
      <div class="neiye-table">
        <ul class="neiye-table-head">
          <li style="width:160px;">材料</li>
          <li style="width:120px;">印色</li>
          <li style="width:200px;">P数<span class="small">(内文P数，如单面印刷P数翻倍）</span></li>
          <li>内页内容一样</li>
        </ul>
        <div class="neiye-table-content">
          <ul v-for="(x,index) in neiyeDatas"
              :class='{"mt15":index != 0}'>
            <li style="width:160px;">
              <el-select class="form-contrl yhc-el"
                         placeholder="选择材料"
                         v-model="x.mate">
                <el-option v-for="i in cnst.xuanchuan_mates"
                           :label="i.name"
                           :value="i.value"
                           :key="i.value"></el-option>
              </el-select>
            </li>
            <li style="width:120px;">
              <el-radio-group v-model="x.color"
                              class="yhc-el">
                <el-radio label="1">单黑</el-radio>
                <el-radio label="2"
                          class="mg-none">彩色</el-radio>
              </el-radio-group>
            </li>
            <li style="width:200px;">
              <el-select class="form-contrl yhc-el"
                         placeholder="选择材料"
                         v-model="x.mate2">
                <el-option v-for="i in cnst.xuanchuan_mates"
                           :label="i.name"
                           :value="i.value"
                           :key="i.value"></el-option>
              </el-select>
            </li>
            <li class="mg-none">
              <el-radio-group v-model="x.boolean"
                              class="yhc-el">
                <el-radio label="1">是</el-radio>
                <el-radio label="0"
                          class="mg-auto">否</el-radio>
              </el-radio-group>
              <span class="main-click displayIB"
                    @click="deleteNeiye(x,index)">删除</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="btn add"
           @click="addNeiye">
        <span class="mark">+</span>
        增加内页
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'xuanchuance',
   metaInfo: {
      title: '易绘创官网-企业宣传册设计制作|画册|在线企业画册设计印刷',
      meta: [
        { name:"keywords",content:'画册,画册设计, 企业宣传册,画册印刷,画册制作,企业画册,宣传画册,易绘创'},
        { name:"description",content:'在线企业画册设计和制作就来易绘创（yihuichuang.com），提供一站式企业画册印刷、画册制作、企业画册、宣传画册、企业产品画册等设计印刷服务，包含画册印刷排版、画册封面设计印刷、企业画册制作等产品。' },
      ]
  },
  data() {
    return {
      dialogVisible: false,
      zidingyi: false,
      typelist: [],
      activeName: '',
      params: {
        mate: '',
        num: 1,
        typeNum: 1,
        type: '',
        drop: '',
        drop2: '',
        radio: 2,
        model_: false,
      },
      xuanchuan_mates:this.cnst.xuanchuan_mates,
      fengpiDatas: [{ mate: '', mate2: '', color: '', boolean: 1 }],
      neiyeDatas: [{ mate: '', mate2: '', color: '', boolean: 1 }],
      xuanchuan_gongyi: [
        { name: '封面亮膜', value: '1' },
        { name: '封面哑膜', value: '2' },
        { name: '触感膜', value: '3' },
        { name: '模切', value: '4' },
        {
          name: '压纹',
          value: '5',
          types: [
            { name: '碎皮纹', value: '1' },
            { name: '粗布纹', value: '2' },
            { name: '细布纹', value: '3' },
            { name: '梨纹', value: '4' },
            { name: '金沙纹', value: '5' },
            { name: '条纹', value: '6' },
            { name: '莱妮纹', value: '7' },
            { name: '麻布纹', value: '8' },
            { name: '陶纹', value: '9' },
            { name: '针孔纹', value: '10' },
          ],
        },
        { name: '击凸', value: '6' },
        {
          name: 'UV',
          value: '7',
          types: [
            { name: '厚UV', value: '1' },
            { name: '磨砂UV', value: '2' },
          ],
        },
        {
          name: '烫金',
          value: '8',
          types: [
            { name: '亮黄金', value: '1' },
            { name: '哑黄金', value: '2' },
            { name: '哑银', value: '3' },
            { name: '亮银', value: '4' },
            { name: '珠光白', value: '5' },
            { name: '大亮点红金', value: '6' },
            { name: '红金', value: '7' },
            { name: '蓝金', value: '8' },
            { name: '绿金', value: '9' },
            { name: '黑金', value: '10' },
            { name: '介质流沙', value: '11' },
            { name: '介质迷宫', value: '12' },
          ],
        },
        { name: '浮雕烫', value: '9' },
        { name: '塑封', value: '10' },
        {
          name: '材料颜色',
          value: '11',
          types: [
            { name: '米白', value: '1' },
            { name: '米黄', value: '2' },
            { name: '超白', value: '3' },
          ],
        },
        {
          name: '封面封底勒口',
          value: '12',
          inputs: [{ placeholder: '宽度mm' }],
        },
        {
          name: '书脊',
          value: '13',
          types: [
            { name: '延伸封面', value: '1' },
            { name: '延伸封底', value: '2' },
            { name: '已设计', value: '3' },
            { name: '自行调整', value: '4' },
          ],
        },
        {
          name: '画册顺序',
          value: '14',
          types: [
            { name: '翻看顺序', value: '1' },
            { name: '连版顺序', value: '2' },
          ],
        },
      ],
      currentVal: 1,
    }
  },
  props: ['type'],
  components: {},
  created() {},
  mounted() {
    console.log(this.type)
  },
  methods: {
    handleChange: function () {},
    changeBtn: function (x) {
      let n = x.value
      this.currentVal = n;
      this.xuanchuan_mates = n==1?this.cnst.xuanchuan_mates:this.cnst.xuanchuan_mates_jiaozhuang;
    },
    addNeiye: function () {
      this.neiyeDatas.push({ mate: '', mate2: '', color: '', boolean: 1 })
    },
    deleteNeiye: function (i) {
      this.neiyeDatas.splice(i, 1)
    },
    addItem: function (x, i) {
      let old = JSON.parse(JSON.stringify(this.xuanchuan_gongyi))
      let arr = old.filter((y) => {
        return x.value == y.value
      })
      if (arr.length > 2) {
        return this.$message.error('最多三条数据')
      }
      this.xuanchuan_gongyi.splice(i + 1, 0, x)
    },
    deleteItem: function (x, i) {
      let old = JSON.parse(JSON.stringify(this.xuanchuan_gongyi))
      let arr = old.filter((y) => {
        return x.value == y.value
      })
      if (arr.length == 1) {
        return this.$message.error('最后一条不可删除')
      }

      this.xuanchuan_gongyi.splice(i, 1)
    },
  },
}
</script>
<style lang='less' scoped>
.attr-operate {
  width: 707px;
  .el-form {
    width: 100%;

    .el-form-item {
      .el-col-15 {
        width: 344px;
      }
    }
  
    .rules {
      .zidingyi {
        margin-top: 1px;
        margin-left: 10px;
      }
    }
    .rules_two {
      .el-col-6 {
        width: 148px;
      }
    }
  }
  .fengpi {
    .fengpi-table {
      padding: 15px 24px;
      background: #fff;
      .fengpi-table-head,
      .fengpi-table-content > ul {
        display: flex;
        > li {
          height: 34px;
          line-height: 34px;
          text-align: left;
          margin-right: 15px;
          color: #333;
          font-size: 14px;
          .small {
            display: inline-block;
            color: #999999;
            font-size: 12px;
          }
        }
      }
    }
  }
  .neiye {
    .btn.add {
      width: 108px;
      margin-top: 24px;
    }
    .neiye-table {
      padding: 15px 24px;
      background: #fff;
      .neiye-table-head,
      .neiye-table-content > ul {
        display: flex;
        > li {
          height: 34px;
          line-height: 34px;
          text-align: left;
          margin-right: 15px;
          color: #333;
          font-size: 14px;
          .small {
            display: inline-block;
            color: #999999;
            font-size: 12px;
          }
        }
      }
    }
  }
}
</style>
