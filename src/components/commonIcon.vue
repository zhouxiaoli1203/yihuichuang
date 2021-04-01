<template>
    <div class="commonIcon">
        <ul>
            <li @mouseover='navMouseOver(0)' @mouseleave='navMouseLeave(0)' :class="navActive == 0?'active':''">
                <div class="icon">
                    <img :src="severIcon1" alt="">
                    <p>服务热线</p>
                </div>
                <div class="cont severCont" v-show="navActive == 0">
                    <div class="info">
                    <img :src="tel" alt="">
                    <p>服务热线：0561-3433212</p>
                    </div>
                </div>
            </li>
            <li @mouseover='navMouseOver(1)' @mouseleave='navMouseLeave(1)' :class="navActive == 1?'active':''">
                <div class="icon">
                    <img :src="severIcon2" alt="">
                    <p>订阅号</p>
                </div>
                <div class="cont codeCont" v-show="navActive == 1">
                    <img :src="banner" alt="">
                </div>
            </li>
            <li @mouseover='navMouseOver(2)' @mouseleave='navMouseLeave(2)' :class="navActive == 2?'active':''">
                <div class="icon">
                    <img :src="severIcon3" alt="">
                    <p>投诉建议</p>
                </div>
                <div class="cont complaintCont" v-show="navActive == 2">
                    <div class="col">
                    <img :src="name" alt="">
                    <input type="text" placeholder="请输入姓名" v-model="nameInput">
                    </div>
                    <div class="col">
                    <img :src="phone" alt="">
                    <input type="text" placeholder="请输入手机号" v-model="phoneInput">
                    </div>
                    <div class="textarea">
                    <p>投诉建议</p>
                    <textarea id="" cols="30" rows="10" v-model="complaintInput"></textarea>
                    </div>
                    <div class="btn">
                    <button>提交</button>
                    </div>
                </div>
            </li>
            <li  @mouseover='navMouseOver(3)' @mouseleave='navMouseLeave(3)' :class="navActive == 3?'active':''">
                <div class="icon">
                    <img :src="severIcon4" alt="">
                    <p>服务号</p>
                </div>
                <div class="cont codeCont" v-show="navActive == 3">
                    <img :src="banner" alt="">
                </div>
            </li>
            <li @click="backToTop">
                <div class="icon">
                    <img :src="severIcon5" alt="">
                    <p>回到顶部</p>
                </div>
            </li>
      </ul>
    </div>
</template>

<script>
export default {
  name: 'commonIcon',
  props: {
    backPosition: { // 返回顶部时，滚动到哪里（距离顶部的距离）
      type: Number,
      default: 0
    }
  },
    data(){
        return{
            banner: require('../assets/img/index/banner.jpg'),
            severIcon1: require('../assets/img/common/severIcon1.png'),
            severIcon2: require('../assets/img/common/severIcon2.png'),
            severIcon3: require('../assets/img/common/severIcon3.png'),
            severIcon4: require('../assets/img/common/severIcon4.png'),
            severIcon5: require('../assets/img/common/severIcon5.png'),
            tel: require('../assets/img/common/tel.png'),
            name: require('../assets/img/common/name.png'),
            phone: require('../assets/img/common/phone.png'),
            phoneInput:'',
            nameInput:'',
            complaintInput:'',
            navActive: -1,
            interval: null
        }
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll)
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll)
        if(this.interval) {
            clearInterval(this.interval)
        }
    },
    methods: {
        backToTop() {
            let distanceY = window.pageYOffset
            let i = 0
            this.interval = setInterval(() => {
                let next = Math.floor(this.easeInOutQuad(10 * i, distanceY, -distanceY, 500))
                if(next <= this.backPosition) {
                    window.scrollTo(0, this.backPosition)
                    clearInterval(this.interval)
                } else{
                    window.scrollTo(0, next)
                }
                i++
            }, 17)
        },
        /*
        缓动公式（Tween算法）
        t: 动画已经执行的时间（实际上时执行多少次/帧数）
        b: 起始位置
        c: 终止位置
        d: 从起始位置到终止位置的经过时间（实际上时执行多少次/帧数）
        */
        easeInOutQuad(t, b, c, d) {
            // 判断当前时间是否总在总时间的一半以内，是的话执行缓入函数，否则的话执行缓出函数
            if ((t /= d / 2) < 1) { 
                return c / 2 * t * t + b
            } else {
                // 将总长度设置为一半，并且时间从当前开始递减，对图像进行垂直向上平移
                return -c / 2 * (--t * (t - 2) - 1) + b
            }
        },
        navMouseOver: function(index) {
            this.navActive = index
        },
        navMouseLeave: function(index) {
         this.navActive = -1
        },
    },
  
}
</script>


<style lang="less" scoped>
  .commonIcon{
    position: fixed;
    z-index: 1;
    right: 105px;
    transform: translate(0,-50%);
    z-index: 111;
    top: 50%;

    ul{
        background: #fff;
        border-radius: 50px;
        padding: 10px 0;

        li{
            position: relative;
        }

        .active{
            background: #eeeeee;
        }

        li:last-child{
            cursor: pointer;
        }
    }

    .icon{
      text-align: center;
      width: 76px;
      padding: 10px 0;
      img{
        width: 34px;
        height: 34px;
        margin-bottom: 8px;
      }

      p{
        font-size: 12px;
        color: #333;
      }
    }

    .cont{
      position: absolute;
      right: 76px;
      top: 0;
    }

    .severCont{
      display: flex;
      align-items:center;
      width: 253px;
      height: 66px;
      background: #fff;
      justify-content: center;
      border-radius: 4px;

      .info{
        display: flex;
        align-items:center;
        justify-content: center;
        width: 222px;
        height: 34px;
        background: #eeeeee;
        border-radius: 4px;
      }

      p{
        color: #000;
        margin-left: 8px;
      }

      img{
        width: 16px;
        height: 16px;
      }
    }

    .codeCont{
      background: #fff;
      padding: 16px;
      border-radius: 4px;
      img{
        width: 137px;
        height: 137px;
      }
    }

    .complaintCont{
      background: #fff;
      border-radius: 4px;
      padding: 16px 32px;

      .col{
        display: flex;
        align-items: center;
        background: #f3f3f3;
        height: 34px;
        width: 271px;
        border-radius: 4px;
        padding: 0 8px;
        margin-bottom: 16px;

        img{
          width: 16px;
          height: 16px;
          margin-right: 12px;
        }

        input{
          flex: 1;
          height: 100%;
          line-height: 34px;
        }
      }

      .textarea{
        width: 271px;
        border-radius: 4px;
        margin-bottom: 8px;

        p{
          font-size: 14px;
          color: #4E9F5B;
          margin-bottom: 8px;
        }

        textarea{
          background: #f3f3f3;
          border-radius: 4px;
          padding: 8px;
          width: 100%;
          height: 117px;
        }
      }

      .btn{
        text-align: right;

        button{
          width: 70px;
          height: 24px;
          background: #bddfc2;
          border-radius: 4px;
          color: #fff;
          text-align: center;
          line-height: 24px;
        }
      }
    }
  }
</style>
