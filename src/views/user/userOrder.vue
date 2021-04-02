<template>
  <div class="main connonBg">
    <section class="center">
        <div class="crumbs">
            <span @click="pathIndex()">首页 / </span>
            <!-- <span @click="pathNews()">帮助支持 /</span> -->
            <span>订单管理</span>
        </div>
        <div class="publicCenter">
            <MenuLeft></MenuLeft> 
            <div class="contList">
              1111
            </div>

            <template>
            <!-- <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox> -->
            <div style="margin: 15px 0;"></div>
            <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
              <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
            </el-checkbox-group>
          </template>
            
                    </div>
    </section>
  </div>
</template>

<script>
 const cityOptions = ['上海', '北京', '广州', '深圳'];
  import MenuLeft from '../../components/menuLeft'
  export default {
    name: 'userOrder',
    components: {
      MenuLeft,
    },
    data () {
      return {
      checkAll: false,
        checkedCities: [],
        cities: cityOptions,
        isIndeterminate: true
      
      }
    },
    methods: {
  
      handleCheckedCitiesChange(value) {
        console.log(value)
        // let checkedCount = value.length;
        // this.checkAll = checkedCount === this.cities.length;
        // this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      }
    }
  }
</script>


<style lang="less" scoped>

</style>
