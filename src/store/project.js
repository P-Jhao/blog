import getProject from "@/api/project";

export default {
  namespaced: true,
  state: {
    loading: false,
    data: [],
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload;
    },
    setData(state, payload) {
      state.data = payload;
    },
  },
  actions: {
    fetchData(ctx) {
      if (ctx.state.data.length) return;
      ctx.commit("setLoading", true);
      getProject().then((resp) => {
        ctx.commit("setData", resp);
        ctx.commit("setLoading", false);
      });
    },
  },
};
