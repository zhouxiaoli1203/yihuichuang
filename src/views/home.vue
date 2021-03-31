<template>
  <div>
    <NavHeader></NavHeader>
    <router-view></router-view>
    <NavFooter></NavFooter>
  </div>
</template>
<script>
import NavHeader from './../components/navHeader'
import NavFooter from './../components/navFooter'
export default {
  name: 'home',
  components: {
    // 当键名与值名相同，可省略写一个, ES6增强的写法
    NavHeader,
    NavFooter
  }
}
</script>
