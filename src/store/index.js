import { createStore } from 'vuex';
import firebase from 'firebase';
import CopyRight from '@/components/CopyRight.vue';
import router from '../router';

export default createStore({
  state: {
    users: [
      {
        name: '',
        mailAdress: '',
        password: '',
      },
    ],
    usersList: [],
  },
  mutations: {
    usersData: function(state, usersData) {
      usersData.forEach((dataItem) => {
        state.usersList.push(dataItem);
      });
      console.log(state.usersList);
    },
    // loginData: function(state, loginData) {
    //   console.log(loginData);
    // },
  },
  actions: {
    signUp(context, signUpData) {
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

      //「users」コレクションの全データを取得し、stateを変更するためmutationを経由させる
      collection
        .get()
        .then(function(usersData) {
          context.commit('usersData', usersData);
        })
        .catch(function(e) {
          console.error('Error adding document: ', e);
        });
    },
    login: function(context, loginData) {
      //firebaseの認証の記述、Promiseを利用
      firebase
        .auth()
        .signInWithEmailAndPassword(
          loginData.loginMailAdress,
          loginData.loginPassword
        )
        .then(() => {
          alert('Success!');
          //ログイン成功したら下記へ遷移
          router.push('/users');

          //context.commit('loginData', loginData);
        })
        .catch((err) => {
          alert(err.message);
        });
    },


  },
  modules: {},
  components: {
    CopyRight,
  },
});
