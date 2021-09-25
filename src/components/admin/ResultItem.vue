<template>
  <teleport to="#app">
    <div v-if="isDeleteDialogOpen" class="back"></div>
    <dialog :open="isDeleteDialogOpen">
      <p>Ви справді бажаєте видалити цей результат?</p>
      <div class="row">
        <base-button @click="deleteCurrentResult">Так</base-button>
        <base-button @click="closeDeleteDialog">Ні</base-button>
      </div>
    </dialog>
  </teleport>
  <base-card class="result">
    <h3>{{ surname }} {{ name }} {{ patronymic }}</h3>
    <div class="row mt">
      <span><b>ДН:</b> {{ formattedBirthday }}</span>
      <span><b>Група:</b> {{ group }}</span>
    </div>
    <div class="mt"><b>E-mail:</b> {{ email }}</div>
    <div class="mt"><b>Телефон:</b> {{ phone }}</div>
    <p>{{ conclusion }}</p>
    <section>
      <base-badge>Щирість {{ frankness }}</base-badge>
      <base-badge>НПН {{ unbalanced }}</base-badge>
      <base-badge>Бал {{ mark }}</base-badge>
    </section>
    <base-button @click="openDeleteDialog">Видалити результат</base-button>
  </base-card>
</template>

<script>
export default {
  props: [
    "id",
    "passed",
    "invitationLink",
    "surname",
    "name",
    "patronymic",
    "unbalanced",
    "frankness",
    "birthday",
    "email",
    "phone",
    "group",
  ],
  data() {
    return {
      isDeleteDialogOpen: false,
    };
  },
  computed: {
    formattedBirthday() {
      return this.birthday.split("-").reverse().join("/");
    },
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
  methods: {
    openDeleteDialog() {
      this.isDeleteDialogOpen = true;
    },
    closeDeleteDialog() {
      this.isDeleteDialogOpen = false;
    },
    deleteCurrentResult() {
      this.$store.dispatch("removeResult", this.id);
      this.closeDeleteDialog();
    },
  },
};
</script>

<style scoped>
.result {
  flex-direction: column;
  min-height: auto;
  margin-bottom: 20px;
}
.result section {
  display: flex;
  justify-content: space-between;
}
h3 {
  margin: 0 0 5px;
  border-bottom: 2px solid black;
  padding-bottom: 5px;
}
.badge {
  padding: 5px;
}
.row {
  display: flex;
  justify-content: space-between;
}
.mt {
  margin-top: 5px;
}
button {
  margin-top: 10px;
}

dialog {
  border-radius: 5px;
  border: 2px solid black;
  margin-top: 50vh;
  transform: translateY(-50%) translateX(2px);
  max-width: 302px;
}
.back {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #333333aa;
}
</style>
