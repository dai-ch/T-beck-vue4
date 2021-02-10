
<template>
  <div id="customerInfo">
    <div class="container">
      <div class="form__title">
        <p class="text-l">
          <i class="fas fa-address-card"></i>お客様の情報を入力してください
        </p>
        <span class="form__title__step">STEP1</span>
      </div>
      <form action="">
        <div class="question__list">
          <div class="question__item">
            <p class="question">-性別-</p>
            <div class="radio" v-for="gender in genders">
              <input type="radio" name="gender" v-bind:value="gender" />{{
                gender
              }}
            </div>
          </div>
          <div class="question__item">
            <p class="question">-生年月日-</p>
            <label
              ><select class="select" name="year">
                <option v-for="year in yearsList" v-bind:value="year">
                  {{ year }}
                </option></select
              >年</label
            >
            <label
              ><select class="select" name="month">
                <option v-for="month in monthList" v-bind:value="month">
                  {{ month }}
                </option></select
              >月</label
            >
            <select class="select" name="day">
              <option v-for="day in dayList" value="day">{{ day }}</option>
            </select>
            <label>日</label>
          </div>
        </div>
      </form>
    </div>
  </div>
  <button class="next__btn" v-on:click="onclick">
    次へ進む<i class="fas fa-angle-right"></i>
  </button>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from "@/components/HelloWorld.vue";
import Vue from "vue";
import App from "./App.vue";


export default {
  name: "Home",
  components: {
    //HelloWorld,
  },
  data() {
    return {
      genders: ["男性", "女性"],
      years: [],
      months: [],
      days: [],
    };
  },
  methods: {
    onclick() {
      this.$router.push("/interview");
    },
  },
  computed: {
    yearsList: function () {
      //selectに入れる配列
      const year = new Date().getFullYear();
      for (let i = year; i > 1907; i--) {
        if (i > 2018) {
          this.years.push(i + "年 (令和" + (i - 2018) + ")");
        } else if (i > 1988) {
          this.years.push(i + "年 (平成" + (i - 1988) + ")");
        } else if (i > 1925) {
          this.years.push(i + "年 (昭和" + (i - 1925) + ")");
        } else if (i > 1911) {
          this.years.push(i + "年 (大正" + (i - 1911) + ")");
        } else if (i > 1868) {
          this.years.push(i + "年 (明治" + (i - 1868) + ")");
        }
      }
      return this.years;
    },
    monthList: function () {
      for (let i = 1; i <= 12; i++) {
        this.months.push(i);
      }
      return this.months;
    },
    dayList: function () {
      for (let i = 1; i <= 31; i++) {
        this.days.push(i);
      }
      return this.days;
    },
  },
};
</script>

<style scoped>

</style>
