<template>
  <div id="app">
    <p class="text-l">{{ msg }}</p>
  </div>
  <button class="next__btn" src="/about">
    次へ進む<span class="next__btn__span">&nbsp;&nbsp;&nbsp;&nbsp;&gt;</span>
  </button>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
    stepNum: parseInt,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.next__btn {
  color: #fff;
  background-color: #36eec0;
  padding: 5px 20px;
  border-radius: 5px;
  border: none;
  margin: 20px auto 0;
  display: inline-block;
}

.next__btn__span {
  font-weight: 700;
}
</style>
