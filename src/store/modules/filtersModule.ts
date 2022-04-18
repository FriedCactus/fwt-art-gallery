import { getGenres } from "@/api";
import { TFiltersState, TRootState } from "@/types";
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
        console.log(e);
      }
    },
  },
};

export default filtersModule;
