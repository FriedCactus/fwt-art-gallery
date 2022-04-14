import { login, refresh, register } from "@/api";
import { TAuthBody, TAuthState, TRootState } from "@/types";
import axios from "axios";
import { Module } from "vuex";

type TTokenPayload = {
  accessToken: string;
  refreshToken: string;
  expires: number;
};

const authModule: Module<TAuthState, TRootState> = {
  state: {
    isAccess: false,
    isLoading: false,
    accessToken: "",
    refreshToken: "",
    expires: 0,
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
      state.isAccess = payload;
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
    setTokens(state, payload: TTokenPayload) {
      state.accessToken = payload.accessToken;
      state.refreshToken = payload.refreshToken;
      state.expires = payload.expires;
    },
  },
  actions: {
    async tryToLogin({ commit, state }, payload: TAuthBody) {
      state.isLoading = true;
      commit("clearError");

      try {
        const response = await login(payload);

        state.isAccess = true;

        state.accessToken = response.data.accessToken;
        state.refreshToken = response.data.refreshToken;
        state.expires = Date.now() + 60 * 60 * 24 * 1000;
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
        const { data } = await register(payload);

        state.isAccess = true;

        state.accessToken = data.accessToken;
        state.refreshToken = data.refreshToken;
        state.expires = Date.now() + 60 * 60 * 24 * 1000;
      } catch (e) {
        if (axios.isAxiosError(e)) {
          const message: string = e.response?.data.message;

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

    async tryToRefresh({ state }, payload: string) {
      state.isLoading = true;

      try {
        await refresh({
          refreshToken: payload,
        });

        state.isAccess = true;

        // Новый токен не обновляется в базе, пока юзать старый
        // state.accessToken = data.accessToken;
        // state.refreshToken = data.refreshToken;
        state.expires = Date.now() + 60 * 60 * 24 * 1000;
      } catch (e) {
        if (axios.isAxiosError(e)) {
          console.log(e.response);
        }
      }

      state.isLoading = false;
    },
  },
};

export default authModule;
