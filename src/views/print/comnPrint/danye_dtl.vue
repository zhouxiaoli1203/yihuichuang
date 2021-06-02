<template>
  <div class='attr-operate banner-attr'>
    <el-form label-width="100px"
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
            <el-option v-for="i in cnst.danye_materials"
                       :label="i.name"
                       :value="i.value"
                       :key="i.value"></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="尺寸(毫米)"
                    v-if="!params.zidingyi"
                    key="selectRule"
                    prop="chicun"
                    class="rules">
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

      <el-form-item label="尺寸(毫米)"
                    v-if="params.zidingyi"
                    key="inputRule"
                    required
                    class="rules">
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
                       v-model="params.zidingyi"
                       border>
          </el-checkbox>
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
      <el-form-item label="印面">
        <el-radio-group v-model="params.radio">
          <el-radio label="2">双面</el-radio>
          <el-radio label="1">单面</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="工艺"
                    class="gongyiType mg-none">
        <div v-for="(x,index) in cnst.danye_types">
          <el-checkbox :label="x.name"
                       :value="x.value"
                       name="type"
                       :key="x.value"
                       v-model="x.checkbox"
                       @change="checkChange(x,index)">
          </el-checkbox>
          <!-- <el-select class="mini" v-show="x.select" v-model="x.drop" @change="dropChange(x,$event)" placeholder="类型">
              <el-option v-for="i in x.drops"
                         :label="i.name"
                         :value="i.name"
                         :key="i.value"></el-option>
            </el-select> -->
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
        <!-- <el-checkbox label="折页"
                     v-model="params.checkbox">
        </el-checkbox>
        <el-select class="mini"
                   v-model="params.drop"
                   @change="changeTypes(params.drop)">
          <el-option v-for="i in cnst.danye_drop1"
                     :label="i.name"
                     :value="i.name"
                     :key="i.name"></el-option>
        </el-select>
        <el-select class="mini"
                   v-model="params.drop2">
          <el-option v-for="i in typelist"
                     :label="i.name"
                     :value="i.name"
                     :key="i.value"></el-option>
        </el-select> -->
        <span class="lineh34 main-click"
              @click="dialogVisible = true">查看类型</span>
      </el-form-item>
    </el-form>
    <el-dialog title="全部类型显示"
               :visible.sync="dialogVisible"
               width="290px"
               class="yhc-el-dialog">
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
    title:
      '易绘创官网-宣传单页|在线宣传单设计|宣传单页制作|DM单页印刷|宣传单模板免费素材',
    meta: [
      {
        name: 'keywords',
        content:
          '宣传单,宣传单设计,宣传单制作,宣传单印刷,DM单页制作,宣传单素材免费下载,在线宣传单设计,易绘创',
      },
      {
        name: 'description',
        content:
          '在线宣传单设计、宣传单页制作印刷就来易绘创（yihuichuang.com），在线宣传单模板设计，各式宣传单素材免费下载，让企业轻松实现宣传单页在线印刷的需求，让一站式宣传单、DM单页制作不是梦。',
      },
    ],
  },
  data() {
    return {
      dialogVisible: false,
      typelist: [],
      params: {
        chanpinType: '1',
        zidingyi: false,
        cailiao: '',
        num: 1,
        typeNum: 0,
        // drop: '',
        // drop2: '',
        gongyi: [],
        radio: '2',
        checkbox: false,
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
  props: ['datas', 'models', 'files'],
  components: {},
  created() {
    if (!(this.datas && JSON.stringify(this.datas) != '{}')) {
      this.cnst.danye_types.map((v, i) => {
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
}
</style>
