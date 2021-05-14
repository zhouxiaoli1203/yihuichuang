<template>
  <div class='attr-operate photo-attr'>
    <el-form label-width="100px" :model="params" :rules="rules" ref="ruleForm"
             class="bgGreen">
      <el-form-item label="产品"
                    class="chanpin">
        <el-col :span="14" class="yhc-attr-btns">
          <div class="btn"
               :class='{"active":currentVal == b.value}'
               v-for="b in btns"
               @click="changeBtn(b)">{{b.name}}</div>
        </el-col>
      </el-form-item>
      <el-form-item label="材料"
                    class="cailiao" prop="cailiao">
        <el-col :span="14">

          <el-select class="form-contrl width100"
                     placeholder="选择材料"
                     v-model="params.cailiao">
            <el-option v-for="i in materials"
                       :label="i.name"
                       :value="i.name"
                       :key="i.value"></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="尺寸(米)"
                    class="rules" required>
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

      <!-- </div> -->
      <!-- <div class="bgGreen_"> -->
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
                    class="mg-none">
        <el-checkbox-group v-model="params.gongyi" @change="changGongyi">
          <el-checkbox label="覆亮膜"
                       name="type" value="覆亮膜"></el-checkbox>
          <el-checkbox label="覆哑膜"
                       name="type" value="覆亮膜"></el-checkbox>
          <el-checkbox label="覆KT板"
                       name="type" value="覆KT板"></el-checkbox>
          <el-checkbox label="覆PVC板"
                       name="type" value="覆PVC板"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <!-- </div> -->
    </el-form>

  </div>
</template>

<script>
export default {
  name: 'photo-detail',
   metaInfo: {
      title: '易绘创官网-广告写真设计|广告写真制作 ',
      meta: [
        { name:"keywords",content:'写真,海报,广告板写真,展板写真'},
        { name:"description",content:'喷绘写真的设计和制作就来易绘创（yihuichuang.com），提供一站式写真、海报设计、广告板写真和展板写真的设计和制作。' },
      ]
  },
  data() {
    return {
      currentVal: 1,
      materials: this.cnst.photo_ot_xiezhen,
      params: {
        chanpinType:"户外写真",
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
            { required: true, message: '请输入长边', trigger: 'blur' },
            { pattern: /^[0-9.]*$/, message: '尺寸需为数字', trigger: 'blur'}
          ],
          duanbian: [
            { required: true, message: '请输入短边', trigger: 'blur' },
            { pattern: /^[0-9.]*$/, message: '尺寸需为数字', trigger: 'blur'}
          ],
      },
      btns: [
        { name: '户外写真', value: '1' },
        { name: '户内写真', value: '2' },
      ],
    }
  },
  props:["models","files"],
  components: {},
  created() {
      
  },
  mounted() {},
  methods: {
    changGongyi: function () {},
    changeBtn: function (n) {
      this.currentVal = n.value;
      this.params.chanpinType = n.name;
      this.materials =
        n.value == 1 ? this.cnst.photo_ot_xiezhen : this.cnst.photo_in_xiezhen;
        this.params.cailiao="";
        this.params.changbian="";
        this.params.duanbian="";
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
    //   width: 627px;
    width: 100%;
  }
  .yhc-attr-btns{
      .btn{
          width: 160px;
      }
  }
}
</style>
