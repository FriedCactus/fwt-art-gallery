import { TRootState, TThemeState } from "@/types";
import { Module } from "vuex";

const themeModule: Module<TThemeState, TRootState> = {
  state: () => ({
    theme: "light",
  }),
  mutations: {
    changeTheme(state) {
      state.theme = state.theme === "dark" ? "light" : "dark";
    },
  },
};

export default themeModule;
