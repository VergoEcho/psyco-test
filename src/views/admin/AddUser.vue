<template>
  <base-card id="newUser">
    <div class="mt">Введіть E-mail нового користувача</div>
    <form>
      <div class="input-group mt">
        <input
          autocomplete="email"
          type="email"
          id="email"
          :class="{ error: email.isInvalid }"
          @blur="resetValidation"
          v-model.trim="email.value"
          placeholder="username@mail.com"
        />
      </div>
      <div v-if="type === 'admin'" class="input-group mt">
        <input
          autocomplete="current-password"
          type="password"
          id="password"
          :class="{ error: password.isInvalid }"
          @blur="resetValidation"
          v-model.trim="password.value"
          placeholder="password"
        />
      </div>
      <section class="mt">
        <div>
          <input
            v-model="type"
            checked
            id="unbalanced"
            value="user"
            type="radio"
            name="type"
          />
          <label for="unbalanced">Курсант</label>
        </div>
        <div>
          <input
            v-model="type"
            value="admin"
            id="frankness"
            type="radio"
            name="type"
          />
          <label for="frankness">Адмін</label>
        </div>
      </section>
    </form>
    <base-button class="mt" @click="createUser">Додати користувача</base-button>
  </base-card>
</template>

<script>
export default {
  data() {
    return {
      email: { value: "", isInvalid: false },
      password: { value: "", isInvalid: false },
      formIsInvalid: false,
      type: "user",
    };
  },
  methods: {
    async createUser() {
      await this.validateForm();
      if (this.formIsInvalid) {
        return;
      }
      if (this.type === "admin") {
        await this.$store.dispatch("registerAdmin", {
          login: this.email.value,
          password: this.password.value,
        });
        this.password.value = "";
      } else {
        await this.$store.dispatch("createUser", this.email.value);
        await this.$store.dispatch("loadTestResults", { force: true });
      }
      this.email.value = "";
    },
    validateForm() {
      this.formIsInvalid = false;
      if (this.email.value === "") {
        this.formIsInvalid = true;
        this.email.isInvalid = true;
      }
      if (this.password.value === "" && this.type === "admin") {
        this.formIsInvalid = true;
        this.password.isInvalid = true;
      }
    },
    resetValidation() {
      this.formIsInvalid = false;
    },
  },
};
</script>

<style scoped>
#newUser {
  flex-direction: column;
  justify-content: center;
}

.input-group .error {
  border-color: red;
}

.input-group {
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
}

.input-group input {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid black;
  background: white;
}

.input-group button {
  width: 100%;
}

.mt {
  margin-top: 15px;
}

section {
  font-size: 16px;
  display: flex;
  justify-content: space-between;
}
section div {
  margin: 10px 0;
}
section div input {
  display: none;
}
section div label {
  cursor: pointer;
  border: 2px solid transparent;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 10px 20px;
}
input:checked + label {
  border: 2px solid black;
}
input:hover + label {
  border: 2px solid gray;
}
</style>
