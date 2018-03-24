<template>
  <div id="parent">
    <div class="topBar">
      <span class="iconfont fanhui" @click="goBack"></span>
    </div>
    <div class="bg"></div>
    <div class="bgUp"></div>
    <div class="playSongDiv"  @click="doSong">
      <span v-if="showPlay" @click="doSong('pause')" class="iconfont bofang"></span>
      <span v-if="!showPlay" @click="doSong('play')" class="iconfont zanting"></span>
      <img class="playImg" :style="animationPlayState"  :src="'http://imgcache.qq.com/music/photo/album_300/'+(songMessage.albumid%100)+'/300_albumpic_'+songMessage.albumid+'_0.jpg'">
    </div>
    <!--<audio id="audio" :src="'http://ws.stream.qqmusic.qq.com/C100'+songMessage.songmid+'.m4a?fromtag=0'"  controls="controls"></audio>-->

    <div class="lyric">
      <div class="transformDiv" :style="transform">
        <div v-for="item in lyric" :style="item.lyFontStyle">{{item.lyric}}</div>
      </div>

    </div>

  </div>
</template>

<script>
  import $ from 'jquery'
  import Vue from 'vue'
  import http from 'axios'

  import currentTime from '../../global/currentTime.vue'
  import Base64 from 'js-base64'
  import { Indicator } from 'mint-ui';
  import { MessageBox } from 'mint-ui';
  export default {
    data(){
      return{
        lyric:[],//存放歌词和歌词时间
        transform:{//所有歌词存放样式
          transform:'',
        },
        animationPlayState:{
          animationPlayState:'paused'
        },
        showPlay:true,
        songMessage:{},//存放存过来的音乐对象
        popupVisible:false,
        timeStart:'',//存放定时器
        times:{//存放歌词时间变量
          n:20,
          i:0
        },
        isPlay:false,//判断是否为播放状态
      }
    },
    created(){
      this.getSongMessage();
      this.getCurrentTime();

    },
    methods:{
      goBack(){
        const root = this;
        root.$router.go(-1);

      },
//      getSong(){
//        const root = this;
//        http.get('/getLrc',{params:{songId:root.songMessage.songmid}}).then((data)=>{
//          eval(data.data);//再次执行一次代码
//          function MusicJsonCallback_lrc(data){
//            let lyric = Base64.Base64.decode(data.lyric).split("[offset:0]")[1].split('\n');
//            for(let i = 1;i<lyric.length;i++){
//              if(lyric[i].split("[")[1].split("]")[1]){
//                root.lyric.push({
//                  lyric:lyric[i].split("[")[1].split("]")[1],
//                  lyricTime:root.getTime(lyric[i].split("[")[1].split("]")[0]),
//                  lyFontStyle:{//所有单条歌词样式
//                    fontSize:'14px',
//                    color:'white'
//                  },
//                })
//              }
//
//            }
//          }
//        })
//
//
//      },
      getSongMessage(){
        const root = this;
        root.songMessage = JSON.parse(sessionStorage.getItem('songMessage'));
        root.showPlay = false;
        root.animationPlayState.animationPlayState = 'running'

      },
      getCurrentTime(){
        const root = this;

        currentTime.$on('currentTime',(msg) =>  {

          root.lyric = JSON.parse(sessionStorage.getItem('songLyric'));


            for(let i = 0;i <msg.lyric.length;i++){
              root.$set(root.lyric[i].lyFontStyle,'fontSize',msg.lyric[i].lyFontStyle.fontSize);
              root.$set(root.lyric[i].lyFontStyle,'color',msg.lyric[i].lyFontStyle.color);
            }
            root.$set(root.transform,'transform','translateY('+(msg.i*20*(-1)+20)+'px)');
        })
      },
      doSong(s){
        const root = this;
        switch (s){
          case 'play':root.showPlay = !root.showPlay;$('#audio')[0].pause();root.animationPlayState.animationPlayState = 'paused';break;
          case 'pause':root.showPlay = !root.showPlay;$('#audio')[0].play();root.animationPlayState.animationPlayState = 'running';break;
        }

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
  #parent{
    position: relative;
    z-index: 1;
  }
  .topBar{
    width: 100%;
    position: absolute;
    top: 0;
    padding: 20px;
    z-index: 999;
  }
  .bg{
    background: url("http://imgcache.qq.com/music/photo/album_300/67/300_albumpic_138767_0.jpg") no-repeat;
    background-size: 100% 100%;
    filter: blur(10px);
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .bgUp{
    position: absolute;
    width: 100%;
    height: 100%;
    background: black;
    opacity: 0.8;
  }
  .playSongDiv{
    width: 296px;
    height: 296px;
    margin: 70px auto 0 auto;
    background: black;
    border-radius: 50%;
    position: relative;
    box-shadow: 0 0 5px 10px #606266;
  }

  .playImg{
    position: absolute;
    width: 256px;
    margin: 20px;
    border-radius: 50%;
    animation: rotation 10s linear infinite;
  }
  @keyframes rotation{
    from {transform: rotate(0deg);}
    to {transform: rotate(360deg);}
  }

  #audio{
    display: none;
  }
  .lyric{
    margin-top: 25px;
    height: 60px;
    overflow: hidden;
    position: relative;
  }
  .transformDiv{
    position: relative;
    transition: transform 0.5s linear;
  }
  .transformDiv>div{
    width: 100%;
    height: 20px;
    line-height: 20px;
    text-align: center;
    font-size: 0.8rem;
    position: relative;
  }
  .bofang,.zanting{
    font-size: 56px;
    position: absolute;
    left:120px;
    top:120px;
    color: white;
    z-index: 999;
  }
  .fanhui{
    color: white;
  }
</style>
