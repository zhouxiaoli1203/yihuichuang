<template>
  <div class='attr-operate banner-attr'>
    <el-form label-width="100px"  :model="params"
             :rules="rulesForm"
             ref="ruleForm"
             class="bgGreen">
      <el-form-item label="材料" prop="cailiao"
                    class="cailiao">
        <el-col :span="7">
          <el-select class="form-contrl width100"
                     placeholder="选择材料"
                     v-model="params.cailiao">
            <el-option v-for="i in cnst.buganjiao_materials"
                       :label="i.name"
                       :value="i.value"
                       :key="i.value"></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="尺寸(毫米)" prop="chicun"
                    class="rules">
        <el-col :span="7">
          <el-select class="form-contrl width100"
                     placeholder="选择尺寸"
                     v-model="params.chicun">
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
                           :min="1"
                           :max="10"></el-input-number>
        </el-col>
      </el-form-item>
      <el-form-item label="款数"
                    class="typeNum">

        <el-input-number v-model="typeNumFun"
                         :min="0"
                         :max="10" disabled></el-input-number>
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
      currentVal: 1,
      params: {
        cailiao: '',
        chicun:"",
        num: 1,
        typeNum: 0,
        gongyi: [],
      },
      rulesForm:{
          cailiao: [
            { required: true, message: '请选择材料', trigger: 'change' },
          ],
          chicun: [
            { required: true, message: '请选择尺寸', trigger: 'change' },
          ],
      },
      
    }
  },
  props:["models","files"],
  components: { },
  created() {
    this.cnst.zheye_types_gongyi.map((v, i) => {})
  },
  mounted() {
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
   computed: {
      typeNumFun: {
        get(){
            return parseInt(this.files.length  + this.models.length);
        },
        set(v) {
            this.params.typeNum = v
        }
    },
  },
  watch:{
      params:{
          handler(nV,oV){
              console.log(nV);
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
