import { createStore } from 'vuex';
import firebase from 'firebase';

export default createStore({
  state: {
    // created で初期化
    db: null,
    name: '',
    mailAdress: '',
    password: '',
  },
  mutations: {
    signUp(state, signUpData) {

      state.name = signUpData.name;
      state.mailAdress = signUpData.mailAdress;
      state.password = signUpData.password;

      //firestoreのインスタンスを初期化
       state.db = firebase.firestore();

      //「users」というコレクションを取得する
      let collection = state.db.collection('users');

      collection
        .add({
          name: this.state.name,
          mailAdress: this.state.mailAdress,
          password: this.state.password,
        })
        .then(function(docRef) {
          console.log('Document written with ID: ', docRef.id);
          // 1件だけ取得する処理のためにIDを保存しておく
          self.inputDocRef = docRef.id;
        }) //保存失敗時
        .catch(function(error) {
          // 保存に失敗した時
          console.error('Error adding document: ', error);
        });
    },
  },
  actions: {},
  modules: {},
});
