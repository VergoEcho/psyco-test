<template>
  <form @submit.prevent="submitForm">
    <base-card id="auth">
      <h2>Авторизація</h2>
      <div class="form-fields">
        <div class="input-group" :class="{ error: surname.isInvalid }">
          <label for="surname">Прізвище</label>
          <input
            @blur="clearValidity('surname')"
            type="text"
            id="surname"
            v-model.trim="surname.value"
          />
        </div>
        <div class="input-group" :class="{ error: name.isInvalid }">
          <label for="name">Ім'я</label>
          <input
            @blur="clearValidity('name')"
            type="text"
            id="name"
            v-model.trim="name.value"
          />
        </div>
        <div class="input-group" :class="{ error: patronymic.isInvalid }">
          <label for="patronymic">По батькові</label>
          <input
            @blur="clearValidity('patronymic')"
            type="text"
            id="patronymic"
            v-model.trim="patronymic.value"
          />
        </div>
      </div>
    </base-card>
    <base-button v-if="user" @click="startTest" type="button"> Продовжити з поточним користувачем</base-button>
    <base-button> Авторизуватись </base-button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      surname: {
        value: "",
        isInvalid: false,
      },
      name: {
        value: "",
        isInvalid: false,
      },
      patronymic: {
        value: "",
        isInvalid: false,
      },
      formIsInvalid: false,
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  methods: {
    async submitForm() {
      await this.validateForm();

      if (this.formIsInvalid) {
        return;
      }

      const user = await {
        surname: this.surname.value,
        name: this.name.value,
        patronymic: this.patronymic.value,
      };

      await this.$store.dispatch("authUser", user);

      this.$router.push("/test/0");
    },
    validateForm() {
      this.formIsInvalid = false;
      if (this.surname.value === "") {
        this.surname.isInvalid = true;
        this.formIsInvalid = true;
      }
      if (this.name.value === "") {
        this.name.isInvalid = true;
        this.formIsInvalid = true;
      }
      if (this.patronymic.value === "") {
        this.patronymic.isInvalid = true;
        this.formIsInvalid = true;
      }
    },
    clearValidity(input) {
      this[input].isInvalid = false;
    },
    startTest() {
      this.$router.push("/test/0")
    }
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  /*max-width: 380px;*/
  max-width: 302px;
}
#auth {
  padding: 20px;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 20px;
}
h2 {
  font-size: 20px;
  margin: 0 0 10px;
}
.form-fields {
  width: 100%;
  flex-direction: column;
  display: flex;
  align-items: flex-end;
}
.input-group {
  margin: 5px 0;
}
.input-group input {
  margin-left: 10px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid black;
}
.error input {
  border-color: red;
}
button {
  align-self: center;
  margin-bottom: 20px ;
}
</style>
