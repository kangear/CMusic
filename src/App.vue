<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

  export default {
    name: 'App'
  }
</script>

<style>
  @import "./components/iconfont/iconfont.css";

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
  }
  #parent{
    width: 100%;
    height: 100%;
    float: left;
  }
</style>

