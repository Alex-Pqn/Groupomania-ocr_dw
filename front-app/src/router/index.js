import Vue from "vue";
import VueRouter from "vue-router";

import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Home from "../views/Home.vue";
import Profile from "../views/Profile.vue"; 
import Parameters from "../views/Parameters.vue"; 
import pageNotFound from "../components/pageNotFound.vue"

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
  mode: 'history'
});

router.beforeEach((to,from,next) => {
  const status = require('../components/status_config')
  let cookie = document.cookie.split(';')
  let cookieUserId
  let cookieUserToken
  
  if(to.matched.some(route => route.meta.requiresAuth)) {
    if (cookie[0] === "" || cookie[1] === "" || cookie.length < 2) {
      next('/login');
    }else{
      cookieUserId = cookie[0].replace('user_id=', '')
      cookieUserToken = cookie[1].replace('auth_token=', '')
    }
    
    let userParams = {
      userId: cookieUserId,
    }
    
    // xhr request
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/api/user/page/auth', true) ;
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.setRequestHeader('Authorization', 'Bearer ' + cookieUserToken)
    xhr.send(JSON.stringify(userParams));
    xhr.onerror = () => {
      next('/login');
    }
    xhr.onreadystatechange = function() {
      const response = JSON.parse(this.response)
      
      // DONE & OK
      if (this.readyState === status.readystate.DONE && this.status === status.http.OK) {
        next();
        
      // ERRORS HANDLER
      } else if (this.status === status.http.UNAUTHORIZED || this.status === status.http.INTERNAL_SERVER_ERROR) {
        next('/login');
        console.error(`HTTP Status: ${this.status} ; ReadyState Status: ${this.readyState} | Type: ${response.err.name} ; Error: ${response.err.message} ; Sub-Error: ${response.sub_error}`)
      }
    }
  }
  next();
});

export default router;
