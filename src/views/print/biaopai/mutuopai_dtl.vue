
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
            <el-option v-for="i in cnst.paiziMates"
                       :label="i.name"
                       :value="i.value"
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
            <el-option v-for="i in cnst.paiziRules"
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
        <div v-for="(x,index) in cnst.mutuo_types">
          <el-checkbox :label="x.name"
                       :value="x.value"
                       name="type"
                       :key="x.value"
                       v-model="x.checkbox"
                       @change="checkChange(x,index)">
          </el-checkbox>
          <el-select class="mini"
                     v-show="x.select"
                     v-model="x.drop"
                     @change="dropChange(x,$event)"
                     placeholder="类型">
            <el-option v-for="i in x.drops"
                       :label="i.name"
                       :value="i.name"
                       :key="i.value"></el-option>
          </el-select>
        </div>
        <!-- <el-checkbox label="款式"
                     v-model="params.checkbox">
        </el-checkbox>
        <el-select class="mini" v-model="params.drop">
          <el-option v-for="i in cnst.paiziType"
                     :label="i.name"
                     :value="i.name"
                     :key="i.name"
                     ></el-option>
        </el-select> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'photo-detail',
  metaInfo: {
    title:
      '易绘创官网-木托授权牌|定制木托授权牌|木托授权牌加工|木托授权牌制作|木托授权牌设计',
    meta: [
      {
        name: 'keywords',
        content:
          '木托授权牌,定制木托授权牌,木托授权牌加工,木托授权牌制作,木托授权牌设计,易绘创',
      },
      {
        name: 'description',
        content:
          '定制木托授权牌就来易绘创（yihuichuang.com），提供一站式木托授权牌报价 ，快速制作加工木托授权牌。',
      },
    ],
  },
  data() {
    return {
      dialogVisible: false,
      params: {
        chanpinType: '1',
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
  props: ['datas', 'files', 'models'],
  components: {},
  created() {
    if (!(this.datas && JSON.stringify(this.datas) != '{}')) {
      this.cnst.mutuo_types.map((v, i) => {
        v.checkbox = false
        v.drop = ''
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
    checkChange(x, ind) {
      if (x.checkbox) {
        let o = { name: x.name }
        if (x.drop) {
          o.drop = x.drop
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
  },
  computed: {
    typeNumFun: {
      get() {
        return parseInt(
          (this.files ? this.files.length : 0) +
            (this.models ? this.models.length : 0)
        )
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
            this_.cnst.mutuo_types.map((v, i) => {
              let jud = false
              let drop = ''
              gy.map((v_, i_) => {
                if (v.name == v_.name) {
                  jud = true
                  if (v_.drop) {
                    drop = v_.drop
                  }
                }
              })
              if (jud) {
                v.checkbox = true
                v.drop = drop
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

