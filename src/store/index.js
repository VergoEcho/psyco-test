import { createStore } from "vuex";
import Axios from "axios";
const axios = Axios.create({
  baseURL: "http://localhost:8080/api",
});

const store = createStore({
  state() {
    return {
      testLength: null,
      test: [],
      userBlank: {},
    };
  },
  mutations: {
    setTest(state, test) {
      state.test = test;
    },
    setUserAnswerToBlank(state, {index, answer}) {
      state.userBlank[index] = answer;

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
        console.log(err);
      }
    },
    async getTestLength(context) {
      try {
        if (context.getters.testLength === null) {
          const length = await axios.get("/questions/length");
          context.commit("setTestLength", length);
          return length.data;
        } else {
          return context.getters.testLength;
        }
      } catch (err) {
        console.log(err);
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
    async createQuestion(context, { question, type, answer }) {
      try {
        return await axios.post("/questions", { question, type, answer });
      } catch (err) {
        console.log(err);
      }
    },
    async addUserAnswerToBlank(context, answer) {
      await context.commit('setUserAnswerToBlank', answer)
      const userBlank = await context.getters.userBlank
      localStorage.setItem("userBlank", JSON.stringify(userBlank))
      console.log(localStorage.getItem("userBlank"))
    }
  },
  getters: {
    testLength(state) {
      return state.test.length;
    },
    test(state) {
      return state.test;
    },
    isTestReversed(state, getters) {
      if (getters.testLength > 0) {
        return state.test[0].index !== 0;
      } else {
        return false;
      }
    },
    userBlank(state) {
      return state.userBlank
    }
  },
});

export default store;
