<template>
  <div>
    <mt-search class="search" v-model="searchValue" ></mt-search>
    <div class="listen" v-if="songList.length==0">
      <span class="iconfont icon-yinyueshi"></span>随便听听
    </div>
    <div class="badge" v-if="songList.length==0">

      <span size="large" v-for="item in badgeList" @click="getData(item.title)">{{item.title}}</span>
    </div>
    <div class="songDiv" v-for="item in songList" @click="doSong(item)">
      <div class="leftDiv">
        <div class="songnameDiv">{{item.songname}}</div>
        <div class="lineDiv">-</div>
        <div class="singerDiv">{{item.singer[0].name}}</div>
      </div>
      <div class="rightDiv">
        <span class="iconfont bofang"></span>
        <span class="iconfont shoucang"></span>
        <span class="iconfont xiazai"></span>
      </div>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue';
  import Bus from '../../global/bus.vue';
  import $ from 'jquery';
  import { Search } from 'mint-ui';
  import { Indicator } from 'mint-ui';
  import { Badge } from 'mint-ui';

  Vue.component(Search.name, Search);
  Vue.component(Badge.name, Badge);
  export default {
    data(){
      return{
        searchValue:'',
        songList:[],
        badgeList:[
          {title:'开始懂了'},
          {title:'我好想你'},
          {title:'领悟'},
          {title:'死了都要爱'},
          {title:'青花瓷'},
          {title:'街角的祝福'},
          {title:'洋葱'}
          ]
      }
    },
    created(){

    },
    watch:{
      searchValue(val){
        this.getData(val);
      }
    },
    methods:{
      getData(val){
        const root = this;
        root.searchValue = val;
        Indicator.open('努力加载中...');
        let url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp?g_tk=5381&uin=0&format=jsonp&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&w='+val+'&zhidaqu=1&catZhida=1&t=0&flag=1&ie=utf-8&sem=1&aggr=0&perpage=20&n=20&p=1&remoteplace=txt.mqq.all&_=1520833663464';
        $.ajax({
          url:url,
          type:"get",
          dataType:'jsonp',
          jsonp: "callback",
          jsonpCallback:'callback',
          scriptCharset: 'GBK',//解决中文乱码
          success: function(data){

            root.songList=data.data.song.list;
            console.log(root.songList);
            Indicator.close();
          },
          error:function (e) {
            console.log('error');
            Indicator.close();
          }
        });
      },
      doSong(item){
        const root = this;
        item.showSmallSong = true;
        Bus.$emit('acceptMessage', item)
      }
    }
  }
</script>

<style scoped>
  .mint-search{
   height: auto;
  }
  .search{
    position: fixed;
    z-index: 999;
    top: 80px;
    width: 100%;
    max-width: 520px;
  }
  .badge>span{
    background: white;
    color: black;
    border: 1px solid #67C23A;
    margin:5px 10px;
    border-radius: 14px;
    font-size: 18px;
    padding: 2px 10px;
    text-align: center;
    display: inline-block;
  }

  .songDiv{
    width: 100%;
    float: left;
    border-bottom: 1px solid #ccc;
    height:50px;
  }
  .badge{
    width: 100%;
    float: left;
    margin-top: 10px;
  }
  .listen{
    width: 100%;
    float: left;
    margin-top: 70px;
    padding: 0 10px;
    color: #054547;
  }
  .icon-yinyueshi{
    color: #67C23A;
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
  .shoucang{
    color: #F56C6C;
    position: relative;
  }
  .xiazai{
    color: #409EFF;
    position: relative;
  }
</style>

