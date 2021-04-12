<template>
  <div class="main connonBg">
    <section class="center">
        <div class="crumbsHeader">
          <div class="crumbs">
              <span @click="pathIndex()">首页 / </span>
              <span @click="pathNews()">文件打印 /</span>
              <span>文件</span>
          </div>
          <div class="operateBox">
            <div class="downBox">
              <el-dropdown trigger="click" @command="handleCommand">
                <span>编辑</span>
                <i class="el-icon-arrow-down el-icon-caret-bottom"></i>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="重命名">重命名</el-dropdown-item>
                  <el-dropdown-item command="删除">删除</el-dropdown-item>
                  <el-dropdown-item command="打印">打印</el-dropdown-item>
                  <el-dropdown-item command="下载">下载</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <span class="add" @click="selectAll" v-if="checkAll==false">全选</span>
            <span class="add" @click="notatAll" v-if="checkAll==true">全不选</span>
          </div>
        </div>

        <!-- <div>时间</div> -->
        <div class="publicCenter">
            <MenuLeft></MenuLeft> 
            <div class="contList">
              <div class="fileTitle">
                <span>文件名</span>
                <span>大小</span>
                <span>日期</span>
              </div>
              <div class="checkboxBox">
                <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                  <el-checkbox v-for="(item,i) in flileList" :label="item.val" :key="i">
                    <div class="info">
                      <img :src="file1" alt="">
                      <p>{{item.tit}}</p>
                    </div>
                    <span class="kb">{{item.kb}}KB</span>
                    <p class="time">{{item.time}}</p>
                  </el-checkbox>
                </el-checkbox-group>
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
  </div>
</template>

<script>
  import MenuLeft from '../../components/menuLeft'
  export default {
    name: 'userFiledown',
    components: {
      MenuLeft,
    },
    data () {
      return {
        file1: require('../../assets/img/user/file1.png'), 
        //全选
        checkAll: false,
        flileList: [
          {
            "tit":"打不死的是信念，绕不开的是变化",
            "kb":"928",
            "time":"2006-10-16 20:22:22",
            "val":"张",
          },
          {
            "tit":"打不死的是信念，绕不开的是变化",
            "kb":"245",
            "time":"2006-10-16 20:22:22",
            "val":"李",
          },
        ], //数据源
        checkedCities:[], //绑定默认选中
      }
    },
    methods: {
      selectAll() {
        this.flileList.forEach(item=>{  //当全选被选中的时候，循环遍历源数据，把数据的每一项加入到默认选中的数组去
          this.checkedCities.push(item.val)
        })
        this.checkAll = true
      },
      notatAll() {
        this.checkedCities = [];
        this.checkAll = false
      },
      // checkbox选中 --- 当绑定值变化时触发的事件
      handleCheckedCitiesChange(value) {
        console.log(value)
        let checkedCount = value.length;   //选中值的长度
        this.checkAll = checkedCount === this.flileList.length;  //如果选中值的长度和源数据的长度一样，返回true，就表示你已经选中了全部checkbox，那么就把true赋值给this.checkAll
      },
      pathNews(){
        this.$router.replace("/user/userFile");
      },
      handleCommand(command) {
        this.$message('click on item ' + command);
      },
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

.operateBox{
  display: flex;
  align-items: center;
  .downBox{
    border-radius: 4px;
    border: 1px solid #CBCFE3;
    width: 86px;
    padding: 9px 0;
    background: #FFFFFF;
    text-align: center;
    margin-right: 54px;
  }
}
.contList{
  position: relative;
}
.fileTitle{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 24px 24px 52px;
  border-bottom: 1px solid #F5F6FA;
  span:first-child{
    width: 60%;
  }
  span:nth-child(2){
    width: 20%;
  }
  span:last-child{
    width: 20%;
    text-align: right;
  }
}
.checkboxBox{
  label{
    width: 100%;
    display: flex;
    align-items: center;
    height: 40px;
    border-bottom: 1px solid #F5F6FA;
    padding: 0 24px
  }
  .info{
    display: flex;
    align-items: center;
    width: 60%;
    img{
      width: 28px;
      height: 28px;
      margin-right: 24px;
    }
  }
  .kb{
    width: 20%;
  }
  .time{
    width: 20%;
    text-align: right;
  }
  .kb, .time{
    color: #666;
    font-size: 12px;
  }
}


</style>
