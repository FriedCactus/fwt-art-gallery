import { getArtistsStatic } from "@/api";
import type { TArtisStatic, TGalleryState, TRootState } from "@/types";
import { Module } from "vuex";

const galleryModule: Module<TGalleryState, TRootState> = {
  state: {
    artistsStatic: [],
  },
  mutations: {
    setArtistsStatic(state, payload: TArtisStatic) {
      state.artistsStatic = payload;
    },
  },
  actions: {
    async fetchArtistsStatic({ commit }) {
      try {
        const data = await getArtistsStatic();

        commit("setArtistsStatic", data);
      } catch (e) {
        console.log(e);
      }
    },
  },
};

export default galleryModule;
