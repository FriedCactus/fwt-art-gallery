import { TArtistStatic, TPainting, TAuthBody, TAuthResponse } from "@/types";
import axios from "axios";

const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
});

export const getArtistsStatic = () =>
  instance.get<TArtistStatic[]>("artists/static", {}).then(({ data }) => data);

export const getPaintingsByArtist = (id: TArtistStatic["_id"]) =>
  instance.get<TPainting[]>(`artists/${id}/paintings`).then(({ data }) => data);

export const register = (body: TAuthBody) =>
  instance.post<TAuthResponse>("auth/register", body);

export const login = (body: TAuthBody) =>
  instance.post<TAuthResponse>("auth/login", body);
