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
    isAddArtistModalOpen: false,
    isEditArtistModalOpen: false,
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

    setIsAddArtistModalOpen(state, payload: boolean) {
      state.isAddArtistModalOpen = payload;
    },
    setIsEditArtistModalOpen(state, payload: boolean) {
      state.isEditArtistModalOpen = payload;
    },
  },
};

export default settingsModule;
