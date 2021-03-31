import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      // component: () => import('./../views/home.vue'),
      component: resolve => (require(['./../views/home.vue'], resolve)),
      redirect: '/index', // 默认
      children: [
        {
          path: '/index',
          name: 'index',
          // component: () => import('./../views/index/index.vue'),
          component: resolve => (require(['./../views/index/index.vue'], resolve)),
        },
        {
          path: '/news',
          name: 'news',
          // component: () => import('./../views/index/index.vue'),
          component: resolve => (require(['./../views/news/index.vue'], resolve)),
        },
        {
          path: '/details',
          name: 'details',
          // component: () => import('./../views/index/index.vue'),
          component: resolve => (require(['./../views/news/details.vue'], resolve)),
        },
      ]
    }

  ]
  
})
