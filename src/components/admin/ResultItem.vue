<template>
  <base-card class="result">
    <h3>{{ surname }} {{ name }} {{ patronymic }}</h3>
    <p>{{ conclusion }}</p>
    <section>
      <base-badge>Щирість {{ frankness }}</base-badge>
      <base-badge>НПН {{ unbalanced }}</base-badge>
      <base-badge>Бал {{ mark }}</base-badge>
    </section>
  </base-card>
</template>

<script>
export default {
  props: ["surname", "name", "patronymic", "unbalanced", "frankness"],
  computed: {
    conclusion() {
      if (this.unbalanced < 7) {
        return "Висока НПС, зриви майже не вірогідні";
      }
      if (this.unbalanced < 14) {
        return "Хороша НПС, зриви маловірогідні";
      }
      if (this.unbalanced < 29) {
        return "Задовільна НПС. Зриви можливі, особливо в екстремальних ситуаціях";
      }
      if (this.unbalanced >= 29) {
        return "Незадовільна НПС. Висока вірогідність нервово-психічних зривів. Необхідне додаткове обстеження психіатра, невропатолога.";
      }
      return "Помилка, у визначенні рівня НПС";
    },
    mark() {
      const unbalanced = this.unbalanced;
      if (unbalanced < 6) {
        return 10;
      }
      if (unbalanced < 7) {
        return 9;
      }
      if (unbalanced < 9) {
        return 8;
      }
      if (unbalanced < 11) {
        return 7;
      }
      if (unbalanced < 14) {
        return 6;
      }
      if (unbalanced < 18) {
        return 5;
      }
      if (unbalanced < 23) {
        return 4;
      }
      if (unbalanced < 29) {
        return 3;
      }
      if (unbalanced < 33) {
        return 2;
      }
      return 1;
    },
  },
};
</script>

<style scoped>
.result {
  flex-direction: column;
  min-height: auto;
  margin-bottom: 20px
}
.result section {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}
h3 {
  margin: 0 0 10px;
}
.badge {
  padding: 5px;
}
</style>
