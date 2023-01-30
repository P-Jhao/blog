<template>
  <div class="blog-container">
    <MessageArea
      title="评论列表"
      :subTitle="`(${data.total})`"
      :list="data.rows"
      :isListLoading="isLoading"
      @submit="hanldSubmit"
    />
  </div>
</template>

<script>
import MessageArea from "@/components/MessageArea";
import { fetchData } from "@/mixins";
import { getComments, subComment } from "@/api/blog";
export default {
  mixins: [fetchData({})],
  components: {
    MessageArea,
  },
  data() {
    return {
      page: 1,
      limit: 10,
    };
  },
  created() {
    this.$bus.$on("mainScroll", this.handleScroll);
  },
  destroyed() {
    this.$bus.$off("mainScroll", this.handleScroll);
  },
  computed: {
    hasMoreData() {
      return this.data.rows.length < this.data.total;
    },
  },
  methods: {
    async fetchData() {
      return await getComments(this.$route.params.id, this.page, this.limit);
    },
    //获取更多评论
    getMoreData() {
      if (!this.hasMoreData) return;
      this.page++;
      this.isLoading = true;
      this.fetchData().then((moreData) => {
        this.data.total = moreData.total;
        this.data.rows = this.data.rows.concat(moreData.rows);
        this.isLoading = false;
      });
    },
    handleScroll(dom) {
      //判断是否正在加载
      if (this.isLoading || !dom) return;
      const range = 100; //可接受的误差
      const scrollDiff = dom.scrollHeight - dom.scrollTop - dom.clientHeight;
      if (scrollDiff <= range) {
        this.getMoreData();
      }
    },
    hanldSubmit(formData, callback) {
      console.log(formData, "formData");
      subComment({
        blogId: this.$route.params.id,
        ...formData,
      }).then((resp) => {
        console.log(resp, "blogCommentResp");
        this.data.rows.unshift(resp);
        this.data.total++;
        callback("评论成功"); //处理完毕
      });
    },
  },
};
</script>

<style lang="less" scoped>
.blog-container {
  margin: 30px;
}
</style>
