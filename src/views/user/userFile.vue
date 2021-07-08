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
              <ul v-if="info">
                <li>
                   <router-link :to="{path:'/user/userPicture'}"  class="link">
                    <img :src="img" alt="">
                    <span v-if="info.imgNewCount!=0">新增{{info.imgNewCount}}</span>
                  </router-link>
                  <p>图片</p>
                </li>
                <li>
                  <router-link :to="{path:'/user/userFiledown'}"  class="link">
                    <img :src="file" alt="">
                    <span v-if="info.docNewCount!=0">新增{{info.docNewCount}}</span>
                  </router-link>
                  <p>文件</p>
                </li>
              </ul>

              <!-- 1024m = 1G   1M = 1024KB -->
              <!-- 储存空间 -->
              <div class="Storage">
                <p>
                  <span v-if="info.size/1024>=1024">{{Number(info.size/1024/1024).toFixed(2)}}M</span>  
                  <span v-else-if="info.size/1024/1024>=1024">{{Number(info.size/1024/1024/1024).toFixed(2)}}G</span>
                  <span v-else>{{Number(info.size/1024).toFixed(1)}}KB</span> /
                  <span >{{info.space/1024/1024/1024}}G</span>
                </p>
                <div class="pro">
                  <el-progress :percentage="percentage" :show-text="false"></el-progress>
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
        info:'',
        percentage:0,
      }
    },
    created(){
      this.PrintsInfo();
    },
    methods: {
      format(percentage) {
        return percentage === 100 ? '满' : `${percentage}%`;
      },

      // 获取文档名称
      PrintsInfo(){
        this.$post("post",'Prints/info',{
          token:this.$store.getters.getToken,
        }).then((res)=>{
          if(res.code==1){
            this.info = res.data
            this.percentage = res.data.size/res.data.space*100
          }
        })
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
