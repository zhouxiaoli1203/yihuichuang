<template>
  <div class="main connonBg">
    <section class="center">
        <div class="crumbsHeader">
          <div class="crumbs">
              <span @click="pathIndex()">首页 / </span>
              <!-- <span @click="pathNews()">帮助支持 /</span> -->
              <span>发票管理</span>
          </div>
          <div class="operateBox">
            <span class="add">开发票</span>
          </div>
        </div>

        <!-- <div>时间</div> -->
        <div class="publicCenter">
            <MenuLeft></MenuLeft> 
            <div class="contList">
              <div class="tabBox">
                <table border = "1" class="tableBox"  width="100%">
                  <tbody>
                    <tr>
                      <th>公司名称</th>
                      <th> 金额（元）</th>
                      <th>发票类型</th>
                      <th>申请时间</th>
                      <th>状态</th>
                      <th>操作</th>
                    </tr>
                    <tr>
                      <td>安徒徒鸽网络科技有限责任公司</td>
                      <td>500.00</td>
                      <td>普通发票和增值税专用发票</td>
                      <td>2020-03-29 14:43:45</td>
                      <td>申请完成</td>
                      <td class="default">
                        <span>下载</span>
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
    name: 'userInvoice',
    components: {
      MenuLeft,
    },
    data () {
      return {     
        notice: require('../../assets/img/user/notice.png'), 
      }
    },
    methods: {
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

.tabBox{
  width: 100%;
  table{
    th{
      height: 41px;
      line-height: 41px;
      text-align: center;
    }

    td{
      height: 45px;
      text-align: center;
      color: #333;
    }

    .default{
      span{
        color: #4E9F5B;
        cursor: pointer;
      }
    }
  }
}
</style>
