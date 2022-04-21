import { TRootState, TSettingsState } from "@/types";
import { Module } from "vuex";

const settingsModule: Module<TSettingsState, TRootState> = {
  state: {
    theme: "light",
    isAuthModalOpen: false,
    isRegisterModalOpen: false,
    isConfirmRemoveModalOpen: false,
    isAddPaintingModalOpen: false,
    isEditPaintingModalOpen: false,
    isArtistModalOpen: false,
  },
  mutations: {
    changeTheme(state) {
      state.theme = state.theme === "dark" ? "light" : "dark";
    },

    setTheme(state, payload: TSettingsState["theme"]) {
      state.theme = payload;
    },

    setIsAuthModalOpen(state, payload: boolean) {
      state.isAuthModalOpen = payload;
    },

    setIsRegisterModalOpen(state, payload: boolean) {
      state.isRegisterModalOpen = payload;
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

    setIsArtistModalOpen(state, payload: boolean) {
      state.isArtistModalOpen = payload;
    },
  },
};

export default settingsModule;
