import { TRootState, TSettingsState } from "@/types";
import { Module } from "vuex";

const settingsModule: Module<TSettingsState, TRootState> = {
  state: {
    theme: "light",
  },
  mutations: {
    changeTheme(state) {
      state.theme = state.theme === "dark" ? "light" : "dark";
    },

    setTheme(state, payload: TSettingsState["theme"]) {
      state.theme = payload;
    },
  },
};

export default settingsModule;
