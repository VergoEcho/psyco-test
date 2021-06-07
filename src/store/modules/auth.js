export default {
  state() {
    return {
      user: null,
    };
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    async authUser(context, user) {
      context.commit("setUser", user);
      await localStorage.setItem("user", JSON.stringify(user));
    },
    async loadUserFromLocalStorage(context) {
      let user = await localStorage.getItem("user");
      user = await JSON.parse(user);
      context.commit("setUser", user);
    },
    async clearLocalstorage(context) {
      await context.commit("setUser", null);
      await localStorage.clear();
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
  },
};
