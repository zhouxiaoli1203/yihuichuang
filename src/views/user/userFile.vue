<template>
  <div class="main connonBg">
    <section class="center">
        <div class="crumbsHeader">
          <div class="crumbs">
              <span @click="pathIndex()">首页 / </span>
              <!-- <span @click="pathNews()">帮助支持 /</span> -->
              <span>文件打印</span>
          </div>
        </div>

        <div class="publicCenter">
            <MenuLeft></MenuLeft> 
            <div class="contList">
              <ul>
                <li>
                   <router-link :to="{path:'/user/userPicture'}"  class="link">
                    <img :src="img" alt="">
                    <span>新增22</span>
                  </router-link>
                  <p>图片</p>
                </li>
                <li>
                  <router-link :to="{path:'/user/userFiledown'}"  class="link">
                    <img :src="file" alt="">
                    <span>新增22</span>
                  </router-link>
                  <p>文件</p>
                </li>
              </ul>

              <!-- 储存空间 -->
              <div class="Storage">
                <p>32G/100G</p>
                <div class="pro">
                  <el-progress :percentage="32" :show-text="false"></el-progress>
                </div>
              </div>
            </div>
        </div>
    </section>
  </div>
</template>

<script>
  import MenuLeft from '../../components/menuLeft'
  export default {
    name: 'userFile',
    components: {
      MenuLeft,
    },
    data () {
      return {     
        img: require('../../assets/img/user/img.png'), 
        file: require('../../assets/img/user/file.png'), 
      }
    },
    methods: {
      format(percentage) {
        return percentage === 100 ? '满' : `${percentage}%`;
      }
    }
  }
</script>


<style lang="less" scoped>

.contList{
  padding: 24px;
  position: relative;
  background: #fff;
  ul{
    display: flex;
    align-items: center;

    li{
      margin-right: 56px;
      text-align: center;
      .link{
        width: 62px;
        height: 62px;
        position: relative;
        margin-bottom: 17px;
        display: block;

        img{
          width: 100%;
          height: 100%;
        }

        span{
          width: 51px;
          height: 15px;
          background: #FF3939;
          border-radius: 6px;
          font-size: 8px;
          color: #fff;
          display: inline-block;
          position: absolute;
          text-align: center;
          line-height: 15px;
          top: 14px;
          right: -27px;
        }
      }
      
      
    }
  }

  .Storage{
    position: absolute;
    bottom: 24px;
    right: 24px;

    p{
      text-align: right;
      color: #999;
      margin-bottom: 8px;
    }

    .pro{
      width: 136px;
      background: #F8F9FF;
      border-radius: 4px;
      line-height: 34px;
      padding: 14px 6px;
    }
  }
}

</style>
