<template>
  <div class='attr-operate paint-attr'>
      <!-- 袖章 -->
    <el-form label-width="100px" :model="params" :rules="rules" ref="ruleForm"
             class="bgGreen">
            <el-form-item label="款式" prop="kuanshi"
                    class="type">
        <el-col :span="7">

          <el-select class="form-contrl width100"
                     placeholder="选择款式"
                     v-model="params.kuanshi">
            <el-option v-for="i in cnst.armband_types"
                       :label="i.name"
                       :value="i.value"
                       :key="i.value"></el-option>
          </el-select>
        </el-col>
      </el-form-item>
        <el-form-item label="尺寸(米)" prop="chicun"
                    class="rules">
        <el-col :span="7">

          <el-select class="form-contrl width100"
                     placeholder="选择材料"
                     v-model="params.chicun">
            <el-option v-for="i in cnst.armband_rules"
                       :label="i.name"
                       :value="i.value"
                       :key="i.value"></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="材料" prop="cailiao"
                    class="cailiao">
        <el-col :span="7">

          <el-select class="form-contrl width100"
                     placeholder="选择材料"
                     v-model="params.cailiao">
            <el-option v-for="i in cnst.armband_materials"
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
                           :min="1"></el-input-number>
        </el-col>
      </el-form-item>
      <el-form-item label="款数"
                    class="typeNum">
        <el-input-number v-model="typeNumFun"
                         :min="0" disabled></el-input-number>
      </el-form-item>
      <el-form-item label="工艺"
                    class="typeNum mg-none">
        <el-color-picker v-model="params.color" show-alpha></el-color-picker>
         <span class="demonstration" style="vertical-align: top;">颜色</span>
      </el-form-item>

    </el-form>

  </div>
</template>

<script>
export default {
  name: 'photo-detail',
   metaInfo: {
      title: '易绘创官网-绶带|袖标 ',
      meta: [
        { name:"keywords",content:'绶带袖标,易绘创'},
        { name:"description",content:'吊旗广告设计和制作就来易绘创（yihuichuang.com），提供一站式绶带袖标设计和制作。' },
      ]
  },
  data() {
    return {
     params: {
        kuanshi:"",
        cailiao: '',
        chicun:"",
        num: 1,
        typeNum: 0,
      },
      rules:{
          kuanshi: [
            { required: true, message: '请选择款式', trigger: 'change' },
          ],
          chicun: [
            { required: true, message: '请选择尺寸', trigger: 'change' },
          ],
          cailiao: [
            { required: true, message: '请选择材料', trigger: 'change' },
          ],
      },

    }
  },
  props:["datas","files","models"],
  components: { },
  created() {},
  mounted() {},
  methods: {
    handleChange: function () {},
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
  }
}
</style>
