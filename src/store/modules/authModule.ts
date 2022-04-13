import { login, register } from "@/api";
import { TAuthBody, TAuthState, TRootState } from "@/types";
import axios from "axios";
import { Module } from "vuex";

const authModule: Module<TAuthState, TRootState> = {
  state: {
    isAuth: false,
    isLoading: false,
    error: {
      type: "",
      message: "",
    },
  },
  getters: {
    isError: (state) => !!state.error.type || !!state.error.message,
    getUsernameError: (state) =>
      state.error.type === "username" ? state.error.message : "",

    getPasswordError: (state) =>
      state.error.type === "password" ? state.error.message : "",
  },
  mutations: {
    setIsAuth(state, payload: boolean) {
      state.isAuth = payload;
    },
    setError(state, payload: TAuthState["error"]) {
      state.error = payload;
    },
    clearError(state) {
      state.error = {
        type: "",
        message: "",
      };
    },
  },
  actions: {
    async tryToLogin({ commit, state }, payload: TAuthBody) {
      state.isLoading = true;
      commit("clearError");

      try {
        await login(payload);

        commit("setIsAuth", true);
      } catch (e) {
        if (axios.isAxiosError(e)) {
          const message: string = e.response?.data.message;

          if (message.toLowerCase().includes("username")) {
            state.error = {
              type: "username",
              message: "Имя пользователя не найдено",
            };
          }

          if (message.toLowerCase().includes("password")) {
            state.error = {
              type: "password",
              message: "Пароль введен неправильно",
            };
          }
        }
      }

      state.isLoading = false;
    },

    async tryToRegister({ state, commit }, payload: TAuthBody) {
      state.isLoading = true;
      commit("clearError");

      try {
        await register(payload);
      } catch (e) {
        if (axios.isAxiosError(e)) {
          const message: string = e.response?.data.message;
          console.log(message);

          if (message.toLowerCase().includes("username")) {
            state.error = {
              type: "username",
              message: "Имя пользователя уже используется",
            };
          }
        }
      }

      state.isLoading = false;
    },
  },
};

export default authModule;
