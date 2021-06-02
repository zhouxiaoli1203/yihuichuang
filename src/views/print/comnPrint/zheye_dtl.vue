<template>
  <div class='attr-operate banner-attr'>
    <el-form label-width="115px"
             :model="params"
             :rules="rules"
             ref="ruleForm"
             class="bgGreen">

      <el-form-item label="材料"
                    prop="cailiao"
                    class="cailiao">
        <el-col :span="15">
          <el-select class="form-contrl width100"
                     placeholder="选择材料"
                     v-model="params.cailiao">
            <el-option v-for="i in cnst.zheye_materials"
                       :label="i.name"
                       :value="i.name"
                       :key="i.value"></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label=""
                    v-if="!params.zidingyi"
                    key="selectRule"
                    prop="chicun"
                    class="rules_style">
        <span slot="label">
          <span class="span-box displayFl">
            <span> 尺寸(毫米) </span>
            <el-tooltip class="item"
                        effect="dark"
                        content="尺寸加大不加价，升级为标准16开210*285，8开420*285"
                        placement="top">
              <div class="yhc-tips">!</div>
            </el-tooltip>
          </span>
        </span>
        <el-col :span="15">
          <el-select class="form-contrl width100"
                     placeholder="选择尺寸"
                     v-model="params.chicun">
            <el-option v-for="i in cnst.danye_rules"
                       :label="i.name"
                       :value="i.value"
                       :key="i.value"></el-option>
          </el-select>
        </el-col>

        <el-col :span="2">
          <el-checkbox class="zidingyi"
                       label="自定义"
                       v-model="params.zidingyi"
                      
                       border>
          </el-checkbox>
        </el-col>
      </el-form-item>

      <el-form-item label=""
                    v-if="params.zidingyi"
                    key="inputRule"
                    required
                    class="rules_style">
        <span slot="label">
          <span class="span-box displayFl">
            <span> 尺寸(毫米) </span>
            <el-tooltip class="item"
                        effect="dark"
                        content="尺寸加大不加价，升级为标准16开210*285，8开420*285"
                        placement="top">
              <div class="yhc-tips">!</div>
            </el-tooltip>
          </span>
        </span>
        <el-col :span="6">
          <el-form-item prop="changbian">
            <el-input v-model="params.changbian"
                      placeholder="长边"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="t_a_c"
                :span="2">×</el-col>
        <el-col :span="6">
          <el-form-item prop="duanbian">
            <el-input v-model="params.duanbian"
                      placeholder="短边"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="2">
          <el-checkbox class="zidingyi"
                       label="自定义"
                       v-model="params.zidingyi" border>
          </el-checkbox>
        </el-col>
      </el-form-item>

      <el-form-item label="数量"
                    class="number">
        <el-col :span="2">
          <el-input-number v-model="params.num" :step="100"></el-input-number>
        </el-col>
      </el-form-item>
      <el-form-item label="款数"
                    class="typeNum">
        <el-input-number v-model="typeNumFun"
                         :min="0"
                         disabled></el-input-number>
      </el-form-item>
      <el-form-item label="印面">
        <el-radio-group v-model="params.radio">
          <el-radio label="2">双面</el-radio>
          <el-radio label="1">单面</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="工艺"
                    class="gongyiType mg-none">

        <div v-for="(x,index) in cnst.zheye_types_gongyi">
          <el-checkbox :label="x.name"
                       :value="x.value"
                       name="type"
                       :key="x.value"
                       v-model="x.checkbox" @change="checkChange(x,index)">
          </el-checkbox>
          <el-select class="mini"
                     v-if="index==0"
                     v-model="x.drop" @change="dropChange(x,$event)">
            <el-option v-for="i in cnst.zheyes"
                       :label="i.name"
                       :value="i.name"
                       :key="i.value"></el-option>
          </el-select>
          <el-select class="mini"
                     v-if="index!=0"
                     v-model="x.drop" @change="dropChange(x,$event)">
            <el-option v-for="i in cnst.modelTypes"
                       :label="i.name"
                       :value="i.name"
                       :key="i.value"></el-option>
          </el-select>
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
    title: '易绘创官网-三折页|折页印刷|折页制作|在线折页设计|折页免费模板',
    meta: [
      {
        name: 'keywords',
        content:
          '折页印刷,折页设计,三折页,折页制作,折页,折页模板,在线折页设计,易绘创',
      },
      {
        name: 'description',
        content:
          '在线折页设计印刷就来易绘创（yihuichuang.com），在线折页设计、折页制作、 折页印刷、三折页设计欣赏、折页模板免费设计一应俱全。满足企业对折页尺寸、设计、印刷、制作价格各个方面的要求，实现在线印刷折页的效果。',
      },
    ],
  },
  data() {
    return {
      dialogVisible: false,
      params: {
        chanpinType:"1",
        zidingyi: false,
        cailiao: '',
        chicun:'',
        changbian:'',
        duanbian:'',
        num: 500,
        typeNum: 0,
        radio: "2",
        gongyi: [],
      },
      rules: {
        cailiao: [{ required: true, message: '请选择材料', trigger: 'change' }],
        chicun: [{ required: true, message: '请选择尺寸', trigger: 'change' }],
        changbian: [
          { required: true, message: '请输入长边', trigger: 'blur' },
          { pattern: /^[0-9.]*$/, message: '尺寸需为数字', trigger: 'blur' },
        ],
        duanbian: [
          { required: true, message: '请输入短边', trigger: 'blur' },
          { pattern: /^[0-9.]*$/, message: '尺寸需为数字', trigger: 'blur' },
        ],
      },
    }
  },
  props:["datas","files","models"],
  components: {},
  created() {
      if(!(this.datas && JSON.stringify(this.datas) !='{}')){
          this.cnst.zheye_types_gongyi.map((v, i) => {
              v.checkbox = false;
              v.drop = "";
          })
      }
  },
  mounted() {
  },
  methods: {
    handleChange: function () {},
    changeBtn: function (n) {
      this.params.chanpinType = n.value
    },
    checkChange(x,ind){
        if(x.checkbox){
            let o = {name:x.name};
            if(x.drop){
                o.drop = x.drop;
            }
            this.params.gongyi.push(o);
        }else{
            this.params.gongyi = this.params.gongyi.filter(t => t.name != x.name);
        }
        console.log(this.params.gongyi,"list");
        this.$forceUpdate();
    },
    dropChange(x,e){
        let list = this.params.gongyi;
        if(x.checkbox){
            for(let i in list){
                if(list[i].name == x.name && x.drop){
                    list[i].drop = x.drop;
                }
            }
        }
        console.log(list);
        this.$forceUpdate();
    }
  },
  computed: {
    typeNumFun: {
      get() {
        return parseInt((this.files?this.files.length:0)  + (this.models?this.models.length:0));
      },
      set(v) {
        this.params.typeNum = v
      },
    },
  },
  watch: {
      datas:{
          handler(nV,oV){
              let this_ = this;
              if(nV && JSON.stringify(nV) !='{}'){
                  this_.$set(this_.params,"zidingyi",nV.attr.zidingyi);
                  this_.params = nV.attr;
                  let gy = nV.attr.gongyi;
                  this_.cnst.zheye_types_gongyi.map((v)=>{
                      let jud = false;
                      let dp = "";
                        gy.map((v_)=>{
                            if(v.name == v_.name){
                                jud = true;
                                dp = v_.drop?v_.drop:"";
                            }
                        });
                      if(jud){
                          this_.$set(v,"checkbox",true);
                          this_.$set(v,"drop",dp);
                      }
                  });
                //   this_.$forceUpdate(); 
              }
          },
        //   immediate:true,
        //   deep:true
      },
    params: {
      handler(nV, oV) {
        console.log(nV)
        this.$emit('detailChange', nV)
      },
      deep: true,
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
    /deep/.el-form-item .el-form-item__label {
      display: flex !important;
    }
    .rules_style {
      .zidingyi {
        margin-top: 1px;
        margin-left: 10px;
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
