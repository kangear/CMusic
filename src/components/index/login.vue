<template>
  <div id="parent">
    <transition name="slide-fade">
        <div class="welcome" v-if="showLogin">Welcome</div>
    </transition>
    <transition name="slide-fade">
        <div class="to"  v-if="showLogin" ><span class="iconfont bofang"></span>To</div>
    </transition>
    <transition name="bounce">
      <div class="cmusic" v-if="showLogin" >CMusic</div>
    </transition>
    <transition name="slide-fade">
        <div class="loading"  v-if="showLogin" >Loading...</div>
    </transition>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        showLogin:false
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
          setTimeout(function () {
            root.$router.push({path:'/navigation/lastNew'})
          },2000)
        },2000);
      }
    }
  }
</script>

<style scoped>
  #parent{
    text-align: center;
    background: #054547;
  }
  #parent>div{
    width: 100%;
    float: left;
    text-align: center;

  }
  .welcome{
    height: 17vh;
    line-height: 17vh;
    font-size: 10vh;
    color: white;
  }
  .to{
    height: 17vh;
    line-height: 17vh;
    font-size: 10vh;
    color: white;
  }
  .bofang{
    font-size: 10vh;
  }
  .cmusic{
    height: 25vh;
    line-height: 25vh;
    font-size: 15vh;
    color: white;
  }
   .loading{
     height: 17vh;
     line-height: 17vh;
     font-size: 10vh;
     color: white;
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
