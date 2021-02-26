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
      doc_id: '',
    },
    modalUsersData: [
      {
        id: '',
        name: '',
        mailAdress: '',
        password: '',
        deposit: '',
        doc_id: '',
      },
    ],
    reloadTrigger: '',
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
      state.loginUser.mailAdress = user.email;
    },
    loginUserDeposit(state, depositData) {
      state.loginUser.deposit = depositData.data().deposit;
      state.loginUser.name = depositData.data().name;
      state.loginUser.doc_id = depositData.data().doc_id;
    },
    usersListData(state, usersListData) {
      usersListData.forEach((data) => {
        state.usersList.push(data.data());
      });
    },
    // reload(state) {
    //   if (state.reload) {
    //     //location.reload();
    //   }
    // },
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
        //ドキュメントIDを管理するための関数
        const createDocmentId = () => {
          // 生成する文字列の長さ
          const l = 30;
          // 生成する文字列に含める文字セット
          const str = 'abcdefghijklmnopqrstuvwxyz0123456789';
          const srtlength = str.length;
          let doc_id = '';
          for (let i = 0; i < l; i++) {
            doc_id += str[Math.floor(Math.random() * srtlength)];
          }
          return doc_id;
        };
        const doc_id = createDocmentId();

        //「users」コレクションを取得しusersコレクションへ登録
        let collection = firebase.firestore().collection('users');

        //createDocmentIdが既存のdoc_idと重複していなければ登録処理実行
        collection
          .where('doc_id', '!=', doc_id)
          .get()
          .then(() => {
            collection
              .doc(doc_id)
              .set({
                id: addUserId,
                name: createName,
                mailAdress: createMailAdress,
                password: createPassword,
                deposit: createDeposit,
                doc_id: doc_id,
              })
              .then(function() {
                console.log('登録OKです');
              })
              .catch(function(e) {
                console.error('Error adding document: ', e);
              });
          })
          .catch(function() {
            //createDocmentIdの戻り値がコレクション内で重複したら新規登録処理をやり直す
            addFirestoreUser(addUserId);
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
    sendDepsitData(context, sendDepsitData) {
      //ログインユーザーの残高
      let loginUserDeposit = sendDepsitData.userDeposit;
      //受け取り側のユーザーデータ
      let receiveUserData = sendDepsitData.receiveUserData;
      //ログインユーザーが送ったお金
      let sendMoney = sendDepsitData.sendMoney;

      //正規表現（0以上の整数の判定）
      const pattern = /^([1-9]\d*|0)$/;
      //整数値が入力されているかチェック
      if (
        pattern.test(loginUserDeposit) &&
        pattern.test(receiveUserData.deposit) &&
        pattern.test(sendMoney)
      ) {
        //int型へ変換
        const loginUserDepositNum = parseInt(loginUserDeposit);
        const receiveUserDepositNum = parseInt(receiveUserData.deposit);
        const sendMoneyNum = parseInt(sendMoney);

        //ログインユーザーの残高は0以上か
        if (loginUserDeposit - sendMoney < 0) {
          console.log('残高不足です');
          return;
        }

        //ログインユーザーの送金後の残高
        const loginUserRemaingMoney = loginUserDepositNum - sendMoneyNum;
        //受け取り側のユーザーの送金後の残高
        const afterReceivedUserMoney = receiveUserDepositNum + sendMoneyNum;

        //furestireからログインユーザーのdepositを取得
        const updateData = firebase.firestore().collection('users');

        updateData
          .doc(this.state.loginUser.doc_id)
          .update({
            deposit: loginUserRemaingMoney,
          })
          .then(() => {
            console.log('ログインユーザーの残高更新OK');
            updateRecievedUserDeposit();
          })
          .catch((e) => {
            console.log(e);
          });

        // //投げ銭を受け取るユーザーのdepositを更新
        const updateRecievedUserDeposit = () => {
          updateData
            .doc(receiveUserData.doc_id)
            .update({
              deposit: afterReceivedUserMoney,
            })
            .then(() => {
              console.log('受けとりユーザーの残高更新OK');
              //userのviewを更新
              context.dispatch('dashboard');
            })
            .catch((e) => {
              console.log(e);
            });
        };
      } else {
        console.log('整数値を入力してください');
      }
    },
  },
  modules: {},
  components: {
    CopyRight,
  },
});
