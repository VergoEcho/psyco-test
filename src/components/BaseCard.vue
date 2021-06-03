<template>
  <div class="base-card_wrapper">
    <slot></slot>
  </div>
</template>

<style scoped>
.base-card_wrapper {
  display: flex;
  padding: 20px;
  border-radius: 5px;
  border: 2px solid #333;
  position: relative;
  width: calc(100% - 40px);
  max-width: 380px;
  min-height: 150px;
}
</style>
