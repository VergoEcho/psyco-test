<template>
  <div class="mt">Введіть E-mail нового користувача</div>
  <div class="input-group mt">
    <input
      type="email"
      id="email"
      :class="{ error: formIsInvalid }"
      @blur="resetValidation"
      v-model.trim="email"
      placeholder="username@mail.com"
    />
    <base-button class="mt" @click="createUser">Додати користувача</base-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      formIsInvalid: false,
    };
  },
  methods: {
    createUser() {
      this.formIsInvalid = false;
      if (this.email === "") {
        this.formIsInvalid = true;
        return;
      }
      this.$store.dispatch("createUser", this.email);
      this.email = "";
    },
    resetValidation() {
      this.formIsInvalid = false;
    },
  },
};
</script>

<style scoped>
.input-group .error {
  border-color: red;
}

.input-group {
  margin: 20px 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
}

.input-group input {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid black;
  width: 200px;
  background: white;
}

.mt {
  margin-top: 15px;
}
</style>
