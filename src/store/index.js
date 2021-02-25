import { createStore } from 'vuex';
import firebase from 'firebase';
import CopyRight from '@/components/CopyRight.vue';
import router from '../router';

export default createStore({
  state: {
    usersList: [],
    loginUser: {
      id: '',
      name: '',
      mailAdress: '',
      password: '',
      deposit: '',
    },
    modalUsersData: [
      {
        id: '',
        name: '',
        mailAdress: '',
        password: '',
        deposit: '',
      },
    ],
  },
  getters: {
    loginUsername(state) {
      return state.loginUser.name;
    },
    depositBalance(state) {
      return state.loginUser.deposit;
    },
    usersList(state) {
      return state.usersList;
    },
    modalUsersData(state) {
      return state.modalUsersData;
    },
  },
  mutations: {
    modalWindowData(state, data) {
      state.modalUsersData = data.userData;
    },
    loginUserData(state, user) {
        state.loginUser.id = user.uid;
        state.loginUser.name = user.displayName;
        state.loginUser.mailAdress = user.email;
    },
    loginUserDeposit(state, depositData) {
      state.loginUser.deposit = depositData.data().deposit;
    },
    usersListData(state, usersListData) {
      usersListData.forEach((data) => {
        state.usersList.push(data.data());
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
          //firestoreに格納されたユーザーデータ全て取得
          router.push('/users');
        })
        .catch((err) => {
          alert(err.message);
        });
    },
    logOut(context) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          context.commit('clearUsersList');
          router.go({ path: '/' });
          //router.push('/');
        })
        .catch((err) => {
          alert(err.message);
        });
    },
    //Users.vueに画面遷移したら実行
    dashboard(context) {
      //ログイン状態を管理(onAuthStateChanged)
      firebase.auth().onAuthStateChanged(function(loginUserData) {
        //ログインユーザーのデータをstateに格納
        context.commit('loginUserData', loginUserData);

        //furestireからログインユーザーのdepositを取得
        const depositData = firebase.firestore().collection('users');

        depositData
          .where('id', '==', loginUserData.uid)
          .get()
          .then((userData) => {
            userData.forEach((user) => {
              //ログインユーザーのdepositを取得する処理
              //dataはログインユーザーのオブジェクトのみ
              context.commit('loginUserDeposit', user);
            });
          })
          .catch((e) => {
            console.log(e);
          });

        //ログインユーザー以外のデータを取得
        depositData
          .where('id', '!=', loginUserData.uid)
          .get()
          .then((usersListData) => {
            //ログインユーザー以外のデータはmutasionを経由してstateに格納
            context.commit('usersListData', usersListData);
          })
          .catch((e) => {
            console.log(e);
          });
      });
    },
  },
  modules: {},
  components: {
    CopyRight,
  },
});
