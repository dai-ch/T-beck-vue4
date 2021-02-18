<template>
  <div class="signup">
    <img alt="Vue logo" src="../assets/logo.png" />
    <h1>新規登録画面</h1>
    <table class="table">
      <tr class="tr">
        <td>
          <label>ユーザ名</label>
          <input type="text" placeholder="userName" v-model="displayName" />
        </td>
      </tr>
      <tr class="tr">
        <td>
          <label>メールアドレス</label>
          <input type="text" placeholder="E-mail" v-model="mailAdress" />
        </td>
      </tr>
      <tr class="tr">
        <td>
          <label>パスワード</label>
          <input type="password" placeholder="Password" v-model="password" />
        </td>
      </tr>
      <button class="btn" v-on:click="signUp">
        <router-link to="/users" class="routerBtn"
          >新規登録</router-link
        ></button
      ><br />
      <router-link to="/" class="router">ログインはこちらから</router-link>
    </table>
  </div>
  <CopyRight />
</template>

<script>
import CopyRight from '@/components/CopyRight.vue';

export default {
  name: 'SignUp',
  data() {
    return {
      displayName: '',
      mailAdress: '',
      password: '',
      deposit: 0,
    };
  },
  components: {
    CopyRight,
  },
  methods: {
    signUp() {
      this.$store.dispatch('signUp', {
        name: this.displayName,
        mailAdress: this.mailAdress,
        password: this.password,
        deposit: this.deposit,
      });
    },
  },
};
</script>

<style scoped>
.sighup {
  margin: 0 auto;
}
.table {
  margin: 0 auto;
}
.tr {
  text-align: right;
}
.btn {
  margin: 20px auto 0;
  padding: 5px 8px;
  background-color: #fff;
  border: 1px solid skyblue;
  border-radius: 5px;
}
.router {
  text-decoration: none;
  color: skyblue;
}
.routerBtn {
  text-decoration: none;
  color: skyblue;
}
</style>
