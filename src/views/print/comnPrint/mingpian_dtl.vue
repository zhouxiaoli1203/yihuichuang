
<template>
  <div class='attr-operate banner-attr'>
    <el-form label-width="115px"
             :model="params"
             :rules="rulesForm"
             ref="ruleForm"
             class="bgGreen">
      <el-form-item label="产品"
                    class="chanpin">
        <el-col :span="15"
                class="yhc-attr-btns">
          <div class="btn"
               :class='{"active":params.chanpinType == b.value}'
               v-for="b in cnst.mingpian_btns"
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
            <el-option v-for="i in materials"
                       :label="i.name"
                       :value="i.name"
                       :key="i.value"></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label=""
                    v-if="!params.zidingyi"
                    key="selectRule"
                    prop="chicun"
                    class="rules_style">
        <span slot="label">
          <span class="span-box displayFl">
            <span> 尺寸(毫米) </span>
            <el-tooltip class="item"
                        effect="dark"
                        content="名片为系统自动处理，无人工干预，1.请保证设计尺寸为90*54ｍｍ四周直角，内容距边3ＭＭ；2.如文件做出血，四周出血各2毫米，例:成品90*54mm含出血94*58mm；3.如需切圆角，文件请改成直"
                        placement="top">
              <div class="yhc-tips">!</div>
            </el-tooltip>
          </span>
        </span>
        <el-col :span="15">
          <el-select class="form-contrl width100"
                     placeholder="选择尺寸"
                     v-model="params.chicun">
            <el-option v-for="i in rules"
                       :label="i.name"
                       :value="i.value"
                       :key="i.value"></el-option>
          </el-select>
        </el-col>

        <el-col :span="2">
          <el-checkbox class="zidingyi"
                       label="自定义"
                       v-model="params.zidingyi"
                       border>
          </el-checkbox>
        </el-col>
      </el-form-item>

      <el-form-item label=""
                    v-if="params.zidingyi"
                    key="inputRule"
                    required
                    class="rules_style">
        <span slot="label">
          <span class="span-box displayFl">
            <span> 尺寸(毫米) </span>
            <el-tooltip class="item"
                        effect="dark"
                        content="尺寸加大不加价，升级为标准16开210*285，8开420*285"
                        placement="top">
              <div class="yhc-tips">!</div>
            </el-tooltip>
          </span>
        </span>
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

        <el-col :span="2">
          <el-checkbox class="zidingyi"
                       label="自定义"
                       v-model="params.zidingyi"
                       border>
          </el-checkbox>
        </el-col>
      </el-form-item>
      <el-form-item label="数量"
                    class="number">
        <el-col :span="2">
          <el-input-number v-model="params.num"
                           @change="handleChange"
                           :min="1"
                           label="描述文字"></el-input-number>
        </el-col>
      </el-form-item>
      <el-form-item label="款数"
                    class="typeNum">
        <el-input-number v-model="typeNumFun"
                         :min="0"
                         disabled></el-input-number>
      </el-form-item>
      <el-form-item label="印色">
        <el-radio-group v-model="params.secai">
          <el-radio label="2">彩色</el-radio>
          <el-radio label="1">单色</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="印面">
        <el-radio-group v-model="params.mian">
          <el-radio label="2">双面</el-radio>
          <el-radio label="1">单面</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 工艺名片按钮下的工艺类型 -->
      <el-form-item label="工艺"
                    class="gongyiType mg-none">
        <div v-for="(x,index) in gongyis"
             :key="x.value"
             class="displayFl">

          <el-checkbox :label="x.name"
                       :value="x.name"
                       name="type"
                       :key="x.value"
                       v-model="x.checkbox"
                       @change="checkChange(x,index)">
          </el-checkbox>
          <!-- <div v-show="x.name == '压痕'"> -->
          <el-select class="mini width78"
                     v-show="x.drops1"
                     v-model="x.drop1"
                     :placeholder="x.placeholder"
                     @change="dropChange1(x,$event)">
            <el-option v-for="i in x.drops1" 
                       :label="i.name"
                       :value="i.name"
                       :key="'drop1'+i.value"></el-option>
          </el-select>
          <el-select class="mini width78 ml5"
                     v-show="x.drops2"
                     v-model="x.drop2"
                     @change="dropChange2(x,$event)">
            <el-option v-for="i in x.drops2"
                       :label="i.name"
                       :value="i.name"
                       :key="'drop2'+i.value"></el-option>
          </el-select>
          <el-select class="mini width78 ml5"
                     v-show="x.drops3"
                     v-model="x.drop3"
                     @change="dropChange3(x,$event)">
            <el-option v-for="i in x.drops3"
                       :label="i.name"
                       :value="i.name"
                       :key="'drop3'+i.value"></el-option>
          </el-select>
          <div class="yhc-el-input ml5"
               v-show="x.inputs"
               style="display:inline-block;">
            <el-input class="mini mr10"
                      :placeholder="y.placeholder"
                      v-for="(y,index_) in x.inputs"
                      v-model="y.inputData"
                      :key="index_"></el-input>
          </div>
          <!-- <el-select class="mini width78"
                       v-model="params.drop">
              <el-option label="平均压痕"
                         value="1"></el-option>
              <el-option label="按文件标注"
                         value="1"></el-option>
            </el-select> -->
          <!-- </div> -->
          <!-- <div v-show="x.name == '压点线'">
            <el-select class="mini width78"
                       v-model="params.drop">
              <el-option label="1"
                         value="1"></el-option>
            </el-select>
            <el-select class="mini width78"
                       v-model="params.drop">
              <el-option label="按文件标注"
                         value="1"></el-option>
            </el-select>
          </div> -->
          <!-- 圆角 -->
          <!-- <div v-show="x.name == '圆角'">
            <el-select class="mini width78"
                       v-model="params.drop">
              <el-option v-for="i in cnst.gongyi_dushu"
                         :label="i.name"
                         :value="i.value"
                         :key="i.value"></el-option>
            </el-select>
            <el-select class="mini width78"
                       v-model="params.drop">
              <el-option v-for="i in 4"
                         :label="i"
                         :value="i"
                         :key="i"></el-option>
            </el-select>
            <div class="yhc-el-input"
                 style="display:inline-block;">
              <el-input class="mini mr10"
                        placeholder="模切位置"></el-input>
            </div>
          </div> -->
          <!-- <div v-show="x.name == '打孔'">
            <el-select class="mini width78"
                       v-model="params.drop">
              <el-option v-for="i in 4"
                         :label="`${(i+2)}mm`"
                         :value="(i+2)"
                         :key="(i+2)"></el-option>
            </el-select>
            <el-select class="mini width78"
                       v-model="params.drop">
              <el-option label="1"
                         value="1"></el-option>
            </el-select>
            <el-select class="mini width78"
                       v-model="params.drop">
              <el-option label="按文件标注"
                         value="1"></el-option>
            </el-select>
          </div> -->
          <!-- <div v-show="x.name == '烫金'">
            <el-select class="mini width78"
                       v-model="params.drop">
              <el-option v-for="i in cnst.gongyi_colors.filter((v,i)=>{return v.value<8})"
                         :label="i.name"
                         :value="i.value"
                         :key="i.value"></el-option>
            </el-select>
            <el-select class="mini width78"
                       v-model="params.drop">
              <el-option v-for="i in cnst.danshuang"
                         :label="i.name"
                         :value="i.value"
                         :key="i.value"></el-option>
            </el-select>
          </div> -->
          <!-- <div v-show="x.name == '打码'">
            <el-select class="mini width78"
                       v-model="params.drop">
              <el-option label="1"
                         value="1"></el-option>
              <el-option label="2"
                         value="2"></el-option>
            </el-select>
            <el-select class="mini width78"
                       v-model="params.drop">
              <el-option label="黑色"
                         value="1"></el-option>
            </el-select>
            <el-select class="mini width78"
                       v-model="params.drop">
              <el-option v-for="i in cnst.guize"
                         :label="i.name"
                         :value="i.value"
                         :key="i.value"></el-option>
            </el-select>
            <el-select class="mini width78"
                       v-model="params.drop">
              <el-option label="带NC."
                         value="1"></el-option>
              <el-option label="不带"
                         value="2"></el-option>
            </el-select>
            <div class="yhc-el-input"
                 style="display:inline-block;">
              <el-input class="mini mr10"
                        placeholder="起始码"></el-input>
            </div>
          </div>-->
        </div>
      </el-form-item>

      <!-- 按钮为铜板或精品纸名片的工艺 -->
      <!-- <el-form-item v-if="params.chanpinType == 3"
                    label="工艺"
                    class="gongyiType mg-none">
         <div v-for="(x,index) in cnst.gongyiTypes"
             class="displayFl">

          <el-checkbox :label="x.name"
                       :value="x.name"
                       name="type"
                       :key="x.value"
                       v-model="x.checkbox">
          </el-checkbox>
          <el-select class="mini width78"
                     v-show="x.drops1"
                     v-model="x.drop1">
            <el-option v-for="i in x.drops1"
                       :label="i.name"
                       :value="i.name"
                       :key="'drop1_'+i.value"></el-option>
          </el-select>
          <el-select class="mini width78 ml5"
                     v-show="x.drops2"
                     v-model="x.drop2">
            <el-option v-for="i in x.drops2"
                       :label="i.name"
                       :value="i.name"
                       :key="'drop2_'+i.value"></el-option>
          </el-select>
          <el-select class="mini width78 ml5"
                     v-show="x.drops3"
                     v-model="x.drop3">
            <el-option v-for="i in x.drops3"
                       :label="i.name"
                       :value="i.name"
                       :key="'drop3_'+i.value"></el-option>
          </el-select>
          <div class="yhc-el-input ml5"
               v-show="x.inputs"
               style="display:inline-block;">
            <el-input class="mini mr10"
                      placeholder="起始码"
                      v-for="(y,index_) in x.inputs"
                      v-model="y.inputData"
                      :key="index_"></el-input>
          </div> -->
      <!-- <div v-if="x.value == 1">
            <el-select class="mini width78"
                       v-model="x.drop1">
              <el-option v-for="i in cnst.gongyi_dushu"
                         :label="i.name"
                         :value="i.name"
                         :key="i.value"></el-option>
            </el-select>
            <el-select class="mini width78"
                       v-model="x.drop2">
              <el-option v-for="i in 4"
                         :label="i"
                         :value="i"
                         :key="i"></el-option>
            </el-select>
            <el-select class="mini width78"
                       v-model="x.drop3">
              <el-option v-for="i in cnst.buganjiao_moqie"
                         :label="i.name"
                         :value="i.name"
                         :key="i.value"></el-option>
            </el-select>
          </div>

          <el-select class="mini width78"
                     v-if="x.value == 2 || x.value == 3 || x.value == 4"
                     v-model="x.drop1">
            <el-option v-for="i in cnst.zhengfan"
                       :label="i.name"
                       :value="i.name"
                       :key="i.value"></el-option>
          </el-select>
          <el-select v-if="x.value == 7"
                     v-model="x.drop1"
                     class="mini width78 mr10">
            <el-option v-for="i in cnst.gongyi_colors"
                       :label="i.name"
                       :value="i.name"
                       :key="i.value"></el-option>
          </el-select>
          <el-select class="mini width78"
                     v-if="x.value == 5 || x.value == 6 || x.value == 7"
                     v-model="x.drop1">
            <el-option v-for="i in cnst.danshuang"
                       :label="i.name"
                       :value="i.name"
                       :key="i.value"></el-option>
          </el-select>-->
      <!-- </div>
      </el-form-item> -->
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'photo-detail',
  metaInfo: {
    title: '易绘创官网-商务名片制作|高档名片|印名片|高端名片印刷|彩色名片',
    meta: [
      {
        name: 'keywords',
        content:
          '名片制作,高档名片,印名片,彩色名片,高端名片,商务名片,高级名片,易绘创',
      },
      {
        name: 'description',
        content:
          '名片制作和印名片就来易绘创（yihuichuang.com）,提供一站式在线名片设计、高档名片、商务名片、彩色名片、高级名片、免费模版、名片制作、高端名片和名片印刷服务。满足企业对普通、商务、经典、高档和奢华的不同需求。',
      },
    ],
  },
  data() {
    return {
      materials: this.cnst.tongbanMates, //材料
      rules: this.cnst.tongbanRules, //尺寸选择
      gongyis: this.cnst.tongbanTypes, //工艺选择
      params: {
        chanpinType: '1',
        zidingyi: false,
        cailiao: '',
        chicun: '',
        changbian: '',
        duanbian: '',
        num: 1,
        typeNum: 0,
        secai: '2',
        mian: '2',
        gongyi: [],
      },
      rulesForm: {
        cailiao: [{ required: true, message: '请选择材料', trigger: 'change' }],
        chicun: [{ required: true, message: '请选择尺寸', trigger: 'change' }],
        changbian: [
          { required: true, message: '请输入长边', trigger: 'blur' },
          { pattern: /^[0-9.]*$/, message: '尺寸需为数字', trigger: 'blur' },
        ],
        duanbian: [
          { required: true, message: '请输入短边', trigger: 'blur' },
          { pattern: /^[0-9.]*$/, message: '尺寸需为数字', trigger: 'blur' },
        ],
      },
    }
  },
  props: ['datas', 'models', 'files'],
  components: {},
  created() {
    if (!(this.datas && JSON.stringify(this.datas) != '{}')) {
      this.gongyis.map((v, i) => {
        v.checkbox = false
        v.drop1 = ''
        v.drop2 = ''
        v.drop3 = ''
        if (v.inputs) {
          v.inputs.map((i) => {
            i.inputData = ''
          })
        }
      })
    }
  },
  mounted() {
    console.log(this.type)
  },
  methods: {
    handleChange: function () {},
    changeBtn: function (x) {
      let n = x.value
      this.params.chanpinType = n
      this.materials =
        n == 1
          ? this.cnst.tongbanMates
          : n == 2
          ? this.cnst.jingpinMates
          : this.cnst.gongyiMates
      this.rules =
        n == 1 || n == 2 ? this.cnst.tongbanRules : this.cnst.gongyiRules
      this.gongyis =
        n == 1 || n == 2 ? this.cnst.tongbanTypes : this.cnst.gongyiTypes
      this.gongyis.map((v, i) => {
        v.checkbox = false
        v.drop1 = ''
        v.drop2 = ''
        v.drop3 = ''
        if (v.inputs) {
          v.inputs.map((i) => {
            i.inputData = ''
          })
        }
      })
      this.params.gongyi = []
    },
    checkChange(x, ind) {
      if (x.checkbox) {
        let o = { name: x.name }
        if (x.drop1) {
          o.drop1 = x.drop1
        }
        if (x.drop2) {
          o.drop2 = x.drop2
        }
        if (x.drop3) {
          o.drop3 = x.drop3
        }
        if (x.inputs) {
          o.inputs = x.inputs
        }
        this.params.gongyi.push(o)
      } else {
        this.params.gongyi = this.params.gongyi.filter((t) => t.name != x.name)
      }
      console.log(this.params.gongyi, 'list')
      this.$forceUpdate()
    },
    dropChange1(x, e) {
      let list = this.params.gongyi
      if (x.checkbox) {
        for (let i in list) {
          if (list[i].name == x.name && x.drop1) {
            list[i].drop1 = x.drop1
          }
        }
      }
      console.log(list)
      this.$forceUpdate()
    },
    dropChange2(x, e) {
      let list = this.params.gongyi
      if (x.checkbox) {
        for (let i in list) {
          if (list[i].name == x.name && x.drop2) {
            list[i].drop2 = x.drop2
          }
        }
      }
      console.log(list)
      this.$forceUpdate()
    },
    dropChange3(x, e) {
      let list = this.params.gongyi
      if (x.checkbox) {
        for (let i in list) {
          if (list[i].name == x.name && x.drop3) {
            list[i].drop3 = x.drop3
          }
        }
      }
      console.log(list)
      this.$forceUpdate()
    },
  },
  computed: {
    typeNumFun: {
      get() {
        return parseInt(this.files.length + this.models.length)
      },
      set(v) {
        this.params.typeNum = v
      },
    },
  },
  watch: {
    datas: {
      handler(nV, oV) {
        if (nV && JSON.stringify(nV) != '{}') {
          let this_ = this
          let btnType = nV.attr.chanpinType
          this_.params = nV.attr
          this_.materials =
            btnType == 1
              ? this_.cnst.tongbanMates
              : btnType == 2
              ? this_.cnst.jingpinMates
              : this_.cnst.gongyiMates
          this_.rules =
            btnType == 1 || btnType == 2
              ? this_.cnst.tongbanRules
              : this_.cnst.gongyiRules
          this_.gongyis =
            btnType == 1 || btnType == 2
              ? this_.cnst.tongbanTypes
              : this_.cnst.gongyiTypes
          this_.$set(this_.params, 'zidingyi', nV.attr.zidingyi)
          let gy = this_.params.gongyi
          if (gy && gy.length > 0) {
            this_.gongyis.map((v, i) => {
              let jud = false
              let drop1 = ''
              let drop2 = ''
              let drop3 = ''
              let inputs = []
              gy.map((v_, i_) => {
                if (v.name == v_.name) {
                  jud = true
                  if (v_.drop1) {
                    drop1 = v_.drop1
                  }
                  if (v_.drop2) {
                    drop2 = v_.drop2
                  }
                  if (v_.drop3) {
                    drop3 = v_.drop3
                  }
                  if (v_.inputs) {
                    inputs = v_.inputs
                  }
                }
              })
              if (jud) {
                v.checkbox = true
                v.drop1 = drop1
                v.drop2 = drop2
                v.drop3 = drop3
                if(inputs){
                    v.inputs = inputs
                }
              }
            })
          }
        }
      },
      //   immediate:true,
      //   deep:true
    },
    params: {
      handler(nV, oV) {
        console.log(nV)
        this.$emit('detailChange', nV)
      },
      deep: true,
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
    /deep/.el-form-item .el-form-item__label {
      display: flex !important;
    }
    .rules_style {
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
  .gongyiType {
    .displayFl {
      align-items: center;
    }
  }
  .dialog-type-style {
    display: flex;
    flex-wrap: wrap;
    .el-dialog__header {
      padding: 10px 15px 10px;
    }
    .el-dialog__headerbtn {
      top: 10px;
    }
    .el-dialog__body {
      padding: 0px 15px 20px;
    }
    li {
      padding: 2px;
      background: #e5ede7;
      text-align: center;
      color: #4e9f5b;
      margin-right: 10px;
      margin-top: 10px;
    }
  }
}
</style>
