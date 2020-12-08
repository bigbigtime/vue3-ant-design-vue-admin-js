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
  // 忘记密码 
  {
    path: "/forget",
    name: "Forget",
    component: () => import("../views/acount/Forget.vue")
  },
  // 管理后台 - 首页
  {
    path: "/index",
    name: "Index",
    component: () => import("../views/layout/Index.vue")
  },
  // 管理后台 - 信息管理
  {
    path: "/newsIndex",
    name: "NewsIndex",
    component: () => import("../views/layout/Index.vue")
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
