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
               v-for="b in cnst.banner_btns"
               @click="changeBtn(b)">{{b.name}}</div>
        </el-col>
      </el-form-item>

      <el-form-item label="材料" prop="cailiao"
                    class="cailiao">
        <el-col :span="15">

          <el-select class="form-contrl width100"
                     placeholder="选择材料"
                     v-model="params.cailiao">
            <el-option v-for="i in materials"
                       :label="i.name"
                       :value="i.value"
                       :key="i.value"></el-option>
          </el-select>
        </el-col>
      </el-form-item>

        <el-form-item v-if="params.chanpinType != 3" key="shuru_rule" required
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
        <el-form-item v-if="params.chanpinType == 3" key="select_rule" prop="chicun"
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
                    class="typeNum" :class='{"mg-none":params.chanpinType == 3}'>
        <el-input-number v-model="typeNumFun"
                         :min="0" disabled></el-input-number>
      </el-form-item>

        <el-form-item v-if="params.chanpinType == 2"
                      label="印色">
          <el-radio-group v-model="params.radio">
            <el-radio label="1">白色</el-radio>
            <el-radio label="2">黄色</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="params.chanpinType == 1 || params.chanpinType == 2 "
                      label="工艺"
                      class="gongyiType mg-none">
            <!-- <el-checkbox-group v-model="params.gongyi">
                <el-checkbox v-for="(x,index) in cnst.banner_types_caise" :label="x.name" :key="x.value" name="type">
                <span v-if="x.select">{{x.name}}</span>
                <el-select class="mini" v-if="x.select" v-model="x.drop"style="width:120px;margin-right:15px;">
                    <el-option v-for="i in x.drops"
                                :label="i.name"
                                :value="i.value"
                                :key="i.value"></el-option>
                    </el-select>
                </el-checkbox>
            </el-checkbox-group>  -->
          <div v-for="(x,index) in cnst.banner_types_caise">
            <el-checkbox :label="x.name"
                         :value="x.value"
                         name="type"
                         :key="x.value" v-model="x.checkbox" @change="checkChange(x,index)">
            </el-checkbox>
            <el-select class="mini" v-show="x.select" v-model="x.drop" @change="dropChange(x,$event)" placeholder="类型">
              <el-option v-for="i in x.drops"
                         :label="i.name"
                         :value="i.name"
                         :key="i.value"></el-option>
            </el-select>
          </div>
        </el-form-item>
    </el-form>

  </div>
</template>

<script>
export default {
  name: 'photo-detail',
   metaInfo: {
      title: '易绘创官网-制作横幅|加工条幅 ',
      meta: [
        { name:"keywords",content:'横幅,条幅,彩色横幅,彩色条幅,条幅定制,横幅加工,锦旗,易绘创'},
        { name:"description",content:'横幅条幅设计及制作就来易绘创（yihuichuang.com），提供一站式条幅横幅设计和制作，价格合理。' },
      ]
  },
  data() {
    return {
        materials:this.cnst.banner_materials,
      params: {
         chanpinType:"1",
        cailiao: '',
        changbian:"",
        duanbian:"",
        chicun:"",
        num: 1,
        typeNum: 0,
        radio:"2",
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
          this.cnst.banner_types_caise.map((v, i) => {
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
      this.materials = this.params.chanpinType == 3?this.cnst.jinqi_materials:this.cnst.banner_materials;
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
                  this.params = nV.attr;
                   this.materials = this.params.chanpinType == 3?this.cnst.jinqi_materials:this.cnst.banner_materials;
                   let gy = nV.attr.gongyi;
                  this_.cnst.banner_types_caise.map((v)=>{
                      let jud = false;
                      let dp = "";
                        gy.map((v_)=>{
                            if(v.name == v_.name){
                                jud = true;
                                dp = v_.drop?v_.drop:"";
                            }
                        });
                      if(jud){
                          this_.$set(v,"checkbox",true);
                          this_.$set(v,"drop",dp);
                      }
                  });
              }
          },
        //   immediate:true,
        //   deep:true
      },
      params:{
          handler(nV,oV){
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
