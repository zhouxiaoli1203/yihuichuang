<template>
  <div class='attr-operate banner-attr'>
    <el-form label-width="100px"
             :model="params"
             :rules="rulesForm"
             ref="ruleForm"
             class="bgGreen">
      <el-form-item label="材料"
                    prop="cailiao"
                    class="cailiao">
        <el-col :span="7">
          <el-select class="form-contrl width100"
                     placeholder="选择材料"
                     v-model="params.cailiao">
            <el-option v-for="i in cnst.buganjiao_materials"
                       :label="i.name"
                       :value="i.name"
                       :key="i.value"></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="尺寸(毫米)"
                    prop="chicun"
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
                           :min="1"></el-input-number>
        </el-col>
      </el-form-item>
      <el-form-item label="款数"
                    class="typeNum">

        <el-input-number v-model="typeNumFun"
                         :min="0"
                         disabled></el-input-number>
      </el-form-item>
      <el-form-item label="工艺"
                    class="gongyiType mg-none">
        <div v-for="(x,index) in cnst.buganjiao_gongyi"
             class="displayFl"
             style="align-items: center;">
          <el-checkbox :label="x.name"
                       :value="x.value"
                       name="type"
                       :key="x.value"
                       v-model="x.checkbox"
                       @change="checkChange(x,index)">
          </el-checkbox>
          <el-tooltip v-if="x.name=='拼大张'"
                      class="item"
                      effect="dark"
                      content="当“拼大张”时，算价尺寸为小成品尺寸，数量时拼好的大张数量"
                      placement="top">
            <div class="yhc-tips"
                 style="margin-top:0;">!</div>
          </el-tooltip>
          <el-select class="mini width78"
                     v-show="x.name=='模切'"
                     v-model="x.drop"
                     @change="dropChange(x,$event)">
            <el-option v-for="i in x.drops"
                       :label="i.name"
                       :value="i.name"
                       :key="i.value"></el-option>
          </el-select>

          <div v-show="x.name=='拼大张'"
               class="yhc-el-input displayFl mt5">
            <div v-for="y in x.inputs">
              <el-input type="text"
                        class="mini mr10"
                        style="width:78px;"
                        placeholder="长边拼数"
                        v-model="y.changbian"
                        @input="inputChange(x,y)"></el-input>
              <el-input type="text"
                        class="mini"
                        style="width:78px;"
                        placeholder="短边拼数"
                        v-model="y.duanbian"
                        @input="inputChange(x,y)"></el-input>
            </div>
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
      {
        name: 'keywords',
        content:
          '不干胶印刷,不干胶制作,不干胶标签,不干胶设计,不干胶贴印刷,不干胶贴制作,易绘创',
      },
      {
        name: 'description',
        content:
          '不干胶制作印刷和不干胶设计就来易绘创（yihuichuang.com），提供一站式不干胶制作、不干胶印刷、不干胶标签设计、不干胶贴纸打印等不干胶印刷设计服务。包含不干胶标签、不干胶贴纸、不干胶标签纸、透明不干胶等产品信息。',
      },
    ],
  },
  data() {
    return {
      dialogVisible: false,
      params: {
        chanpinType:"1",
        cailiao: '',
        chicun: '',
        num: 1,
        typeNum: 0,
        gongyi: [],
      },
      rulesForm: {
        cailiao: [{ required: true, message: '请选择材料', trigger: 'change' }],
        chicun: [{ required: true, message: '请选择尺寸', trigger: 'change' }],
      },
    }
  },
  props: ['datas','models', 'files'],
  components: {},
  created() {
       if (!(this.datas && JSON.stringify(this.datas) != '{}')) {
      this.cnst.buganjiao_gongyi.map((v, i) => {
        v.checkbox = false
        v.drop = '';
        if(v.inputs){
            v.inputs.map((v_)=>{
                v_.changbian="";
                v_.duanbian="";
            });
        }
      })
    }
  },
  mounted() {},
  methods: {
    handleChange: function () {},
    changeBtn: function (n) {
      this.params.chanpinType = n.value
    },
    changeTypes: function (x) {
      this.typelist = this.cnst.danye_drop1.filter((item, i) => {
        return item.name == x
      })[0].drops
      console.log(this.typelist)
    },
    checkChange(x, ind) {
      if (x.checkbox) {
        let o = { name: x.name }
        if (x.drop) {
          o.drop = x.drop
        }
        if (x.inputs) {
          o.inputs = x.inputs
        }
        this.params.gongyi.push(o)
      } else {
        this.params.gongyi = this.params.gongyi.filter((t) => t.name != x.name)
      }
      console.log(this.params.gongyi, 'list')
      this.$forceUpdate()
    },
    dropChange(x, e) {
      let list = this.params.gongyi
      if (x.checkbox) {
        for (let i in list) {
          if (list[i].name == x.name && x.drop) {
            list[i].drop = x.drop
          }
        }
      }
      console.log(list)
      this.$forceUpdate()
    },
    inputChange(x, y) {
      let list = this.params.gongyi
      if (x.checkbox) {
        for (let i in list) {
          list[i].inputs = []
          if (list[i].name == x.name) {
            list[i].inputs.push(y)
          }
        }
      }
      console.log(list)
      this.$forceUpdate()
    },
  },
  computed: {
    typeNumFun: {
      get() {
        return parseInt(this.files.length + this.models.length)
      },
      set(v) {
        this.params.typeNum = v
      },
    },
  },
  watch: {
        datas: {
      handler(nV, oV) {
        if (nV && JSON.stringify(nV) != '{}') {
          let this_ = this
          this.params = nV.attr
          let gy = this_.params.gongyi
          if (gy && gy.length > 0) {
            this_.cnst.buganjiao_gongyi.map((v, i) => {
              let jud = false
              let drop = '';
              let inputs = [];
              gy.map((v_, i_) => {
                if (v.name == v_.name) {
                  jud = true
                  if (v_.drop) {
                    drop = v_.drop
                  }
                  if(v_.inputs){
                      inputs = v_.inputs;
                  }
                }
              })
              if (jud) {
                v.checkbox = true
                v.drop = drop
                if(inputs){
                    v.inputs = inputs
                }
              }
            })
          }
        }
      },
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
