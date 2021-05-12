<template>
  <div class='attr-operate ribbon-attr'>
    <el-form label-width="100px"
             class="bgGreen">
      <el-form-item label="材料"
                    class="cailiao">
        <el-col :span="6">

          <el-select class="form-contrl width100"
                     placeholder="选择材料"
                     v-model="params.mate">
            <el-option v-for="i in cnst.paint_materials"
                       :label="i.name"
                       :value="i.value"
                       :key="i.value"></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="尺寸(米)"
                    class="rules">
        <el-col :span="6">
          <el-input v-model="params.rule"
                    placeholder="长边"></el-input>
        </el-col>
        <el-col class="t_a_c"
                :span="2">×</el-col>
        <el-col :span="6">
          <el-input v-model="params.rule"
                    placeholder="短边"></el-input>
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
      <el-form-item label="工艺"
                    class="mg-none">
        <el-checkbox-group v-model="params.type">
          <el-checkbox v-for="x in cnst.paint_types" :label="x.name" :value="x.value"
                       name="type" :key="x.value"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>

    </el-form>

  </div>
</template>

<script>
export default {
  name: 'photo-detail',
   metaInfo: {
      title: '易绘创官网-高清室外喷绘布 ',
      meta: [
        { name:"keywords",content:'喷绘写真,室外喷绘,易绘创'},
        { name:"description",content:'室外喷绘布的设计和制作就来易绘创（yihuichuang.com），提供一站式喷绘写真和室外喷绘设计和制作。' },
      ]
  },
  data() {
    return {
      activeName: '',

      params: {
        mate: '',
        num: 1,
        typeNum: 1,
        type: '',
      },

    }
  },
  components: {},
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
