<template>
  <base-card id="instruction">
    <h2>Інструкція</h2>
    <ul>
      <li>Тест складається з 84 питань</li>
      <li>Відповідати можна <b>так</b> або <b>ні</b></li>
    </ul>
  </base-card>
  <router-link to="/test/0">
    <base-button>Почати тестування</base-button>
  </router-link>
</template>

<script>
export default {
  name: "Home",
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
</style>
