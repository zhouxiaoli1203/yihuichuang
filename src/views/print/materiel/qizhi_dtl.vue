<template>
<!-- 条幅 -->
  <div class='attr-operate banner-attr'>
    <el-form label-width="100px" :model="params" :rules="rules" ref="ruleForm"
             class="bgGreen">
      <el-form-item 
                    label="产品"
                    class="chanpin">
        <el-col :span="15" class="yhc-attr-btns">
          <div class="btn"
               :class='{"active":currentVal == b.value}'
               v-for="b in cnst.qizhi_btns"
               @click="changeBtn(b)">{{b.name}}</div>
        </el-col>
      </el-form-item>

      <el-form-item label="材料"  v-if="currentVal == 1" key="qizhi_cailiao" prop="cailiao"
                    class="cailiao">
        <el-col :span="15">
          <el-select class="form-contrl width100"
                     placeholder="选择材料"
                     v-model="params.cailiao">
            <el-option v-for="i in cnst.qizhi_materials"
                       :label="i.name"
                       :value="i.value"
                       :key="i.value"></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="材料"  v-if="currentVal == 2" key="jinqi_cailiao"prop="cailiao"
                    class="cailiao">
        <el-col :span="15">
          <el-select class="form-contrl width100"
                     placeholder="选择材料"
                     v-model="params.cailiao">
            <el-option v-for="i in cnst.jinqi_materials"
                       :label="i.name"
                       :value="i.value"
                       :key="i.value"></el-option>
          </el-select>
        </el-col>
      </el-form-item>

        <el-form-item v-if="currentVal == 1" key="qizhi_chicun" required
                      label="尺寸(米)"
                      class="rules_two">
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
                    <el-input v-enterNumber v-model="params.duanbian"
                        placeholder="短边"></el-input>
                </el-form-item>
            </el-col>
        </el-form-item>
        <el-form-item  v-if="currentVal == 2" key="jinqi_chicun" prop="chicun"
                      label="尺寸(米)"
                      class="rules">
          <el-col :span="15">
            <el-select class="form-contrl width100"
                       placeholder="选择尺寸"
                       v-model="params.chicun">
              <el-option v-for="i in cnst.banner_rules_jinqi"
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
                    class="typeNum" :class='{"mg-none":currentVal == 2}'>
        <el-input-number v-model="typeNumFun"
                         :min="0"
                         :max="10" disabled></el-input-number>
      </el-form-item>

        <el-form-item v-if="currentVal == 1"
                      label="工艺"
                      class="gongyiType mg-none">
            <el-checkbox-group v-model="params.gongyi">
                <el-checkbox v-for="x in cnst.qizhi_types" :label="x.name" :key="x.value" name="type">
                <span v-if="x.name == '缝筒'">{{x.name}}</span>
                <el-select class="mini" v-if="x.name == '缝筒'" v-model="params.drop" style="width:120px;margin-right:15px;">
                    <el-option v-for="i in x.drops"
                                :label="i.name"
                                :value="i.value"
                                :key="i.value"></el-option>
                    </el-select>
                </el-checkbox>
            </el-checkbox-group>          
        </el-form-item>
    </el-form>

  </div>
</template>

<script>
export default {
  name: 'photo-detail',
   metaInfo: {
      title: '易绘创官网-旗帜设计|旗帜制作 ',
      meta: [
        { name:"keywords",content:'旗帜设计,旗帜制作,彩旗,易绘创'},
        { name:"description",content:'旗帜和彩旗的设计及制作就来易绘创（yihuichuang.com），提供一站式旗帜和彩旗设计和制作。' },
      ]
  },
  data() {
    return {
      currentVal: 1,
      params: {
          chanpinType:"旗帜",
        cailiao: '',
        changbian:"",
        duanbian:"",
        chicun:"",
        num: 1,
        typeNum: 0,
        gongyi: [],
      },
      rules:{
          cailiao: [
            { required: true, message: '请选择材料', trigger: 'change' },
          ],
          changbian: [
            { required: true, message: '请输入长边', trigger: 'blur' },
            { pattern: /^[0-9.]*$/, message: '尺寸需为数字', trigger: 'blur'}
          ],
          duanbian: [
            { required: true, message: '请输入短边', trigger: 'blur' },
            { pattern: /^[0-9.]*$/, message: '尺寸需为数字', trigger: 'blur'}
          ],
          chicun: [
            { required: true, message: '请选择尺寸', trigger: 'change' },
          ],
      },
      
    }
  },
  props:["models","files"],
  components: { },
  created() {},
  mounted() {
  },
  methods: {
    handleChange: function () {},
    changeBtn: function (n) {
      this.currentVal = n.value;
       this.params.chanpinType = n.name;
      this.params.cailiao="";
        this.params.changbian="";
        this.params.duanbian="";
        this.params.chicun="";
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

    .rules_two {
      .el-col-6 {
        width: 148px;
      }
    }

  }
}
</style>
