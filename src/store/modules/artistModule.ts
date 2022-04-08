import { TArtistState, TRootState } from "@/types";
import { Module } from "vuex";

const artistModule: Module<TArtistState, TRootState> = {
  state: {
    activeSlide: 0,
  },
  mutations: {
    setActiveSlide(state, payload: number) {
      state.activeSlide = payload;
    },
  },
};

export default artistModule;
