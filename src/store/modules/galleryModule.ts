import { getArtistsStatic, getPaintingsByArtist } from "@/api";
import type {
  TArtistStatic,
  TGalleryState,
  TPainting,
  TRootState,
} from "@/types";
import { Module } from "vuex";

const galleryModule: Module<TGalleryState, TRootState> = {
  state: {
    artistsStatic: [],
    artistPaintings: [],
    perPage: 9,
  },
  getters: {
    getArtistsStatic: (state) => state.artistsStatic.slice(0, state.perPage),
  },
  mutations: {
    setArtistsStatic(state, payload: TArtistStatic[]) {
      state.artistsStatic = payload;
    },

    setArtistPaintings(state, payload: TPainting[]) {
      state.artistPaintings = payload;
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

    async fetchPaintingsByArtist({ commit }, artistId: TArtistStatic["_id"]) {
      try {
        const data = await getPaintingsByArtist(artistId);

        commit("setArtistPaintings", data);
      } catch (e) {
        console.log(e);
      }
    },
  },
};

export default galleryModule;
