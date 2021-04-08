<template>
  <div class='print-detail-page main bgray'>
    <div class="center">
      <div class="print-more-title">
        <span class="cursor_p"
              @click="goBack()">在线印刷</span><span class="current">&nbsp;/&nbsp;商品详情</span>
      </div>
      <div class="print-detail-operate">
        <div class="operate-left">
            <!-- 每个页面的属性 -->
          <Armband v-if="detailType == 1"></Armband>
          <Banner v-if="detailType == 2"></Banner>
          <Ribbon></Ribbon>
          <!-- 上传文件按钮 -->
          <el-form class="bgGreen_">
            <el-form-item label="我有文件">
              <el-upload class="upload-demo"
                         ref="upload"
                         action="https://jsonplaceholder.typicode.com/posts/"
                         :on-preview="handlePreview"
                         :on-remove="handleRemove"
                         :file-list="fileList"
                         :auto-upload="false">
                <el-button class="yhc_btn" slot="trigger"
                           size="small"
                           type="primary">上传稿件</el-button>
              </el-upload>
            </el-form-item>
            <el-form-item label="我没文件">
              <el-upload class="upload-demo"
                         ref="upload"
                         action="https://jsonplaceholder.typicode.com/posts/"
                         :on-preview="handlePreview"
                         :on-remove="handleRemove"
                         :file-list="fileList"
                         :auto-upload="false">
                <el-button class="yhc_btn" slot="trigger"
                           size="small"
                           type="primary">挑选模版设计</el-button>
              </el-upload>
            </el-form-item>
            <el-form-item label="没有满意模板">
                <el-button class="yhc_btn" size="small" type="success">设计定制</el-button>
            </el-form-item>
          </el-form>
          <!-- 在线估价弹框 -->
          <Price></Price>

        </div>
        <div class="operate-right">
          <img src=""
               alt="">
        </div>
      </div>
      <div class="print-detail-info">
        <div class="fl relation">
          <div class="rel-title">相关产品</div>
          <ul class="card-style rel-products">
            <li v-for="x in relItems">
              <div class="image"></div>
              <div class="title">海报印刷</div>
              <div class="number">
                <span>34元</span>/<span>100张</span>
              </div>
            </li>
          </ul>
        </div>
        <div class="fr infos">
          <el-tabs type="border-card"
                   v-model="editableTabsValue">
            <el-tab-pane :key="item.name"
                         v-for="(item, index) in editableTabs"
                         :label="item.title"
                         :name="item.name">{{item.content}}
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import  Armband from '@/views/print/materiel/armband_dtl'
import  Banner from '@/views/print/materiel/banner_dtl'
import  Ribbon from '@/views/print/comnPrint/danye_dtl'

import Price from '@/components/pricePop'
export default {
  name: 'pdetial',
  data() {
    return {
        detailType:"",
      relItems: Array(4),
      editableTabsValue: 'detail',
      editableTabs: [
        { name: 'detail', title: '产品详情', content: '11111111111' },
        { name: 'server', title: '售后服务', content: '22222222222' },
      ],
      title: '测试动态组件',
      show: true,
            fileList: [
        {
          name: 'food.jpeg',
          url:
            'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
        },
        {
          name: 'food2.jpeg',
          url:
            'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
        },
      ],
    }
  },
  components: { Armband,Banner,Ribbon, Price },
  created() {
      this.detailType = this.$route.query.type;
  },
  mounted() {},
  methods: {
    goBack: function () {
      this.$router.push({
        //核心语句
        path: '/print', //跳转的路径
        query: {
          //路由传参时push和query搭配使用 ，作用时传递参数
        },
      })
    },
        handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      )
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleClick: function () {},
  },
}
</script>
<style lang='less' scoped>
.print-detail-operate {
  display: flex;
  justify-content: space-between;
  .operate-left {
    width: 707px;
  }
  .operate-right {
    width: 456px;
    height: 559px;
    background: #333333;
    border-radius: 8px;
  }
}
.print-detail-info {
  margin: 58px auto 0;
  padding-bottom: 88px;
  display: flex;
  justify-content: space-between;
  .relation {
    width: 226px;
    background: #fff;
    height: -webkit-fill-available;
    .rel-title {
      height: 44px;
      line-height: 44px;
      text-align: center;
      font-size: 14px;
      border-bottom: 1px solid #615858;
    }
    .rel-products {
      display: flex;
      flex-direction: column;
      > li {
        width: 100%;
        height: 318px;
        border-bottom: 1px solid #615858;
        border-radius: 0px;
        margin-bottom: 0px;
        background: #fff;
        .image {
          width: 134px;
          height: 134px;
          margin: 75px auto 8px;
          border: 1px solid #666;
        }
        .title {
          margin-bottom: 8px;
        }
      }
    }
  }
  .infos {
    width: 927px;
    height: -webkit-fill-available;
  }


}
</style>
