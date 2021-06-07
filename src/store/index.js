import { createStore } from "vuex";

import auth from "@/store/modules/auth";
import test from "@/store/modules/test"

const store = createStore({
  modules: {
    auth,
    test
  },
});

export default store;
