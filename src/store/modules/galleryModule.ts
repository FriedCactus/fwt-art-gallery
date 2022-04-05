import { getArtistsStatic } from "@/api";
import type { TArtistStatic, TGalleryState, TRootState } from "@/types";
import { Module } from "vuex";

const galleryModule: Module<TGalleryState, TRootState> = {
  state: {
    artistsStatic: [],
    perPage: 9,
  },
  getters: {
    getArtistsStatic: (state) => state.artistsStatic.slice(0, state.perPage),
  },
  mutations: {
    setArtistsStatic: (state, payload: TArtistStatic[]) => {
      state.artistsStatic = payload;
    },

    setPerPage(state, payload: number) {
      state.perPage = payload;
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
