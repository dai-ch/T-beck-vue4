import { createStore } from 'vuex';
import firebase from 'firebase';
import CopyRight from '@/components/CopyRight.vue';
import router from '../router';

export default createStore({
  state: {
    // users: [
    //   {
    //     uid:'',
    //     name: '',
    //     mailAdress: '',
    //     password: '',
    //     deposit: '',
    //   },
    // ],
    usersList: [],
    loginUser: {
      id: '',
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
    //Users.vueに画面遷移したら実行
    dashboard(state) {
      //ログイン状態を管理(onAuthStateChanged)
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          state.loginUser.id = user.uid;
          state.loginUser.name = user.displayName;
          state.loginUser.mailAdress = user.email;
        } else {
          console.log(state);
        }

        //furestireからdepositを取得する処理
        const depositData = firebase.firestore().collection('users');
        depositData
          .where('id', '==', state.loginUser.id)
          .get()
          .then((userData) => {
            userData.forEach((data) => {
              state.loginUser.deposit = data.data().deposit;
            });
          })
          .catch((e) => {
            console.log(e);
          });
      });
    },
    //firestoreのusersテーブルに保存しているデータをstateに格納
    usersData: function(state, usersData) {
      usersData.forEach((dataItem) => {
        state.usersList.push(dataItem);
      });
    },
  },
  actions: {
    //ユーザー新規登録
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
        .then((result) => {
          //user.updateProfile({...})でuserのプロフィールを更新
          result.user.updateProfile({
            displayName: createName,
          });
          addFirestoreUser(result.user.uid);
          alert('認証データ登録成功しました');
        })
        .catch((e) => {
          alert(e);
        });

      //firestoreへ新規登録処理
      const addFirestoreUser = function(addUserId) {
        //「users」コレクションを取得しusersコレクションへ登録
        let collection = firebase.firestore().collection('users');
        collection
          .add({
            id: addUserId,
            name: createName,
            mailAdress: createMailAdress,
            password: createPassword,
            deposit: createDeposit,
          }) //[docRef]は登録情報に関するオブジェクト。
          .then(function(docRef) {
            alert('Document written with ID: ', docRef.id);
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
      };
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
          router.push('/users');
        })
        .catch((err) => {
          alert(err.message);
        });
    },
    logOut(context) {//eslint-disable-line
      //eslintの文法チェックを無効にする記述を1つ上のコメントアウトで実装
      firebase
        .auth()
        .signOut()
        .then(() => {
          alert('ログアウトしました');
          router.push('/');
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
