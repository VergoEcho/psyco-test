<template>
  <textarea :class="{error: formIsInvalid}" @blur="resetValidation" v-model.trim="question" placeholder="Введіть питання...">
  </textarea>
  <section>
    <div>
      <input
        v-model="type"
        checked
        id="unbalanced"
        value="unbalanced"
        type="radio"
        name="type"
      />
      <label for="unbalanced"> НПН</label>
    </div>
    <div>
      <input
        v-model="type"
        value="frankness"
        id="frankness"
        type="radio"
        name="type"
      />
      <label for="frankness"> Відвертість</label>
    </div>
  </section>
  <section>
    <div>
      <input
        v-model="answer"
        checked
        id="answer_true"
        :value="true"
        type="radio"
        name="answer"
      />
      <label for="answer_true"> Так</label>
    </div>
    <div>
      <input
        v-model="answer"
        :value="false"
        id="answer_false"
        type="radio"
        name="answer"
      />
      <label for="answer_false"> Ні</label>
    </div>
  </section>
  <base-button @click="createQuestion">Додати питання</base-button>
</template>

<script>
export default {
  data() {
    return {
      question: "",
      answer: true,
      type: "unbalanced",
      formIsInvalid: false,
    };
  },
  methods: {
    createQuestion() {
      this.formIsInvalid = false;
      if (this.question === "") {
        this.formIsInvalid = true;
        return;
      }
      const newQuestion = {
        question: this.question,
        answer: this.answer,
        type: this.type,
      };
      console.log(newQuestion);
      this.$store.dispatch("createQuestion", newQuestion);
      this.question = "";
    },
    resetValidation() {
      this.formIsInvalid = false;
    }
  },
};
</script>

<style scoped>
textarea {
  opacity: 1;
  display: flex;
  padding: 20px;
  border-radius: 5px;
  border: 1px solid #333;
  position: relative;
  width: calc(100% - 40px);
  max-width: 302px;
  min-height: 150px;
  resize: none;
  font-size: 16px;
  margin-bottom: 15px;
}

section {
  font-size: 16px;
  display: flex;
  margin-bottom: 15px;
}

section div {
  margin: 5px 5px;
  padding: 10px;
}

section div input {
  display: none;
}

section div label {
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

button, p {
  margin-top: 5px;
}

.error {
  border-color: red;
}
</style>
