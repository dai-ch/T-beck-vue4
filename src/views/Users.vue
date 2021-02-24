<template>
  <div class="users">
    <img alt="Vue logo" src="../assets/logo.png" />
    <div class="header">
      <div class="heeder__comment">{{ userName }}さんようこそ！！</div>
      <div class="balance">
        残高：{{ userDeposit }}
        <span>
          <button class="logoutBtn" v-on:click="logout">
            ログアウト
          </button></span
        >
      </div>
    </div>
    <h1>ユーザー一覧</h1>
    <table>
      <li class="table__username">ユーザ名</li>
      <ul v-for="user in usersList" v-bind:key="user">
        <li class="usersListData">
          <span>{{ user.name }}</span>
          <span class="userList_btn">
            <button id="userBtn" class="userBtn" v-on:click="showDeposit(user)">
              walletを見る
            </button>
            <button class="userBtn">送る</button>
          </span>
        </li>
      </ul>
      <!-- モーダルウインドウ -->
      <transition name="fade">
        <div id="overlay" v-show="showContent">
          <div id="content">
            <p class="content__userName">
              {{ getModalUserData.name }}さんの残高
            </p>
            <p class="content__userDepsit">{{ getModalUserData.deposit }}</p>
            <div class="content__btn__container">
              <button class="content__btn" v-on:click="closeDeposit">
                close
              </button>
            </div>
          </div>
        </div>
      </transition>
    </table>
  </div>
  <CopyRight />
</template>

<script>
import CopyRight from '@/components/CopyRight.vue';

export default {
  name: 'Users',
  data() {
    return {
      showContent: false,
    };
  },
  computed: {
    userName() {
      return this.$store.getters.loginUsername;
    },
    userDeposit() {
      return this.$store.getters.depositBalance;
    },
    usersList() {
      return this.$store.getters.usersList;
    },
    getModalUserData() {
      return this.$store.getters.modalUsersData;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('logOut');
    },
    showDeposit(user) {
      this.$store.commit('modalWindowData', { userData: user });
      this.showContent = true;
    },
    closeDeposit() {
      this.showContent = false;
    },
  },
  mounted() {
    this.$store.commit('dashboard');
  },
  components: {
    CopyRight,
  },
};
</script>

<style scoped>
.header {
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
.users {
  margin: 0 auto;
}
.table {
  margin: 0 auto;
}
.tr {
  text-align: right;
}
.logoutBtn {
  padding: 2px;
  background-color: #fff;
  color: skyblue;
  border: 1px solid skyblue;
  border-radius: 5px;
}
.router {
  text-decoration: none;
  color: skyblue;
}

.usersListData {
  list-style: none;
  display: flex;
  justify-content: space-between;
}

table {
  margin: 0 auto;
}

ul {
  width: 100%;
  display: inline-block;
  padding: 0;
  margin: 5px auto 0;
}

.userBtn {
  margin-right: 5px;
  background-color: skyblue;
  color: #fff;
  border: 1px solid skyblue;
  border-radius: 3px;
  outline:none;
}

.userBtn:hover {
  background-color: rgb(78, 199, 247);
}


.table__username {
  list-style: none;
  font-weight: bold;
  font-size: 20px;
  text-align: left;
  position: relative;
  right: 10px;
}

/* ////////// モーダルウィンドウ ///////////////// */
#overlay {
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);

  /*画面の中央に要素を表示させる設定*/
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

#content {
  z-index: 2;
  width: 35%;
  padding: 0;
  border-radius: 5px;
  background-color: #fff;
}

.content__btn__container {
  background-color: rgba(104, 95, 95, 0.4);
  width: 100%;
  height: 3em;
  padding: 0;
  margin: 0;
  border-radius: 5px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.content__btn {
  width: 50px;
  height: 30px;
  margin: 0;
  margin-right: 10px;
  color: #fff;
  border-radius: 3px;
  border: 1px solid rgb(240, 93, 93);
  background-color: rgb(240, 93, 93);
  outline:none;
}

.content__btn:hover{
  background-color: rgb(248, 23, 23);;
}


/* /////トランジション設定/////// */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from {
  opacity: 0;
}
.fade-enter-to {
  opacity: 1;
}
.fade-leave-from {
  opacity: 1;
}
.fade-leave-to {
  opacity: 0;
}
</style>
