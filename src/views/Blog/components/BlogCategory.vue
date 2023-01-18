<template>
  <div class="blogCategory-container" v-loading="isLoading">
    <h2>文章分类</h2>
    <HierarchyList :list="list" @select="handleSelect" />
  </div>
</template>

<script>
import HierarchyList from "./HierarchyList";
import { getBlogType } from "@/api/blog";
import fetchData from "@/mixins/fetchData";
export default {
  mixins: [fetchData([])],
  components: {
    HierarchyList,
  },
  methods: {
    async fetchData() {
      return await getBlogType();
    },
    handleSelect(item) {
      //判断是否为分类页
      if (item.id === -1) {
        //所有文章
        this.$router.push({
          name: "Blog",
        });
      } else {
        //分类文章
        this.$router.push({
          name: "CategoryBlog",
          params: {
            categoryId: item.id,
          },
        });
      }
    },
  },
  computed: {
    categoryId() {
      return +this.$route.params.categoryId || -1;
    },
    list() {
      const totalArticleCount = this.data.reduce(
        (a, b) => a + b.articleCount,
        0
      );
      const result = [
        { name: "全部分类", id: -1, articleCount: totalArticleCount },
        ...this.data,
      ];
      return result.map((it) => ({
        ...it,
        isActive: it.id === this.categoryId,
        aside: `${it.articleCount}篇`,
      }));
    },
  },
};
</script>

<style lang="less" scoped>
.blogCategory-container {
  min-width: 300px;
  padding: 20px;
  position: relative;
  height: 100%;
  overflow-y: auto;
  h2 {
    font-size: 1em;
    letter-spacing: 2px;
    margin-bottom: 16px;
    // font-weight: bold;
  }
}
</style>
