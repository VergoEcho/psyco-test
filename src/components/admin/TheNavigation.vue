<template>
  <div>
    <router-link to="/admin/">Результати</router-link>
    <router-link to="/admin/allQuestions">Питання</router-link>
    <router-link to="/admin/addQuestion">Створити</router-link>
  </div>
</template>

<style scoped>
div {
  display: flex;
}
a {
  padding: 0 10px 5px 10px;
  text-decoration: none;
  color: black;
  font-weight: bold;
  margin: 0 10px 15px 10px;
}

a:hover {
  border-bottom: 2px solid gray;
}

.router-link-exact-active {
  border-bottom: 2px solid black;
}
</style>
