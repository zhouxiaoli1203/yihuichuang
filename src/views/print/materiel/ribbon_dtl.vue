<template>
  <div class='attr-operate paint-attr'>
    <el-form label-width="100px"
             class="bgGreen">
      <h3 class="title">高清户外喷绘布pp纸车贴</h3>
      <h5 class="introl">不会设计？没时间设计？平台提供专业设计师套版设计服务，咨询客服了解详情</h5>
      <Server></Server>
      <el-form-item label="材料"
                    class="cailiao">
        <el-col :span="7">

          <el-select class="form-contrl width100"
                     placeholder="选择材料"
                     v-model="params.mate">
            <el-option v-for="i in materials"
                       :label="i.name"
                       :value="i.value"
                       :key="i.value"></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="尺寸(米)"
                    class="rules">
        <el-col :span="7">

          <el-select class="form-contrl width100"
                     placeholder="选择材料"
                     v-model="params.rule">
            <el-option v-for="i in rules"
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
                    class="typeNum mg-none">
        <el-input-number v-model="params.typeNum"
                         @change="handleChange"
                         :min="1"
                         :max="10"></el-input-number>
      </el-form-item>

    </el-form>

  </div>
</template>

<script>
import Server from '@/components/servertip'
export default {
  name: 'photo-detail',
  data() {
    return {
      activeName: '',

      params: {
        mate: '',
        rule:'',
        num: 1,
        typeNum: 1,
        type: '',
      },
      materials:[
          {name:'缎面绶带',value:"1"},
          {name:'发泡绶带',value:"2"},
          {name:'高档发泡锦旗',value:"3"},
          {name:'高档镀金锦旗',value:"4"},
      ],
      rules:[
          {name:'1.8*0.13米',value:"1"},
      ],

    }
  },
  components: { Server },
  created() {},
  mounted() {},
  methods: {
    handleChange: function () {},
  },
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
