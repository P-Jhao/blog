import getSettings from "@/api/setting";
import titleController from "@/utils/titleController";

export default {
  namespaced: true,
  state: {
    loading: false,
    data: "",
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
    fetchSetting(ctx) {
      if (ctx.state.data.length) {
        return;
      }
      ctx.commit("setLoading", true);
      getSettings().then((resp) => {
        ctx.commit("setData", resp);
        ctx.commit("setLoading", false);
        if (resp.favicon) {
          // <link rel="shortcut icon " type="images/x-icon" href="./favicon.ico">
          let link = document.querySelector("link[rel='shortcut icon']");
          if (link) return;
          link = document.createElement("link");
          link.rel = "shortcut icon";
          link.type = "images/x-icon";
          link.href = resp.favicon;
          document.querySelector("head").appendChild(link);
        }
        if (resp.siteTitle) {
          titleController.setSiteTitle(resp.siteTitle);
        }
      });
    },
  },
};
