<template>

 <div class="operate-part center"> 
      <div class="operate-left">
         <div>{{title}}</div>
         <el-form :model="form" ref="form"  :rules="rules" label-width="180px"> 

              <el-form-item  v-for="(item,index) in addFormData" :label="item.tittle" :key="index"> 

                    <div 

                    :is="item.componentType" 

                    v-model="item.defalutValue"                

                    :placeholder="item.placeholder" 

                    clearable

                    :options="item.optionValue"

                    :props="{value: 'code',label: 'name',children: 'children', checkStrictly: true, expandTrigger: 'hover' }"

                    value-format="yyyy-MM-dd"

                    > 

                        <div v-if="item.componentType=='el-select'">

                            <el-option

                            v-for="dict in item.optionValue"

                            :key="dict.dictValue"

                            :label="dict.dictLabel"

                            :value="dict.dictValue"

                            /> 

                        </div>

                         <div v-if="item.componentType=='el-radio-group'">

                            <el-radio

                            v-for="dict in item.optionValue"

                            :key="dict.dictValue"

                            :label="dict.dictLabel"

                            >{{dict.dictLabel}}

                            </el-radio> 

                        </div>    
                         <div v-if="item.componentType=='el-checkbox-group'">

                            <el-checkbox

                            v-for="(dict,index) in item.optionValue"

                            
                            :key="dict.dictLabel"
                            :label="dict.dictLabel"
                            :name="dict.name"
                            
                            >{{dict.dictLabel}}

                            </el-checkbox> 

                        </div>    

                    </div>

               </el-form-item>

         </el-form>
        </div>
        <div class="operate-right">
          <img src="" alt="">
        </div>
<!--  <div :style="{'width':ifWidth}">  -->
<!--     <el-dialog :title="title" :visible.sync="show" width="600px">-->

       <!-- <div slot="footer" class="dialog-footer">

            <el-button type="primary" @click="submitForm">确 定</el-button>

            <el-button @click="cancel">取 消</el-button>

        </div>

  </el-dialog> -->

   </div> 

</template>

<script>

export default {
  name:"myComponent",
    props:{
        ifWidth:{
            type:String,

            default:'100%'

         }, 

        addFormData: {
            type:Array,

            default:() => {
             return []

           }

        },

        title:{
            type:String,

            default:''

        },

        handleType:{
            type:String,

            default:''

        },

        show:{ // 是否显示弹出层

            type:Boolean,

            default:false

        }

    },

 components: {
   

 },

 data(){
     return{
         areaTree:[],

         sysLevelOptions:[],

         timeTypeOptions:[],

         form:{},

         rules: {},

     };

 },

 mounted(){},

 watch:{
      show:{    

        handler(newValue,oldValue) {},  

        deep: true 

      },

      tittle(newValue,oldValue){  //弹出框标题

        // console.log(newValue, oldValue)

        this.tittle = newValue

      },

    //   handleType(newValue,oldValue){ //

    //     this.handleType = newValue

    //   },

      addFormData(newValue,oldValue){ //表单数据

          deep: true    

      }

 },

 created(){
 },

 methods:{
   
    submitForm: function() {
        console.log('点击确定')

        this.$refs["form"].validate(valid => {
            if (valid) {
                this.$emit('submit',this.addFormData)

            }

        });

    },

    cancel() {
        this.$emit('cancel')

        this.reset();

    },

    reset() {
        this.form = {};

        this.resetForm("form"); 

    },

 },

 

 }

</script>

<style lang="less" scoped>
.operate-part{
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