<template>
  <div class='attr-operate banner-attr'>
    <el-form label-width="100px"
             class="bgGreen">
      <h3 class="title">高清户外喷绘布pp纸车贴</h3>
      <h5 class="introl">不会设计？没时间设计？平台提供专业设计师套版设计服务，咨询客服了解详情</h5>
      <Server></Server>

      <el-form-item v-if="type != 1"
                    label="产品"
                    class="chanpin">
        <el-col :span="15">
          <div class="btn"
               ng-class='{"active":currentVal == b.value}'
               v-for="b in btns"
               @click="changeBtn(b)">{{b.name}}</div>
        </el-col>
      </el-form-item>

      <el-form-item label="材料"
                    class="cailiao">
        <el-col :span="15">

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
      <el-form-item v-if="type == 1"
                    label="尺寸(米)"
                    class="rules">
        <el-col :span="15">
          <el-select class="form-contrl width100"
                     placeholder="选择尺寸"
                     v-model="params.mate">
            <el-option v-for="i in rules_zhanjia"
                       :label="i.name"
                       :value="i.value"
                       :key="i.value"></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <div v-if="type != 1">

        <el-form-item v-if="currentVal != 3"
                      label="尺寸(米)"
                      class="rules_two">
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
        <el-form-item v-if="currentVal == 3"
                      label="尺寸(米)"
                      class="rules">
          <el-col :span="15">
            <el-select class="form-contrl width100"
                       placeholder="选择尺寸"
                       v-model="params.mate">
              <el-option v-for="i in rules_jinqi"
                         :label="i.name"
                         :value="i.value"
                         :key="i.value"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
      </div>
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
                    class="typeNum" :class='{"mg-none":type != 1 && currentVal == 3}'>
        <el-input-number v-model="params.typeNum"
                         @change="handleChange"
                         :min="1"
                         :max="10"></el-input-number>
      </el-form-item>

      <div v-if="type == 1">
        <el-form-item label="工艺"
                      class="mg-none">
          <el-checkbox-group v-model="params.type">
            <el-checkbox v-for="x in types"
                         :label="x.name"
                         :value="x.value"
                         name="type"
                         :key="x.value"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>

      </div>
      <div v-if="type != 1">
        <el-form-item v-if="currentVal == 2"
                      label="印色">
          <el-radio-group v-model="params.radio">
            <el-radio :label="1">白色</el-radio>
            <el-radio :label="2">黄色</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="currentVal == 1 || currentVal == 2 "
                      label="工艺"
                      class="caiseType mg-none">
          <div v-for="x in types_caise">
            <el-checkbox :label="x.name"
                         :value="x.value"
                         name="type"
                         :key="x.value">
            </el-checkbox>
            <el-select v-if="x.select" v-model="params.drop">
              <el-option v-for="i in x.drops"
                         :label="i.name"
                         :value="i.value"
                         :key="i.value"></el-option>
            </el-select>
          </div>
        </el-form-item>
      </div>
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
        num: 1,
        typeNum: 1,
        type: '',
        drop:"",
        radio:2
      },
      currentVal: 1,
      btns: [
        { name: '彩色条幅', value: '1' },
        { name: '红底条幅', value: '2' },
        { name: '锦旗', value: '3' },
      ],
      materials: [
        { name: '50cm宽彩色条幅', value: '1' },
        { name: '60cm宽彩色条幅', value: '2' },
        { name: '70cm宽彩色条幅', value: '3' },
        { name: '80cm宽彩色条幅', value: '4' },
        { name: '90cm宽彩色条幅', value: '5' },
      ],
      rules_zhanjia: [
        { name: '1.6*0.6米', value: '1' },
        { name: '1.8*0.8米', value: '2' },
        { name: '2*0.8米', value: '3' },
      ],
      rules_jinqi: [
        { name: '0.4*0.6米', value: '1' },
        { name: '0.6*0.9米', value: '2' },
        { name: '0.7*1.1米', value: '3' },
        { name: '0.8*1.2米', value: '4' },
        { name: '0.9*1.5米', value: '5' },
      ],
      types: [
        { name: '覆亮膜', value: '1' },
        { name: '覆哑膜', value: '2' },
        { name: '四角打扣', value: '3' },
        { name: '高档白杆展架', value: '4' },
        { name: '门型展架', value: '5' },
        { name: '配重x展架', value: '6' },
        { name: '全铝两用x展架', value: '7' },
      ],
      types_caise: [
        { name: '打扣', value: '1', select: true ,drops:[{name:'四角打扣',value:'1'},{name:'每隔2米打一个扣',value:'2'}]},
        { name: '缝吊耳', value: '2', select: true ,drops:[{name:'缝吊耳',value:'1'},{name:'四角缝吊耳',value:'2'}]},
        { name: '缝筒', value: '3' },
        { name: '裁净边', value: '4' },
      ],
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
    .chanpin {
      .el-col {
        display: flex;
        justify-content: space-between;
        .btn {
          background: #fff;
          border: 1px solid #c8cbd6;
          &:hover,
          &.active {
            color: #476dff;
            background: #ebf0ff;
            border: 1px solid #3c63ff;
          }
        }
      }
    }
    .rules_two {
      .el-col-6 {
        width: 148px;
      }
    }
    /deep/.caiseType .el-form-item__content {
      display: flex;
      justify-content: start;
      margin-right: 20px;
      > div {
        margin-right: 20px;
      }
      .el-checkbox {
        margin-right: 3px !important;
      }
      .el-select {
        width: 72px;
        input {
          height: 24px !important;
          line-height: 24px !important;
        }
        .el-select__caret {
          height: 24px !important;
          line-height: 24px !important;
        }
      }
    }
  }
}
</style>
