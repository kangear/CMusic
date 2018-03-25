<template>
  <div>
    <div class="myDiv" @click="myCollect">
      <div class="leftDiv"><span class="iconfont shoucang"></span>我的收藏</div>
      <div class="rightDiv"><span class="iconfont jiantou"></span></div>
    </div>
    <div class="myDiv" @click="switchTheme">
      <div class="leftDiv"><span class="iconfont icon-tuijiankong"></span>切换主题</div>
      <div class="rightDiv"><span class="iconfont jiantou"></span></div>
    </div>
    <div class="myDiv">
      <div class="leftDiv"><span class="iconfont banben"></span>版本介绍</div>
      <div class="rightDiv"><span style="margin-right: 5px">version 2.0</span><mt-badge type="error" size="small">new</mt-badge></div>
    </div>
    <div class="myDiv" @click="callHzc">
      <div class="leftDiv"><span class="iconfont lianxi" ></span>联系作者</div>
      <div class="rightDiv"><span class="iconfont jiantou"></span></div>
    </div>
    <div class="myDiv" @click="share">
      <div class="leftDiv"><span class="iconfont fenxiang" ></span>分享网站</div>
      <div class="rightDiv"><span class="iconfont jiantou"></span></div>
    </div>
  </div>
</template>

<script>
  import { Badge } from 'mint-ui';
  import Vue from 'vue'
  import { Toast } from 'mint-ui';
  Vue.component(Badge.name, Badge);
  export default {
    data(){
      return{

      }
    },
    created(){


    },
    methods:{
      myCollect(){
        this.$router.push({path:'/myCollect'})
      },
      switchTheme(){
        Toast('敬请期待')
      },
      callHzc(){
        Toast('敬请期待')
      },
      share(){
        Toast('敬请期待')
      }

    }
  }
</script>

<style scoped>
  .myDiv{
    width: 100%;
    float: left;
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
  }
  .leftDiv{
    width: calc(60% - 40px);
    float: left;
    padding:10px 0 10px 20px;
  }
  .rightDiv{
    width: calc(40% + 10px);
    float: left;
    padding: 10px 0;
    text-align: right;
  }
</style>

