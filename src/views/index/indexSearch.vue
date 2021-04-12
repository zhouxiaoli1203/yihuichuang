<template>
  <div class='design main bgray'>
    <div class="center">
      <div class="search">
        <Search></Search>
      </div>
      <div class="design-content">
        <ul class="clearfix">
          <li v-for="(x,index) in searchBtns"
              class="fl"
              :style='{color:x.id==1?"#666666":x.id==2?"#FF3333":"#4E9F5B"}'>{{x.name}}<i><img :src='"@/assets/img/design/search_icon"+(index+1)+".png"'
                   alt=""></i></li>
        </ul>
        <ul class="displayFl design-content-item">
          <li v-for="x in 12">
            <img src=""
                 alt="">
            <h5>{{x.title}}</h5>
          </li>
        </ul>
        <el-pagination
            background
            layout="prev, pager, next"
            :total="12">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import Search from '../../components/search'
export default {
  name: 'indexSearch',
  data() {
    return {
      searchBtns: [
        { name: '综合排序', id: '1' },
        { name: '热门排序', id: '2' },
        { name: '最新上传', id: '3' },
      ],
    }
  },
  components: {
    Search
  },
  created() {
    let keyword = this.$route.query.keyword
    console.log(keyword)
  },
  mounted() {},
  methods: {

  },
}
</script>
<style lang='less' scoped>

.search{
  position: relative;
  width: 100%;
  height: 100px;
}
.design-content {
  ul > li {
    cursor: pointer;
    margin-right: 32px;
    font-size: 16px;
    img {
      width: 18px;
      height: 18px;
    }
  }
  .design-content-item {
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: 30px;
    li {
      width: 368px;
      height: 250px;
      margin-bottom: 30px;
      img {
        width: 100%;
        height: 213px;
        border-radius: 8px;
      }
    }
  }
  .el-pagination{
      margin-top: 64px;
    padding-bottom: 104px;
    text-align: center;
  }
}
</style>
