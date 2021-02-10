<template>
  <div id="nav">
    <h3 class="nav__title">Sample App</h3>
    <ul class="nav__list">
      <li class="nav__list__item">
        <router-link to="/">ログイン</router-link> |
      </li>
      <li class="nav__list__item">
        <router-link to="/">新規会員登録</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
</script>

<style scoped>
div {
  border: 1px solid blue;
}
h1 {
  color: blue;
}
p {
  color: blue;
}

.nav__title {
  color: #888;
}

.nav__list {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}
.nav__list__item {
  list-style: none;
  margin-left: 5px;
  position: relative;
  top: -10px;
  font-weight: 12px;
  color: #888;
}
</style>