import { createRouter, createWebHashHistory } from "vue-router";
const routes = [
  // 登录 
  {
    path: "/",
    name: "Login",
    component: () => import("../views/acount/Login.vue")
  },
  // 注册 
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/acount/Register.vue")
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue")
  },
  {
    path: "/news",
    name: "News",
    component: () => import("../views/News.vue")
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
