import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/results",
    name: "TestResults",
    component: () => import("../views/TestResults.vue"),
  },
  {
    path: "/test/:questionId",
    name: "TestForm",
    component: () => import("../views/TestForm.vue"),
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
