<template>
  <div>
    {{title}}
  </div>
</template>
<script>
  export default {
    data(){
      return{
        title:''
      }
    },
    created(){
      this.getTitle();
    },
    methods:{
      getTitle(){
        const root = this;
        root.title=root.$router.history.current.name;
      }
    }
  }
</script>

