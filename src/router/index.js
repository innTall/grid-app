import { createRouter, createWebHistory } from "vue-router";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("../views/HomePage.vue"),
    },
    {
      path: "/chart",
      name: "Chart",
      component: () => import("../views/ChartPage.vue"),
    },
    {
      path: "/trade",
      name: "Trade",
      component: () => import("../views/TradePage.vue"),
    },
    {
      path: "/test",
      name: "Test",
      component: () => import("../views/TestPage.vue"),
    },
  ],
});
export default router;
