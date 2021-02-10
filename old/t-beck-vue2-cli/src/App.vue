<template>
  <link
    rel="stylesheet"
    href="https://use.fontawesome.com/releases/v5.15.1/css/all.css"
    integrity="sha384-vp86vTRFVJgpjF9jiIGPEEqYqlDwgyBgEF109VFjmqGmIY/Y4HV4d3Gp2irVfcrp"
    crossorigin="anonymous"
  />

  <div>
    <Header></Header>
  </div>
</template>

<script>
import Header from "./components/Header.vue";

export default {
  components: {
    Header,
  },
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
}

body {
  margin: 0 auto;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 15px;
  display: flex;
  justify-content: space-between;
  background-color: #ddd;
  border-bottom: 1px solid #ccc;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.container {
  width: 90%;
  max-width: 800px;
  margin: 4rem auto 0;
  border: 1px solid rgb(137, 193, 245);
  border-radius: 5px;
}

.form__title {
  padding: 10px 0;
  margin: 0;
  text-align: center;
  position: relative;
  background-color: rgb(195, 255, 250);
  border-bottom: 1px solid rgb(103, 237, 255);
}

.form__title__step {
  position: absolute;
  left: 0;
  top: 0;
  padding: 0 3px;
  background-color: rgb(32, 136, 255);
  color: #fff;
  border-radius: 2px;
}

.question__list {
  text-align: left;
  padding: 15px;
}

.question__item {
  padding: 5px;
}

.question {
  color: blue;
}

.radio {
  display: inline-block;
  margin-top: 10px;
  margin-right: 10px;
  padding: 10px 0;
}

.select {
  margin-top: 15px;
  padding: 5px;
  border: 1px solid #bbb;
}
.next__btn {
  color: #fff;
  background-color: #23886f;
  padding: 5px 20px;
  border-radius: 5px;
  border: none;
  margin: 20px 10px 0;
  display: inline-block;
  outline: none;
}

.next__btn:hover {
  opacity: 0.7;
  cursor:pointer;
}

.container__item {
  padding: 10px;
}

.fa,
.fas {
  margin-left: 10px;
}
</style>
