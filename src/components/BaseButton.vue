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
  appearance: auto;
  -webkit-writing-mode: horizontal-tb !important;
  text-rendering: auto;
  color: black;
  letter-spacing: normal;
  word-spacing: normal;
  text-indent: 0;
  text-shadow: none;
  display: inline-block;
  text-align: center;
  align-items: flex-start;
  cursor: default;
  background-color: rgb(239, 239, 239);
  box-sizing: border-box;
  margin: 0;
  font: 400 13.3333px Arial;
  border-width: 2px;
  border-style: outset;
  border-color: rgb(118, 118, 118);
}

button:hover {
  box-shadow: 0 0 0 0 #333;
  cursor: pointer;
}

button:active {
  box-shadow: 0 0 0 2px #333;
}
</style>
