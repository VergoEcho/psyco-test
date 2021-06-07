<template>
  <base-card id="results">
    <h2>Дякую за проходження тесту!</h2>
  </base-card>
  <router-link to="/">
    <base-button>На головну сторінку</base-button>
  </router-link>
</template>

<style scoped>
h2 {
  justify-self: center;
}

#results {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  text-align: center;
}

li {
  margin: 10px 0;
}
</style>
