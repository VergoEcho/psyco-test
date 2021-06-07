import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/results",
    name: "TestResults",
    component: () => import("./views/TestResults.vue"),
  },
  {
    path: "/test/:questionIndex",
    name: "TestForm",
    component: () => import("./views/TestForm.vue"),
    props: true,
  },
  {
    path: "/admin",
    name: "Admin",
    component: () => import("./views/admin/AdminHome"),
    children: [
      {
        path: "",
        component: () => import("./components/admin/TheResults"),
      },
      {
        path: "addQuestion",
        component: () => import("./components/admin/AddQuestion"),
      },
      {
        path: "allQuestions",
        component: () => import("./components/admin/AllQuestions"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
