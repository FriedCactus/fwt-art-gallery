import { TArtistStatic, TPainting } from "@/types";
import axios from "axios";

const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
});

export const getArtistsStatic = () =>
  instance.get<TArtistStatic[]>("artists/static", {}).then(({ data }) => data);

export const getPaintingsByArtist = (id: TArtistStatic["_id"]) =>
  instance.get<TPainting[]>(`artists/${id}/paintings`).then(({ data }) => data);
