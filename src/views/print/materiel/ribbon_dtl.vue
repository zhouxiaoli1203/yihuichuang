<template>
  <div class='attr-operate paint-attr'>
      <!-- 绶带 -->
    <el-form label-width="100px"
             class="bgGreen">
      <el-form-item label="材料"
                    class="cailiao">
        <el-col :span="7">

          <el-select class="form-contrl width100"
                     placeholder="选择材料"
                     v-model="params.mate">
            <el-option v-for="i in cnst.ribbon_materials"
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
            <el-option v-for="i in cnst.ribbon_rules"
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
export default {
  name: 'photo-detail',
   metaInfo: {
      title: '易绘创官网-绶带|袖标 ',
      meta: [
        { name:"keywords",content:'绶带袖标,易绘创'},
        { name:"description",content:'吊旗广告设计和制作就来易绘创（yihuichuang.com），提供一站式绶带袖标设计和制作。' },
      ]
  },
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

    }
  },
  components: {},
  created() {
  },
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
