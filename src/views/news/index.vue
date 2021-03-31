<template>
  <div class="news">
    <!-- <router-link to='/details'>
      新闻列表1
      新闻列表1
    </router-link> -->

     <div class="mouse">123</div>
        <div class="hoverShow">
      
          <p>566</p>
           
            <p>567</p>
        
            <p>568</p>
        </div>
     
     
  </div>
</template>

<script>
export default {
  name: 'news',
  data () {
    return {
     
    }
  },
  methods: {
  // 跳转页面方法

  }
}
</script>


<style scoped>

 .hoverShow{
                display: none;
            }
            .mouse:hover+.hoverShow{
                display: block;
            }
            .hoverShow:hover{
                display: block;
            }

</style>
