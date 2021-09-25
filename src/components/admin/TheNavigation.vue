<template>
  <div>
    <router-link to="/admin/">Результати</router-link>
    <router-link to="/admin/allQuestions">Питання</router-link>
    <router-link to="/admin/addUser">Створити</router-link>
    <a @click="logout">&#10006;</a>
  </div>
</template>

<script>
export default {
  methods: {
    async logout() {
      await this.$store.dispatch("logoutAdmin");
      await this.$router.push("/admin/login");
    },
  },
};
</script>

<style scoped>
div {
  display: flex;
}
a {
  padding: 0 5px 5px 5px;
  text-decoration: none;
  color: black;
  font-weight: bold;
  margin: 0 5px 15px 5px;
}

a:hover {
  border-bottom: 2px solid gray;
  cursor: pointer;
}

.router-link-exact-active {
  border-bottom: 2px solid black;
}
</style>
