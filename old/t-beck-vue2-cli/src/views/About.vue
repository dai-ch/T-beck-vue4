<template>
  <div id="about">
    <h1>This is an about page</h1>
    <button v-on:click="onclick">トップへ</button>
    <transition>
      <div id="panel" v-show="flag">ttttt</div>
    </transition>
  </div>
</template>


<script>
export default {
  methods: {
    onclick() {
      this.$router.push("/about");
    },
  },
};

// new Vue({
//   el:'#about',
//   data:{
//     flag:true
//   },
//   methods:{
//     onclick:func
//   }
// })
</script>
