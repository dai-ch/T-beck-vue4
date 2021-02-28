<template>
  <div class="users">
    <img alt="Vue logo" src="../assets/logo.png" />
    <div class="header">
      <div class="heeder__comment">{{ userName }}さんようこそ！！</div>
      <div class="balance">
        残高：{{ userDeposit }}＄
        <span>
          <button class="logoutBtn" v-on:click="logout">
            ログアウト
          </button>
        </span>
      </div>
    </div>
    <h1>ユーザー一覧</h1>
    <table>
      <li class="table__username">ユーザ名</li>
      <ul v-for="user in usersList" v-bind:key="user">
        <li class="usersListData">
          <span>{{ user.name }}</span>
          <span class="userList_btn">
            <button class="userBtn" v-on:click="showDeposit(user)">
              walletを見る
            </button>
            <button class="userBtn" v-on:click="sendDeposit(user)">送る</button>
          </span>
        </li>
      </ul>
      <!-- モーダルウインドウ(残高確認) -->
      <transition name="fade">
        <div id="overlay" v-show="showContent" v-on:click="closeContent">
          <div id="content" v-on:click="stopEvent">
            <p class="content__userName">
              {{ getModalUserData.name }}さんの残高
            </p>
            <p class="content__userDepsit">{{ getModalUserData.deposit }}＄</p>
            <div class="content__btn__container">
              <button class="content__btn" v-on:click="closeContent">
                close
              </button>
            </div>
          </div>
        </div>
      </transition>
      <!-- モーダルウインドウ(送金) -->
      <transition name="fade">
        <div id="overlay" v-show="sendContent" v-on:click="closeContent">
          <div id="content" v-on:click="stopEvent">
            <p class="content__userName">あなたの残高:{{ userDeposit }}</p>
            <p class="content__userDepsit">送る金額</p>
            <p class="content__userDepsit">
              <input
                type="text" class="content__userDepsit__text" v-model="sendMoney"/>
            </p>
            <div class="content__btn__container">
              <button class="content__btn" v-on:click="sendLoginUserDeposit(userDeposit, getModalUserData)">
                送信
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
      sendContent: false,
      sendMoney: '',
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
    sendDeposit(user) {
      this.$store.commit('modalWindowData', { userData: user });
      this.sendContent = true;
    },
    closeContent() {
      this.showContent = false;
      this.sendContent = false;
    },
    stopEvent() {
      event.stopPropagation();
    },
    //ユーザー間でお金を送金する
    sendLoginUserDeposit(userDeposit, receiveUserData) {
      this.$store.dispatch('sendDepsitData', {
        userDeposit: userDeposit,
        receiveUserData: receiveUserData,
        sendMoney: this.sendMoney,
      });
      this.sendContent = false;
      this.sendMoney = '';
    },
  },
  mounted() {
    this.$store.dispatch('dashboard');
  },
  components: {
    CopyRight,
  },
};
</script>

<style scoped src="../components/users.css"></style>
