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
            <span class="add">添加</span>
          </div>
        </div>

        <!-- <div>时间</div> -->
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
                      <td class="btn">
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
                      <td class="btn">
                        <span>修改</span>
                        <span>删除</span>
                      </td>
                      <td>设为默认地址</td>
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
    name: 'userAddress',
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
    .btn{
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
</style>
