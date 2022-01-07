import Vuex from "vuex";
import Vue from "vue";
import axios from "axios";
import router from "../routes";

Vue.use(Vuex);

const baseURL = process.env.VUE_APP_MY_API_KEY;
const store = new Vuex.Store({
  state: {
    loading: false,
    email: "",
    password: "",
    error: false,
    errorText: "",
    authenticated: false,
    token: "",
    name: "",
    confirmPass: "",
    showToast: false,
    toastText: "",
  },
  mutations: {
    triggerToast(state) {
      state.showToast = false;
    },

    //login handle
    async loginHandle(state, event) {
      event.preventDefault();
      if (state.email === "" || state.password === "") {
        state.error = true;
        state.errorText = "All text field are required!";
      } else {
        state.loading = true;
        const { data } = await axios({
          method: "post",
          url: `${baseURL}login`,
          data: {
            email: state.email,
            password: state.password,
          },
        });
        if (data.status === "success" && data.login === true) {
          state.error = false;
          state.loading = false;
          state.authenticated = true;
          state.token = data.token;
          state.showToast = true;
          state.toastText = "Login Successfull";
          router.push("/home");
        } else {
          state.error = true;
          state.errorText = "Failed! email not found";
          state.loading = false;
          state.authenticated = false;
        }
      }
    },

    //register
    async register(state, e) {
      e.preventDefault();
      if (
        state.name === "" ||
        state.email === "" ||
        state.password === "" ||
        state.confirmPass === ""
      ) {
        state.error = true;
        state.errorText = "All text field are required!";
      } else if (state.password !== state.confirmPass) {
        state.error = true;
        state.errorText = "Password are not same!";
      } else {
        state.loading = true;
        try {
          const { data } = await axios({
            method: "post",
            url: `${baseURL}register`,
            data: {
              name: state.name,
              email: state.email,
              password: state.password,
              password_confirmation: state.confirmPass,
            },
            headers: {
              Accept: "application/json",
            },
          });
          if (data.status === "success") {
            state.error = false;
            state.loading = false;
            state.showToast = true;
            state.toastText = "Registration Successfull";
            router.push("/login");
          }
        } catch (e) {
          state.loading = false;
          state.error = true;
          state.errorText = e.response.data.errors.email[0];
        }
      }
    },

    //clear field
    clearField(state) {
      state.loading = false;
      state.email = "";
      state.password = "";
      state.error = false;
      state.errorText = "";
      state.authenticated = false;
      state.token = "";
      state.name = "";
      state.confirmPass = "";
    },
  },
});

export default store;
