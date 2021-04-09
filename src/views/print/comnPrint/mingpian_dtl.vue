
<template>
  <div class='attr-operate banner-attr'>
    <el-form label-width="100px"
             class="bgGreen">
      <h3 class="title">铜版纸名片 覆膜名片 多种工艺、材质定制</h3>
      <h5 class="introl">不会设计？没时间设计？平台提供专业设计师套版设计服务，咨询客服了解详情</h5>
      <Server></Server>
      <el-form-item label="产品"
                    class="chanpin">
        <el-col :span="15"
                class="yhc-attr-btns">
          <div class="btn"
               :class='{"active":currentVal == b.value}'
               v-for="b in cnst.mingpian_btns"
               @click="changeBtn(b)">{{b.name}}</div>
        </el-col>
      </el-form-item>
      <el-form-item label="材料"
                    class="cailiao">
        <el-col :span="15">

          <el-select class="form-contrl width100"
                     placeholder="选择材料"
                     v-model="params.mate">
            <el-option v-for="i in materials"
                       :label="i.name"
                       :value="i.value"
                       :key="i.value"></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label=""
                    class="rules">
        <span slot="label">
          <span class="span-box displayFl">
            <span> 尺寸(毫米) </span>
            <el-tooltip class="item yhc-tips-content"
                        effect="dark"
                        popper-class="atooltip"
                        content="名片为系统自动处理，无人工干预，1.请保证设计尺寸为90*54ｍｍ四周直角，内容距边3ＭＭ；2.如文件做出血，四周出血各2毫米，例:成品90*54mm含出血94*58mm；3.如需切圆角，文件请改成直"
                        placement="right">
              <div class="yhc-tips">!</div>
            </el-tooltip>
          </span>
        </span>
        <el-col :span="15"
                v-if="!zidingyi">
          <el-select class="form-contrl width100"
                     placeholder="选择尺寸"
                     v-model="params.mate">
            <el-option v-for="i in rules"
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
                    class="number">
        <el-col :span="2">
          <el-input-number v-model="params.num"
                           @change="handleChange"
                           :min="1"
                           :max="10"
                           label="描述文字"></el-input-number>
        </el-col>
      </el-form-item>
      <el-form-item label="款数"
                    class="typeNum"
                    :class='{"mg-none":type != 1 && currentVal == 3}'>
        <el-input-number v-model="params.typeNum"
                         @change="handleChange"
                         :min="1"
                         :max="10"></el-input-number>
      </el-form-item>
      <el-form-item label="印色">
        <el-radio-group v-model="params.radio">
          <el-radio label="1">彩色</el-radio>
          <el-radio label="2">单色</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="印面">
        <el-radio-group v-model="params.radio">
          <el-radio label="1">双面</el-radio>
          <el-radio label="2">单面</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 工艺名片按钮下的工艺类型 -->
      <el-form-item v-if="currentVal != 3"
                    label="工艺"
                    class="gongyiType mg-none">
        <div v-for="x in cnst.tongbanTypes"
             class="displayFl">

          <el-checkbox :label="x.name"
                       :value="x.value"
                       name="type"
                       :key="x.value"
                       v-model="x.model_">
          </el-checkbox>
          <div v-show="x.name == '压痕'">
              <el-select class="mini width78"
                         v-model="params.drop">
                <el-option label="1"
                           value="1"></el-option>
              </el-select>
              <el-select class="mini width78"
                         v-model="params.drop">
                <el-option label="平均压痕"
                           value="1"></el-option>
                <el-option label="按文件标注"
                           value="1"></el-option>
              </el-select>
          </div>
          <div v-show="x.name == '压点线'">
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
          </div>
          <!-- 圆角 -->
          <div v-show="x.name == '圆角'">
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
            <div class="yhc-el-input" style="display:inline-block;">
            <el-input class="mini mr10"
                      placeholder="模切位置"></el-input>
          </div>
          </div>
          <div v-show="x.name == '打孔'">
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
          </div>
          <div v-show="x.name == '烫金'">
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
          </div>
          <div v-show="x.name == '打码'">
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
             <div class="yhc-el-input" style="display:inline-block;">
            <el-input class="mini mr10"
                      placeholder="起始码"></el-input>
          </div>
          </div>
        </div>
      </el-form-item>

      <!-- 按钮为铜板或精品纸名片的工艺 -->
      <el-form-item v-if="currentVal == 3"
                    label="工艺"
                    class="gongyiType mg-none">
        <div v-for="x in cnst.gongyiTypes"
             class="displayFl">

          <el-checkbox :label="x.name"
                       :value="x.value"
                       name="type"
                       :key="x.value"
                       v-model="x.model_">
          </el-checkbox>

          <div v-show="x.value == 1">
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
            <el-select class="mini width78"
                       v-model="params.drop">
              <el-option v-for="i in cnst.buganjiao_moqie"
                         :label="i.name"
                         :value="i.value"
                         :key="i.value"></el-option>
            </el-select>
          </div>

          <el-select class="mini width78"
                     v-if="x.value == 2 || x.value == 3 || x.value == 4"
                     v-model="params.drop">
            <el-option v-for="i in cnst.zhengfan"
                       :label="i.name"
                       :value="i.value"
                       :key="i.value"></el-option>
          </el-select>
          <el-select v-if="x.value == 7"
                     v-model="params.drop"
                     class="mini width78 mr10">
            <el-option v-for="i in cnst.gongyi_colors"
                       :label="i.name"
                       :value="i.value"
                       :key="i.value"></el-option>
          </el-select>
          <el-select class="mini width78"
                     v-if="x.value == 5 || x.value == 6 || x.value == 7"
                     v-model="params.drop">
            <el-option v-for="i in cnst.danshuang"
                       :label="i.name"
                       :value="i.value"
                       :key="i.value"></el-option>
          </el-select>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Server from '@/components/servertip'
export default {
  name: 'photo-detail',
  data() {
    return {
      dialogVisible: false,
      zidingyi: false,
      typelist: [],
      activeName: '',
      materials: this.cnst.tongbanMates,
      rules: this.cnst.tongbanRules,
      gontyiTypes: this.cnst.tongbanTypes,
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
      currentVal: 1,
    }
  },
  props: ['type'],
  components: { Server },
  created() {},
  mounted() {
    console.log(this.type)
  },
  methods: {
    handleChange: function () {},
    changeBtn: function (x) {
      let n = x.value
      this.currentVal = n
      this.materials =
        n == 1
          ? this.cnst.tongbanMates
          : n == 2
          ? this.cnst.jingpinMates
          : this.cnst.gongyiMates
      this.rules =
        n == 1 || n == 2 ? this.cnst.tongbanRules : this.cnst.gongyiRules
      this.gontyiTypes =
        n == 1 || n == 2 ? this.cnst.tongbanTypes : this.cnst.gongyiTypes
    },
    changeTypes: function (x) {
      this.typelist = this.cnst.danye_drop1.filter((item, i) => {
        return item.name == x
      })[0].drops
      console.log(this.typelist)
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
    // /deep/.caiseType .el-form-item__content {
    //   display: flex;
    //   justify-content: start;
    //   flex-wrap: wrap;
    //   margin-right: 20px;
    //   > div {
    //     margin-right: 20px;
    //   }
    //   .el-checkbox {
    //     margin-right: 3px !important;
    //   }
    //   .el-select {
    //     width: 72px;
    //     input {
    //       height: 24px !important;
    //       line-height: 24px !important;
    //     }
    //     .el-select__caret {
    //       height: 24px !important;
    //       line-height: 24px !important;
    //     }
    //   }
    // }
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
