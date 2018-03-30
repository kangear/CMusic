<template>
  <div class="parent">
    <div class="themeTitle">
      <span class="iconfont fanhui" @click="goBack"></span>
      <span class="iconfont lianxi"></span>作者信息
    </div>
      <div class="leftDiv">
        <img src="../../assets/img/logo.png" alt="">
      </div>
      <div class="rightDiv">
        姓名 : hzc<br>
        qq : 1411835011<br>
        email :1411835011@qq.com<br>
      </div>
    <div class="messageDiv">
      作者简介 : 音乐播放器的数据调用QQ音乐的接口,虽说还是简陋但是大致功能已经完成，还有一些细节问题以及漏洞需要修复
      趟若你感兴趣何不watch呢? 借用阮一峰大神的一句话 - 你拿在手中的，就是我的这一个月，所有的诚意和坚持。
      JavaScript 这门语言会有远大未来，但愿你，我亲爱的读者，也都是如此。
    </div>
  </div>
</template>


<script>
  export default {
    data(){
      return{

      }
    },
    methods:{
      goBack(){
        const root = this;
        root.$router.go(-1);

      },
    }
  }
</script>

<style scoped>
  .parent{
    margin-top: 80px;
  }
  .fanhui{
    color: white;
    position: absolute;
    top: 0;
    left: 0;
    margin: 0 20px;
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
  .leftDiv{
    width: calc(30% - 20px);
    text-align: center;
  }
  .leftDiv img{
    width: 100%;
    height: 100%;
  }
  .rightDiv{
    width: calc(70% - 20px);
  }
  .leftDiv,.rightDiv{
    float: left;
    margin: 20px 10px;
    height: 130px;
    line-height: 40px;
    border-radius: 5px;
    color: #909399;
  }
  .messageDiv{
    width: calc(100% - 20px);
    float: left;
    margin: 10px;
    word-break:break-all;
    line-height: 40px;
    color: #909399;
  }
</style>
