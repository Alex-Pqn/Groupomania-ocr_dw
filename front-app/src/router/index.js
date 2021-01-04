import Vue from "vue";
import VueRouter from "vue-router";

import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Home from "@/views/Home.vue";
import Profile from "@/views/Profile.vue";
import Parameters from "@/views/Parameters.vue";
import pageNotFound from "@/components/pageNotFound.vue";

import { api } from "@/utils/scripts";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/parameters",
    name: "Parameters",
    component: Parameters,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/:pathMatch(.*)",
    component: pageNotFound,
    meta: {
      requiresAuth: true
    }
  },
];

// route level code-splitting
// this generates a separate chunk (about.[hash].js) for this route
// which is lazy-loaded when the route is visited.
// component: () =>
//   import(/* webpackChunkName: "about" */ "../views/About.vue")

const router = new VueRouter({
  routes,
  mode: "history"
});

router.beforeEach((to, from, next) => {
  
  // xhr request error
  function xhrCallbackError () {
    if (to.matched.some(route => route.meta.requiresAuth)) {
      next("/login");
    }else{
      next();
    }
  }
  
  // token invalid or api error
  function apiCallbackError () {
    if (to.matched.some(route => route.meta.requiresAuth)) {
      next("/login");
    }else{
      next();
    }
  }
  
  // token valid
  function apiCallbackDone () {
    // page requires auth, redirect to this
    if (to.matched.some(route => route.meta.requiresAuth)) {
      next();
    }
    // redirect to home page, user is already connected and cannot acces to /login or /register
    else{
      next("/");
    }
  }

  // api request
  let formData = new FormData();
  api("api/user/page/auth", "POST", formData, true, apiCallbackDone, apiCallbackError, xhrCallbackError); 
  
  next();
});

export default router;
