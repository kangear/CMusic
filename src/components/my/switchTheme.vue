<template>
  <div class="parent">
    <div class="title">
      <span class="iconfont fanhui" @click="goBack"></span>
      <span class="iconfont icon-tuijiankong"></span>切换主题</div>
      <div v-for="(item,index) in theme" :id="'theme'+index" class="theme">
        <img>
        <div class="themeTitle"></div>
      </div>
  </div>
</template>

<script>
  import { MessageBox } from 'mint-ui';
  export default {
    data(){
      return{
        theme:[
          {
            name:'默认',
            value:0,
          }
        ]
      }
    },
    created(){

    },
    methods:{
      goBack(){
        const root = this;
        root.$router.go(-1);

      },
    }
  }
</script>
<style scoped>
  .parent{
    margin-top: 80px;
  }
  .title{
    position: fixed;
    top: 0;
    max-width: 520px;
    margin: 0 auto;
    width: 100%;
    background: #054547;
    height: 80px;
    text-align: center;
    line-height: 80px;
    font-size: 1.1rem;
    color: white;
    box-sizing: border-box;
    z-index: 1;
  }
  .fanhui{
    color: white;
    position: absolute;
    top: 0;
    left: 0;
    margin: 0 20px;
  }
  .theme{
    width: calc(100% / 4 - 50px);
    float: left;
    padding: 25px;
  }
  .theme>img,.theme>div{
    float: left;
    width: 100%;
  }
  .themeTitle{
    text-align: center;
    height: 20px;
    line-height: 20px;

  }
  .theme{
    background: red;
  }


</style>
