import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    //所有的数据都放在state中
    state:{
      currentIndex:"/",
      publicHome:'',
      menuLeft:'',
      token:'',
      userId:'',
      userInfo:''
    },

    //操作数据，唯一的通道是mutations/*配置全局函数*/
    mutations:{
      setUserInfo(state, info){ //储存用户信息
        state.userInfo = info
        localStorage.setItem('userInfo',JSON.stringify(info))
      },
      setToken(state, token) {
        state.token = token
        localStorage.setItem('token',token)
      },
      setUserId(state, userId) {
        state.userId = userId 
        localStorage.setItem('userId',userId) //同步存储token至localStorage
      },
    },
    getters : {
      //获取token方法
      //判断是否有token,如果没有重新赋值，返回给state的token
      getToken(state) { 
        if (!state.token) {
          let token = localStorage.getItem('token')
          state.token = token?token:''
        }
        return state.token
      },
      getUserId(state) {
        if (!state.userId) {
          let id = localStorage.getItem('userId')
          state.userId = id?id:''
        }
        return state.token
      },

      getUserInfo(state){ //获取用户信息
        if (!state.userInfo) {
          let info = JSON.parse(localStorage.getItem('userInfo'))
          state.userInfo = info?info:''
        }
        return state.userInfo
      },
    },

    //actions,可以来做异步操作，然后提交给mutations，而后再对state(数据)进行操作
    actions:{}
})