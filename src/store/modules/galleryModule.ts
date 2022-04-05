import { getArtistsStatic } from "@/api";
import type { TArtistStatic, TGalleryState, TRootState } from "@/types";
import { Module } from "vuex";

const galleryModule: Module<TGalleryState, TRootState> = {
  state: {
    artistsStatic: [],
  },
  mutations: {
    setArtistsStatic(state, payload: TArtistStatic[]) {
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
