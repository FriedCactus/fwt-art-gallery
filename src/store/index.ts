import { createStore, Store, useStore as baseUseStore } from "vuex";
import type { TRootState } from "@/types";
import { InjectionKey } from "vue";
import themeModule from "./modules/themeModule";

export const key: InjectionKey<Store<TRootState>> = Symbol("store");

export default createStore<TRootState>({
  modules: {
    theme: themeModule,
  },
});

export const useStore = () => baseUseStore(key);
