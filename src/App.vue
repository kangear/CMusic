<template>
  <div id="app">
    <router-view/>
    <transition name="slide-fade">
      <div class="smallSong" v-if="songSmallMessage.showSmallSong" >
        <span class="iconfont guanbi" @click="doSong('close')"></span>
        <span v-if="showPlay" @click="doSong('pause')" class="iconfont bofang"></span>
        <span v-if="!showPlay" @click="doSong('play')" class="iconfont zanting"></span>
        <div class="leftDiv">
          <img class="playImg" :style="animationPlayState" @click="playSong" autoplay :src="'http://imgcache.qq.com/music/photo/album_300/'+(songSmallMessage.albumid%100)+'/300_albumpic_'+songSmallMessage.albumid+'_0.jpg'">
        </div>
        <div  class="rightDiv">
          <mt-range
            class="mtRange"
            :value.sync="songRange"
            :min="0"
            :max="songMaxRange"
            :bar-height="1">
          </mt-range>
          <audio id="audio"  autoplay :src="'http://ws.stream.qqmusic.qq.com/C100'+songSmallMessage.songmid+'.m4a?fromtag=0'"  controls="controls"></audio>
        </div>

      </div>
    </transition>
  </div>
</template>

<script>
  import Vue from 'vue'
  import $ from 'jquery'
  import http from 'axios'
  import Bus from './global/bus.vue'
  import currentTime from './global/currentTime.vue'
  import { Range } from 'mint-ui';
  import Base64 from 'js-base64'

  Vue.component(Range.name, Range);

  export default {
    data(){
      return{
        showPlay:false,
        timeStart:'',
        songSmallMessage:{},
        songRange:0,
        songMaxRange:0,
        animationPlayState:{
          animationPlayState:'running'
        },
        i:0,
        lyric:[]
      }
    },
    created(){
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
          root.songSmallMessage = msg;
          root.showPlay = false;
          root.animationPlayState.animationPlayState = 'running'
          root.getSongTime();
          root.getSong();

        })
      },
      getSong(){
        const root = this;
        root.lyric = [];
        http.get('/getLrc',{params:{songId:root.songSmallMessage.songmid}}).then((data)=>{
          eval(data.data);//再次执行一次代码
          function MusicJsonCallback_lrc(data){
            let lyric = Base64.Base64.decode(data.lyric).split("[offset:0]")[1].split('\n');
            for(let i = 1;i<lyric.length;i++){
              if(lyric[i].split("[")[1].split("]")[1]){
                root.lyric.push({
                  lyric:lyric[i].split("[")[1].split("]")[1],
                  lyricTime:root.getTime(lyric[i].split("[")[1].split("]")[0]),
                  lyFontStyle:{//所有单条歌词样式
                    fontSize:'14px',
                    color:'white'
                  },
                })
              }

            }
          }
          sessionStorage.setItem('songLyric',JSON.stringify(root.lyric));
        })


      },
      getSongTime(){
        const root = this;
        let num = 0;
        clearInterval(root.timeStart)
        root.timeStart = setInterval(function () {
          if( $('#audio')[0]){
            root.songRange = Math.floor($('#audio')[0].currentTime * 10 );
            root.songMaxRange = Math.floor($('#audio')[0].duration * 10 );
            for(let i = 0; i < root.lyric.length; i++){
              if(root.songRange == root.lyric[i].lyricTime){

                root.lyric[i].lyFontStyle={
                  fontSize:'16px',
                  color:'#67C23A'

                }
                for(let j = 0;j<root.lyric.length;j++){
                  if(j!=i){
                    root.lyric[j].lyFontStyle={
                      fontSize:'14px',
                      color:'white'

                    }

                  }
                }
                num = i;
                break;

              }
            }
            let para = {
              i : num,
              lyric : root.lyric
            }
            currentTime.$emit('currentTime',para);
          }
          if(root.songRange == root.songMaxRange){
            root.showPlay = true;
            clearInterval(root.timeStart)
          }



        },70)
      },
      doSong(s){
        const root = this;
        switch (s){
          case 'play':root.showPlay = !root.showPlay;$('#audio')[0].pause();root.animationPlayState.animationPlayState = 'paused';break;
          case 'pause':root.showPlay = !root.showPlay;$('#audio')[0].play();root.animationPlayState.animationPlayState = 'running';break;
          case 'close':clearInterval(root.timeStart);root.songSmallMessage.showSmallSong=false;
            $('#audio')[0].pause();root.songRange=0;root.songMaxRange=0;break;
        }
      },
      playSong(){
        const root = this;
        sessionStorage.setItem('songMessage',JSON.stringify(root.songSmallMessage));
        root.$router.push({path:'/playSongIndex'});
      },
      getTime(str){
        let minutes = parseInt(str.split(':')[0]);
        let seconds = parseInt(str.split(':')[1].split('.')[0]);
        let ms = parseInt(str.split('.')[1]);
        return Math.floor((minutes*60+seconds+ms/100)*10);
      }

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
    margin: 1vh 0;
    border-radius: 100%;
    box-shadow: 0 0 3px 2px white;
    animation: rotation 10s linear infinite;
  }
  @keyframes rotation{
    from {transform: rotate(0deg);}
    to {transform: rotate(360deg);}
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
<style>
  @import "./components/iconfont/iconfont.css";
  @import "./components/animate/animate.css";

  body,html{
    margin: 0;
    padding: 0;
    border: 0;
    box-sizing: border-box;

  }
  #app {
    width: 100%;
    max-width: 520px;
    margin: 0 auto;
    height: 100vh;
    position: relative;
    overflow-x: hidden;
  }
  #parent{
    width: 100%;
    height: 100%;
    float: left;
  }
</style>



