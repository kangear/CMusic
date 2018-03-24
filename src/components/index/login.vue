<template>
  <div id="parent">
    <transition name="slide-fade">
        <div class="welcome" v-if="showLogin">Welcome</div>
    </transition>
    <transition name="slide-fade">
        <div class="to"  v-if="showLogin" ><span class="iconfont icon-yinyueshi"></span>To</div>
    </transition>
    <transition name="bounce">
      <div class="cmusic" v-if="showCMusic" ><span style="color: #E6A23C">C</span>Music</div>
    </transition>
    <transition
      name="custom-classes-transition"
      enter-active-class="animated jello"
      leave-active-class="animated snake"
    >
    <div class="loading" v-if="loadingBtn"><mt-button type="default" size="normal" @click="doLogin">
      <span class="iconfont bofang"></span>Let's Go !
    </mt-button></div>
    </transition>
    <transition name="slide-fade">
      <div v-if="showLogin" class="author">
        author : hzc<br>
        github : https://github.com/hhzzcc/CMusic
      </div>
    </transition>

  </div>
</template>

<script>
  import Vue from 'vue'
  import { Button } from 'mint-ui';

  Vue.component(Button.name, Button);
  export default {
    data(){
      return{
        showLogin:false,
        showCMusic:false,
        loadingBtn:false,
      }
    },
    mounted(){
      this.loading();
    },
    methods:{
      loading(){
        const root = this;
        setTimeout(function () {
          root.showLogin = true;
          setTimeout(function(){
            root.showCMusic = true;
            setTimeout(function () {
              root.loadingBtn = true;
            },500)
          },500)
        },500);
      },
      doLogin(){
        const root = this;
        root.$router.push({path:'/navigation/lastNew'})

      }
    }
  }
</script>

<style scoped>
  #parent{
    text-align: center;
    background: #054547;
    z-index: 1;
    position: relative;
  }
  #parent>div{
    float: left;
  }
  .welcome{
    width: 100%;
    height: 17vh;
    line-height: 17vh;
    font-size: 10vh;
    color: white;
    text-align: center;
  }
  .to{
    width: 100%;
    height: 17vh;
    line-height: 17vh;
    font-size: 10vh;
    color: white;
    text-align: center;
  }
  .icon-yinyueshi{
    font-size: 10vh;
    color: #67C23A;
  }
  .cmusic{
    width: 100%;
    height: 25vh;
    line-height: 25vh;
    font-size: 15vh;
    color: #67C23A;
    text-align: center;
  }
   .loading{
     width: 100%;
     height: 17vh;
     line-height: 17vh;
     text-align: center;
   }
   .author{
     width: 90%;
     margin: 0 5% 5vh 5%;
     height: 5vh;
     position: absolute;
     bottom: 0;
     line-height: 5vh;
     color: white;
     text-align: left;
     font-size: 10%;

   }
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }
  .bounce-enter-active {
    animation: bounce-in .5s;
  }
  .bounce-leave-active {
    animation: bounce-in .5s reverse;
  }
  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }
</style>
