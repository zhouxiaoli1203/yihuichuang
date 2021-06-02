<template>
  <div class='attr-operate banner-attr'>
    <el-form label-width="115px" :model="params"
             :rules="rulesForm"
             ref="ruleForm"
             class="bgGreen">
      <el-form-item label="材料" prop="cailiao"
                    class="cailiao">
        <el-col :span="15">
          <el-select class="form-contrl width100"
                     placeholder="选择材料"
                     v-model="params.cailiao">
            <el-option v-for="i in cnst.caidanMates"
                       :label="i.name"
                       :value="i.value"
                       :key="i.value"></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="尺寸(毫米)" prop="chicun"
                    class="rules_style">
                    <span slot="label">
          <span class="span-box displayFl">
            <span> 尺寸(毫米) </span>
            <el-tooltip class="item"
                        effect="dark"
                        content="设计注意事项：1.为避免内容切掉重要内容距成品边至少要3mm（不含出血）2.如文件做出血，四周出血各2毫米，例:成品210*285mm含出血214*289mm" placement="top">
              <div class="yhc-tips">!</div>
            </el-tooltip>
          </span>
        </span>
        <el-col :span="15">
          <el-select class="form-contrl width100"
                     placeholder="选择尺寸"
                     v-model="params.chicun">
            <el-option v-for="i in cnst.caidan_rules"
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
      <el-form-item label="印面">
        <span>单面</span>
      </el-form-item>
      <el-form-item label="工艺"
                    class="gongyiType mg-none">

        <div v-for="(x,index) in cnst.caidan_types">
          <el-checkbox :label="x.name"
                       :value="x.value"
                       name="type"
                       :key="x.value"
                       v-model="x.checkbox"
                       @change="checkChange(x,index)">
          </el-checkbox>
          <el-select class="mini"
                     v-model="x.drop1"
                     @change="dropChange(x)">
            <el-option v-for="i in x.dropslist1"
                       :label="i.name"
                       :value="i.name"
                       :key="i.name"></el-option>
          </el-select>
          <el-select class="mini ml5"
                     v-if="x.typelist.length>0"
                     v-model="x.drop2"
                     @change="dropChange2(x)">
            <el-option v-for="i in x.typelist"
                       :label="i.name"
                       :value="i.name"
                       :key="i.value"></el-option>
          </el-select>
        </div>
        <span class="lineh34 main-click" @click="dialogVisible = true">查看类型</span>
      </el-form-item>
  </el-form>
<el-dialog
  title="全部类型显示"
  :visible.sync="dialogVisible"
  width="290px" class="yhc-el-dialog">
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
      title: '易绘创官网-餐厅菜单|高档菜单|菜单设计|菜单制作',
      meta: [
        { name:"keywords",content:'餐厅菜单,高档菜单,菜单设计,菜单制作,菜单模板,易绘创'},
        { name:"description",content:'在线菜单设计和制作就来易绘创（yihuichuang.com），提供一站式餐厅菜单、高档菜单、菜单设计和菜单制作等服务。' },
      ]
  },
  data() {
    return {
        dialogVisible:false,
        typelist:[],
      params: {
        chanpinType:"1",
        cailiao: '',
        chicun:'',
        num: 1,
        typeNum: 0,
        // drop: '',
        // drop2:"",
        gongyi: [],
        checkbox: false,
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
   props:["datas","files","models"],
  components: {},
  created() {
      if (!(this.datas && JSON.stringify(this.datas) != '{}')) {
      this.cnst.caidan_types.map((v, i) => {
        v.checkbox = false
        v.drop1 = ''
        v.drop2 = ''
      })
    }
  },
  mounted() {
    console.log(this.type)
  },
  methods: {
    handleChange: function () {},
    changeBtn: function (n) {
      this.params.chanpinType = n.value
    },
    dropChange: function (x) {
      let list = this.params.gongyi
      x.typelist = x.dropslist1.filter((item, i) => {
        return item.name == x.drop1
      })[0].drops

      if (x.checkbox) {
        for (let i in list) {
          if (list[i].name == x.name && x.drop1) {
            list[i].drop1 = x.drop1
          }
        }
      }
      this.$forceUpdate()
    },
    dropChange2: function (x) {
      let list = this.params.gongyi
      if (x.checkbox) {
        for (let i in list) {
          if (list[i].name == x.name && x.drop2) {
            list[i].drop2 = x.drop2
          }
        }
      }
      this.$forceUpdate()
    },
    checkChange(x, ind) {
      if (x.checkbox) {
        let o = { name: x.name }
        if (x.drop1) {
          o.drop1 = x.drop1
        }
        if (x.drop2) {
          o.drop2 = x.drop2
        }
        this.params.gongyi.push(o)
      } else {
        this.params.gongyi = this.params.gongyi.filter((t) => t.name != x.name)
      }
      console.log(this.params.gongyi, 'list')
      this.$forceUpdate()
    },
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
           if (nV && JSON.stringify(nV) != '{}') {
          let this_ = this
          this.params = nV.attr
          let gy = this_.params.gongyi
          if (gy && gy.length > 0) {
            this_.cnst.danye_types.map((v, i) => {
              let jud = false
              let drop1 = ''
              let drop2 = ''
              gy.map((v_, i_) => {
                if (v.name == v_.name) {
                  jud = true
                  if (v_.drop1) {
                    drop1 = v_.drop1
                  }
                  if (v_.drop2) {
                    drop2 = v_.drop2
                  }
                }
              })
              if (jud) {
                v.checkbox = true
                v.drop1 = drop1
                v.drop2 = drop2
              }
            })
          }
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
        /deep/.el-form-item .el-form-item__label {
      display: flex !important;
    }
    .rules_style {
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


}
</style>

