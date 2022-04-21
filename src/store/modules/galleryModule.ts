import { getArtists, getArtistsStatic } from "@/api";
import type { TGalleryState, TRootState } from "@/types";
import axios from "axios";
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
    setPerPage(state, payload: number) {
      state.perPage = payload;
    },
  },
  actions: {
    async fetchArtistsStatic({ state }) {
      try {
        const { data } = await getArtistsStatic();

        state.artistsStatic = [...state.artistsStatic, ...data];
      } catch (e) {
        if (axios.isAxiosError(e)) {
          throw new Error(e.message);
        }
      }
    },

    async fetchArtists({ state }) {
      try {
        const { data } = await getArtists();

        state.artistsStatic = [...state.artistsStatic, ...data];
      } catch (e) {
        if (axios.isAxiosError(e)) {
          throw new Error(e.message);
        }
      }
    },
  },
};

export default galleryModule;
