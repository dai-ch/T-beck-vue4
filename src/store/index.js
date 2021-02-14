import { createStore } from 'vuex';
import firebase from 'firebase';

export default createStore({
  state: {
    users: [
      {
        name: '',
        mailAdress: '',
        password: '',
      },
    ],
    usersList: ['dddd'],
  },
  mutations: {},
  actions: {
    signUp(state, signUpData) {
      //登録情報を各変数へ格納
      const createName = signUpData.name;
      const createMailAdress = signUpData.mailAdress;
      const createPassword = signUpData.password;

      //認証用のデータ登録(Authentication)
      firebase
        .auth()
        .createUserWithEmailAndPassword(createMailAdress, createPassword)
        .then(alert('認証データ登録成功しました'))
        .catch((e) => {
          alert(e);
        });

      //「users」コレクションを取得しfirestoreの指定したコレクションへ登録
      let collection = firebase.firestore().collection('users');
      collection
        .add({
          name: createName,
          mailAdress: createMailAdress,
          password: createPassword,
        }) //docRefは登録情報に関するオブジェクト。
        .then(function(docRef) {
          console.log('Document written with ID: ', docRef.id);
        })
        .catch(function(e) {
          console.error('Error adding document: ', e);
        });

      //stateの配列を変数に参照
      let usersList = this.state.usersList;

      //「users」コレクションの全データを取得し、storeに格納する
      collection
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            usersList.push(doc.data());
          });
          //console.log(usersList);確認用
          console.log('登録できました');
        })
        .catch(function(e) {
          console.error('Error adding document: ', e);
        });
    },
  },
  modules: {},
});
