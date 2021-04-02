<template>

  <div class="main">

    <div style="margin-top:20px;display:flex;justify-content:center;align-items:center">

      <el-button

        type="primary"

        @click="postData"

      >点击传参生成动态界面</el-button>

    </div>

    <div>

      <p>传递的参数dynamicData</p>

      <div>

        <p>1、按钮数据buttonData:</p>

        {{dynamicData.buttonData}}

      </div>

      <div>

        <p>2、表单数据formData:</p>

        {{dynamicData.formData}}

      </div>

      <div>

        <p>3、列表数据tableData:</p>

        {{dynamicData.tableData}}

      </div>

    </div>

  </div>

</template>

<script>

export default {
  components: {},

  data() {
    return {
      dynamicData: {
        buttonData: {
          add: true,

          export: true,

          delete: true

        },

        formData: [

            {
              tittle: "所属区域",
  
              componentType: "el-cascader",
  
              defalutValue: "",
  
              placeholder: "请输入所属区域",
  
              tableColumn: "areaId",
  
              optionValue: [
                  
                ]
  
            },
            {
              tittle: "工艺",
  
              componentType: "el-radio-group",
  
              defalutValue: "",
  
              placeholder: "",
  
              tableColumn: "",
  
              optionValue: [
                {dictValue:"1",dictLabel:"覆哑膜"},
                {dictValue:"2",dictLabel:"覆KT板"},
                {dictValue:"3",dictLabel:"覆亮膜"},]
  
            },
            {
              tittle: "款式",
  
              componentType: "el-checkbox-group",
  
              defalutValue: "",
  
              placeholder: "",
  
              tableColumn: "",
  
              optionValue: [
               {value:"1",dictLabel:"覆哑膜",name:"kuanshi1"},
                {value:"2",dictLabel:"覆KT板",name:"kuanshi2"},
                {value:"3",dictLabel:"覆亮膜",name:"kuanshi3"}]
  
            },
  

          {
            tittle: "系统级别",

            componentType: "el-select",

            defalutValue: "",

            placeholder: "请输入系统级别",

            tableColumn: "sysLevel",

            optionValue: [
                {dictValue:"浙江省",dictLabel:"1"},
                {dictValue:"安徽省",dictLabel:"2"},
                {dictValue:"江苏省",dictLabel:"3"},]

          },

          {
            tittle: "光缆名称",

            componentType: "el-input",

            defalutValue: "",

            placeholder: "请输入光缆名称",

            tableColumn: "cableName",

            optionValue: []

          },

          {
            tittle: "时间维度",

            componentType: "el-radio-group",

            defalutValue: "",

            placeholder: "请选择时间维度",

            tableColumn: "timeType",

            optionValue: []

          },

          {
            tittle: "统计时间",

            componentType: "el-date-picker",

            defalutValue: "",

            placeholder: "请选择统计时间",

            tableColumn: "countTime",

            optionValue: []

          }

        ],

 

        tableData: {
          //表单表头

          tittle: [

            {
              name: "唯一标识",

              prop: "id",

              

            },

            {
              name: "时间维度",

              prop: "timeType",

            

            },

            {
              name: "统计时间",

              prop: "mTime",

             

            },

            {
              name: "所属区域",

              prop: "areaName",

            

            },

            {
              name: "光缆级别",

              prop: "sysLevel",

              

            },

            {
              name: "光缆名称",

              prop: "cableName",

             

            },

            {
              name: "光缆可用率",

              prop: "cableUsableRate",

              

            },

            {
              name: "光缆平均衰耗",

              prop: "avgAttenuation",

             

            },

            {
              name: "光缆故障抢修时量",

              prop: "faultRepairTimeout",

             

            },

            {
              name: "光缆年百公里故障次数",

              prop: "faultTimes100",

             

            },

            {
              name: "纤芯可用率",

              prop: "fiberUsableRate",

             

            },

            {
              name: "不良纤芯占用率",

              prop: "fiberBadRate",

             

            },

            {
              name: "光缆使用年限",

              prop: "cableUseYear",

            

            },

            {
              name: "健康度分值",

              prop: "healthScore",

              

            }

          ],

          //表单内数据

          tableList: [],

          // 遮罩层

          loading: true,

          // 选中数组

          ids: [],

          //翻译

          //系统级别

          sysLevelOptions: [

            {
              dictLabel: "全网",

              dictValue: ""

            },

            {
              dictLabel: "一干",

              dictValue: "1"

            },

            {
              dictLabel: "二干",

              dictValue: "2"

            },

            {
              dictLabel: "本地",

              dictValue: "3"

            }

          ],

          //时间维度

          timeTypeOptions: [

            {
              dictLabel: "年",

              dictValue: "y"

            },

            {
              dictLabel: "月",

              dictValue: "m"

            },

            {
              dictLabel: "日",

              dictValue: "d"

            }

          ],

          total:0,

          //接口相关

          interfaces: {
            searchList: {
              url: "/indic/health/list",

              method: "get"

            },

            searchOne:{
              url: "/indic/health/",

              method: "get" 

            },

            add: {
              url: "/indic/health",

              method: "post"

            },

            delete: {
              url: "/indic/health/",

              method: "delete"

            },

            update: {
              url: "/indic/health",

              method: "put" 

            },

            export:{
              url: "/indic/health/export",

              method: "get"

            }

 

          }

        },

 

        addFormData: [

          {
            tittle: "光缆名称",

            componentType: "el-input",

            defalutValue: "",

            placeholder: "请输入光缆名称",

            tableColumn: "cableName",

            optionValue: []

          },

          {
            tittle: "光缆可用率(%)",

            componentType: "el-input",

            defalutValue: "",

            placeholder: "请输入光缆可用率(%)",

            tableColumn: "cableUsableRate",

            optionValue: [],

          },

          {
            tittle: "光缆平均衰耗(dB/Km)",

            componentType: "el-input",

            defalutValue: "",

            placeholder: "请输入光缆平均衰耗(dB/Km)",

            tableColumn: "avgAttenuation",

            optionValue: []

          },

          {
            tittle: "光缆故障抢修超时量(次)",

            componentType: "el-input",

            defalutValue: "",

            placeholder: "请输入光缆故障抢修超时量(次)",

            tableColumn: "faultRepairTimeout",

            optionValue: []

          },

          {
            tittle: "光缆年百公里故障次数",

            componentType: "el-input",

            defalutValue: "",

            placeholder: "请输入光缆年百公里故障次数",

            tableColumn: "faultTimes100",

            optionValue: []

          },

          {
            tittle: "纤芯可用率(%)",

            componentType: "el-input",

            defalutValue: "",

            placeholder: "请输入纤芯可用率(%)",

            tableColumn: "fiberUsableRate",

            optionValue: []

          },

          {
            tittle: "不良纤芯占用率(%)",

            componentType: "el-input",

            defalutValue: "",

            placeholder: "请输入不良纤芯占用率(%)",

            tableColumn: "fiberBadRate",

            optionValue: []

          },

           {
            tittle: "光缆使用年限(年)",

            componentType: "el-input",

            defalutValue: "",

            placeholder: "请输入光缆使用年限(年)",

            tableColumn: "cableUseYear",

            optionValue: []

          },

           {
            tittle: "健康度分值",

            componentType: "el-input",

            defalutValue: "",

            placeholder: "请输入健康度分值",

            tableColumn: "healthScore",

            optionValue: []

          },

          

        ],

        addData: {
          tittle: "添加故障工单",

          open:false

        }

      }

    };

  },

  mounted() {
 

  },

  methods: {
  


 

    //向动态页面传递数据

    postData() {
      console.log("传递参数");

      this.$router.push({
        path: "./dynamicIndex",

        query: { data: JSON.stringify(this.dynamicData) }

      });

    }

  }

};

</script>

<style lang="less" scoped>

</style>
