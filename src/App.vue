<template>
  <div id="app">
    <router-view/>
    <transition name="slide-fade">
      <div class="themeSmallSong" v-if="songSmallMessage.showSmallSong" >
        <span class="iconfont guanbi" @click="doSong('close')"></span>
        <span v-if="showIcon_shunxu" class="iconfont shunxu" @click="playModel('shunxu')"></span>
        <span v-if="showIcon_danqu" class="iconfont danqu" @click="playModel('danqu')"></span>
        <span v-if="showIcon_suiji" class="iconfont suiji" @click="playModel('suiji')"></span>
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
            <div class="rangeTime" slot="start" style="margin-right: 5px">{{startTime}}</div>
            <div class="rangeTime" slot="end" style="margin-left: 10px">{{endTime}}</div>
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
  import { Indicator } from 'mint-ui';
  import { Toast } from 'mint-ui';
  import Base64 from 'js-base64'

  Vue.component(Range.name, Range);

  export default {
    data(){
      return{
        showPlay:false,
        timeStart:'',
        songSmallMessage:{},
        songRange:0,
        songMaxRange:1,
        animationPlayState:{
          animationPlayState:'running'
        },
        lyric:[],
        startTime:'',
        endTime:'',

        showIcon_shunxu:true,
        showIcon_danqu:false,
        showIcon_suiji:false,
        theme:[
          {
            value:0,
            style:{
              background:'#054547',
            }
          },
          {
            value:1,
            style:{
              background:'rgb(116, 3, 73)',
            }
          },
          {
            value:2,
            style:{
              background:'rgb(95, 86, 54)',
            }
          },

        ]
      }
    },

    created(){
      this.getBus();



    },
    updated(){
      this.getTheme();
      $('.mt-range-thumb').css('top','10px');
      $('.mt-range-thumb').css('width','10px');
      $('.mt-range-thumb').css('height','10px');
      $('.mt-range-runway').css('width','100%');
      $('.mt-range-content').css('marginRight','unset')
    },
    methods:{
      getTheme(){
        const root = this;
        if(localStorage.getItem('songTheme')){
          let value = localStorage.getItem('songTheme');
          for(let i = 0;i<root.theme.length; i++){
            if(root.theme[i].value == value){
              $('.themeTitle').css('background',root.theme[i].style.background);
              $('.themeSmallSong').css('background','-webkit-linear-gradient(to right,'+root.theme[i].style.background+',#606266)');
              $('.themeSmallSong').css('background','-o-linear-gradient(to right, '+root.theme[i].style.background+' , #606266)');
              $('.themeSmallSong').css('background','-moz-linear-gradient(to right, '+root.theme[i].style.background+' , #606266)');
              $('.themeSmallSong').css('background','linear-gradient(to right, '+root.theme[i].style.background+' , #606266)');
            }
          }
        }else{
          $('.themeTitle').css('background','#054547');
          $('.themeSmallSong').css('background','-webkit-linear-gradient(to right,#054547,#606266)');
          $('.themeSmallSong').css('background','-o-linear-gradient(to right, #054547 , #606266)');
          $('.themeSmallSong').css('background','-moz-linear-gradient(to right, #054547 , #606266)');
          $('.themeSmallSong').css('background','linear-gradient(to right, #054547 , #606266)');
        }
      },
      getBus(){
        const root = this;
        Bus.$on('acceptMessage',(msg) => {
          root.songRange = 0;
          root.songMaxRange = 0;
          root.songSmallMessage = msg;
          sessionStorage.setItem('songMessage',JSON.stringify(root.songSmallMessage));
          if( $('#audio')[0] && root.songSmallMessage.songmid){
            $('#audio')[0].play();
          }
          root.showPlay = false;
          root.animationPlayState.animationPlayState = 'running'
          root.getSongTime();
          root.getSong();
        })
      },
      //调用后台接口获取歌词
      getSong(){
        const root = this;
        root.lyric = [];
        http.get('/getLrc',{params:{songId:root.songSmallMessage.songmid}}).then((data)=>{
          eval(data.data);//再次执行一次代码
          function MusicJsonCallback_lrc(data){
            let lyric = Base64.Base64.decode(data.lyric).split("[offset:0]")[1].split('\n');
            for(let i = 1;i<lyric.length;i++){
              if(lyric[i]){
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
          }
          sessionStorage.setItem('songLyric',JSON.stringify(root.lyric));
        })


      },
      getSongTime(){
        const root = this;
        let num = 0;
        clearInterval(root.timeStart)
        root.timeStart = setInterval(function () {
          if( $('#audio')[0] && root.songSmallMessage.songmid){
            root.songRange = Math.floor($('#audio')[0].currentTime * 10 );
            root.songMaxRange = Math.floor($('#audio')[0].duration * 10 );
            root.startTime = root.getNewTime(root.songRange / 10);
            root.endTime = root.getNewTime(root.songMaxRange / 10);
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
            if($('#audio')[0].paused){
              root.showPlay = true;
              root.animationPlayState.animationPlayState = 'paused';
            }else{

              root.showPlay = false;
              root.animationPlayState.animationPlayState = 'running';
            }
            currentTime.$emit('currentTime',para);
          }
          console.log(root.showIcon_danqu)
          if(root.songRange == root.songMaxRange){
            if(root.showIcon_shunxu){
              let n = 0;
              if(localStorage.getItem('collectMessage')){
                console.log(root.songSmallMessage.songmid);
                for(let i = 0 ;i <JSON.parse(localStorage.getItem('collectMessage')).length; i++){
                  if(root.songSmallMessage.songmid == JSON.parse(localStorage.getItem('collectMessage'))[i].data.songmid){
                    n = i+1;
                  }
                }
                if(n >= JSON.parse(localStorage.getItem('collectMessage')).length){
                  n = 0;
                }
              }
              let data = JSON.parse(localStorage.getItem('collectMessage'))[n].data;
              data.showSmallSong = true;
              Bus.$emit('acceptMessage',data)
            }else if(root.showIcon_danqu){
              Bus.$emit('acceptMessage',root.songSmallMessage)
            }

          }

        },70)
      },

      doSong(s){
        const root = this;
        switch (s){
          case 'play':root.showPlay = true;$('#audio')[0].pause();root.animationPlayState.animationPlayState = 'paused';break;
          case 'pause':root.showPlay = false;$('#audio')[0].play();root.animationPlayState.animationPlayState = 'running';break;
          case 'close':clearInterval(root.timeStart);root.songSmallMessage.showSmallSong=false;
            $('#audio')[0].pause();root.songRange=0;root.songMaxRange=0;root.songSmallMessage = {};break;
        }
      },
      playSong(){
        const root = this;
        root.$router.push({path:'/playSongIndex'});
      },
      getTime(str){
        let minutes = parseInt(str.split(':')[0]);
        let seconds = parseInt(str.split(':')[1].split('.')[0]);
        let ms = parseInt(str.split('.')[1]);
        return Math.floor((minutes*60+seconds+ms/100)*10);
      },
      getNewTime(str){

        let minutes = Math.floor(str / 60);
        let seconds = Math.floor(str - 60 * minutes);
        if(minutes < 10){
          minutes = '0' + minutes;
        }
        if(seconds < 10){
          seconds = '0' + seconds;
        }
        let time = minutes+':'+seconds;
        return time;
      },
      playModel(str){
        switch (str){
          case 'shunxu':this.showIcon_shunxu = false;this.showIcon_danqu = true;Toast('已切换到单曲播放');break;
          case 'danqu':this.showIcon_danqu = false;this.showIcon_suiji = true;Toast('已切换到随机播放');break;
          case 'suiji':this.showIcon_suiji = false;this.showIcon_shunxu = true;Toast('已切换到顺序循环');break;
        }
      }

    }
  }
</script>


<style scoped>
  .iconfont{
    font-size: 1.3rem;
  }
  .themeSmallSong{
    width: 100%;
    position: fixed;
    bottom: 0;
    height: 10vh;
    max-width: 520px;

  }
  .themeSmallSong>div{
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
    margin-top: calc(5vh - 15px);
    width: 80%;

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
  .shunxu,.danqu,.suiji{
    position: absolute;
    top: 3vh;
    right: 5vh;
    color: white;
    font-size: 4vh;
  }
  .bofang,.zanting{
    position: absolute;
    top: 3vh;
    right: 10vh;
    color: white;
    font-size: 4vh;
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
  .rangeTime{
    color: white;
    font-size: 10px;
  }
  /*.themeTitle{*/
    /*background: #054547;*/

  /*}*/
  /*.themeSmallSong{*/
    /*background: -webkit-linear-gradient(to right,#054547,#606266); !* Safari 5.1 - 6.0 *!*/
    /*background: -o-linear-gradient(to right, #054547 , #606266); !* Opera 11.1 - 12.0 *!*/
    /*background: -moz-linear-gradient(to right, #054547 , #606266); !* Firefox 3.6 - 15 *!*/
    /*background: linear-gradient(to right, #054547 , #606266); !* 标准的语法 *!*/
  /*}*/
</style>



