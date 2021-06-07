import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/test/TheHome.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
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
        path: "addQuestion",
        component: () => import("./views/admin/AddQuestion"),
      },
      {
        path: "allQuestions",
        component: () => import("./views/admin/AllQuestions"),
      },
    ],
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

export default router;
