<template>
  <section>
    <base-card id="test-card">
      <div v-if="!loading">
        {{ currentQuestionIndex }}. {{ currentQuestionText }}
      </div>
      <div class="loader" v-else>Завантаження...</div>
    </base-card>
    <div class="actions">
      <base-button :disabled="loading" @click="checkQuestion(true)"
        >Так</base-button
      >
      <base-button :disabled="loading" @click="checkQuestion(false)"
        >Ні</base-button
      >
    </div>
  </section>
</template>

<script>
export default {
  props: {
    questionIndex: {
      required: true,
    },
  },
  data() {
    return {
      currentQuestionText: "",
      currentQuestionIndex: "",
      loading: false,
    };
  },
  computed: {
    testLength() {
      return this.$store.getters.testLength;
    },
    user() {
      return this.$store.getters.user;
    },
  },
  watch: {
    questionIndex(newId) {
      this.loadQuestion(+newId);
    },
  },
  created() {
    this.loadQuestion(+this.questionIndex);
    if (!this.user) {
      alert("Авторизуйтесь щоб почати тест");
      this.$router.push("/auth");
    }
  },
  methods: {
    async loadQuestion(index) {
      this.loading = true;
      const currentQuestion = await this.$store.dispatch("getQuestionById", {
        index,
      });
      this.currentQuestionText = currentQuestion.question;
      this.currentQuestionIndex = currentQuestion.index + 1;
      this.loading = false;
    },
    async checkQuestion(answer) {
      try {
        this.loading = true;
        await this.$store.dispatch("addUserAnswerToBlank", {
          index: this.questionIndex,
          answer: answer,
        });
        if (+this.questionIndex < this.testLength - 1) {
          await this.$router.push("/test/" + (+this.questionIndex + 1));
        } else {
          await this.$store.dispatch("saveTestResults");
          await this.$store.dispatch("clearLocalstorage");
          await this.$router.push("/results");
        }
        this.loading = false;
      } catch (error) {
        alert(error);
        await this.$router.push("/auth");
      }
    },
  },
};
</script>

<style scoped>
button {
  margin: 20px;
}
.actions {
  display: flex;
  justify-content: center;
}

#test-card {
  min-width: 255px;
}
.loader {
  text-align: center;
  width: 100%;
}
</style>
