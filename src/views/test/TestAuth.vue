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
        <div class="input-group" :class="{ error: birthday.isInvalid }">
          <label for="birthday">Рік народження</label>
          <input
            @blur="clearValidity('birthday')"
            type="date"
            id="birthday"
            v-model.trim="birthday.value"
          />
        </div>
        <div class="input-group" :class="{ error: phone.isInvalid }">
          <label for="phone">Телефон</label>
          <input
            @focus="addPlusToPhone"
            @blur="
              removePlusFromPhone();
              clearValidity('phone');
            "
            type="tel"
            id="phone"
            v-model.trim.number="phone.value"
          />
        </div>
        <div class="input-group" :class="{ error: group.isInvalid }">
          <label for="group">Группа</label>
          <input
            @blur="clearValidity('group')"
            type="text"
            id="group"
            v-model.trim.number="group.value"
          />
        </div>
      </div>
      <small class="text-center">
        Авторизуючись ви даєте згоду на обробку ваших персональних даних
      </small>
    </base-card>
    <base-button v-if="user" @click="startTest" type="button">
      Продовжити з поточним користувачем
    </base-button>
    <base-button> Авторизуватись</base-button>
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
      birthday: {
        value: "",
        isInvalid: false,
      },
      phone: {
        value: "",
        isInvalid: false,
      },
      group: {
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

      const user = {
        surname: this.surname.value,
        name: this.name.value,
        patronymic: this.patronymic.value,
        birthday: this.birthday.value,
        phone: this.phone.value,
        group: this.group.value,
      };

      await this.$store.dispatch("authUser", user);

      this.startTest();
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
      if (this.birthday.value === "") {
        this.birthday.isInvalid = true;
        this.formIsInvalid = true;
      }
      if (this.phone.value === "") {
        this.phone.isInvalid = true;
        this.formIsInvalid = true;
      }
      if (this.group.value === "") {
        this.group.isInvalid = true;
        this.formIsInvalid = true;
      }
    },
    clearValidity(input) {
      this[input].isInvalid = false;
    },
    startTest() {
      this.$router.push("/test/0");
    },
    addPlusToPhone() {
      if (this.phone.value === "") {
        this.phone.value = "+";
      }
    },
    removePlusFromPhone() {
      if (this.phone.value === "+") {
        this.phone.value = "";
      }
    },
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
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.input-group input {
  margin-left: 4px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid black;
  width: 122px;
  background: white;
}

.error input {
  border-color: red;
}

button {
  align-self: center;
  margin-bottom: 20px;
}

.text-center {
  text-align: center;
}
</style>
