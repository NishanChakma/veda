import Vue from "vue";
import App from "./App.vue";
import Router from "./routes";
import Store from "./store";

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  store: Store,
  router: Router,
  render: (h) => h(App),
}).$mount("#app");
