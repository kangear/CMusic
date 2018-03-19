<template>
  <div>
    <div
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="1"
      class="content"
    >
      <div v-for="item in songListIndex" class="songList" @click="doSong(item.data)">
        <img :src='"http://imgcache.qq.com/music/photo/album_300/"+(item.data.albumid%100)+"/300_albumpic_"+item.data.albumid+"_0.jpg"'>
        <div class="songTitle">{{item.data.albumname}}</div>
      </div>

    </div>

  </div>
</template>
<script>
  import $ from 'jquery'
  import Vue from 'vue'
  import { Indicator } from 'mint-ui';
  import { InfiniteScroll } from 'mint-ui';
  import Bus from '../../global/bus.vue'
  Vue.use(InfiniteScroll);
  export default {
    data(){
      return{
        title:'',
        songListIndex:[],
        songList:[],
        dropDown:0,
      }
    },
    created(){
      const root = this;
      // this.getTitle();
      this.getData();

    },
    methods:{

      getTitle(){
        const root = this;
        root.title = root.$router.history.current.name;
      },
      //获取最新音乐数据
      getData(){
        const root = this;
        Indicator.open('努力加载中...');
        let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&tpl=3&page=detail&type=top&topid=27&_=1519963122923';
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
      loadMore() {
        const root = this;
        root.loading=true;
        setTimeout(function () {
          root.doDropDown();
        },1000)
      },
      doDropDown(){
        const root = this;
        let i = root.dropDown;
        if(root.dropDown < 100){
          root.dropDown+=20;
          for(;i < root.dropDown;i++){
            root.songListIndex.push(root.songList[i])
          }
        }
      },
      doSong(item){
        const root = this;
        item.showSmallSong = true;
        Bus.$emit('acceptMessage', item)

      }
    }
  }
</script>

<style  scoped>
  .content{
    width: 100%;
    background: #F2F6FC;
    float: left;
  }
  .songList{
    width: calc(25% - 20px);
    margin: 10px;
    float: left;
  }
  .songList>img{
    width: 100%;
    border-radius: 7px;
    box-shadow: 1px 1px 3px;
  }
  .songList>.songTitle{
    width: 100%;
    /*padding: 5px 0;*/
    height: 30px;/*给高度超出文字才不会影响下一行*/
    line-height: 30px;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space: nowrap;/*加宽度width属来兼容部分浏览*/
    text-align: center;
    font-size: 13px;
    color: #043644;
  }
</style>
