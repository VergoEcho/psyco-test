<template>
  <base-card class="question" v-for="question in questions" :key="question._id">
    {{ question.index + 1 }}. {{ question.question }}
    <section>
      <div v-if="question.type === 'frankness'">відвертість</div>
      <div v-else>нпн</div>
      <div v-if="question.answer">так</div>
      <div v-else>ні</div>
    </section>
  </base-card>
</template>

<script>
import BaseCard from "@/components/BaseCard";
export default {
  components: { BaseCard },
  data() {
    return {
      questions: [],
    };
  },
  beforeMount() {
    this.loadQuestions();
  },
  methods: {
    async loadQuestions() {
      const questions = await this.$store.dispatch("getAllQuestions");
      this.questions = questions.data;
    },
  },
};
</script>

<style scoped>
.question {
  min-height: auto;
  margin-bottom: 20px;
  flex-direction: column;
}

.question section {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}
.question section div {
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px 10px;
  font-style: italic;
}
</style>
