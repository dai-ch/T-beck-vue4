<template>
  <div class="signup">
    <img alt="Vue logo" src="../assets/logo.png" />

    <h1>新規登録画面</h1>
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
        <button class="btn">
          <router-link to="/users" class="routerBtn" v-on:click="signUp"
            >新規登録</router-link
          ></button
        ><br />
        <router-link to="/" class="router">ログインはこちらから</router-link>
      </table>
    </form>
  </div>
  <CopyRight />
</template>

<script>
import CopyRight from '@/components/CopyRight.vue';
import firebase from 'firebase';

export default {
  name: 'SignUp',
  data() {
    return {
      mailAdress: '',
      password: '',
    };
  },
  components: {
    CopyRight,
  },
  methods: {
    signUp: function() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.mailAdress, this.password)
        .then((user) => {
          alert('Create account: ', user.email);
        })
        .catch((error) => {
          alert(error.message);
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
