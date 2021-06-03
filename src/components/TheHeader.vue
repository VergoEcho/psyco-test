<template>
  <div>
    <router-link to="/">
      <h1>
        <slot></slot>
      </h1>
    </router-link>
  </div>
</template>

<style scoped>
h1 {
  font-size: 20px;
  font-weight: bold;
  color: black;
  text-align: center;
}
a {
  text-decoration: none;
}
div {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
}
</style>
