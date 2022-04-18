import { TRootState, TSettingsState } from "@/types";
import { Module } from "vuex";

const settingsModule: Module<TSettingsState, TRootState> = {
  state: {
    theme: "light",
    authorizationModal: "",
    isConfirmRemoveModalOpen: false,
  },
  mutations: {
    changeTheme(state) {
      state.theme = state.theme === "dark" ? "light" : "dark";
    },

    setTheme(state, payload: TSettingsState["theme"]) {
      state.theme = payload;
    },

    setAuthorizationModal(
      state,
      payload: TSettingsState["authorizationModal"],
    ) {
      state.authorizationModal = payload;
    },

    setIsConfirmRemoveModalOpen(state, payload: boolean) {
      state.isConfirmRemoveModalOpen = payload;
    },
  },
};

export default settingsModule;
