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
      component: resolve => (require(['@/views/home.vue'], resolve)),
      redirect: '/index', // 默认
      children: [
        {
          path: '/index',
          name: 'index',
          component: () => import('@/views/index/index.vue'),
        },
        {
          path: '/news',
          name: 'news',
          component: () => import('@/views/news/index.vue'),
        },
        {
          path: '/news/detail',
          name: 'detail',
          component: () => import('@/views/news/detail.vue'),
        },
        {
          path: '/print',
          // component: () => import('./../views/print/print_home.vue'),
          component: resolve => (require(['@/views/print/ceshi.vue'], resolve)),

        },
        {
          path: '/print/more',
          name: 'more',
          component: resolve => (require(['@/views/print/print_more.vue'], resolve)),
        },
        {
          path: '/print/detial',
          name: 'pdetial',
          component: resolve => (require(['@/views/print/print_detial.vue'], resolve)),
        },
        {
          path: '/help',
          name: 'help',
          component: () => import('@/views/help/index.vue'),
        },
        {
          path: '/about',
          name: 'about',
          component: () => import('@/views/about/index.vue'),
        },
        {
          path: '/service',
          name: 'service',
          component: () => import('@/views/service/index.vue'),
        },
        {
          path: '/user',
          name: 'user',
          component: () => import('@/views/user/index.vue'),
        },
        {
          path: '/user/userOrder',
          name: 'userOrder',
          component: () => import('@/views/user/userOrder.vue'),
        },
       
      ],
    },
    {
      path: '/dynamicIndex',
      // name: 'pdetial',
      // component: () => import('./../views/print/print_home.vue'),
      component: resolve => (require(['@/views/print/print_detial.vue'], resolve)),
    },

  ],
  scrollBehavior(to, from, saveTop){
    if (saveTop) {
        return saveTop;
    } else {
        return {x: 0, y: 0}
    }
  }
  
  
})
