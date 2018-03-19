<template>
  <div>
    <div class="songDiv" v-for="item in songList" @click="doSong(item.data)">
      <div class="leftDiv">
        <div class="songnameDiv">{{item.data.songname}}</div>
        <div class="lineDiv">-</div>
        <div class="singerDiv">{{item.data.singer[0].name}}</div>
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
  import $ from 'jquery'
  import Bus from '../../global/bus.vue'
  import { Indicator } from 'mint-ui';
  export default {
    data(){
      return{
        songList:[],
      }
    },
    created(){
      this.getData();
    },
    methods:{
      getData(){

        const root = this;
        Indicator.open('努力加载中...');
        let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&tpl=3&page=detail&type=top&topid=36&_=1520777874472';
        $.ajax({
          url:url,
          type:"get",
          dataType:'jsonp',
          jsonp: "jsonpCallback",
          scriptCharset: 'GBK',//解决中文乱码
          success: function(data){
            root.songList=data.songlist;
            Indicator.close();
          },
          error:function (e) {
            console.log('error');
          }
        });
      },
      doSong(item){
        const root = this;
        item.showSmallSong = true;
        Bus.$emit('acceptMessage', item)
//        sessionStorage.setItem('songMessage',JSON.stringify(item));
//        root.$router.push({path:'/playSongIndex'})
      }
    }
  }
</script>

<style scoped>
  .songDiv{
    width: 100%;
    float: left;
    border-bottom: 1px solid #ccc;
    height:8vh;
  }
  .leftDiv,.rightDiv{
    float: left;
    height: 100%;
    line-height: 8vh;


  }
  .leftDiv{
    width: calc(65% - 30px);
    margin: 0 15px;
  }
  .rightDiv{
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

