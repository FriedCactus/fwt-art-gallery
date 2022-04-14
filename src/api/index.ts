import {
  TArtistStatic,
  TPainting,
  TAuthBody,
  TAuthResponse,
  TRefreshBody,
  TArtistStaticRespone,
  TArtistResponse,
} from "@/types";
import axios from "./axios";

// Художник
export const getArtists = () => axios.get("artists");

export const getArtistById = (id: string) =>
  axios.get<TArtistResponse>(`artists/${id}`);

export const getArtistsStatic = () =>
  axios
    .get<TArtistStaticRespone[]>("artists/static", {})
    .then(({ data }) => data);

// Картины
export const getPaintingsByArtist = (id: TArtistStatic["_id"]) =>
  axios.get<TPainting[]>(`artists/${id}/paintings`).then(({ data }) => data);

// Авторизация
export const register = (body: TAuthBody) =>
  axios.post<TAuthResponse>("auth/register", body);

export const login = (body: TAuthBody) =>
  axios.post<TAuthResponse>("auth/login", body);

export const refresh = (body: TRefreshBody) =>
  axios.post<TAuthResponse>("auth/refresh", body);
