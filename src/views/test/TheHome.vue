<template>
  <base-card id="instruction">
    <h2>Інструкція</h2>
    <ul>
      <li>Тест складається з 84 питань</li>
      <li>Відповідати можна <b>так</b> або <b>ні</b></li>
    </ul>
  </base-card>
  <div v-if="user" class="button">
    <base-button @click="clearUser">Стерти поточного користувача</base-button>
  </div>
  <router-link class="button" to="/auth">
    <base-button>Почати тестування</base-button>
  </router-link>
</template>

<script>
export default {
  name: "Home",
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  methods: {
    clearUser() {
      this.$store.dispatch("clearLocalstorage");
    },
  },
};
</script>

<style scoped>
li {
  margin: 10px 0;
}

#instruction {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.button {
  margin-bottom: 20px;
}
</style>
