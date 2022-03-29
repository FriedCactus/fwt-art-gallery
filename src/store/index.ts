import { createStore } from "vuex";
import themeModule from "./modules/themeModule";

export default createStore({
  modules: {
    themeModule,
  },
});
