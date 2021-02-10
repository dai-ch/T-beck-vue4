<template>
  <div id="interview">
    <div class="container">
      <div class="form__title">
        <p class="text-l">
          <i class="fas fa-chalkboard-teacher"></i>以下にお答えください
        </p>
        <span class="form__title__step">STEP2</span>
      </div>
      <form action="">
        <div class="question__list">
          <div class="question__item">
            <p class="question">現在、生命保険に加入されていますか？</p>
            <div class="radio" v-for="question in questions">
              <input type="radio" name="question1" v-bind:value="question" />{{
                question
              }}
            </div>
          </div>
          <div class="question__item">
            <p class="question">
              現在入院中ですか。または、最近3ヶ月以内に医師の診察・検査の結果、入院・手術をすすめられたことはありますか？
            </p>
            <div class="radio" v-for="question in questions">
              <input type="radio" name="question2" v-bind:value="question" />{{
                question
              }}
            </div>
          </div>
          <div class="question__item">
            <p class="question">
              過去5年以内に、病気やけがで、手術をうけたまたは継続して7日以上の入院をしたことがありますか？
            </p>
            <div class="radio" v-for="question in questions">
              <input type="radio" name="question3" v-bind:value="question" />{{
                question
              }}
            </div>
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
      this.$router.push("/consultation");
    },
    onclickPre() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
</style>
