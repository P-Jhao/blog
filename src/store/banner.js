import getBanners from "@/api/banner";

export default {
  namespaced: true,
  state: {
    loading: false,
    banners: [],
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload;
    },
    setBanner(state, payload) {
      state.banners = payload;
    },
  },
  actions: {
    fetchBanners(ctx) {
      if (ctx.state.banners.length) {
        return;
      }
      ctx.commit("setLoading", true);
      getBanners().then((resp) => {
        ctx.commit("setBanner", resp);
        ctx.commit("setLoading", false);
      });
    },
  },
};
