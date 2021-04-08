<template>
  <div class='attr-operate banner-attr'>
    <el-form label-width="100px"
             class="bgGreen">
      <h3 class="title">铜版彩色印刷宣传单页 颜色清晰质感更好</h3>
      <h5 class="introl">不会设计？没时间设计？平台提供专业设计师套版设计服务，咨询客服了解详情</h5>
      <Server></Server>

      <el-form-item label="材料"
                    class="cailiao">
        <el-col :span="15">

          <el-select class="form-contrl width100"
                     placeholder="选择材料"
                     v-model="params.mate">
            <el-option v-for="i in cnst.danye_materials"
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
            <el-option v-for="i in cnst.danye_rules"
                       :label="i.name"
                       :value="i.value"
                       :key="i.value"></el-option>
          </el-select>
        </el-col>
        <div v-if="zidingyi">
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
          <el-checkbox label="自定义"
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
      <el-form-item label="印面">
        <el-radio-group v-model="params.radio">
          <el-radio label="1">双面</el-radio>
          <el-radio label="2">单面</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="工艺"
                    class="caiseType mg-none">

        <el-checkbox label="折页"
                     v-model="params.model_">
        </el-checkbox>
        <el-select v-model="params.drop">
          <el-option v-for="i in cnst.danye_drop1"
                     :label="i.name"
                     :value="i.name"
                     :key="i.name"
                     @change="changeTypes(i)"></el-option>
        </el-select>
        <el-select>
          <el-option v-for="i in typelist"
                     :label="i.name"
                     :value="i.value"
                     :key="i.value"></el-option>
        </el-select>

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
      zidingyi: false,
      typelist: [],
      activeName: '',

      params: {
        mate: '',
        num: 1,
        typeNum: 1,
        type: '',
        drop: '',
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
    changeBtn: function (n) {
      this.currentVal = n.value
    },
    changeTypes: function (x) {
      this.typelist = x.drops
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
    .rules_two {
      .el-col-6 {
        width: 148px;
      }
    }
    /deep/.caiseType .el-form-item__content {
      display: flex;
      justify-content: start;
      margin-right: 20px;
      > div {
        margin-right: 20px;
      }
      .el-checkbox {
        margin-right: 3px !important;
      }
      .el-select {
        width: 72px;
        input {
          height: 24px !important;
          line-height: 24px !important;
        }
        .el-select__caret {
          height: 24px !important;
          line-height: 24px !important;
        }
      }
    }
  }
}
</style>
