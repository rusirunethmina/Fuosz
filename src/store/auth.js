import axios from "axios";
import { notify } from "@kyvg/vue3-notification";

export default {
  namespaced: true,

  state: {
    userData: null,
    isLoggedIn: false,
    baseUrl: 'https://admin.emb.lk/api/' //'https://fuodz.edentech.online/api/'
  },

  getters: {
    user: state => state.userData
  },

  mutations: {
    setUserData(state, user) {
      state.userData = user;
    }
  },

  actions: {
   
    sendLoginRequest({ commit, state }, data) {
      commit("setErrors", {}, { root: true });
      return axios
        .post(state.baseUrl+"login", data)
        .then((response) => {
          console.log(response)
          commit("setUserData", response.data.user);
          localStorage.setItem("authToken", response.data.token);
          localStorage.setItem("user",JSON.stringify(response.data.user));
          // console.log(response.token);
            notify({
              type: "success",
              title: "Login",
              text: response.data.message,
            });
            window.location.href = "/";
          // commit("setErrors", 'failed')
        })
        .catch((response) => {
          console.log(response)
          notify({
            type: "error",
            title: "Login",
            text: "Email or Password incorrect",
          });
        });
    },
    sendRegisterRequest({ commit, state }, data) {
      commit("setErrors", {}, { root: true });
      return axios
        .post(state.baseUrl+"register", data)
        .then((response) => {
          commit("setUserData", response.data.user);
          localStorage.setItem("authToken", response.data.token);
          localStorage.setItem("user",JSON.stringify(response.data.user));
          console.log(response.data.message);
          notify({
            type: "success",
            title: "Register",
            text: response.data.message,
          });
          window.location.href = "/";
        })
        .catch((response) => {
          console.log(response)
          notify({
            type: "error",
            title: "register",
            text: 'All fields are required!',
          });
        });
    },
    sendLogoutRequest({ commit, state }) {
      axios.get(state.baseUrl+"logout").then(() => {
        commit("setUserData", null);
        localStorage.removeItem("authToken");
      });
    },
    
  }
};
