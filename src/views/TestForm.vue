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
      testLength: null,
      frankness: 0,
      unbalanced: 0,
    };
  },
  watch: {
    questionIndex(newId) {
      this.loadQuestion(Number(newId));
    },
  },

  created() {
    console.log("index", this.questionIndex);
    this.loadQuestion(Number(this.questionIndex));
  },
  methods: {
    async loadQuestion(index) {
      const currentQuestion = await this.$store.dispatch("getQuestionById", {
        index,
      });
      const testLength = await this.$store.dispatch("getTestLength");
      console.log("testForm", currentQuestion);
      this.currentQuestion = currentQuestion;
      this.currentQuestionText = currentQuestion.question;
      this.currentQuestionIndex = currentQuestion.index + 1;
      this.testLength = testLength;
    },
    checkQuestion(answer) {
      console.log("check", this.testLength);
      if (answer === this.currentQuestion.answer) {
        if (answer) {
          this[this.currentQuestion.type]++;
        } else {
          this[this.currentQuestion.type]--;
        }
      }

      if (Number(this.questionIndex) < this.testLength - 1) {
        this.$router.push("/test/" + (Number(this.questionIndex) + 1));
      } else {
        this.$router.push("/results");
        console.log(
          "frankness",
          this.frankness,
          "\nunbalanced",
          this.unbalanced
        );
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
