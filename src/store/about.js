import getAbout from "@/api/about";

export default {
  namespaced: true,
  state: {
    loading: false,
    data: null,
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload;
    },
    setAbout(state, payload) {
      state.data = payload;
    },
  },
  actions: {
    async fetchData(ctx) {
      if (ctx.state.data) return;
      ctx.commit("setLoading", true);
      const resp = await getAbout();
      ctx.commit("setAbout", resp);
      ctx.commit("setLoading", false);
    },
  },
};
