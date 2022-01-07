import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Registration from "../views/Registration.vue";
import Home from "../views/Home.vue";
import store from "../store";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: {
        name: "login",
      },
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/register",
      name: "register",
      component: Registration,
    },
    {
      path: "/home",
      name: "home",
      component: Home,
      beforeEnter: (to, from, next) => {
        if (store.state.authenticated == false) {
          next("./login");
        } else {
          next();
        }
      },
    },
  ],
});
export default router;
