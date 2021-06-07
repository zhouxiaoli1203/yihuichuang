<template>
  <div class="main connonBg">
    <section class="center">
        <div class="crumbsHeader">
          <div class="crumbs">
            <router-link to="/"><span>首页 / </span></router-link>
            <span>订单管理</span>
          </div>
          <div class="operateBox">
            <div class="xuanZe">
                <div class="state">
                    <el-select v-model="value" placeholder="全部状态">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                </div>
                <div class="block">
                  <el-date-picker
                    v-model="dataTime"
                    type="daterange"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :default-time="['00:00:00', '23:59:59']">
                  </el-date-picker>
                </div>
            </div>
            <div class="input">
              <div class="inputInner">
                  <i class="el-icon-search"></i>
                  <input type="text" v-model="searchValue" placeholder="请输入内容"  @keyup.enter="searchBtn($event)">
              </div>
              <el-button type="primary" @click="searchBtn">搜索</el-button>
            </div>
          </div>  
        </div>
        
        <div class="publicCenter">
            <MenuLeft></MenuLeft> 
            <div class="contList">
              <div class="tabBox">
                <table border = "1" class="tableBox"  width="100%">
                  <tbody>
                    <tr>
                      <th>订单号</th>
                      <th>订单状态</th>
                      <th>商品信息</th>
                      <th>材质</th>
                      <th>类型</th>
                      <th>尺寸</th>
                      <th>数量</th>
                      <th>印刷价格</th>
                      <th>支付时间</th>
                      <th>支付方式</th>
                      <th>支付金额</th>
                      <th>配方方式</th>
                      <th>快递单号</th>
                      <th>操作</th>
                    </tr>
                    <tr>
                      <td>12245678945522</td>
                      <td>已支付</td>
                      <td>
                        <div class="goodImg">
                          <div class="img">
                            <img src="" alt="">
                            <i class="el-icon-zoom-in"></i>
                          </div>
                          <span>商业海报信息</span>
                        </div>
                      </td>
                      <td>pvc/kT板</td>
                      <td>展板/海报</td>
                      <td>201米*300米</td>
                      <td>1001</td>
                      <td>100/张</td>
                      <td>2021.02.10</td>
                      <td>微信</td>
                      <td>1000.00</td>
                      <td>快递</td>
                      <td>15285422552112521</td>
                      <td class="btns">
                        <span>取消订单</span>
                        <span>再来一单</span>
                      </td>
                    </tr>
                     <tr>
                      <td>12245678945522</td>
                      <td>已支付</td>
                      <td>
                        <div class="goodImg">
                          <div class="img">
                            <img src="" alt="">
                            <i class="el-icon-zoom-in"></i>
                          </div>
                          <span>商业海报信息</span>
                        </div>
                      </td>
                      <td>pvc/kT板</td>
                      <td>展板/海报/ss/ld/dhd/dd/dddd</td>
                      <td>201米*300米</td>
                      <td>1001</td>
                      <td>100/张</td>
                      <td>2021.02.10</td>
                      <td>微信</td>
                      <td>1000.00</td>
                      <td>快递</td>
                      <td>15285422552112521</td>
                      <td class="btns">
                        <span>取消订单</span>
                        <span>再来一单</span>
                      </td>
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
  </div>
</template>

<script>
  import MenuLeft from '../../components/menuLeft'
  export default {
    name: 'userOrder',
    components: {
      MenuLeft,
    },
    data () {
      return {     
        options: [
          {
            value: '选项1',
            label: '制作中'
          }, 
          {
            value: '选项2',
            label: '已支付'
          }, 
          {
            value: '选项3',
            label: '已退款'
          }, 
          {
            value: '选项4',
            label: '已提货'
          }
        ],
        searchValue: '' ,
        dataTime:'',
        value:''
      }
    },
    methods: {
      // 点击搜索
      searchBtn(e){
        let val = this.searchValue
        if(val=='') return 
      },
    }
  }
</script>


<style lang="less" scoped>
.crumbsHeader{
  justify-content: space-between;

  .operateBox{
    width: 976px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .xuanZe{
      display: flex;
      align-items: center;

      .state{
        margin-right: 16px;
        width: 120px;
      }
    }
  }
}
.contList{
  padding: 24px;
  position: relative;
}
.tabBox{
  width: 100%;
  overflow-x: scroll;
  table{
    width: 1800px;

    th{
      height: 35px;
      line-height: 35px;
      text-align: center;
    }

    td{
      height: 35px;
      text-align: center;
      max-width: 300px;
    }

    .goodImg{
      display: flex;
      align-items: center;
      justify-content: center;

      .img{
        position: relative;
        width: 30px;
        height: 30px;
        margin-right: 8px;
        cursor: pointer;
      }

      img{
        width: 30px;
        height: 30px;
      }

      i{
        position: absolute;
        bottom: 0;
        right: 0;
        font-size: 16px;
      }
    }
    .btns{
      span{
        cursor: pointer;
        display: inline-block;
      }

      span:last-child{
        color: #4E9F5B;
        margin-left: 8px;
      }
    }
  }
}

.input{
  display: flex;
  align-items: center;
  background: #fff;
  border: none;
  border-radius:5px;
  overflow: hidden;

  .inputInner{
    display: flex;
    align-items: center;
    flex: 1;
    padding-left: 20px;
    input{
      flex: 1;
      height: 100%;
      margin-left: 8px;
    }
  }
}


.el-button{
  border-radius: 0;
  width: 56px;
  padding: 12px 0;
}

 .el-button--primary{
    background-color: #4E9F5B;
    border-color: #4E9F5B;
  }

</style>
