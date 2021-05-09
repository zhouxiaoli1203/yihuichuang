<template>
  <div class='attr-operate banner-attr'>
    <el-form label-width="100px"
             class="bgGreen">
      <h3 class="title">菜单定制印刷，A5/A4/A3一次性勾选菜单设计制作</h3>
      <h5 class="introl">不会设计？没时间设计？平台提供专业设计师套版设计服务，咨询客服了解详情</h5>
      <Server></Server>

      <el-form-item label="材料"
                    class="cailiao">
        <el-col :span="15">

          <el-select class="form-contrl width100"
                     placeholder="选择材料"
                     v-model="params.mate">
            <el-option v-for="i in cnst.caidanMates"
                       :label="i.name"
                       :value="i.value"
                       :key="i.value"></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="尺寸(毫米)"
                    class="rules">
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
                     v-model="params.mate">
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
                           @change="handleChange"
                           :min="1"
                           :max="10"
                           label="描述文字"></el-input-number>
        </el-col>
      </el-form-item>
      <el-form-item label="款数"
                    class="typeNum">
        <el-input-number v-model="params.typeNum"
                         @change="handleChange"
                         :min="1"
                         :max="10"></el-input-number>
      </el-form-item>
      <el-form-item label="印面">
        <span>单面</span>
      </el-form-item>
      <el-form-item label="工艺"
                    class="gongyiType mg-none">

        <el-checkbox label="折页"
                     v-model="params.model_">
        </el-checkbox>
        <el-select class="mini" v-model="params.drop" @change="changeTypes(params.drop)">
          <el-option v-for="i in cnst.danye_drop1.filter((v)=>{return v.value<6})"
                     :label="i.name"
                     :value="i.name"
                     :key="i.name"
                     ></el-option>
        </el-select>
        <el-select class="mini" v-model="params.drop2">
          <el-option v-for="i in typelist"
                     :label="i.name"
                     :value="i.value"
                     :key="i.value"></el-option>
        </el-select>
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
import Server from '@/components/servertip'
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
      zidingyi: false,
      typelist: [],
      activeName: '',

      params: {
        mate: '',
        num: 1,
        typeNum: 1,
        type: '',
        drop: '',
        drop2:"",
        radio: 2,
        model_: false,
      },
      currentVal: 1,
    }
  },
  props: ['type'],
  components: { Server },
  created() {},
  mounted() {
    console.log(this.type)
  },
  methods: {
    handleChange: function () {},
    changeBtn: function (n) {
      this.currentVal = n.value
    },
    changeTypes: function (x) {
      this.typelist = this.cnst.danye_drop1.filter( (item,i) =>{
       return item.name == x;
      })[0].drops;
      console.log(this.typelist);
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
    .rules{
        .zidingyi{
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

