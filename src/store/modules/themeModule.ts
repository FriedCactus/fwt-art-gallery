const themeModule = {
  state: () => ({
    theme: "light",
  }),
  mutations: {
    changeTheme(state: any) {
      state.theme = state.theme === "dark" ? "light" : "dark";
    },
  },
  getters: {
    getTheme(state: any) {
      return state.theme;
    },
  },
};

export default themeModule;
