<template>
<!-- 条幅 -->
  <div class='attr-operate banner-attr'>
    <el-form label-width="100px" :model="params" :rules="rules" ref="ruleForm"
             class="bgGreen">
      <el-form-item label="材料" prop="cailiao"
                    class="cailiao">
        <el-col :span="15">

          <el-select class="form-contrl width100"
                     placeholder="选择材料"
                     v-model="params.cailiao">
            <el-option v-for="i in cnst.banner_materials"
                       :label="i.name"
                       :value="i.value"
                       :key="i.value"></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item  label="尺寸(米)" prop="chicun"
                    class="rules">
        <el-col :span="15">
          <el-select class="form-contrl width100"
                     placeholder="选择尺寸"
                     v-model="params.chicun">
            <el-option v-for="i in cnst.banner_rules_zhanjia"
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
                           :max="10"
                           label="描述文字"></el-input-number>
        </el-col>
      </el-form-item>
      <el-form-item label="款数"
                    class="typeNum">
        <el-input-number v-model="typeNumFun"
                         :min="0"
                         :max="10" disabled></el-input-number>
      </el-form-item>
        <el-form-item label="工艺"
                      class="mg-none">
             <el-checkbox-group v-model="params.gongyi">
                <el-checkbox v-for="x in cnst.banner_types" :label="x.name" :value="x.value"
                        :key="x.value"></el-checkbox>
            </el-checkbox-group>
        </el-form-item>

    </el-form>

  </div>
</template>

<script>
export default {
  name: 'photo-detail',
   metaInfo: {
      title: '易绘创官网-展架设计|展架制作在线展架设计|X展架制作|亚力克展架设计|广告X展架定做尺寸|展架价格',
      meta: [
        { name:"keywords",content:'展架,X展架制作,X展架设计,X展架定做,易绘创'},
        { name:"description",content:'展架设计和定制就来易绘创（yihuichuang.com），提供一站式亚力克展架设计、广告展架制作、X展架定做及不锈钢展架的在线印刷服务，满足公司对展架制作设计、定做的需求，并给您一个满意的展架价格。' },
      ]
  },
  data() {
    return {
      params: {
        cailiao: '',
        chicun:"",
        num: 1,
        typeNum: 0,
        gongyi: [],
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
  props:["datas","files","models"],
  components: {},
  created() {},
  mounted() {
  },
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

  }
}
</style>
