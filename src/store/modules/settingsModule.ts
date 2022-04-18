import { TRootState, TSettingsState } from "@/types";
import { Module } from "vuex";

const settingsModule: Module<TSettingsState, TRootState> = {
  state: {
    theme: "light",
    authorizationModal: "",
    isConfirmRemoveModalOpen: false,
    isAddPaintingModalOpen: false,
    isEditPaintingModalOpen: false,
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

    setIsAddPaintingModalOpen(state, payload: boolean) {
      state.isAddPaintingModalOpen = payload;
    },

    setIsEditPaintingModalOpen(state, payload: boolean) {
      state.isEditPaintingModalOpen = payload;
    },
  },
};

export default settingsModule;
