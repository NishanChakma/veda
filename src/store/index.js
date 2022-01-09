import Vuex from "vuex";
import Vue from "vue";
import axios from "axios";
import router from "../routes";
import moment from "moment";

Vue.use(Vuex);

const baseURL = process.env.VUE_APP_MY_API_KEY;
const store = new Vuex.Store({
  state: {
    loading: false,
    email: "tester@tester.com",
    password: "123456",
    error: false,
    errorText: "",
    authenticated: false,
    token: "45|GVy1RCXK2PjnuqoIIu5FtUaJdHScDd2xSePBmjCu",
    name: "",
    confirmPass: "",
    showToast: false,
    toastText: "",
    allTasks: [],
    taskId: null,
    showModal: false,
    modalType: 0,
    header: "",
    buttonText: "",
    title: "",
    shortDescription: "",
    dueDate: moment().unix(),
  },

  mutations: {
    triggerToast(state) {
      state.showToast = false;
    },

    setTaskId(state, id) {
      state.taskId = id;
    },

    addorEditModal(state, param) {
      if (param === 0) {
        state.header = "Add your task";
        state.buttonText = "Add";
        state.showModal = true;
        state.modalType = 0;
      } else {
        state.header = "Edit your task";
        state.buttonText = "Update";
        state.showModal = true;
        state.modalType = 1;
      }
    },

    //all task
    async loadAllTask(state) {
      try {
        const { data } = await axios({
          method: "get",
          url: `${baseURL}tasks`,
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${state.token}`,
          },
        });
        let res = await data.tasks;
        let respose = JSON.parse(JSON.stringify(res));
        let changeDateTime = respose.map(({ due_date, ...res }) => ({
          ...res,
          date: moment(due_date * 1000).format("DD.MM.YYYY"),
          time: moment(due_date * 1000).format("hh.ss a"),
        }));
        state.allTasks = changeDateTime;
      } catch {
        this.commit("clearField");
      }
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
          this.commit("loadAllTask");
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

    //delete item
    async deleteData(state, id) {
      try {
        const { data } = await axios({
          method: "post",
          url: `${baseURL}remove_task/${id}`,
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${state.token}`,
          },
        });
        if (data.status === "success") {
          this.commit("loadAllTask");
          alert("Delete item successfull!");
        }
      } catch (e) {
        console.warn(e);
        alert("Error while delete item!");
      }
    },

    //add or edit item
    async addOrEditData(state, e) {
      e.preventDefault();
      try {
        let url =
          state.modalType === 1 ? "add_task/" + state.taskId : "add_task";
        const { data } = await axios({
          method: "post",
          url: `${baseURL + url}`,
          data: {
            title: state.title,
            description: state.shortDescription,
            due_date: state.dueDate,
          },
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${state.token}`,
          },
        });
        console.log(data);
        if (data.status === "success") {
          this.commit("loadAllTask");
          state.showModal = false;
          alert(
            state.modalType === 1
              ? "Update item successfull!"
              : "Add item successfull!"
          );
        }
      } catch (e) {
        console.warn(e);
        alert("Error!");
      }
    },

    //clear field
    clearField(state) {
      state.loading = false;
      state.email = "";
      state.password = "";
      state.error = false;
      state.errorText = "";
      state.name = "";
      state.confirmPass = "";
      state.taskId = null;
    },
  },
});

export default store;
