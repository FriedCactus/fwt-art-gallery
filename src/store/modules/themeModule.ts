const themeModule = {
  state: () => ({
    theme: "light",
  }),
  mutations: {},
  getters: {
    getTheme(state: any) {
      return state.theme;
    },
  },
};

export default themeModule;
