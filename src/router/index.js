import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./../views/home.vue'),
      // component: resolve => (require(['./../views/home.vue'], resolve)),
      redirect: '/index', // 默认
      children: [
        {
          path: '/index',
          name: 'index',
          component: () => import('./../views/index/index.vue'),
          // component: resolve => (require(['./../views/index/index.vue'], resolve)),
        },
        {
          path: '/news',
          name: 'news',
          component: () => import('./../views/news/index.vue'),
          // component: resolve => (require(['./../views/news/index.vue'], resolve)),
        },
        {
          path: '/details',
          name: 'details',
          component: () => import('./../views/news/details.vue'),
          // component: resolve => (require(['./../views/news/details.vue'], resolve)),
        },
        {
          path: '/print',
          // component: () => import('./../views/print/print_home.vue'),
          component: resolve => (require(['./../views/print/print_home.vue'], resolve)),
          
        },
        {
          path: '/print/more',
          name: 'more',
          // component: () => import('./../views/print/print_home.vue'),
          component: resolve => (require(['./../views/print/print_more.vue'], resolve)),
        },
        {
          path: '/print/detial',
          name: 'pdetial',
          // component: () => import('./../views/print/print_home.vue'),
          component: resolve => (require(['./../views/print/print_detial.vue'], resolve)),
        },
       
      ]
    }

  ]
  
  
})
