import { createStore, Store, useStore as baseUseStore } from "vuex";
import type { TRootState } from "@/types";
import { InjectionKey } from "vue";
import settingsModule from "./modules/settingsModule";
import galleryModule from "./modules/galleryModule";
import artistModule from "./modules/artistModule";
import authModule from "./modules/authModule";

export const key: InjectionKey<Store<TRootState>> = Symbol("store");

export default createStore<TRootState>({
  modules: {
    settings: settingsModule,
    gallery: galleryModule,
    artist: artistModule,
    auth: authModule,
  },
});

export const useStore = () => baseUseStore(key);
