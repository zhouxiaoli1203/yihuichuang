<template>
    <div class="contList">
      <div class="tit" v-if="type!='aboutContact'">
        <h3>{{info.Title}}</h3>
        <span>{{info.PostTime | formatDate_('yyyy-MM-dd hh:mm') }}</span>
      </div>
      <p v-html="info.Content"></p>
    </div>
</template>

<script>
  export default {
    props: ['title'],
    data () {
      return {
        info:'',
        type:''
      }
    },
    created(){
      let type = this.$props.title
      this.type = type
      if(type=='help'){
        return this.detail('20')   //法律声明
          
      }
       if(type=='helpRefund'){
        return this.detail('22')   //退款说明
          
      }

      if(type=='about'){
        return this.detail('25')   //关于我们
          
      }

      if(type=='aboutUser'){
        return this.detail('26')   //用户协议
          
      }

      if(type=='aboutContact'){
        return this.detail('27')   //联系我们
          
      }
      console.log(285222);
      this.detail(this.$route.query.id)
    },
    methods: {
      detail(id){
        this.$post("post",'Article/get',{
          id
        })
        .then((res)=>{
          if(res.code==1){
            this.info = res.data
          }else{
            this.$message({
              message:res.info,
              type: 'warning'
            });
          }
        })
      },
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
      border-bottom: 1px solid #CBCFE3;
      padding-bottom: 24px;

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
