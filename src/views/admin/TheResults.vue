<template>
  <div v-if="loading">Завантаження результатів...</div>
  <div v-else>
    <result-item
      v-for="result in results"
      :key="result._id"
      :surname="result.surname"
      :name="result.name"
      :patronymic="result.patronymic"
      :unbalanced="result.unbalanced"
      :frankness="result.frankness"
    />
  </div>
</template>

<script>
import ResultItem from "@/components/admin/ResultItem";
export default {
  data() {
    return {
      loading: false,
    };
  },
  components: {
    ResultItem,
  },
  created() {
    this.loadResults();
  },
  computed: {
    results() {
      return this.$store.getters.testResults;
    },
  },
  methods: {
    async loadResults() {
      this.loading = true;
      await this.$store.dispatch("loadTestResults");
      this.loading = false;
    },
  },
};
</script>
