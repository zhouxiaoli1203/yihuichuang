<template>
  <div class="main connonBg">
    <section class="center">
        <div class="crumbsHeader">
          <div class="crumbs">
              <span @click="pathIndex()">首页 / </span>
              <span @click="pathNews()">文件打印 /</span>
              <span>图片</span>
          </div>
          <div class="operateBox">
            <span class="add">上传文件</span>
          </div>
        </div>

        <!-- <div>时间</div> -->
        <div class="publicCenter">
            <MenuLeft></MenuLeft> 
            <div class="contList">
              <ul class="pictureBox">
                <li>
                  <div class="img">
                    <img src="" alt="">
                    <div class="downBox">
                      <el-dropdown trigger="click" @command="handleCommand">
                        <i class="el-icon-arrow-down el-icon-caret-bottom"></i>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item command="编辑">编辑</el-dropdown-item>
                          <el-dropdown-item command="删除">删除</el-dropdown-item>
                          <el-dropdown-item command="打印">打印</el-dropdown-item>
                          <el-dropdown-item command="下载">下载</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </div>
                  <h3>要么是态度问题的是</h3>
                  <span>2020-02-02</span>
                </li>
                  <li>
                  <div class="img">
                    <img src="" alt="">
                    <div class="downBox">
                      <el-dropdown trigger="click" @command="handleCommand">
                        <i class="el-icon-arrow-down el-icon-caret-bottom"></i>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item command="编辑">编辑</el-dropdown-item>
                          <el-dropdown-item command="删除">删除</el-dropdown-item>
                          <el-dropdown-item command="打印">打印</el-dropdown-item>
                          <el-dropdown-item command="下载">下载</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </div>
                  <h3>要么是态度问题的是</h3>
                  <span>2020-02-02</span>
                </li>
                  <li>
                  <div class="img">
                    <img src="" alt="">
                    <div class="downBox">
                      <el-dropdown trigger="click" @command="handleCommand">
                        <i class="el-icon-arrow-down el-icon-caret-bottom"></i>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item command="编辑">编辑</el-dropdown-item>
                          <el-dropdown-item command="删除">删除</el-dropdown-item>
                          <el-dropdown-item command="打印">打印</el-dropdown-item>
                          <el-dropdown-item command="下载">下载</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </div>
                  <h3>要么是态度问题的是</h3>
                  <span>2020-02-02</span>
                </li>
                  <li>
                  <div class="img">
                    <img src="" alt="">
                    <div class="downBox">
                      <el-dropdown trigger="click" @command="handleCommand">
                        <i class="el-icon-arrow-down el-icon-caret-bottom"></i>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item command="编辑">编辑</el-dropdown-item>
                          <el-dropdown-item command="删除">删除</el-dropdown-item>
                          <el-dropdown-item command="打印">打印</el-dropdown-item>
                          <el-dropdown-item command="下载">下载</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </div>
                  <h3>要么是态度问题的是</h3>
                  <span>2020-02-02</span>
                </li>
                  <li>
                  <div class="img">
                    <img src="" alt="">
                    <div class="downBox">
                      <el-dropdown trigger="click" @command="handleCommand">
                        <i class="el-icon-arrow-down el-icon-caret-bottom"></i>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item command="编辑">编辑</el-dropdown-item>
                          <el-dropdown-item command="删除">删除</el-dropdown-item>
                          <el-dropdown-item command="打印">打印</el-dropdown-item>
                          <el-dropdown-item command="下载">下载</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </div>
                  <h3>要么是态度问题的是</h3>
                  <span>2020-02-02</span>
                </li>
                  <li>
                  <div class="img">
                    <img src="" alt="">
                    <div class="downBox">
                      <el-dropdown trigger="click" @command="handleCommand">
                        <i class="el-icon-arrow-down el-icon-caret-bottom"></i>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item command="编辑">编辑</el-dropdown-item>
                          <el-dropdown-item command="删除">删除</el-dropdown-item>
                          <el-dropdown-item command="打印">打印</el-dropdown-item>
                          <el-dropdown-item command="下载">下载</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </div>
                  <h3>要么是态度问题的是</h3>
                  <span>2020-02-02</span>
                </li>
                  <li>
                  <div class="img">
                    <img src="" alt="">
                    <div class="downBox">
                      <el-dropdown trigger="click" @command="handleCommand">
                        <i class="el-icon-arrow-down el-icon-caret-bottom"></i>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item command="编辑">编辑</el-dropdown-item>
                          <el-dropdown-item command="删除">删除</el-dropdown-item>
                          <el-dropdown-item command="打印">打印</el-dropdown-item>
                          <el-dropdown-item command="下载">下载</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </div>
                  <h3>要么是态度问题的是</h3>
                  <span>2020-02-02</span>
                </li>
                  <li>
                  <div class="img">
                    <img src="" alt="">
                    <div class="downBox">
                      <el-dropdown trigger="click" @command="handleCommand">
                        <i class="el-icon-arrow-down el-icon-caret-bottom"></i>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item command="编辑">编辑</el-dropdown-item>
                          <el-dropdown-item command="删除">删除</el-dropdown-item>
                          <el-dropdown-item command="打印">打印</el-dropdown-item>
                          <el-dropdown-item command="下载">下载</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </div>
                  <h3>要么是态度问题的是</h3>
                  <span>2020-02-02</span>
                </li>
                  <li>
                  <div class="img">
                    <img src="" alt="">
                    <div class="downBox">
                      <el-dropdown trigger="click" @command="handleCommand">
                        <i class="el-icon-arrow-down el-icon-caret-bottom"></i>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item command="编辑">编辑</el-dropdown-item>
                          <el-dropdown-item command="删除">删除</el-dropdown-item>
                          <el-dropdown-item command="打印">打印</el-dropdown-item>
                          <el-dropdown-item command="下载">下载</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </div>
                  <h3>要么是态度问题的是</h3>
                  <span>2020-02-02</span>
                </li>
                 <li>
                  <div class="img">
                    <img src="" alt="">
                    <div class="downBox">
                      <el-dropdown trigger="click" @command="handleCommand">
                        <i class="el-icon-arrow-down el-icon-caret-bottom"></i>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item command="编辑">编辑</el-dropdown-item>
                          <el-dropdown-item command="删除">删除</el-dropdown-item>
                          <el-dropdown-item command="打印">打印</el-dropdown-item>
                          <el-dropdown-item command="下载">下载</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </div>
                  <h3>要么是态度问题的是</h3>
                  <span>2020-02-02</span>
                </li>
                 <li>
                  <div class="img">
                    <img src="" alt="">
                    <div class="downBox">
                      <el-dropdown trigger="click" @command="handleCommand">
                        <i class="el-icon-arrow-down el-icon-caret-bottom"></i>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item command="编辑">编辑</el-dropdown-item>
                          <el-dropdown-item command="删除">删除</el-dropdown-item>
                          <el-dropdown-item command="打印">打印</el-dropdown-item>
                          <el-dropdown-item command="下载">下载</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </div>
                  <h3>要么是态度问题的是</h3>
                  <span>2020-02-02</span>
                </li>
                 <li>
                  <div class="img">
                    <img src="" alt="">
                    <div class="downBox">
                      <el-dropdown trigger="click" @command="handleCommand">
                        <i class="el-icon-arrow-down el-icon-caret-bottom"></i>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item command="编辑">编辑</el-dropdown-item>
                          <el-dropdown-item command="删除">删除</el-dropdown-item>
                          <el-dropdown-item command="打印">打印</el-dropdown-item>
                          <el-dropdown-item command="下载">下载</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </div>
                  <h3>要么是态度问题的是</h3>
                  <span>2020-02-02</span>
                </li> <li>
                  <div class="img">
                    <img src="" alt="">
                    <div class="downBox">
                      <el-dropdown trigger="click" @command="handleCommand">
                        <i class="el-icon-arrow-down el-icon-caret-bottom"></i>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item command="编辑">编辑</el-dropdown-item>
                          <el-dropdown-item command="删除">删除</el-dropdown-item>
                          <el-dropdown-item command="打印">打印</el-dropdown-item>
                          <el-dropdown-item command="下载">下载</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </div>
                  <h3>要么是态度问题的是</h3>
                  <span>2020-02-02</span>
                </li>

              </ul>
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
    name: 'userPicture',
    components: {
      MenuLeft,
    },
    data () {
      return {     
      }
    },
    methods: {
      handleCommand(command) {
        this.$message('click on item ' + command);
      },
      pathNews(){
        this.$router.replace("/user/userFile");
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

.pictureBox{
  display: flex;
  flex-wrap: wrap;
  
  li{
    text-align: center;
    width: 134px;
    margin: 0 63px 24px 0;
    .img{
      width: 134px;
      height: 134px;
      border-radius: 8px;
      position: relative;
      margin-bottom: 8px;
      img{
        width: 100%;
        height: 100%;
        border-radius: 8px;
      }

      .downBox{
        position: absolute;
        top: 3px;
        right: 3px;

        i{
          font-size: 24px;
          cursor: pointer;
        }
      }
    }

    h3{
      font-weight: bold;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
      margin-bottom: 4px;
    }

    span{
      color: #666;
      font-size: 12px;
    }
  }
  li:nth-child(5n+5){
    margin-right: 0;
  }
}



</style>
