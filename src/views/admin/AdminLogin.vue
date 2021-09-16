<template>
  <base-card id="loginCard">
    <h3>Вхід у панель адміністратора</h3>
    <form class="form-fields">
      <div class="input-group">
        <label for="login">Логін</label>
        <input
          autocomplete="username"
          id="login"
          :class="{ error: login.isInvalid }"
          @blur="resetValidation('login')"
          v-model.trim="login.value"
        />
      </div>
      <div class="input-group">
        <label for="password">Пароль</label>
        <input
          autocomplete="current-password"
          id="password"
          type="password"
          :class="{ error: password.isInvalid }"
          @blur="resetValidation('password')"
          v-model.trim="password.value"
        />
      </div>
    </form>
    <base-button class="mt" @click="loginAdmin">Увійти</base-button>
  </base-card>
</template>

<script>
export default {
  name: "AdminLogin",
  data() {
    return {
      login: {
        isInvalid: false,
        value: "",
      },
      password: {
        isInvalid: false,
        value: "",
      },
      formIsInvalid: false,
    };
  },
  methods: {
    async loginAdmin() {
      await this.validateForm();

      if (this.formIsInvalid) {
        return;
      }

      await this.$store.dispatch("loginAdmin", {
        login: this.login.value,
        password: this.password.value,
      });
      await this.$router.push("/admin");
    },
    validateForm() {
      this.formIsInvalid = false;
      if (this.login.value === "") {
        this.login.isInvalid = true;
        this.formIsInvalid = true;
      }
      if (this.password.value === "") {
        this.password.isInvalid = true;
        this.formIsInvalid = true;
      }
    },
    resetValidation(input) {
      this[input].isInvalid = false;
    },
  },
};
</script>

<style scoped>
#loginCard {
  flex-direction: column;
  text-align: center;
}

.form-fields {
  width: 100%;
  flex-direction: column;
  display: flex;
  align-items: flex-end;
}

.input-group .error {
  border-color: red;
}

.input-group {
  margin: 5px 0;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.input-group input {
  margin-left: 4px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid black;
  width: 230px;
  background: white;
}

.mt {
  margin-top: 15px;
}

h3 {
  font-size: 20px;
  margin: 0 0 10px;
}
</style>
