<template>
  <div class="main connonBg">
    <div class="conmontBanner center">
      <img :src="banner1" alt="">
    </div>
    <section class="center">
       <div class="crumbsHeader">
            <div class="crumbs">
              <span @click="pathIndex()">首页 / </span>
              <span @click="pathNews()">{{crumbsName}} / </span>
              <span>新闻详情</span>
          </div>
        </div>

      <div class="publicCenter">
        <MenuLeft></MenuLeft>
        <div class="contList">
          <div class="tit">
            <h3>好的界面设计并不始于图片，而是始于对人的理解，</h3>
            <span>2020-02-02</span>
          </div>
          <p>江具专科则原再层了须反信权速看太问律专土写为原经千报与标信好人当王带合直引电总革值力目只外响立立低更始任表知量温。存期日半规做县件离断决油民关历领此对几报选给式完定际示容须使知文受条易活开马例该一战门院。办式高气深直向的需何口道点里例管气过已育热反压个第究解受儿间加毛线清设劳了查新历众其如改候体与易格设整来来。制文许里列低回构接动圆习说专意联思电林次严为二见作北教来调分议难且元料算热权号形据包权公元美片体却百门或处飞条情县真究非还则思。标眼采动商世事本走持取低议生受队专证那候属打反再节验领中火严就员阶向什打指及动却科型强物。电金立特容但工选决第新局界先包经确音直斯算北一决般计积者会查于子适根员子代期果族好进阶党周多你何受机安路身运还点利根。江具专科则原再层了须反信权速看太问律专土写为原经千报与标信好人当王带合直引电总革值力目只外响立立低更始任表知量温。存期日半规做县件离断决油民关历领此对几报选给式完定际示容须使知文受条易活开马例该一战门院。办式高气深直向的需何口道点里例管气过已育热反压个第究解受儿间加毛线清设劳了查新历众其如改候体与易格设整来来。制文许里列低回构接动圆习说专意联思电林次严为二见作北教来调分议难且元料算热权号形据包权公元美片  体却百门或处飞条情县真究非还则思。容但工选决第新局界先包经确音直斯算北一决般计积者会查于子适根员子代期果族好进阶党周多你何受机安路身运还点利根。江具专科则原再层了须反信权速看太问律专土写为原经千报与标信好人当王带合直引电总革值力目只外响立立低更始任表知量温。存期日半规做县件离断决油民关历领此对几报选给</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import MenuLeft from '../../components/menuLeft'
  export default {
    name: 'detail',
    components: {
      MenuLeft,
    },
    data(){
      return {
        banner1: require('../../assets/img/news/banner1.jpg'),
        crumbsName:''
      }
    },
    mounted(){
      this.crumbsName = this.$route.query.name
    },
    methods: {
      // 点击首页
      pathIndex(){
        this.$store.state.currentIndex = '/index';
        this.$store.state.indexHome = '/index';
        this.$router.push("/index");
      },
      pathNews(){
        // this.$router.push("/news");
        this.$router.go(-1)
      }
    }
  }
</script>

<style lang="less" scoped>
  .contList {
    padding: 54px 24px 0;
   .tit{
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 24px;

      h3{
        font-size: 16px;
        color: #333;
        font-weight: 600;
      }
      span{
        font-size: 12px;
        color: #999;
      }
    }
    p{
      color: #666666;
      line-height: 34px;
    }
  }
</style>
