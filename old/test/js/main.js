'use strict';

//ViewModel = vm
let vm = new Vue({
  el: '#container',
  data: {
    genders: [
      '男性',
      '女性',
    ],
    years: [],
    months: [],
    days: []
  },
  //計算結果を返り値として返す
  computed: {
    yearsList: function () {
      //selectに入れる配列
      const year = new Date().getFullYear();
      for (let i = year; i > 1907; i--) {
        if (i > 2018) {
          this.years.push(i + '年 (令和' + (i - 2018) + ')');
        } else if (i > 1988) {
          this.years.push(i + '年 (平成' + (i - 1988) + ')');
        } else if (i > 1925) {
          this.years.push(i + '年 (昭和' + (i - 1925) + ')');
        } else if (i > 1911) {
          this.years.push(i + '年 (大正' + (i - 1911) + ')');
        } else if (i > 1868) {
          this.years.push(i + '年 (明治' + (i - 1868) + ')');
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
    }
  }
})
