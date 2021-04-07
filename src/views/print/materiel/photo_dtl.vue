<template>
  <div class='attr-operate photo-attr'>
    <el-form label-width="100px"
             class="bgGreen">
      <!-- <div class="bgGreen"> -->
      <h3 class="title">高清广告海报户内(外)写真KT板/PVC板</h3>
      <h5 class="introl">不会设计？没时间设计？平台提供专业设计师套版设计服务，咨询客服了解详情</h5>
      <Server></Server>

      <el-form-item label="写真"
                    class="xiezhen">

        <el-select class="form-contrl"
                   placeholder="户外写真"
                   v-model="params.outer">
          <el-option v-for="i in outer"
                     :label="i.name"
                     :value="i.value"
                     :key="i.value"></el-option>
        </el-select>
        <el-select class="form-contrl"
                   placeholder="户内写真"
                   v-model="params.inner">
          <el-option v-for="i in inner"
                     :label="i.name"
                     :value="i.value"
                     :key="i.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="材料"
                    class="cailiao">
        <el-col :span="14">

          <el-select class="form-contrl width100"
                     placeholder="选择材料"
                     v-model="params.mate">
            <el-option v-for="i in outer"
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

      <!-- </div> -->
      <!-- <div class="bgGreen_"> -->
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
          <el-checkbox label="覆亮膜"
                       name="type"></el-checkbox>
          <el-checkbox label="覆哑膜"
                       name="type"></el-checkbox>
          <el-checkbox label="覆KT板"
                       name="type"></el-checkbox>
          <el-checkbox label="覆PVC板"
                       name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <!-- </div> -->
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
        inner: '',
        outer: '',
        mate: '',
        num: 1,
        typeNum: 1,
        type: '',
      },

      innerValue: '',
      outerValue: '',
      inner: [
        { name: '户内背胶', value: '1' },
        { name: '户内高光相纸', value: '2' },
        { name: '户内海报(不带胶)', value: '3' },
        { name: '户内背喷灯片', value: '4' },
        { name: '户内写真布', value: '5' },
        { name: '户内银背', value: '6' },
        { name: '户内PVC硬片', value: '7' },
      ],
      outer: [
        { name: '户外背胶', value: '1' },
        { name: '白胶车贴', value: '2' },
        { name: '黑胶车贴', value: '3' },
        { name: '户外单透贴', value: '4' },
        { name: '户外相纸', value: '5' },
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
    //   width: 627px;
    width: 100%;
  }
  .xiezhen {
    .form-contrl {
      width: 166px;
    }
  }
  .cailiao {
  }
}
</style>
