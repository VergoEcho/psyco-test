<template>
  <base-card class="notFound">
    <h2>Cторінка не знайдена</h2>
    <p>Сторінка на яку ви намагалися перейти не існує. Щоб перейти на головну сторінку натисніть на
      <router-link to="/">посилання</router-link>
    </p>
  </base-card>
</template>

<style scoped>
.notFound {
  flex-direction: column;
  text-align: center;
}
</style>