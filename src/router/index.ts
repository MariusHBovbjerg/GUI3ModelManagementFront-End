import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/login",
    name: "Login",
    component: () => import("../components/forms/LoginForm.vue"),
  },

  {
    path: "/changepass",
    name: "ChangePass",
    component: () => import("../components/forms/ChangePasswordForm.vue"),
  },

  {
    path: "/manager",
    name: "Manager",

    component: () => import("../views/Manager.vue"),

    beforeEnter: (to, from, next) => {
      if (to.path == "/manager") {
        if (localStorage.getItem("claim") == "Manager") {
          next();
          return;
        }
        next("/");
      }
    },
  },
  {
    path: "/job/:id",
    name: "Job",
    props: true,
    component: () => import("../views/JobEdit.vue"),

    beforeEnter: (to, from, next) => {
      if (localStorage.getItem("claim") == "Manager") {
        next();
        return;
      }
      next("/");
    },
  },

  {
    path: "/model",
    name: "Model",

    component: () => import("../views/Model.vue"),

    beforeEnter: (to, from, next) => {
      if (to.path == "/model") {
        if (localStorage.getItem("claim") == "Model") {
          next();
          return;
        }
        next("/");
      }
    },
  },

];

const router = new VueRouter({
  routes,
  mode: "history",
});

export default router;
