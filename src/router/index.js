import Vue from 'vue'
import Router from 'vue-router'

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: resolve => (require(['@/views/home.vue'], resolve)),
      redirect: '/index', // 默认
      children: [
        {
          path: '/',
          name: 'index',
          component: () => import('@/views/index/index.vue'),
        },
        {
          path: '/index/indexSearch',
          name: 'indexSearch',
          component: () => import('@/views/index/indexSearch.vue'),
        },
        {
          path: '/news',
          name: 'news',
          component: () => import('@/views/news/index.vue'),
        },
        {
          path: '/news/newsCustom',
          name: 'newsCustom',
          component: () => import('@/views/news/newsCustom.vue'),
        },
        {
          path: '/news/newsCompany',
          name: 'newsCompany',
          component: () => import('@/views/news/newsCompany.vue'),
        },
        {
          path: 'news/detail',
          name: 'newsDetail',
          component: () => import('@/views/news/detail.vue'),
        },
        {
          path: '/print',
          name:"print",
          component: () => import('./../views/print/print_home.vue'),
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
          path: 'help/detail',
          name: 'helpDetail',
          component: () => import('@/views/news/detail.vue'),
        },
        {
          path: '/design',
          name: 'design',
        //   component: () => import('@/views/design/index.vue'),
          component: () => import('@/views/design/design_home.vue'),
         
        },
        {
          path: '/help/helpProblem',
          name: 'helpProblem',
          component: () => import('@/views/help/helpProblem.vue'),
        },
        {
          path: '/help/helpExpress',
          name: 'helpExpress',
          component: () => import('@/views/help/helpExpress.vue'),
        },
        {
          path: '/help/helpRefund',
          name: 'helpRefund',
          component: () => import('@/views/help/helpRefund.vue'),
        },
        {
          path: '/about',
          name: 'about',
          component: () => import('@/views/about/index.vue'),
        },
        {
          path: '/about/aboutContact',
          name: 'aboutContact',
          component: () => import('@/views/about/aboutContact.vue'),
        },
        {
          path: '/about/aboutOffline',
          name: 'aboutOffline',
          component: () => import('@/views/about/aboutOffline.vue'),
        },
        {
          path: '/about/aboutUser',
          name: 'aboutUser',
          component: () => import('@/views/about/aboutUser.vue'),
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
          path: '/cart',
          name: 'cart',
          component: () => import('@/views/cart.vue'),
        },
        {
          path: '/user/userOrder',
          name: 'userOrder',
          component: () => import('@/views/user/userOrder.vue'),
        },
        {
          path: '/user/userAddress',
          name: 'userAddress',
          component: () => import('@/views/user/userAddress.vue'),
        },
        {
          path: '/user/userInvoice',
          name: 'userInvoice',
          component: () => import('@/views/user/userInvoice.vue'),
        },
        {
          path: '/user/userFile',
          name: 'userFile',
          component: () => import('@/views/user/userFile.vue'),
        },
        {
          path: '/user/userPicture',
          name: 'userPicture',
          component: () => import('@/views/user/userPicture.vue'),
        },
        {
          path: '/user/userFiledown',
          name: 'userFiledown',
          component: () => import('@/views/user/userFiledown.vue'),
        },
        {
          path: '/user/userPhoto',
          name: 'userPhoto',
          component: () => import('@/views/user/userPhoto.vue'),
        },
        {
          path: '/user/matting',
          name: 'matting',
          component: () => import('@/views/user/matting.vue'),
        },
        {
          path: '/user/userBalance',
          name: 'userBalance',
          component: () => import('@/views/user/userBalance.vue'),
        },
        {
          path: '/unique',  //定制服务
          name: 'unique',
          component: () => import('@/views/unique/index.vue'),
        },
        {
          path: '/join',  //合作加盟
          name: 'join',
          component: () => import('@/views/join/index.vue'),
        },
        
       
       
      ],
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
