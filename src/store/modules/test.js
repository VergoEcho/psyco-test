import axios from "../../axios";

export default {
  state() {
    return {
      testLength: null,
      test: [],
      testReversed: [],
      testResults: [],
    };
  },
  mutations: {
    setTest(state, test) {
      state.test = test;
    },
    setTestReversed(state, test) {
      state.testReversed = test;
    },
    setTestResults(state, results) {
      state.testResults = results;
    },
  },
  actions: {
    async getAllQuestions(context) {
      try {
        let test = await context.getters.test;
        if (test.length === 0) {
          const test = await axios.get("/questions/all");
          context.commit("setTest", test.data);
          return test.data;
        } else {
          return test;
        }
      } catch (err) {
        alert(err);
      }
    },
    async getAllQuestionsReversed(context) {
      try {
        let test = await context.getters.testReversed;
        if (test.length === 0) {
          const test = await axios.get("/questions/allReversed");
          context.commit("setTestReversed", test.data);
          return test.data;
        } else {
          return test;
        }
      } catch (err) {
        alert(err);
      }
    },
    async getQuestionById(context, { index }) {
      try {
        let test = await context.getters.test;
        if (test.length === 0) {
          const test = await context.dispatch("getAllQuestions");
          context.commit("setTest", test);
          return test[index];
        } else {
          return test[index];
        }
      } catch (err) {
        console.log(err);
      }
    },
    async addUserAnswerToBlank(context, { index, answer }) {
      let userBlank = localStorage.getItem("userBlank");
      if (userBlank === null) {
        userBlank = {};
      } else {
        userBlank = JSON.parse(userBlank);
      }
      userBlank[index] = answer;
      await localStorage.setItem("userBlank", JSON.stringify(userBlank));
    },
    async saveTestResults(context) {
      const user = await context.getters.user;
      let userAnswers = localStorage.getItem("userBlank");
      userAnswers = await JSON.parse(userAnswers);
      const test = await context.getters.test;
      let results = {
        frankness: 0,
        unbalanced: 0,
      };
      for await (const question of test) {
        if (userAnswers[question.index] === undefined || !user) {
          throw "Ви пропустили авторизацію, або один з тестів. Будь-ласка, почніть спочатку";
        }
        if (userAnswers[question.index] === question.answer) {
          if (question.answer) {
            results.unbalanced++;
          } else {
            results[question.type]--;
          }
        }
      }
      const token = await context.getters.invitationLink;
      await axios.post("/questions/saveTestResults", {
        results,
        invitationLink: token,
      });
    },
    async loadTestResults(context, force = false) {
      try {
        const results = context.getters.testResults;
        if (results.length === 0 || force) {
          const results = await axios.get("/questions/testResults");
          context.commit("setTestResults", results.data);
        }
      } catch (error) {
        alert(error);
      }
    },
    async removeResult(context, id) {
      let testResults = context.getters.testResults;
      testResults = await testResults.filter((result) => {
        if (result._id !== id) {
          return true;
        }
      });
      await axios.delete(`questions/testResults/${id}`);
      context.commit("setTestResults", testResults);
    },
  },
  getters: {
    testLength(state) {
      return state.test.length;
    },
    test(state) {
      return state.test;
    },
    testReversed(state) {
      return state.testReversed;
    },
    testResults(state) {
      return state.testResults;
    },
  },
};
