import Vue from "vue";
import VueRouter from "vue-router";

import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Home from "@/views/Home.vue";
import Profile from "@/views/Profile.vue";
import Parameters from "@/views/Parameters.vue";
import pageNotFound from "@/components/pageNotFound.vue";

import { errorHandler } from "@/utils/scripts";

Vue.use(VueRouter);

const routes = [
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
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
    path: "/:pathMatch(.*)",
    component: pageNotFound
  }
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
  const status = require("@/utils/status_config");
  let cookie = document.cookie.split(";");
  let cookieUserId;
  let cookieUserToken;

  if (to.matched.some(route => route.meta.requiresAuth)) {
    if (cookie[0] === "" || cookie[1] === "" || cookie.length < 2) {
      next("/login");
    } else {
      cookieUserId = cookie[0].replace("user_id=", "");
      cookieUserToken = cookie[1].replace("auth_token=", "");
    }

    let user = {
      id: cookieUserId,
    };

    // xhr request
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/api/user/page/auth", true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.setRequestHeader("Authorization", "Bearer " + cookieUserToken);
    xhr.send(JSON.stringify(user));
    xhr.onerror = () => {
      next("/login");
    };
    xhr.onreadystatechange = function() {
      let response = JSON.parse(this.response);

      // DONE & OK
      if (
        this.readyState === status.readystate.DONE &&
        this.status === status.http.OK
      ) {
        next();
      } 
      // ERRORS HANDLER
      else {
        next("/login");
        errorHandler(response.err, response.sub_err, this.readyState, this.status)
      }
    };
  }
  next();
});

export default router;
