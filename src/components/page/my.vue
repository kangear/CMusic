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
      <div class="leftDiv"><span class="iconfont lianxi" ></span>作者信息</div>
      <div class="rightDiv"><span class="iconfont jiantou"></span></div>
    </div>
    <div class="myDiv" @click="share">
      <div class="leftDiv"><span class="iconfont fenxiang" ></span>分享网站</div>
      <div class="rightDiv"><span class="iconfont jiantou"></span></div>
    </div>
    <mt-popup
      v-model="popupVisible"
      position="bottom"
      class="sharePopup"
    >
      <div class="jiathis_style_m" @click="text"></div>
    </mt-popup>
  </div>
</template>

<script>
  import { Badge } from 'mint-ui';
  import Vue from 'vue'
  import { Toast } from 'mint-ui';
  import { Popup } from 'mint-ui';
  import { Indicator } from 'mint-ui';

  Vue.component(Popup.name, Popup);
  Vue.component(Badge.name, Badge);
  export default {
    data(){
      return{
        popupVisible:false,
      }
    },
    created(){
      this.init()

    },

    methods:{
      init: function () {
        Indicator.open();
        setTimeout(function () {
          Indicator.close();
        },100)
        let url = 'http://v3.jiathis.com/code/jiathis_m.js'
        let script = document.createElement('script')
        script.setAttribute('src', url)
        document.getElementsByTagName('head')[0].appendChild(script)
      },
      myCollect(){
        this.$router.push({path:'/myCollect'})
      },
      switchTheme(){
        this.$router.push({path:'/switchTheme'})
      },
      callHzc(){
        this.$router.push({path:'/authorMessage'})
      },
      share(){
        const root = this;
        root.popupVisible = true;
      },
      text(){
        this.$router.push({path:'/'})
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
  .sharePopup{
    width: 100%;
    max-width: 520px;
    text-align: center;
    padding: 50px 0;
  }
  .jiathis_style_m{
    display: inline-block;
  }
</style>

