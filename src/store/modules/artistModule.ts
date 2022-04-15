import { getArtistById, patchMainPainting } from "@/api";
import { TArtistState, TRootState } from "@/types";
import { Module } from "vuex";

type TPatchMainPaintingPayload = {
  artistId: string;
  paintingId: string;
};

const artistModule: Module<TArtistState, TRootState> = {
  state: {
    activeSlide: 0,
    artist: undefined,
    uploadedFile: undefined,
  },
  mutations: {
    setActiveSlide(state, payload: number) {
      state.activeSlide = payload;
    },
    setUploadedFiles(state, payload: TArtistState["uploadedFile"]) {
      state.uploadedFile = payload;
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

    async tryToPatchMainPainting(
      { state },
      payload: TPatchMainPaintingPayload,
    ) {
      try {
        const { artistId, paintingId } = payload;

        await patchMainPainting(artistId, {
          mainPainting: paintingId,
        });

        if (state.artist) {
          state.artist.mainPainting._id = paintingId;
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
};

export default artistModule;
