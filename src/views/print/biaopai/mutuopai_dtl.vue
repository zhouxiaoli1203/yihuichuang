
<template>
  <div class='attr-operate banner-attr'>
    <el-form label-width="100px" :model="params"
             :rules="rulesForm"
             ref="ruleForm"
             class="bgGreen">
      <el-form-item label="材料" prop="cailiao"
                    class="cailiao">
        <el-col :span="7">
          <el-select class="form-contrl width100"
                     placeholder="选择材料"
                     v-model="params.cailiao">
            <el-option v-for="i in cnst.paiziMates"
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
            <el-option v-for="i in cnst.paiziRules"
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

        <el-checkbox label="款式"
                     v-model="params.model_">
        </el-checkbox>
        <el-select class="mini" v-model="params.drop">
          <el-option v-for="i in cnst.paiziType"
                     :label="i.name"
                     :value="i.name"
                     :key="i.name"
                     ></el-option>
        </el-select>
      </el-form-item>
  </el-form>
  </div>
</template>

<script>
export default {
  name: 'photo-detail',
  metaInfo: {
      title: '易绘创官网-木托授权牌|定制木托授权牌|木托授权牌加工|木托授权牌制作|木托授权牌设计',
      meta: [
        { name:"keywords",content:'木托授权牌,定制木托授权牌,木托授权牌加工,木托授权牌制作,木托授权牌设计,易绘创'},
        { name:"description",content:'定制木托授权牌就来易绘创（yihuichuang.com），提供一站式木托授权牌报价 ，快速制作加工木托授权牌。' },
      ]
  },
  data() {
    return {
        dialogVisible:false,
      currentVal: 1,
      params: {
        cailiao: '',
        chicun:"",
        num: 1,
        typeNum: 0,
        model_: false,
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
  components: {},
  created() {},
  mounted() {
    console.log(this.type)
  },
  methods: {
    handleChange: function () {},
    changeBtn: function (n) {
      this.currentVal = n.value
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
    .rules{
        .zidingyi{
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


}
</style>

