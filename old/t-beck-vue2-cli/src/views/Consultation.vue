<template>
  <div id="consultation">
    <div class="container">
      <div class="form__title">
        <p class="text-l">
          <i class="fas fa-file-alt"></i>ご相談内容をご記入ください
        </p>
        <span class="form__title__step">STEP3</span>
      </div>
      <form action="">
        <div class="question__list">
          <div class="question__item">
            <p class="question">-ご相談内容-</p>
            <textarea rows="16" />
          </div>
        </div>
      </form>
    </div>
  </div>

  <button class="next__btn" v-on:click="onclickPre">
    前へ戻る<i class="fas fa-angle-right"></i>
  </button>
  <button class="next__btn" v-on:click="onclick">
    次へ進む<i class="fas fa-angle-right"></i>
  </button>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from "@/components/HelloWorld.vue";


export default {
  name: "Home",
  components: {
    //HelloWorld,
  },
  data() {
    return {
      questions: ["はい", "いいえ"],
    };
  },
  methods: {
    onclick() {
      this.$router.push("/");
    },
    onclickPre() {
      this.$router.push("/interview");
    },
  },
};
</script>

<style scoped>
textarea {
  width: 100%;
  margin: 0 auto;
  border: 1px solid #ccc;
}
</style>
