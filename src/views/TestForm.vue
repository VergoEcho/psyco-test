<template>
  <section>
    <base-card>
      {{ currentQuestionText }}
    </base-card>
    <div v-if="Number(questionId) < test.length">
      <base-button @click="checkQuestion(true)">Так</base-button>
      <base-button @click="checkQuestion(false)">Ні</base-button>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    questionId: {
      required: true,
    },
  },
  data() {
    return {
      currentQuestion: null,
      currentQuestionText: "",
      test: [
        {
          question:
            "1. Іноді мені в голову приходять такі негарні думки, що краще про них нікому не розповідати.",
          answer: false,
          type: "frankness",
        },
        {
          question:
            "2. В дитинстві у мене була така компанія, що всі старались завжди й в усьому стояти один за одного.",
          answer: false,
          type: "unbalanced",
        },
        {
          question:
            "3. Іноді у мене бувають приступи сміху або плачу, які я ніяк не можу подолати.",
          answer: true,
          type: "unbalanced",
        },
      ],
      frankness: 0,
      unbalanced: 0,
    };
  },
  watch: {
    questionId(newId) {
      this.loadQuestion(Number(newId));
    },
  },
  created() {
    this.loadQuestion(Number(this.questionId));
  },
  methods: {
    loadQuestion(id) {
      this.currentQuestion = this.test[id];
      this.currentQuestionText = this.currentQuestion.question;
    },
    checkQuestion(answer) {
      if (answer === this.currentQuestion.answer) {
        if (answer) {
          this[this.currentQuestion.type]++;
        } else {
          this[this.currentQuestion.type]--;
        }
      }

      if (Number(this.questionId) < this.test.length - 1) {
        this.$router.push("/test/" + (Number(this.questionId) + 1));
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
div {
  display: flex;
  justify-content: center;
}
</style>
