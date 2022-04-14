import { getArtistById } from "@/api";
import { TArtistState, TRootState } from "@/types";
import { Module } from "vuex";

const artistModule: Module<TArtistState, TRootState> = {
  state: {
    activeSlide: 0,
    artist: undefined,
  },
  mutations: {
    setActiveSlide(state, payload: number) {
      state.activeSlide = payload;
    },
  },
  actions: {
    async fetchArtistById({ state }, payload: string) {
      try {
        const { data } = await getArtistById(payload);

        state.artist = data;
      } catch (e) {
        console.log(e);
      }
    },
  },
};

export default artistModule;
