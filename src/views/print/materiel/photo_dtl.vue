<template>
  <div class='attr-operate photo-attr'>
    <el-form label-width="100px"
             class="bgGreen">
      <!-- <div class="bgGreen"> -->
      <h3 class="title">高清广告海报户内(外)写真KT板/PVC板</h3>
      <h5 class="introl">不会设计？没时间设计？平台提供专业设计师套版设计服务，咨询客服了解详情</h5>
      <Server></Server>
      <el-form-item label="产品"
                    class="chanpin">
        <el-col :span="14" class="yhc-attr-btns">
          <div class="btn"
               :class='{"active":currentVal == b.value}'
               v-for="b in btns"
               @click="changeBtn(b)">{{b.name}}</div>
        </el-col>
      </el-form-item>
      <el-form-item label="材料"
                    class="cailiao">
        <el-col :span="14">

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
      currentVal: 1,
      materials: this.cnst.photo_ot_xiezhen,
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
      btns: [
        { name: '户外写真', value: '1' },
        { name: '户内写真', value: '2' },
      ],
    }
  },
  components: { Server },
  created() {},
  mounted() {},
  methods: {
    handleChange: function () {},
    changeBtn: function (n) {
      this.currentVal = n.value;
      this.materials =
        n.value == 1 ? this.cnst.photo_ot_xiezhen : this.cnst.photo_in_xiezhen
    },
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
  .yhc-attr-btns{
      .btn{
          width: 160px;
      }
  }
}
</style>
