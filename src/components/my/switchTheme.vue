<template>
  <div class="parent">
    <div class="themeTitle">
      <span class="iconfont fanhui" @click="goBack"></span>
      <span class="iconfont icon-tuijiankong"></span>切换主题</div>
      <div v-for="(item,index) in theme"  class="theme">
        <div class="topBG" v-if="item.select"><span class="iconfont xuanzhong"></span></div>
        <div class="themeBackground" :id="'theme'+index" @click="selectTheme(item.value)"></div>
        <div class="themeFont">{{item.name}}</div>
      </div>
  </div>
</template>

<script>
  import { MessageBox } from 'mint-ui';
  export default {
    data(){
      return{
        theme:[
          {
            name:'默认',
            value:'0',
            select:false,
          },
          {
            name:'成熟',
            value:'1',
            select:false,
          },
          {
            name:'复古',
            value:'2',
            select:false,
          },

        ]
      }
    },
    created(){
      this.getTheme();
    },
    methods:{
      goBack(){
        const root = this;
        root.$router.go(-1);

      },
      getTheme(){
        const root = this;
        if(localStorage.getItem('songTheme')){
          let item = localStorage.getItem('songTheme');
          for(let i = 0;i < this.theme.length; i++){
            if(item == this.theme[i].value){
              this.theme[i].select = true;
              localStorage.setItem('songTheme',this.theme[i].value);
            }else{
              this.theme[i].select = false;
            }
          }
        }else{
          root.theme[0].select = true;
          localStorage.setItem('songTheme',root.theme[0].value);
        }
      },
      selectTheme(item){
        MessageBox.confirm('是否更换主题?').then(action => {
          for(let i = 0;i < this.theme.length; i++){
            if(item == this.theme[i].value){
              this.theme[i].select = true;
              localStorage.setItem('songTheme',this.theme[i].value);
            }else{
              this.theme[i].select = false;
            }
          }

          this.$router.push({path : '/'})
        });



      }
    }
  }
</script>
<style scoped>
  .parent{
    margin-top: 80px;
  }
  .themeTitle{
    position: fixed;
    top: 0;
    max-width: 520px;
    margin: 0 auto;
    width: 100%;
    height: 80px;
    text-align: center;
    line-height: 80px;
    font-size: 1.1rem;
    color: white;
    box-sizing: border-box;
    z-index: 1;
  }
  .fanhui{
    color: white;
    position: absolute;
    top: 0;
    left: 0;
    margin: 0 20px;
  }
  .theme{
    width: calc(100% / 4 - 10px);
    float: left;
    margin: 10px 5px;
    position: relative;
  }
  .themeBackground{
    float: left;
    width: 100%;
    height: 80px;
    border-radius: 5px;
  }
  .topBG{
    position: absolute;
    width: 100%;
    height: 80px;
    text-align: center;
    line-height: 80px;
    z-index: 999;
    border-radius: 5px;
    font-size: 25px;
  }
  .topBG>span{
    margin: 0;
    color: #13CE66;
  }
  .themeFont{
    margin-top: 5px;
    text-align: center;
    width: 100%;
    float: left;
    color: #909399;

  }
  #theme0{
    background: #054547;
  }
  #theme1{
    background: rgb(116, 3, 73);
  }
  #theme2{
    background: rgb(95, 86, 54);
  }




</style>
