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
import firebase from 'firebase';

export default {
  name: 'SignUp',
  data() {
    return {
      // created で初期化
      db: null,
      displayName: '',
      mailAdress: '',
      password: '',
    };
  },
  components: {
    CopyRight,
  },
  created: function() {
    // dbインスタンスを初期化
    this.db = firebase.firestore();
  },
  methods: {
    signUp: function() {
      //「users」というコレクションを取得する
      let collection = this.db.collection('users');

      collection
        .add({
          name: this.displayName,
          mailAdress: this.mailAdress,
          password: this.password,
        })//保存成功時
        .then(function(docRef) {
          // 保存に成功した時
          console.log('Document written with ID: ', docRef.id);
          // 1件だけ取得する処理のためにIDを保存しておく
          self.inputDocRef = docRef.id;
        })//保存失敗時
        .catch(function(error) {
          // 保存に失敗した時
          console.error('Error adding document: ', error);
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
