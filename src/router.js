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
      console.log(to.query.invitationLink);
      const allowed = await store.dispatch(
        "checkUser",
        to.query.invitationLink
      );
      console.log(allowed);
      console.log(localStorage.getItem("invitationLink"));
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

// router.beforeEach((to, from, next) => {
//   console.log(to, from);
//   next();
// });

export default router;
