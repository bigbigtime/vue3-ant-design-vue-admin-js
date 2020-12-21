import { createRouter, createWebHashHistory } from "vue-router";
const routes = [
  // 登录 
  {
    path: "/",
    name: "Login",
    hidden: true,
    meta: {
      title: "登录"
    },
    component: () => import("../views/acount/Login.vue")
  },
  // 注册 
  {
    path: "/register",
    name: "Register",
    hidden: true,
    meta: {
      title: "注册"
    },
    component: () => import("../views/acount/Register.vue")
  },
  // 忘记密码 
  {
    path: "/forget",
    name: "Forget",
    hidden: true,
    meta: {
      title: "忘记密码"
    },
    component: () => import("../views/acount/Forget.vue")
  },
  // 管理后台 - 首页
  {
    path: "/index",
    name: "Index",
    meta: {
      title: "首页",
      icon: "icon-aside-home"
    },
    component: () => import("../views/layout/Index.vue")
  },
  // 管理后台 - 管理总台
  {
    path: "/adminIndex",
    name: "AdminIndex",
    meta: {
      title: "管理总台",
      icon: "icon-aside-console"
    },
    component: () => import("../views/layout/Index.vue"),
    children: [
      {
        path: "/role",
        name: "Role",
        meta: {
          title: "角色管理"
        },
        component: () => import("../views/admin/Role.vue"),
      },
      {
        path: "/user",
        name: "User",
        meta: {
          title: "用户管理"
        },
        component: () => import("../views/admin/User.vue")
      },
    ]
  },
  {
    path: "/news",
    name: "News",
    meta: {
      title: "信息管理",
      icon: "icon-aside-informtion"
    },
    component: () => import("../views/layout/Index.vue"),
  },
  {
    path: "/user",
    name: "User",
    meta: {
      title: "用户管理",
      icon: "icon-aside-user"
    },
    component: () => import("../views/layout/Index.vue"),
  },
  {
    path: "/product",
    name: "Product",
    meta: {
      title: "产品管理",
      icon: "icon-aside-product"
    },
    component: () => import("../views/layout/Index.vue"),
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
