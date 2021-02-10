<template>
  <div class="login">
    <img alt="Vue logo" src="../assets/logo.png" />

    <h1>ログイン画面</h1>
    <form>
      <table class="table">
        <tr class="tr">
          <td>
            <label>メールアドレス</label
            ><input type="text" placeholder="E-mail" v-model="mailAdress" />
          </td>
        </tr>
        <tr class="tr">
          <td>
            <label>パスワード</label
            ><input type="password" placeholder="Password" v-model="password" />
          </td>
        </tr>
        <button class="btn" v-on:click="userSingIn">ログイン</button
        ><br />
        <router-link to="/signup" class="router"
          >新規登録はこちらから</router-link
        >
      </table>
    </form>
  </div>
  <CopyRight />
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
import CopyRight from '@/components/CopyRight.vue';

export default {
  name: 'Login',
  data() {
    return {
      mailAdress: '',
      password: '',
    };
  },
  components: {
    // HelloWorld
    CopyRight,
  },
  methods: {
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
