<template>
  <div class="main connonBg">
    <section class="center">
        <div class="crumbsHeader">
          <div class="crumbs">
              <span @click="pathIndex()">首页 / </span>
              <!-- <span @click="pathNews()">帮助支持 /</span> -->
              <span>收货地址</span>
          </div>
          <div class="operateBox">
            <span class="add" @click="addAreaBox = true">添加</span>
          </div>
        </div>
        <div class="publicCenter">
            <MenuLeft></MenuLeft> 
            <div class="contList">
              <div class="notice">
                <img :src="notice" alt="">
                <p>已保存9条地址，还能保存9条地址</p>
              </div>
              <div class="tabBox">
                <table border = "1" class="tableBox"  width="100%">
                  <tbody>
                    <tr>
                      <th>收货人</th>
                      <th>所在地区</th>
                      <th>详细地址</th>
                      <th>邮编</th>
                      <th>电话/手机</th>
                      <th>操作</th>
                      <th></th>
                    </tr>
                    <tr>
                      <td>张三三上哪</td>
                      <td>安徽省  淮北市  相山区  去阳街道</td>
                      <td>环潭明珠  三期北区  22栋1121</td>
                      <td>235000</td>
                      <td>12321212222</td>
                      <td class="btns">
                        <span>修改</span>
                        <span>删除</span>
                      </td>
                      <td class="default">
                        <span>默认地址</span>
                      </td>
                    </tr>
                    <tr>
                      <td>张三三上哪</td>
                      <td>安徽省  淮北市  相山区  去阳街道</td>
                      <td>环潭明珠  三期北区  22栋1121</td>
                      <td>235000</td>
                      <td>12321212222</td>
                      <td class="btns">
                        <span>修改</span>
                        <span>删除</span>
                      </td>
                      <td class="cursor_p">设为默认地址</td>
                    </tr>
                  </tbody>   
                </table>
              </div>
              <div class="paging">
                  <el-pagination
                      background
                      layout="prev, pager, next"
                      :total="1000">
                  </el-pagination>
                </div>
            </div>
        </div>
    </section>


    <section class="addAreaBox publicPorp" v-show="addAreaBox">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="地址信息">
          <el-cascader class="width100"
                      size="large"
                      :options="options"
                      placeholder="请选择省市区"
                      @change="cityChange">
          </el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" prop="desc">
          <el-input type="textarea" v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <el-form-item label="邮政编码">
          <el-input type="input"></el-input>
        </el-form-item>
        <el-form-item label="收货姓名" prop="name">
          <el-input type="input" v-model="ruleForm.name"></el-input>
        </el-form-item>

        <el-form-item label="手机号" prop="phone">
          <el-col :span="12">
            <el-select placeholder="请选择" @change="changes">
              <el-option label="中国大陆+86" value="shanghai"></el-option>
              <el-option label="其他" value="beijing"></el-option>
            </el-select>
          </el-col>
          <el-col class="line" :span="12">
            <el-input type="input" v-model="ruleForm.phone"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="是否默认" prop="delivery">
          <el-switch v-model="ruleForm.delivery"></el-switch>
        </el-form-item>
        <div class="btnBox">
          <span @click="closePorp">取消</span>
          <span  @click="submitForm('ruleForm')">保存</span>
        </div>
      </el-form>
    </section>
    <div class="mask" v-show="addAreaBox" @click="closePorp"></div>
  </div>
</template>

<script>
  import MenuLeft from '../../components/menuLeft'
  import { regionData } from 'element-china-area-data'
  export default {
    name: 'userAddress',
    components: {
      MenuLeft,
    },
    data () {
      return {     
        notice: require('../../assets/img/user/notice.png'), 
        options: regionData,
        addAreaBox:false,
        ruleForm: {
          name: '',
          delivery: false,
          desc: '',
          phone:'',
        },
        rules: {
          name: [
            { required: true, message: '请输入收货姓名', trigger: 'blur' },
            { min: 22, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入手机号', trigger: 'blur' }
          ],
          desc: [
            { required: true, message: '请填写详细地址', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      submitForm(formName) { //地址提交
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      closePorp() { //关闭弹框
        this.addAreaBox=false;
      },
      cityChange(val){ //选择收货地址
        console.log(val)
      },
      changes(val){ //选择号码归属地
        console.log(val)
      }
      
    }
  }
</script>


<style lang="less" scoped>
.crumbsHeader{
  justify-content: space-between;
  .add{
    width: 102px;
    height: 34px;
    background: #4E9F5B;
    border-radius: 4px;
    display: inline-block;
    text-align: center;
    line-height: 34px;
    color: #fff;
    cursor: pointer;
  }
}
.contList{
  padding: 24px;
  position: relative;
}
.notice{
  background: rgba(78, 159, 91, 0.1);
  display: flex;
  align-items: center;
  height: 40px;
  padding-left: 16px;
  margin-bottom: 32px;
  img{
    width: 22px;
    height: 22px;
  }
  p{
    color: #4E9F5B;
    font-size: 14px;
    margin-left: 16px;
  }
}
.tabBox{
  width: 100%;
  table{
    th{
      height: 41px;
      line-height: 41px;
      text-align: center;
      background: #F5F6FA;
    }

    td{
      height: 45px;
      text-align: center;
      color: #333;
    }

    .default{
      span{
        color: #4E9F5B;
        width: 84px;
        height: 34px;
        background: rgba(78, 159, 91, 0.1);
        border-radius: 4px;
        border: 1px solid #4E9F5B;
        text-align: center;
        line-height: 34px;
        display: inline-block;
      }
    }
    .btns{
      span{
        cursor: pointer;
        display: inline-block;
      }

      span:last-child{
        margin-left: 4px;
        border-left: 1px solid #666;
        padding-left: 8px;
      }
    }
  }
}

// 地址弹框
.addAreaBox{
  padding: 24px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  width: 559px;
  background: #FFFFFF;
  border-radius: 8px;
  overflow: hidden;
  min-height: 400px;
  min-width: 570px;
  z-index: 113;


  .btnBox{
    display: flex;
    align-items: center;
    justify-content: center;

    span{
      width: 85px;
      height: 34px;
      border-radius: 4px;
      color: #fff;
      text-align: center;
      line-height: 34px;
      cursor: pointer;
    }
    span:first-child{
      background: #DBDBDB;
      margin-right: 24px;
    }
    span:last-child{
      background: #4E9F5B;
    }
    
  }
  
}
</style>
