<template>
  <Header>Оцінка рівня нервово-психічної стійкості</Header>
  <router-view />
  <test-user />
</template>

<script>
import Header from "./components/TheHeader";
import TestUser from "./components/TestUser";

export default {
  components: {
    Header,
    TestUser,
  },
  created() {
    this.$store.dispatch("loadUserFromLocalStorage");
  },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}

#app {
  margin: 0 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

* {
  font-family: Arial, serif;
}
</style>
