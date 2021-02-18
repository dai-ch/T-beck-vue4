
<template>
  <div class="users">
    <img alt="Vue logo" src="../assets/logo.png" />
    <div class="header">
      <div class="heeder__comment">{{loginUserName}}さんようこそ！！</div>
      <div class="balance">
        残高：{{
deposit}} <span>  <router-link to="/" class="router"><button class="logoutBtn">ログアウト</button></router-link></span>
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
    loginUserName(){
      return  this.$store.getters.loginUsername;
    },
    deposit(){
      return  this.$store.getters.deposit;
    }
  },
  methods: {
  },
  updated(){
    this.$store.commit('loginUser');
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

