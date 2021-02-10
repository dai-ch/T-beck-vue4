<template>
  <div class="article">
    <span>記事コード:{{ $route.params.aid }}</span>
    <button v-on:click="onclick">トップへ</button>
  </div>
</template>


<script>
export default {
  methods: {
    onclick() {
      this.$router.push("/");
    },
  },
};
</script>
