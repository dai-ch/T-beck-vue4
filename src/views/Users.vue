
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
      <th><td>ユーザ名</td></th>
      <tr>v-forを使用予定</tr>
    </table>
   <table>

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
  },
  methods: {
    logout(){
      this.$store.dispatch('logOut');
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
</style>

