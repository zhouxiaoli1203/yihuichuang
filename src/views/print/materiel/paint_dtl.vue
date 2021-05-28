<template>
  <div class='attr-operate ribbon-attr'>
    <el-form label-width="100px" :model="params" :rules="rules" ref="ruleForm"
             class="bgGreen">
      <el-form-item label="材料" prop="cailiao"
                    class="cailiao">
        <el-col :span="6">

          <el-select class="form-contrl width100"
                     placeholder="选择材料"
                     v-model="params.cailiao">
            <el-option v-for="i in cnst.paint_materials"
                       :label="i.name"
                       :value="i.value"
                       :key="i.value"></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="尺寸(米)" required
                    class="rules">
        <el-col :span="6">
          <el-form-item prop="changbian">
            <el-input v-model="params.changbian"
                        placeholder="长边"></el-input>
          </el-form-item>  
        </el-col>
        <el-col class="t_a_c"
                :span="2">×</el-col>
        <el-col :span="6" >
            <el-form-item prop="duanbian">
                <el-input v-model="params.duanbian"
                    placeholder="短边"></el-input>
            </el-form-item>
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
                    class="mg-none">
        <el-checkbox-group v-model="params.gongyi">
          <el-checkbox v-for="x in cnst.paint_types" :label="x.name" :value="x.value"
                       name="type" :key="x.value"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>

    </el-form>

  </div>
</template>

<script>
export default {
  name: 'photo-detail',
   metaInfo: {
      title: '易绘创官网-高清室外喷绘布 ',
      meta: [
        { name:"keywords",content:'喷绘写真,室外喷绘,易绘创'},
        { name:"description",content:'室外喷绘布的设计和制作就来易绘创（yihuichuang.com），提供一站式喷绘写真和室外喷绘设计和制作。' },
      ]
  },
  data() {
    return {
       params: {
        cailiao: '',
        changbian:"",
        duanbian:"",
        num: 1,
        typeNum: 0,
        gongyi: [],
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

    }
  },
  props:["datas","files","models"],
  components: {},
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
