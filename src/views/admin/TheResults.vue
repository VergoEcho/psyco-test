<template>
  <div v-if="loading">Завантаження результатів...</div>
  <div v-else>
    <result-item
      v-for="result in results"
      :key="result._id"
      :id="result._id"
      :passed="result.passed"
      :invitationLink="result.invitationLink"
      :surname="result.surname"
      :name="result.name"
      :patronymic="result.patronymic"
      :unbalanced="result.unbalanced"
      :frankness="result.frankness"
      :birthday="result.birthday"
      :email="result.email"
      :phone="result.phone"
      :group="result.group"
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
      console.log(this.$store.getters.testResults);
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
