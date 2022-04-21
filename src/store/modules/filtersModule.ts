import { getGenres } from "@/api";
import { TFiltersState, TRootState } from "@/types";
import axios from "axios";
import { Module } from "vuex";

const filtersModule: Module<TFiltersState, TRootState> = {
  state: {
    genres: [],
  },
  actions: {
    async tryToGetGenres({ state }) {
      try {
        const { data } = await getGenres();

        state.genres = data;
      } catch (e) {
        if (axios.isAxiosError(e)) {
          throw new Error(e.message);
        }
      }
    },
  },
};

export default filtersModule;
