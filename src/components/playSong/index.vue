<template>
  <div id="parent">
    <div class="bg"></div>
    <div class="bgUp"></div>
    <div class="playSongDiv" :style="playSongDiv" @click="doSong">
      <img class="playImg" :src="'http://imgcache.qq.com/music/photo/album_300/'+(songMessage.data.albumid%100)+'/300_albumpic_'+songMessage.data.albumid+'_0.jpg'">
    </div>
    <audio id="audio" :src="'http://ws.stream.qqmusic.qq.com/C100'+songMessage.data.songmid+'.m4a?fromtag=0'"  controls="controls"></audio>

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
  import { Indicator } from 'mint-ui';
  import { MessageBox } from 'mint-ui';
  export default {
    data(){
      return{
        lyric:[],//存放歌词和歌词时间
        transform:{//所有歌词存放样式
          transform:'',
        },
        songMessage:{},//存放存过来的音乐对象
        popupVisible:false,
        timeStart:'',//存放定时器
        times:{//存放歌词时间变量
          n:20,
          i:0
        },
        isPlay:false,//判断是否为播放状态

        rotate:{//旋转变量
          angle:0,
          rotateTimeStart:''
        },
        playSongDiv:{},//图片父元素样式
      }
    },
    created(){
      this.getSongMessage();
      this.getSong();

    },
    methods:{
      getSong(){
        const root = this;
        Indicator.open('努力加载中...');
        let id = "213212911";
        let txt= "http://music.qq.com/miniportal/static/lyric/"+id%100+"/"+id+".xml";
        let YqlUrl= 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D"'+txt+'"&format=json&diagnostics=true&callback=?'
        $.getJSON(YqlUrl,function(data) {
          Indicator.close();
          if(!data.query.results){
            MessageBox('提示', '抱歉！歌词被搬到银河系了~');
          }
          else{
            let lyricTime = [];
            for(let i = 6;i<data.query.results.lyric.split("[").length;i++){
              root.lyric.push({
                lyric:data.query.results.lyric.split("[")[i].split("]")[1],
                lyricTime:root.getTime(data.query.results.lyric.split("[")[i].split("]")[0]),
                lyFontStyle:{//所有单条歌词样式
                  fontSize:'14px',
                  color:'white'
                },
              })
            }
          }



        });

      },
      getSongMessage(){
        const root = this;
        root.songMessage=JSON.parse(sessionStorage.getItem('songMessage'));
      },
      doSong(){
        const root = this;
        root.isPlay = !root.isPlay;
        let audio = $('#audio')[0];

        if(root.isPlay){
          audio.play();
          root.lyricsPlay();
          root.doRotate();
        }else{
          audio.pause();
          clearInterval(root.rotateTimeStart);
          root.lyricsPause();
        }

      },

      //歌词开始播放
      lyricsPlay(){
        const root = this;
        if(root.lyric.length > 0){
          root.doLyrics(root.lyric[root.times.i].lyricTime);
        }

      },
      //歌词暂停播放
      lyricsPause(){
        const root = this;
        clearTimeout(root.timeStart);
      },

      doLyrics(time){
        const root = this;
        ++root.times.i;
        root.times.n-=20;
        root.timeStart = setTimeout(function () {
          root.lyric[root.times.i].lyFontStyle={
            fontSize:'16px',
            color:'#67C23A'

          }
          for(let i = 0;i<root.lyric.length;i++){
            if(i!=root.times.i){
              root.lyric[i].lyFontStyle={
                fontSize:'14px',
                color:'white'

              }
            }
          }
          root.$set(root.transform,'transform','translateY('+root.times.n+'px)');
          root.doLyrics(root.lyric[root.times.i].lyricTime);

        },parseInt(root.lyric[root.times.i].lyricTime)-time);
        if(root.times.i==root.lyric.length-2){
          clearTimeout(root.timeStart);
        }
      },
      doRotate(){
        const root = this;
        root.rotateTimeStart=setInterval(function () {
          root.rotate.angle+=0.1;
          root.playSongDiv={
            transform:'rotate('+root.rotate.angle+'deg)'
          }
          if(parseInt(root.rotate.angle==360)){
            root.rotate.angle=0;
          }
        })
      },
      getTime(str){
        let minutes = parseInt(str.split(':')[0]);
        let seconds = parseInt(str.split(':')[1].split('.')[0]);
        let ms = parseInt(str.split('.')[1]);
        return (minutes*60+seconds+ms/100)*1000;
      }
    }
  }
</script>

<style scoped>
  #parent{

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
    width: calc(100% - 70px);
    margin: 0 35px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    font-size: 0.8rem;
    position: relative;
  }
</style>
