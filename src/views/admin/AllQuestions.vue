<template>
  <div v-if="loading">Завантаження питань...</div>
  <base-card
    v-else
    class="question"
    v-for="question in questions"
    :key="question._id"
  >
    {{ question.index + 1 }}. {{ question.question }}
    <section>
      <base-badge
        >{{ question.type === "frankness" ? "відвертість" : "нпн" }}
      </base-badge>
      <base-badge>{{ question.answer ? "так" : "ні" }}</base-badge>
    </section>
  </base-card>
</template>

<script>
import BaseCard from "@/components/BaseCard";

export default {
  components: { BaseCard },
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    questions() {
      return this.$store.getters.testReversed;
    },
  },
  created() {
    this.loadQuestions();
  },
  methods: {
    async loadQuestions() {
      this.loading = true;
      await this.$store.dispatch("getAllQuestionsReversed");
      this.loading = false;
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

.reverse {
  font-size: 16px;
  display: flex;
  margin-bottom: 15px;
  white-space: nowrap;
}

.reverse div {
  margin: 5px 5px;
  padding: 10px;
}

.reverse div input {
  display: none;
}

.reverse div label {
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
