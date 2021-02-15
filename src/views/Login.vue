<template>
  <div class="login">
    <img alt="Vue logo" src="../assets/logo.png" />

    <h1>ログイン画面</h1>
    <table class="table">
      <tr class="tr">
        <td>
          <label>メールアドレス</label
          ><input type="text" placeholder="E-mail" v-model="loginMailAdress" />
        </td>
      </tr>
      <tr class="tr">
        <td>
          <label>パスワード</label
          ><input type="password" placeholder="Password" v-model="loginPassword" />
        </td>
      </tr>
      <button class="btn" v-on:click="login">
        ログイン</button
      ><br />
      <router-link to="/signup" class="router"
        >新規登録はこちらから</router-link
      >
    </table>
  </div>
  <CopyRight />
</template>

<script>
// @ is an alias to /src
import CopyRight from '@/components/CopyRight.vue';

export default {
  name: 'Login',
  data() {
    return {
      loginMailAdress: '',
      loginPassword: '',
    };
  },
  components: {
    CopyRight,
  },
  methods: {
    login() {
      this.$store.dispatch('login', {
        loginMailAdress: this.loginMailAdress,
        loginPassword: this.loginPassword,
      });
    },
  },
};
</script>

<style scoped>
.login {
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
  color: skyblue;
  border: 1px solid skyblue;
  border-radius: 5px;
}
.router {
  text-decoration: none;
  color: skyblue;
}
</style>
