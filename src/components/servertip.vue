<template>
  <div class=''>
    <div class="form-line server-tip">
      <label for=""  class="form-label fl">服务</label>
        <ul class="fl">
          <li class="free">免费开票</li>
          <li class="examine">当天审核</li>
          <li class="afterSale">售后无忧</li>
        </ul>
    </div>
 
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {}
  },
  components: {},
  created() {},
  mounted() {},
  methods: {},
}
</script>
<style lang='less' scoped>
.server-tip {
  width:100%;
  padding-left: 16px;
  height: 34px;
  clear: both;
  overflow: hidden;
//   margin-bottom: 8px;
  background-color: rgba(78,159,91,0.1);
  .form-label{
      width: 100px;
  }
  ul {
    // clear: both;
    // overflow: hidden;
    li {
        float: left;
        display: inline-block;
        margin-right: 30px;
        position: relative;
        padding-left: 23px;
        // background:url("../assets/img/common/mfkp-icon.png") no-repeat center;
        &::before{
            position: absolute;
            left: 0;
            top: 3px;
            content:"";
            width: 15px;
            height: 15px;
            color: #4E9F5B;
        }
        &.free::before{
            content:url("../assets/img/common/mfkp-icon.png");
        }
        &.examine::before{
            content:url("../assets/img/common/dtsh-icon.png");
        }
        &.afterSale::before{
            content:url("../assets/img/common/shwy-icon.png");
        }
    }
  }
}
</style>
