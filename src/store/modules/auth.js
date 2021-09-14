import axios from "../../axios";

export default {
  state() {
    return {
      user: null,
      invitationLink: null,
    };
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setInvitationLink(state, invitationLink) {
      state.invitationLink = invitationLink;
    },
  },
  actions: {
    async authUser(context, user) {
      context.commit("setUser", user);
      await localStorage.setItem("user", JSON.stringify(user));
    },
    async loadUserFromLocalStorage(context) {
      let user = localStorage.getItem("user");
      user = await JSON.parse(user);
      context.commit("setUser", user);
    },
    async checkUser(context, invitationLink) {
      if (localStorage.getItem("invitationLink")) {
        context.commit(
          "setInvitationLink",
          localStorage.getItem("invitationLink")
        );
        return !!context.getters.invitationLink;
      } else {
        let response = await axios.post("/auth/checkUser", { invitationLink });
        if (response.data.userIsChecked === true) {
          context.commit("setInvitationLink", invitationLink);
          localStorage.setItem("invitationLink", invitationLink);
        }
        console.log("allowed", response.data.userIsChecked);
        return !!response.data.userIsChecked;
      }
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
    invitationLink(state) {
      return state.invitationLink;
    },
  },
};
