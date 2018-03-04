<template>
  <div id="parent">
    <div class="header">
      <div v-for="item in navigation" :style="item.style" @click="loadPage(item.className)" >
        <span :class="item.icon"></span>{{item.name}}
      </div>

    </div>
    <router-view class="loadRouter"></router-view>
  </div>
</template>

<script>

  export default {
    data(){
      return{
        navigation:[
          {
            className:'lastNew',
            name:'最新',
            style:{
              borderBottom:'4px solid white'
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
      this.loadPage(this.$router.history.current.path.split('/navigation/')[1]);
    },
    methods:{
      //点击导航条按钮发生变化
      loadPage(e){
        const root = this;
        for(var i=0;i<root.navigation.length;i++){
          root.navigation[i].style={};
          root.navigation[i].icon='iconfont icon-'+root.navigation[i].iconName+'kong'
          if(root.navigation[i].className==e){
            root.navigation[i].style={
              borderBottom:'4px solid white'
            }
            root.navigation[i].icon=root.navigation[i].icon.split('kong')[0]+'shi';
            root.$router.push({path:root.navigation[i].path})
          }
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
  }
  .header>div{
    float: left;
    width: calc(25% - 10px);
    text-align: center;
    height: 70px;
    line-height: 70px;
    font-size: 1.3rem;
    color: white;
    margin: 5px;
    box-sizing: border-box;

  }
  .loadRouter{
    margin-top: 80px;
    height: calc(100vh - 80px);
    background: #f2f2f2;
  }
  .iconfont{
    font-size: 1.3rem;
  }
</style>



