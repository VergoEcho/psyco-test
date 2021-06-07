<template>
  <h4 v-if="visible">{{ user }}</h4>
</template>

<script>
export default {
  computed: {
    user() {
      let user = this.$store.getters.user
      if (user) {
        // return  user.name + " " + user.surname
        return user.surname + " " + user.name + " " + user.patronymic
      }
      return "ви неавторизовані";
    },
    visible() {
      const path = this.$route.path
      if (path.startsWith("/admin")) {
        return false
      }
      return true
    }
  },
};
</script>

<style scoped>
h4 {
  position: fixed;
  bottom: 20px;
  max-width: 100vw;
  text-align: center;
}
</style>
