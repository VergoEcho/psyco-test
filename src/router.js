import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/test/TheHome.vue";
import store from "./store/index";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    // eslint-disable-next-line no-unused-vars
    beforeEnter: async (to) => {
      console.log("query link", to.query.invitationLink);
      const allowed = await store.dispatch(
        "checkUser",
        to.query.invitationLink
      );
      console.log("allowed", allowed);
      console.log("LS invitation", localStorage.getItem("invitationLink"));
      if (allowed === false) {
        return { name: "Uninvited" };
      }
    },
  },
  {
    path: "/auth",
    name: "UserAuth",
    component: () => import("./views/test/TestAuth"),
  },
  {
    path: "/test/:questionIndex",
    name: "TestForm",
    component: () => import("./views/test/TestForm.vue"),
    props: true,
  },
  {
    path: "/results",
    name: "TestResults",
    component: () => import("./views/test/TestResults.vue"),
  },
  {
    path: "/admin/login",
    component: () => import("./views/admin/AdminLogin"),
  },
  {
    path: "/admin",
    name: "Admin",
    component: () => import("./views/admin/AdminHome"),
    children: [
      {
        path: "",
        component: () => import("./views/admin/TheResults"),
      },
      {
        path: "addUser",
        component: () => import("./views/admin/AddUser"),
      },
      {
        path: "allQuestions",
        component: () => import("./views/admin/AllQuestions"),
      },
    ],
  },
  {
    path: "/uninvited",
    name: "Uninvited",
    component: () => import("./views/Uninvited"),
  },
  {
    path: "/:notFound(.*)",
    name: "NotFound",
    component: () => import("./views/NotFound"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to) => {
  if (to.fullPath.startsWith("/admin") && to.path !== "/admin/login") {
    // console.log("/admin", to);
    if (store.getters.isAdmin) {
      return true;
    }
    return "/admin/login";
  } else if (
    to.path === "/" ||
    to.path === "/uninvited" ||
    to.path === "/results" ||
    to.path === "/admin/login"
  ) {
    // console.log("/", to);
    return true;
  } else {
    let token = await store.getters.invitationLink;
    // console.log("checkUser", to, token);
    let allowed = await store.dispatch("checkUser", token);
    if (allowed) {
      return true;
    } else {
      // console.log("not allowed");
      return "/uninvited";
    }
  }
});

export default router;
