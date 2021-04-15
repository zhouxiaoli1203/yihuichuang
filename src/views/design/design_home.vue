<template>
  <div class='design main bgray'>
    <div class="center">
      <div class="design-head">
        <ul class="design-tab">
          <li class="design-tab-li"
              v-for="(x,index) in searchList">
            <div class="search-head">
              <img :src='"@/assets/img/design/head_icon"+(index+1)+".png"'
                   width="18px"
                   height="18px">
              <span :style='{color:x.value==1?"#8C8CBC":x.value==2?"#FD5392":"#2334E0"}'>{{x.title}}</span>
            </div>
            <ul class="search-item">
              <li v-for="y in x.items">
                <span class="name"
                      v-if="y.name!='more'">{{y.name}}</span>
                <el-dropdown v-if="y.name=='more'">
                  <span class="el-dropdown-link">
                    更多<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item icon="el-icon-plus">黄金糕</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-circle-plus">狮子头</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-circle-plus-outline">螺蛳粉</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-check">双皮奶</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-circle-check">蚵仔煎</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="part-line"></div>
      <div class="design-content">
        <ul class="clearfix">
          <li v-for="(x,index) in searchBtns"
              class="fl"
              :style='{color:x.id==1?"#666666":x.id==2?"#FF3333":"#4E9F5B"}'>{{x.name}}<i><img :src='"@/assets/img/design/search_icon"+(index+1)+".png"'
                   alt=""></i></li>
        </ul>
        <ul class="displayFl design-content-item">
          <li v-for="x in 12"
              @click="openCkt">
            <img src=""
                 alt="">
            <h5>{{x.title}}</h5>
          </li>
        </ul>
        <el-pagination background
                       layout="prev, pager, next"
                       :total="12">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import CktDesign from '@chuangkit/chuangkit-design'
import {scts} from '@/utils/secret'

var design = new CktDesign(scts.getKey());

export default {
  name: 'design',
  data() {
    return {
      searchList: [
        {
          title: '分类',
          img_: '',
          value: '1',
          items: [
            { name: '全部', id: '0' },
            { name: '广告物料', id: '1' },
            { name: '企业定制', id: '2' },
            { name: '包装印刷', id: '3' },
            { name: '其他印刷', id: '4' },
          ],
        },
        {
          title: '用途',
          img_: '',
          value: '2',
          items: [
            { name: '全部', id: '0' },
            { name: '海报', id: '1' },
            { name: '喷画条幅', id: '2' },
            { name: '折页', id: '3' },
            { name: '资料袋', id: '4' },
            { name: 'more' },
          ],
        },
        {
          title: '行业',
          img_: '',
          value: '3',
          items: [
            { name: '全部', id: '0' },
            { name: '电商淘宝', id: '1' },
            { name: '教育培训', id: '2' },
            { name: '公司包装', id: '3' },
            { name: '餐饮美食', id: '4' },
            { name: 'more' },
          ],
        },
      ],
      searchBtns: [
        { name: '综合排序', id: '1' },
        { name: '热门排序', id: '2' },
        { name: '最新上传', id: '3' },
      ],
    }
  },
  components: {},
  created() {
      this.confirm_pop("确定要删除吗").then(res=>{
         this.$message({
                type: 'success',
                message: '删除成功!'
            });
      })
  },
  mounted() {},
  methods: {
    openCkt: function () {
        // console.log(design );
      design .open()
    },
  },
}
</script>
<style lang='less' scoped>
.design-head {
  margin-top: 32px;
  .design-tab {
    display: flex;
    justify-content: space-between;
    .design-tab-li {
      padding: 16px 24px;
      width: 342px;
      height: 129px;
      background: #ffffff;
      border-radius: 20px;
      .search-head {
        font-size: 16px;
        margin-bottom: 15px;
      }
      .search-item {
        > li {
          margin-right: 24px;
          margin-bottom: 20px;
          display: inline-block;
          cursor: pointer;
          &:hover {
            color: #409eff;
          }
        }
      }
    }
  }
}
.part-line {
  margin: 32px 0;
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
  .el-pagination {
    margin-top: 64px;
    padding-bottom: 104px;
    text-align: center;
  }
}
</style>
