import {
  addPaintingByAuthorId,
  deletePaintingById,
  getArtistById,
  patchMainPainting,
} from "@/api";
import { TArtistState, TRootState } from "@/types";
import { Module } from "vuex";

type TPatchMainPaintingPayload = {
  artistId: string;
  paintingId: string;
};

type TAddPaintingPayload = {
  name: string;
  yearOfCreation: string;
  image: File;
};

type TDeletePaintingPayload = {
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

        if (state.artist?.mainPainting) {
          state.artist.mainPainting._id = paintingId;
        }
      } catch (e) {
        console.log(e);
      }
    },

    async tryToAddPainting({ state }, payload: TAddPaintingPayload) {
      const authorId = state.artist?._id;
      const formData = new FormData();

      if (!authorId) return;

      Object.entries(payload).forEach((item) => {
        formData.append(item[0], item[1]);
      });

      try {
        const { data } = await addPaintingByAuthorId(authorId, formData);
        state.artist?.paintings.push(data);
      } catch (e) {
        console.log(e);
      }
    },

    async tryToDeletePainting({ state }, payload: TDeletePaintingPayload) {
      const { artistId, paintingId } = payload;
      try {
        const data = await deletePaintingById(artistId, paintingId);

        if (state.artist) {
          state.artist.paintings = state.artist?.paintings.filter(
            (painting) => painting._id !== paintingId,
          );
        }
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    },
  },
};

export default artistModule;
