<template>
  <section>
    <base-card id="test-card">
      {{ currentQuestionIndex }}. {{ currentQuestionText }}
    </base-card>
    <div class="actions">
      <base-button @click="checkQuestion(true)">Так</base-button>
      <base-button @click="checkQuestion(false)">Ні</base-button>
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
      currentQuestion: null,
      currentQuestionText: "",
      currentQuestionIndex: "",
      test: [],
    };
  },
  computed: {
    testLength() {
      return this.$store.getters.testLength;
    },
  },
  watch: {
    questionIndex(newId) {
      this.loadQuestion(+newId);
    },
  },
  created() {
    this.loadQuestion(+this.questionIndex);
  },
  methods: {
    async loadQuestion(index) {
      const currentQuestion = await this.$store.dispatch("getQuestionById", {
        index,
      });
      this.currentQuestion = currentQuestion;
      this.currentQuestionText = currentQuestion.question;
      this.currentQuestionIndex = currentQuestion.index + 1;
    },
    async checkQuestion(answer) {
      // if (answer === this.currentQuestion.answer) {
      //   if (answer) {
      //     this[this.currentQuestion.type]++;
      //   } else {
      //     this[this.currentQuestion.type]--;
      //   }
      // }
      this.$store.dispatch("addUserAnswerToBlank", {
        index: this.questionIndex,
        answer: answer,
      });

      if (+this.questionIndex < this.testLength - 1) {
        this.$router.push("/test/" + (+this.questionIndex + 1));
      } else {
        const userBlank = await localStorage.getItem("userBlank");
        console.log(
          "userBlankFromLocalStorage",
          userBlank
        );
        console.log("userBlank", this.$store.getters.userBlank);
        this.$router.push("/results");
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
</style>
