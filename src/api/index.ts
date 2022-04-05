import { TArtisStatic } from "@/types";
import axios from "axios";

const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
});

export const getArtistsStatic = () =>
  instance.get<TArtisStatic[]>("artists/static").then(({ data }) => data);
