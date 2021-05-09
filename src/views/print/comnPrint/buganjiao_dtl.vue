<template>
  <div class='attr-operate banner-attr'>
    <el-form label-width="100px"
             class="bgGreen">
      <h3 class="title">异形 不干胶贴纸标签定制 </h3>
      <h5 class="introl">不会设计？没时间设计？平台提供专业设计师套版设计服务，咨询客服了解详情</h5>
      <Server></Server>

      <el-form-item label="材料"
                    class="cailiao">
        <el-col :span="7">

          <el-select class="form-contrl width100"
                     placeholder="选择材料"
                     v-model="params.mate">
            <el-option v-for="i in cnst.buganjiao_materials"
                       :label="i.name"
                       :value="i.value"
                       :key="i.value"></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="尺寸(毫米)"
                    class="rules">
        <el-col :span="15">
          <el-select class="form-contrl width100"
                     placeholder="选择尺寸"
                     v-model="params.mate">
            <el-option v-for="i in cnst.buganjiao_rules"
                       :label="i.name"
                       :value="i.value"
                       :key="i.value"></el-option>
          </el-select>
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
      <el-form-item label="工艺"
                    class="gongyiType mg-none">

        <div v-for="(x,index) in cnst.buganjiao_gongyi"
             class="displayFl">
          <el-checkbox :label="x.name"
                       :value="x.value"
                       name="type"
                       :key="x.value"
                       v-model="x.model_">
          </el-checkbox>
          <el-tooltip v-if="x.name=='拼大张'"
                      class="item"
                      effect="dark"
                      content="当“拼大张”时，算价尺寸为小成品尺寸，数量时拼好的大张数量"
                      placement="top">
            <div class="yhc-tips">!</div>
          </el-tooltip>
          <el-select class="mini width78"
                     v-show="x.name=='模切'"
                     v-model="x.drop">
            <el-option v-for="i in cnst.buganjiao_moqie"
                       :label="i.name"
                       :value="i.value"
                       :key="i.value"></el-option>
          </el-select>

          <div v-show="x.name=='拼大张'"
               class="yhc-el-input displayFl mt5">
            <el-input class="mini mr10"
                      placeholder="长边拼数"></el-input>
            <el-input class="mini"
                      placeholder="短边拼数"></el-input>
          </div>
        </div>
      </el-form-item>
    </el-form>
    <el-dialog title="全部类型显示"
               :visible.sync="dialogVisible"
               width="290px">
      <ul class="dialog-type-style">
        <li v-for="x in cnst.danye_all_drops">{{x.name}}</li>
      </ul>
    </el-dialog>
  </div>
</template>

<script>
import Server from '@/components/servertip'
export default {
  name: 'photo-detail',
   metaInfo: {
      title: '易绘创官网-不干胶印刷|不干胶贴制作|在线不干胶标签印刷设计',
      meta: [
        { name:"keywords",content:'不干胶印刷,不干胶制作,不干胶标签,不干胶设计,不干胶贴印刷,不干胶贴制作,易绘创'},
        { name:"description",content:'不干胶制作印刷和不干胶设计就来易绘创（yihuichuang.com），提供一站式不干胶制作、不干胶印刷、不干胶标签设计、不干胶贴纸打印等不干胶印刷设计服务。包含不干胶标签、不干胶贴纸、不干胶标签纸、透明不干胶等产品信息。' },
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
      currentVal: 1,
    }
  },
  props: ['type'],
  components: { Server },
  created() {
    this.cnst.zheye_types_gongyi.map((v, i) => {})
  },
  mounted() {
    console.log(this.type)
  },
  methods: {
    handleChange: function () {},
    changeBtn: function (n) {
      this.currentVal = n.value
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
