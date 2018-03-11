<template>
  <div id="parent">
    <div class="header">
      <div v-for="item in navigation" :style="item.style" @click="loadPage(item.className)" >
        <span :class="item.icon"></span>{{item.name}}
      </div>

    </div>
    <router-view class="loadRouter"></router-view>
    <div class="showBottomDiv" v-if="songSmallMessage.showSmallSong"></div>
    <transition name="slide-fade">
      <div class="smallSong" v-if="songSmallMessage.showSmallSong">
        <span class="iconfont guanbi" @click="doSong('close')"></span>
        <span v-if="showPlay" @click="doSong('pause')" class="iconfont bofang"></span>
        <span v-if="!showPlay" @click="doSong('play')" class="iconfont zanting"></span>
        <div class="leftDiv">
          <img class="playImg" autoplay :src="'http://imgcache.qq.com/music/photo/album_300/'+(songSmallMessage.data.albumid%100)+'/300_albumpic_'+songSmallMessage.data.albumid+'_0.jpg'">
        </div>
        <div  class="rightDiv">
          <mt-range
            class="mtRange"
            :value.sync="songRange"
            :min="0"
            :max="songMaxRange"
            :bar-height="1">
          </mt-range>
          <audio id="audio"  autoplay :src="'http://ws.stream.qqmusic.qq.com/C100'+songSmallMessage.data.songmid+'.m4a?fromtag=0'"  controls="controls"></audio>
        </div>

    </div>
    </transition>
  </div>
</template>

<script>
  import Vue from 'vue'
  import $ from 'jquery'
  import Bus from '../../global/bus.vue'
  import { Range } from 'mint-ui';

  Vue.component(Range.name, Range);

  export default {
    data(){
      return{
        showPlay:false,
        timeStart:'',
        songSmallMessage:{},
        songRange:0,
        songMaxRange:0,
        navigation:[
          {
            className:'lastNew',
            name:'最新',
            style:{
              borderBottom:'3px solid white'
            },
            iconName:'yinyue',
            icon:'iconfont icon-yinyueshi',
            path:'/navigation/lastNew'
          },
          {
            className:'recommended',
            name:'推荐',
            iconName:'tuijian',
            icon:'iconfont icon-tuijiankong',
            path:'/navigation/recommended'
          },
          {
            className:'search',
            name:'搜索',
            iconName:'sousuo',
            icon:'iconfont icon-sousuokong',
            path:'/navigation/search'
          },
          {
            className:'my',
            name:'我的',
            iconName:'wode',
            icon:'iconfont icon-wodekong',
            path:'/navigation/my'
          },
        ]
      }
    },
    created(){
//      this.loadPage(this.$router.history.current.path.split('/navigation/')[1]);
      this.getBus();
    },
    updated(){
      $('.mt-range-thumb').css('top','10px');
      $('.mt-range-thumb').css('width','10px');
      $('.mt-range-thumb').css('height','10px');
      $('.mt-range-runway').css('width','100%');

    },
    methods:{
      getBus(){
        const root = this;
        Bus.$on('acceptMessage',(msg) => {
          root.songSmallMessage=msg;
          root.showPlay=false;
          root.getSongTime();

        })
      },
      getSongTime(){
        const root = this;
        root.timeStart = setInterval(function () {
          if( $('#audio')[0]){
            root.songRange = $('#audio')[0].currentTime;
            root.songMaxRange = $('#audio')[0].duration;
          }

          if(Math.floor(root.songRange) == Math.floor(root.songMaxRange)){
//            clearInterval(root.timeStart);
            root.showPlay = true;
          }
        },100)
      },
      //点击导航条按钮发生变化
      loadPage(e){
        const root = this;
        for(var i=0;i<root.navigation.length;i++){
          root.navigation[i].style={};
          root.navigation[i].icon='iconfont icon-'+root.navigation[i].iconName+'kong'
          if(root.navigation[i].className==e){
            root.navigation[i].style={
              borderBottom:'3px solid white'
            }
            root.navigation[i].icon=root.navigation[i].icon.split('kong')[0]+'shi';
            root.$router.push({path:root.navigation[i].path})
          }
        }

      },
      doSong(s){
        const root = this;
        switch (s){
          case 'play':root.showPlay = !root.showPlay;$('#audio')[0].pause();break;
          case 'pause':root.showPlay = !root.showPlay;$('#audio')[0].play();break;
          case 'close':clearInterval(root.timeStart);root.songSmallMessage.showSmallSong=false;
          $('#audio')[0].pause();root.songRange=0;root.songMaxRange=0;break;
        }
      },

    }
  }
</script>

<style scoped>
  .header{
    width: 100%;
    max-width: 520px;
    margin: 0 auto;
    position: fixed;
    top: 0;
    background: #054547;
    height: 80px;
    z-index: 999;
  }
  .header>div{
    float: left;
    width: calc(25% - 10px);
    text-align: center;
    height: 60px;
    line-height: 70px;
    font-size: 1.1rem;
    color: white;
    margin: 5px;
    box-sizing: border-box;

  }
  .loadRouter{
    margin-top: 80px;
  }
  .iconfont{
    font-size: 1.3rem;
  }
  .smallSong{
    width: 100%;
    position: fixed;
    bottom: 0;
    height: 10vh;
    max-width: 520px;
    background: -webkit-linear-gradient(to right,#054547,#606266); /* Safari 5.1 - 6.0 */
    /*background: -webkit-gradient(linear,top,from(#1F2D3D),to(#054547));*/
    background: -o-linear-gradient(to right, #054547 , #606266); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(to right, #054547 , #606266); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #054547 , #606266); /* 标准的语法 */
    /*background-color:#054547 ;*/
  }
  .smallSong>div{
    float: left;
    height: 100%;
  }
  .leftDiv{
    width: 25%;
    text-align: center;
  }
  .playImg{
    height: 8vh;
    margin: 5px 0;
    border-radius: 100%;
    box-shadow: 0 0 3px 2px white;
  }
  .rightDiv{
    width: 55%;
  }
  .rightDiv audio{
    width: 100%;
    display: none;
  }
  .mtRange{
    margin-top: calc(5vh - 15px)

  }

  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
  }

  .guanbi{
    position: absolute;
    top: 1vh;
    right: 1vh;
    color: white;
    font-size: 3vh;
  }
  .bofang,.zanting{
    position: absolute;
    top: 3vh;
    right: 8vh;
    color: white;
    font-size: 4vh;
  }
  .showBottomDiv{
    height: 10vh;
    width: 100%;
    float: left;
  }

</style>
