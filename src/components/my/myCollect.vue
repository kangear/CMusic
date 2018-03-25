<template>
  <div class="parent">
    <div class="title">
      <span class="iconfont fanhui" @click="goBack"></span>
      <span class="iconfont shoucang"></span>我的收藏</div>
    <div class="songDiv"   v-for="item in songList" @click="doSong(item.data)">
      <div class="leftDiv">
        <div class="songnameDiv">{{item.data.songname}}</div>
        <div class="lineDiv">-</div>
        <div class="singerDiv">{{item.data.singer[0].name}}</div>
      </div>
      <div class="rightDiv">
        <span class="iconfont bofang"></span>
        <span class="iconfont xiazai"></span>
        <span class="iconfont shanchu" @click.stop="delMyCollect(item)"></span>

      </div>
    </div>
    <div class="kongDiv" v-if="songList.length == 0">
      <span class="iconfont icon-yinyueshi"></span>什么都没有
    </div>
  </div>
</template>

<script>
  import { MessageBox } from 'mint-ui';
  import Bus from '../../global/bus.vue'
  export default {
    data(){
      return{
        songList:[]
      }
    },
    created(){
      this.getCollectMessage()
    },
    methods:{
      goBack(){
        const root = this;
        root.$router.go(-1);

      },
      getCollectMessage(){
        const root = this;
        if(localStorage.getItem('collectMessage')){
          root.songList = JSON.parse(localStorage.getItem('collectMessage'))
        }else{
          root.songList = [];
        }

      },
      doSong(item){
        const root = this;
        item.showSmallSong = true;
        Bus.$emit('acceptMessage', item)
      },
      delMyCollect(item){
        const root = this;
        MessageBox.confirm('确定删除吗').then(() => {
          let songListArr = [];
          for(let i = 0; i < root.songList.length; i++){
            if(item.data.songmid != root.songList[i].data.songmid){
              songListArr.push(root.songList[i]);
            }
          }
          if(songListArr.length == 0){
            localStorage.removeItem('collectMessage');
          }else{
            localStorage.setItem('collectMessage',JSON.stringify(songListArr));

          }
          root.getCollectMessage();


        }).catch(()=>{})

      }
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
  .songDiv{
    width: 100%;
    float: left;
    border-bottom: 1px solid #ccc;
    height:50px;
  }


  .leftDiv{
    float: left;
    height: 100%;
    line-height: 50px;
    width: calc(65% - 30px);
    margin: 0 15px;
  }
  .rightDiv{
    float: left;
    height: 100%;
    line-height: 50px;
    width: calc(35% - 10px);
    margin: 0 5px;
    text-align: center;
  }
  .songnameDiv,.singerDiv{
    width: 40%;
    float: left;
    text-align: center;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .lineDiv{
    width: 20%;
    float: left;
    text-align: center;
  }
  .bofang{
    color: #67C23A;
    position: relative;
  }
  .shanchu{
    color: #F56C6C;
    position: relative;
  }
  .xiazai{
    color: #409EFF;
    position: relative;
  }
  .fanhui{
    color: white;
    position: absolute;
    top: 0;
    left: 0;
    margin: 0 20px;
  }
  .kongDiv{
    text-align: center;
    margin: 200px 0 0 0;
    color: #ccc;
    font-size: 22px;
  }
</style>
