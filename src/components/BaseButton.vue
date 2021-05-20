<template>
  <button>
    <slot></slot>
  </button>
</template>

<style scoped>
button {
  padding: 10px 20px;
  text-transform: uppercase;
  border-radius: 5px;
  box-shadow: 5px 5px 0 0 #333;
  transition: box-shadow 0.2s;
}

button:hover {
  box-shadow: 0 0 0 0 #333;
  cursor: pointer;
}

button:active {
  box-shadow: 0 0 0 2px #333;
}
</style>
