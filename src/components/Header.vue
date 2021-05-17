<template>
  <div>
    <h1>
      <slot></slot>
    </h1>
  </div>
</template>

<style scoped>
h1 {
  font-size: 20px;
  font-weight: bold;
}
div {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0px;
}
</style>
