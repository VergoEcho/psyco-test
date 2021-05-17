<template>
  <Header>Оцінка рівня нервово-психічної стійкості</Header>
  <router-view />
</template>

<script>
import Header from "./components/Header";

export default {
  components: {
    Header,
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
