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
    fetchData(ctx) {
      if (ctx.state.data) return;
      ctx.commit("setLoading", true);
      getAbout().then((resp) => {
        ctx.commit("setAbout", resp);
        ctx.commit("setLoading", false);
      });
    },
  },
};
