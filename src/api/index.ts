import {
  TPainting,
  TAuthBody,
  TAuthResponse,
  TRefreshBody,
  TArtistStaticRespone,
  TArtistResponse,
  TArtist,
} from "@/types";
import axios from "./axios";

type TPatchMainPaintingBody = {
  mainPainting: string;
};

// Художник
export const getArtists = () => axios.get("artists");

export const getArtistById = (id: TArtist["_id"]) =>
  axios.get<TArtistResponse>(`artists/${id}`);

export const getArtistsStatic = () =>
  axios
    .get<TArtistStaticRespone[]>("artists/static", {})
    .then(({ data }) => data);

export const patchMainPainting = (
  artistId: string,
  body: TPatchMainPaintingBody,
) => axios.patch<void>(`artists/${artistId}/main-painting`, body);

// Картины
export const getPaintingsByArtist = (id: TArtist["_id"]) =>
  axios.get<TPainting[]>(`artists/${id}/paintings`).then(({ data }) => data);

export const addPaintingByAuthorId = (id: TArtist["_id"], body: FormData) =>
  axios.post<TPainting>(`artists/${id}/paintings`, body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const deletePaintingById = (
  artistId: TArtist["_id"],
  paintingId: TPainting["_id"],
) => axios.delete(`/artists/${artistId}/paintings/${paintingId}`);

// Авторизация
export const register = (body: TAuthBody) =>
  axios.post<TAuthResponse>("auth/register", body);

export const login = (body: TAuthBody) =>
  axios.post<TAuthResponse>("auth/login", body);

export const refresh = (body: TRefreshBody) =>
  axios.post<TAuthResponse>("auth/refresh", body);
