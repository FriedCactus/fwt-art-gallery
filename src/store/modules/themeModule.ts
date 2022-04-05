import { TRootState, TThemeState } from "@/types";
import { Module } from "vuex";

const themeModule: Module<TThemeState, TRootState> = {
  state: {
    theme: "light",
  },
  mutations: {
    changeTheme(state) {
      state.theme = state.theme === "dark" ? "light" : "dark";
    },

    setTheme(state, payload: TThemeState["theme"]) {
      state.theme = payload;
    },
  },
};

export default themeModule;
