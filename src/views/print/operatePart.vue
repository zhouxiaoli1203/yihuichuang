<template>
  <div class='operate-part center'>
    <div class="operate-left">
      <ul>
        <li v-for="item in datas">
              
              <div v-if="item.componentType=='el-select'">                       
                <el-option v-for="dict in item.optionValue"
                 :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue" /> 
              </div>
              <div v-if="item.componentType=='el-radio-group'">
                <el-radio v-for="dict in item.optionValue"
                   :key="dict.dictValue"
                   :label="dict.dictValue"> {{dict.dictLabel}}
                </el-radio>
              </div>
        </li>
      </ul>

    </div>

    <div class="operate-right">
      <img src=""
           alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: 'myOperate',
  data() {
    return {
      datas:[
        {title:"",componentType:"",defalutValue:"",placeholder:"",tableColumn:"areald",optionValue:[]},
        {title:"",componentType:"",defalutValue:"",placeholder:"",tableColumn:"areald",optionValue:[]},
      ]
    }
  },
  components: {},
  created() {},
  mounted() {},
  methods: {},
}
</script>
<style lang='less' scoped>
.operate-part {
  display: flex;
  justify-content: space-between;
  .operate-left {
    width: 707px;
  }
  .operate-right {
    width: 456px;
    height: 559px;
    background: #333333;
    border-radius: 8px;
  }
}
</style>
