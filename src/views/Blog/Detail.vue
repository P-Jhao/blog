<template>
  <Layout>
    <div class="main-container" v-loading="isLoading" ref="mainContainer">
      <BlogDetail :blog="data" v-if="data" />
      <BlogComment v-if="!isLoading" />
    </div>
    <template #right>
      <div class="right-container" v-loading="isLoading">
        <BlogTOC :toc="data.toc" v-if="data" />
      </div>
    </template>
  </Layout>
</template>

<script>
import { fetchData, mainScroll } from "@/mixins";
import { getSingleBlog } from "@/api/blog";
import Layout from "@/components/Layout";
import BlogDetail from "./components/BlogDetail";
import BlogTOC from "./components/BlogTOC";
import BlogComment from "./components/BlogComment";

export default {
  mixins: [fetchData(null), mainScroll("mainContainer")],
  components: {
    Layout,
    BlogDetail,
    BlogTOC,
    BlogComment,
  },
  methods: {
    async fetchData() {
      const resp = await getSingleBlog(this.$route.params.id);
      if (!resp) {
        //文章不存在
        this.$router.push("/404");
        return;
      }
      return resp;
    },
  },
};
</script>

<style lang="less" scoped>
.main-container {
  scroll-behavior: smooth;
  height: 100%;
  position: relative;
  overflow-y: scroll;
}
.right-container {
  width: 300px;
  height: 100%;
  position: relative;
  overflow-y: auto;
}
</style>
