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
    };
  },
  mutations: {
    setTestLength(state, length) {
      state.testLength = length;
    },
    setTest(state, test) {
      state.test = test;
    },
  },
  actions: {
    async getAllQuestions() {
      try {
        console.log("all");
        return await axios.get("/questions/all");
      } catch (err) {
        console.log(err);
      }
    },
    async getTestLength(context) {
      try {
        if (context.getters.testLength === null) {
          const length = await axios.get("/questions/length");
          context.commit("setTestLength", length);
          console.log("store", context.getters.testLength);
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
          console.log("storeId", test.data);
          context.commit("setTestLength", test.data.length);
          context.commit("setTest", test.data);
          return test.data[index];
        } else {
          console.log("else");
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
  },
  getters: {
    testLength(store) {
      return store.testLength;
    },
    test(store) {
      return store.test;
    },
  },
});

export default store;
