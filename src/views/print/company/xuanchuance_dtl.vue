<template>
  <div class='attr-operate banner-attr'>
    <el-form label-width="100px"
             :model="params"
             :rules="rules"
             ref="ruleForm"
             class="bgGreen">
      <el-form-item label="产品"
                    class="chanpin">
        <el-col :span="15"
                class="yhc-attr-btns">
          <div class="btn"
               :class='{"active":params.chanpinType == b.value}'
               v-for="b in cnst.xuanchuan_btns"
               @click="changeBtn(b)">{{b.name}}</div>
        </el-col>
      </el-form-item>
      <el-form-item label="材料"
                    prop="cailiao"
                    class="cailiao">
        <el-col :span="15">

          <el-select class="form-contrl width100"
                     placeholder="选择材料"
                     v-model="params.cailiao">
            <el-option v-for="i in xuanchuan_mates"
                       :label="i.name"
                       :value="i.value"
                       :key="i.value"></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="尺寸(毫米)"
                    v-if="!zidingyi"
                    key="select_rule"
                    prop="chicun"
                    class="rules">
        <el-col :span="15">
          <el-select class="form-contrl width100"
                     placeholder="选择尺寸"
                     v-model="params.chicun">
            <el-option v-for="i in cnst.xuanchuan_rules"
                       :label="i.name"
                       :value="i.value"
                       :key="i.value"></el-option>
          </el-select>
        </el-col>
        <el-col :span="2" class="ml10">
          <el-checkbox class="zidingyi"
                       label="自定义"
                       v-model="zidingyi"
                       border>
          </el-checkbox>
        </el-col>
      </el-form-item>
      <el-form-item v-if="zidingyi"
                    key="shuru_rule"
                    required
                    label="尺寸(米)"
                    class="rules_two">
        <el-col :span="6">
          <el-form-item prop="changbian">
            <el-input v-model="params.changbian"
                      placeholder="长边"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="t_a_c"
                :span="2">×</el-col>
        <el-col :span="6">
          <el-form-item prop="duanbian">
            <el-input v-model="params.duanbian"
                      placeholder="短边"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2" class="ml10">
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
                           :min="1"
                           :max="10"></el-input-number>
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
          <ul>
            <li style="width:233px;">
              <el-select class="form-contrl yhc-el"
                         placeholder="选择材料"
                         v-model="params.fengpi.cailiao">
                <el-option v-for="i in cnst.xuanchuan_mates"
                           :label="i.name"
                           :value="i.value"
                           :key="i.value"></el-option>
              </el-select>
            </li>
            <li style="width:130px;">
              <el-radio-group v-model="params.fengpi.color"
                              class="yhc-el">
                <el-radio label="1">单黑</el-radio>
                <el-radio label="2"
                          class="mg-none">彩色</el-radio>
              </el-radio-group>
            </li>
            <li class="mg-none">
              <el-radio-group v-model="params.fengpi.mian"
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

              <div v-for="(x,index) in params.gongyi"
                   v-show="!(params.chanpinType==1 && (x.value == 12||x.value == 13))"
                   class="displayFl"
                   :class="{'width100':(x.name=='击凸' || x.name=='UV' || x.name=='烫金'|| x.name=='浮雕烫')}">
                <el-checkbox :label="x.name"
                             :value="x.name"
                             :key="index"
                             v-model="x.checkbox">
                </el-checkbox>
                <div class="add-items-div">
                  <div class="yhc-el-input displayFl mt5 ml10"
                       v-for="(y,index_) in x.items"
                       v-if="x.name=='击凸' || x.name=='UV' || x.name=='烫金'|| x.name=='浮雕烫'">
                    <el-select class="mini width78"
                               :placeholder="x.plshd"
                               v-if="y.hasDrop"
                               v-model="y.drop">
                      <el-option v-for="i in x.drops"
                                 :label="i.name"
                                 :value="i.name"
                                 :key="i.value"></el-option>
                    </el-select>
                    <el-input class="mini mr10 ml10"
                              placeholder="长边mm"
                              v-model="y.changbian"></el-input>
                    <el-input class="mini"
                              placeholder="短边mm"
                              v-model="y.duanbian"></el-input>
                    <div class="add-minus-box ml10">
                      <span class="minus"
                            @click="deleteItem(x,index_)">-</span>
                      <span class="add"
                            @click="addItem(x,index_)">+</span>
                    </div>
                  </div>
                  <div class="yhc-el-input displayFl mt5 ml10"
                       v-if="!(x.name=='击凸' || x.name=='UV' || x.name=='烫金'|| x.name=='浮雕烫')">
                    <el-select class="mini width78"
                               placeholder="类型"
                               v-model="x.drop"
                               v-if="x.select">
                      <el-option v-for="i in x.drops"
                                 :label="i.name"
                                 :value="i.name"
                                 :key="i.value"></el-option>
                    </el-select>

                    <div class="yhc-el-input"
                         v-if="x.name == '封面封底勒口'">
                      <el-input class="mini"
                                placeholder="宽度mm"
                                v-model="x.kuandu"
                                @input="inputChange(x,y)"></el-input>
                    </div>
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
          <ul v-for="(x,index) in params.neiye" :key="index"
              :class='{"mt15":index != 0}'>
            <li style="width:160px;">
              <el-select class="form-contrl yhc-el"
                         placeholder="选择材料"
                         v-model="x.cailiao">
                <el-option v-for="i in cnst.xuanchuan_mates"
                           :label="i.name"
                           :value="i.name"
                           :key="i.value"></el-option>
              </el-select>
            </li>
            <li style="width:120px;">
              <el-radio-group v-model="x.color"
                              class="yhc-el">
                <el-radio label="1">单黑</el-radio>
                <el-radio label="2" class="mg-none">彩色</el-radio>
              </el-radio-group>
            </li>
            <li style="width:200px;">
              <el-input class="yhc-el" placeholder="内文P数"
                                v-model="x.pshu"
                                @input="inputChange(x,y)"></el-input>
            </li>
            <li class="mg-none">
              <el-radio-group v-model="x.neirong"
                              class="yhc-el">
                <el-radio label="1">是</el-radio>
                <el-radio label="0" class="mg-auto">否</el-radio>
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
      {
        name: 'keywords',
        content:
          '画册,画册设计, 企业宣传册,画册印刷,画册制作,企业画册,宣传画册,易绘创',
      },
      {
        name: 'description',
        content:
          '在线企业画册设计和制作就来易绘创（yihuichuang.com），提供一站式企业画册印刷、画册制作、企业画册、宣传画册、企业产品画册等设计印刷服务，包含画册印刷排版、画册封面设计印刷、企业画册制作等产品。',
      },
    ],
  },
  data() {
    return {
      zidingyi: false,
      params: {
        chanpinType: '1',
        cailiao: '',
        chicun:"",
        changbian:"",
        duanbian:"",
        num: 1,
        typeNum: 1,
        checkbox: false,
        gongyi:this.cnst.xuanchuan_gongyi,
        fengpi:{
            cailiao:"",
            color:"2",
            mian:"2"
        },
        neiye:[
            { cailiao: '', pshu: '', color: '2', neirong: "1" }
        ]
      },
       rules:{
          cailiao: [
            { required: true, message: '请选择材料', trigger: 'change' },
          ],
          changbian: [
            { required: true,trigger: 'blur', validator:this.validateChangbian },
            // { pattern: /^[0-9.]*$/, message: '尺寸需为数字', trigger: 'blur'}
          ],
          duanbian: [
            { required: true,trigger: 'blur', validator:this.validateDuanbian },
            // { pattern: /^[0-9.]*$/, message: '尺寸需为数字', trigger: 'blur'}
          ],
      },
      xuanchuan_mates: this.cnst.xuanchuan_mates,
      
    }
  },
  props:["datas","files","models"],
  components: {},
  created() {},
  mounted() {
    console.log(this.type)
  },
  methods: {
    handleChange: function () {},
    changeBtn: function (x) {
      let n = x.value
      this.params.chanpinType = n
      this.xuanchuan_mates =
        n == 1
          ? this.cnst.xuanchuan_mates
          : this.cnst.xuanchuan_mates_jiaozhuang
    },
    addNeiye: function () {
      this.params.neiye.push({ cailiao: '', pshu: '', color: '2', neirong: "1" });
      
    },
    deleteNeiye: function (i) {
      this.params.neiye.splice(i, 1)
    },
    addItem: function (x, i) {
      console.log(x)
      let obj = {}
      if (x.items.length > 2) {
        return this.$message.error('最多添加三条数据')
      }
      if (x.name == '击凸') {
        obj = { hasDrop: false, changbian: '', duanbian: '' }
      } else {
        obj = { hasDrop: true, drop: '', changbian: '', duanbian: '' }
      }
      x.items.push(obj)
      this.$forceUpdate();
      //   let old = JSON.parse(JSON.stringify(this.xuanchuan_gongyi))
      //   let arr = old.filter((y) => {
      //     return x.value == y.value
      //   })
      //   if (arr.length > 2) {
      //     return this.$message.error('最多三条数据')
      //   }
      //   this.xuanchuan_gongyi.splice(i + 1, 0, x)
    },
    deleteItem: function (x, i) {
      let arr = x.items
      if (arr.length == 1) {
        return this.$message.error('最后一条不可删除')
      }
      x.items.splice(i, 1);
      this.$forceUpdate();
    },
    inputChange(x, y) {
      //   let list = this.params.gongyi
      //   if (x.checkbox) {
      //     for (let i in list) {
      //       list[i].inputs = []
      //       if (list[i].name == x.name) {
      //         list[i].inputs.push(y)
      //       }
      //     }
      //   }
      //   console.log(list)
      this.$forceUpdate()
    },
  },
    computed: {
      typeNumFun: {
        get(){
            return parseInt((this.files?this.files.length:0)  + (this.models?this.models.length:0));
        },
        set(v) {
            this.params.typeNum = v
        }
    },
  },
  watch:{
       datas:{
          handler(nV,oV){
              if(nV && JSON.stringify(nV) !='{}'){
                  this.params = nV.attr;
              }
          },
          immediate:true,
          deep:true
      },
      params:{
          handler(nV,oV){
              console.log(nV,"nv");
              this.$emit("detailChange",nV);
          },
          deep:true
      },

  }
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
      .add-items-div {
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
