<template>
<!-- 条幅 -->
  <div class='attr-operate banner-attr'>
    <el-form label-width="100px" :model="params" :rules="rules" ref="ruleForm"
             class="bgGreen">
      <el-form-item 
                    label="产品"
                    class="chanpin">
        <el-col :span="15" class="yhc-attr-btns">
          <div class="btn"
               :class='{"active":params.chanpinType == b.value}'
               v-for="b in cnst.qizhi_btns"
               @click="changeBtn(b)">{{b.name}}</div>
        </el-col>
      </el-form-item>

      <el-form-item label="材料"  v-if="params.chanpinType == 1" key="qizhi_cailiao" prop="cailiao"
                    class="cailiao">
        <el-col :span="15">
          <el-select class="form-contrl width100"
                     placeholder="选择材料"
                     v-model="params.cailiao">
            <el-option v-for="i in cnst.qizhi_materials"
                       :label="i.name"
                       :value="i.value"
                       :key="i.value"></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="材料"  v-if="params.chanpinType == 2" key="jinqi_cailiao"prop="cailiao"
                    class="cailiao">
        <el-col :span="15">
          <el-select class="form-contrl width100"
                     placeholder="选择材料"
                     v-model="params.cailiao">
            <el-option v-for="i in cnst.jinqi_materials"
                       :label="i.name"
                       :value="i.value"
                       :key="i.value"></el-option>
          </el-select>
        </el-col>
      </el-form-item>

        <el-form-item v-if="params.chanpinType == 1" key="qizhi_chicun" required
                      label="尺寸(米)"
                      class="rules_two">
          <el-col :span="6">
            <el-form-item prop="changbian">
                <el-input v-model="params.changbian"
                            placeholder="长边"></el-input>
            </el-form-item>  
            </el-col>
            <el-col class="t_a_c"
                    :span="2">×</el-col>
            <el-col :span="6" >
                <el-form-item prop="duanbian">
                    <el-input v-model="params.duanbian"
                        placeholder="短边"></el-input>
                </el-form-item>
            </el-col>
        </el-form-item>
        <el-form-item  v-if="params.chanpinType == 2" key="jinqi_chicun" prop="chicun"
                      label="尺寸(米)"
                      class="rules">
          <el-col :span="15">
            <el-select class="form-contrl width100"
                       placeholder="选择尺寸"
                       v-model="params.chicun">
              <el-option v-for="i in cnst.banner_rules_jinqi"
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
                           :min="1"></el-input-number>
        </el-col>
      </el-form-item>
      <el-form-item label="款数"
                    class="typeNum" :class='{"mg-none":params.chanpinType == 2}'>
        <el-input-number v-model="typeNumFun"
                         :min="0" disabled></el-input-number>
      </el-form-item>

        <el-form-item v-if="params.chanpinType == 1"
                      label="工艺"
                      class="gongyiType mg-none">
           <div v-for="(x,index) in cnst.qizhi_types">
            <el-checkbox :label="x.name"
                         :value="x.value"
                         name="type"
                         :key="x.value" v-model="x.checkbox" @change="checkChange(x,index)">
            </el-checkbox>
            <el-select class="mini" v-show="x.select" v-model="x.drop" @change="dropChange(x)">
              <el-option v-for="i in x.drops"
                         :label="i.name"
                         :value="i.name"
                         :key="i.value"></el-option>
            </el-select>
          </div>

            <!-- <el-checkbox-group v-model="params.gongyi">
                <el-checkbox v-for="x in cnst.qizhi_types" :label="x.name" :key="x.value" name="type">
                <span v-if="x.name == '缝筒'">{{x.name}}</span>
                <el-select class="mini" v-if="x.name == '缝筒'" v-model="params.drop" style="width:120px;margin-right:15px;">
                    <el-option v-for="i in x.drops"
                                :label="i.name"
                                :value="i.name"
                                :key="i.value"></el-option>
                    </el-select>
                </el-checkbox>
            </el-checkbox-group>           -->
        </el-form-item>
    </el-form>

  </div>
</template>

<script>
export default {
  name: 'photo-detail',
   metaInfo: {
      title: '易绘创官网-旗帜设计|旗帜制作 ',
      meta: [
        { name:"keywords",content:'旗帜设计,旗帜制作,彩旗,易绘创'},
        { name:"description",content:'旗帜和彩旗的设计及制作就来易绘创（yihuichuang.com），提供一站式旗帜和彩旗设计和制作。' },
      ]
  },
  data() {
    return {
      params: {
          chanpinType:"1",
        cailiao: '',
        changbian:"",
        duanbian:"",
        chicun:"",
        num: 1,
        typeNum: 0,
        gongyi: [],
      },
      rules:{
          cailiao: [
            { required: true, message: '请选择材料', trigger: 'change' },
          ],
          changbian: [
            { required: true,trigger: 'blur', validator:this.validateChangbian },
            // { pattern: /^[0-9.]*$/, message: '尺寸需为数字', trigger: 'blur'}
          ],
          duanbian: [
            { required: true,trigger: 'blur', validator:this.validateDuanbian },
            // { pattern: /^[0-9.]*$/, message: '尺寸需为数字', trigger: 'blur'}
          ],
          chicun: [
            { required: true, message: '请选择尺寸', trigger: 'change' },
          ],
      },
      
    }
  },
  props:["datas","files","models"],
  components: { },
  created() {
       if(!(this.datas && JSON.stringify(this.datas) !='{}')){
          this.cnst.qizhi_types.map((v, i) => {
              v.checkbox = false;
              v.drop = "";
          })
      }
  },
  mounted() {
  },
  methods: {
    handleChange: function () {},
    changeBtn: function (n) {
       this.params.chanpinType = n.value;
      this.params.cailiao="";
        this.params.changbian="";
        this.params.duanbian="";
        this.params.chicun="";
    },
    checkChange(x,ind){
        if(x.checkbox){
            let o = {name:x.name};
            if(x.drop){
                o.drop = x.drop;
            }
            this.params.gongyi.push(o);
        }else{
            this.params.gongyi = this.params.gongyi.filter(t => t.name != x.name);
        }
        console.log(this.params.gongyi,"list");
        this.$forceUpdate();
    },
    dropChange(x,e){
        let list = this.params.gongyi;
        if(x.checkbox){
            for(let i in list){
                if(list[i].name == x.name && x.drop){
                    list[i].drop = x.drop;
                }
            }
        }
        console.log(list);
        this.$forceUpdate();
    }
  },
   computed: {
      typeNumFun: {
        get(){
           return parseInt((this.files?this.files.length:0)  + (this.models?this.models.length:0));
        },
        set(v) {
            this.params.typeNum = v
        }
    },
  },
  watch:{
      datas:{
          handler(nV,oV){
              if(nV && JSON.stringify(nV) !='{}'){
                  let this_ = this;
                  this_.params = nV.attr;
                  let gy = this_.params.gongyi;
                  if(gy && gy.length>0){
                      this_.cnst.qizhi_types.map((v,i)=>{
                          let jud = false;
                          let drop = "";
                          gy.map((v_,i_)=>{
                              if(v.name == v_.name){
                                  jud = true;
                                  if(v_.drop){
                                      drop = v_.drop;
                                  }
                              }
                          });
                          if(jud){
                              v.checkbox = true;
                              v.drop = drop;
                          }
                      });
                  }
              }
          },
        //   immediate:true,
        //   deep:true
      },
      params:{
          handler(nV,oV){
              console.log(nV);
              this.$emit("detailChange",nV);
          },
          deep:true
      },
  }
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

    .rules_two {
      .el-col-6 {
        width: 148px;
      }
    }

  }
}
</style>
