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
        deposit: '',
      },
    ],
    usersList: [],
    loginUser: {
      name: '',
      mailAdress: '',
      password: '',
      deposit: '',
    },
  },
  getters: {
    loginUsername(state) {
      return state.loginUser.name;
    },
    depositBalance(state) {
      return state.loginUser.deposit;
    },
  },
  mutations: {
    usersData: function(state, usersData) {
      usersData.forEach((dataItem) => {
        state.usersList.push(dataItem);
      });
      console.log(state.usersList);
    },
    loginUser: function(state) {
      //ログイン状態を管理(onAuthStateChanged)
      firebase.auth().onAuthStateChanged(function(user) {
        console.log('表示されればここまで遷移している1');
        if (user) {
          console.log('表示されればここまで遷移している2');
          console.log(user);
          state.loginUser.name = user.name;
          state.loginUser.mailAdress = user.mailAdress;
          state.loginUser.password = user.password;
          state.loginUser.deposit = user.deposit;
        } else {
          console.log(state);
          //console.log(user);
        }
      });
    },
  },
  actions: {
    signUp(context, signUpData) {
      //登録情報を各変数へ格納
      const createName = signUpData.name;
      const createMailAdress = signUpData.mailAdress;
      const createPassword = signUpData.password;
      const createDeposit = signUpData.deposit;

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
          deposit: createDeposit,
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
