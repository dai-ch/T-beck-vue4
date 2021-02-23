
<template>
  <div class="users">
    <img alt="Vue logo" src="../assets/logo.png" />
    <div class="header">
      <div class="heeder__comment">{{userName}}さんようこそ！！</div>
      <div class="balance">
        残高：{{userDeposit}} <span>  <button class="logoutBtn" v-on:click="logout">ログアウト</button></span>
      </div>
    </div>
    <h1>ユーザー一覧</h1>
    <table>
      <li class="table__username">ユーザ名</li>
      <ul  v-for="user in usersList" v-bind:key="user">
        <li class="usersListData">
          <span>{{user.name}}</span>
        <span class="userList_btn">
          <button class="userBtn" v-on:click="showDeposit">walletを見る</button>
          <button class="userBtn">送る</button>
        </span>
        </li>
        <!-- モーダルウインドウ -->
        <div id="showDeposit">
          <p>{{user.name}}さんの残高</p>
          <p>{{user.deposit}}</p>
        </div>
      </ul>
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
    };
  },
  computed:{
    userName(){
      return this.$store.getters.loginUsername;
    },
    userDeposit(){
      return  this.$store.getters.depositBalance;
    },
    usersList(){
      return  this.$store.getters.usersList;
    },
  },
  methods: {
    logout(){
      this.$store.dispatch('logOut');
    },
    showDeposit(){

    }
  },
  mounted(){
    this.$store.commit('dashboard');
  },
  components: {
     CopyRight,
  },
};
</script>


<style scoped>
.header{
  width:90%;
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

.usersListData{
  list-style:none;
  display: flex;
  justify-content:space-between;
}

table{
 margin : 0 auto;
}

ul{
  width:100%;
  display: inline-block;
  padding:0;
  margin: 5px auto 0;
}

.userBtn{
  margin-right: 5px;
  background-color:skyblue;
  color: #fff;
  border: 1px solid skyblue;
  border-radius: 3px;
}

.table__username{
  list-style: none;
  font-weight: bold;
  font-size: 20px;
  text-align:left;
  position: relative;
  right:10px;
}


</style>

