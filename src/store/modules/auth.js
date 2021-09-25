import axios from "../../axios";
import jwtDecode from "jwt-decode";

export default {
  state() {
    return {
      user: null,
      invitationLink: null,
      adminToken: null,
    };
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setInvitationLink(state, invitationLink) {
      state.invitationLink = invitationLink;
    },
    setAdminToken(state, adminToken) {
      state.adminToken = adminToken;
    },
  },
  actions: {
    async loginAdmin(context, { login, password }) {
      const adminToken = await axios.post("/auth/admin/login", {
        login,
        password,
      });
      context.commit("setAdminToken", adminToken.data.token);
      await localStorage.setItem("adminToken", adminToken.data.token);
    },
    async loadAdminTokenFromLocalStorage(context) {
      if (!context.getters.isAdmin) {
        let adminToken = localStorage.getItem("adminToken");
        if (isJWTValid(adminToken)) {
          context.commit("setAdminToken", adminToken);
        } else {
          await context.dispatch("logoutAdmin");
        }
      }
    },
    async logoutAdmin(context) {
      localStorage.removeItem("adminToken");
      context.commit("setAdminToken", null);
    },
    async registerAdmin(context, { login, password }) {
      await axios.post("/auth/admin/register", { login, password });
    },
    // async authUser(context, user) {
    //   context.commit("setUser", user);
    //   await localStorage.setItem("user", JSON.stringify(user));
    // },
    async authUser(context, user) {
      await axios.post("/auth/sendMail", { user });
    },
    async loadUserFromLocalStorage(context) {
      let jwtUser = localStorage.getItem("invitationLink");
      const user = jwtDecode(jwtUser) || {};
      console.log(user);
      context.commit("setUser", user);
    },
    async checkUser(context, invitationLink) {
      // TODO: optimize with another token for user
      if (localStorage.getItem("invitationLink") && !invitationLink) {
        const invitation = localStorage.getItem("invitationLink");
        let response = await axios.post("/auth/checkUser", {
          invitationLink: invitation,
        });
        if (response.data.userIsChecked === true) {
          context.commit("setInvitationLink", invitation);
        }
        return !!response.data.userIsChecked;
        //TODO: end of section that need to be optimized
      } else {
        let response = await axios.post("/auth/checkUser", { invitationLink });
        if (response.data.userIsChecked === true) {
          context.commit("setInvitationLink", invitationLink);
          localStorage.setItem("invitationLink", invitationLink);
        }
        return !!response.data.userIsChecked;
      }
    },
    async clearLocalstorage(context) {
      await context.commit("setUser", null);
      await localStorage.clear();
    },
    async clearLocalUser(context) {
      await context.commit("setUser", null);
      await localStorage.removeItem("user");
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
    invitationLink(state) {
      return state.invitationLink;
    },
    isAdmin(state) {
      return !!state.adminToken;
    },
    adminToken(state) {
      return state.adminToken;
    },
  },
};

function isJWTValid(token) {
  if (!token) {
    return false;
  }

  const jwtData = jwtDecode(token) || {};
  const expires = jwtData.exp || 0;
  return new Date().getTime() / 1000 < expires;
}
