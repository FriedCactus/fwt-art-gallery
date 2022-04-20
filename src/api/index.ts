import {
  TPainting,
  TAuthBody,
  TAuthResponse,
  TRefreshBody,
  TArtistStaticRespone,
  TArtistResponse,
  TArtist,
  TGenresResponse,
} from "@/types";
import axios from "./axios";

type TPatchMainPaintingBody = {
  mainPainting: string;
};

type TEditPaintingBody = {
  name: string;
  yearOfCreation: string;
};

export type TAddArtistBody = Pick<
  TArtist,
  "name" | "yearsOfLife" | "description" | "genres"
>;

// Художник
export const getArtists = () => axios.get("artists");

export const addArtist = (body: TAddArtistBody) => axios.post("artists", body);

export const getArtistById = (id: TArtist["_id"]) =>
  axios.get<TArtistResponse>(`artists/${id}`);

export const patchArtistById = (id: TArtist["_id"], body: TAddArtistBody) =>
  axios.put(`artists/${id}`, body);

export const getArtistsStatic = () =>
  axios.get<TArtistStaticRespone[]>("artists/static").then(({ data }) => data);

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

export const editPainting = (
  artistId: TArtist["_id"],
  paintingId: TPainting["_id"],
  body: TEditPaintingBody,
) => axios.put(`/artists/${artistId}/paintings/${paintingId}`, body);

// Авторизация
export const register = (body: TAuthBody) =>
  axios.post<TAuthResponse>("auth/register", body);

export const login = (body: TAuthBody) =>
  axios.post<TAuthResponse>("auth/login", body);

export const refresh = (body: TRefreshBody) =>
  axios.post<TAuthResponse>("auth/refresh", body);

// Жанры
export const getGenres = () => axios.get<TGenresResponse>("genres");
