import Vue from "vue";
import VueRouter from "vue-router";

import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Home from "../views/Home.vue";
import Profile from "../views/Profile.vue"; 

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },

  {
    path: "/Register",
    name: "Register",
    component: Register
  },

  {
    path: "/Login",
    name: "Login",
    component: Login
  },

  {
    path: "/Profile",
    name: "Profile",
    component: Profile
  }
];

  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  // component: () =>
  //   import(/* webpackChunkName: "about" */ "../views/About.vue")

const router = new VueRouter({
  routes,
  // mode: 'history'
});

export default router;
