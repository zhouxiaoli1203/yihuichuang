<template>
  <div class='attr-operate paint-attr'>
      <!-- 绶带 -->
    <el-form label-width="100px" :model="params" :rules="rules" ref="ruleForm"
             class="bgGreen">
      <el-form-item label="材料" prop="cailiao"
                    class="cailiao">
        <el-col :span="7">

          <el-select class="form-contrl width100" 
                     placeholder="选择材料"
                     v-model="params.cailiao">
            <el-option v-for="i in cnst.ribbon_materials"
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
            <el-option v-for="i in cnst.ribbon_rules"
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
                    class="typeNum mg-none">
        <el-input-number v-model="typeNumFun"
                         :min="0"
                         :max="10" disabled></el-input-number>
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
        cailiao: '',
        chicun:"",
        num: 1,
        typeNum: 0,
      },
      rules:{
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
  created() {
  },
  mounted() {},
  methods: {
    handleChange: function () {},
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
  }
}
</style>
