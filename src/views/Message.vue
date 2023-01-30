<template>
  <div class="message-container" ref="messageContainer">
    <MessageArea
      :isListLoading="isLoading"
      title="留言板"
      :subTitle="`(${data.total})`"
      :list="data.rows"
      @submit="handleSubmit"
    />
  </div>
</template>

<script>
import MessageArea from "@/components/MessageArea";
import { fetchData, mainScroll } from "@/mixins";
import { getMessages, postMessage } from "@/api/message";
export default {
  mixins: [fetchData({ total: 0, rows: [] }), mainScroll("messageContainer")],
  components: {
    MessageArea,
  },
  data() {
    return {
      page: 1,
      limit: 10,
    };
  },
  computed: {
    hasMoreData() {
      return this.data.rows.length < this.data.total;
    },
  },
  methods: {
    async fetchData() {
      return await getMessages(this.page, this.limit);
    },
    handleSubmit(data, callback) {
      postMessage(data).then((resp) => {
        callback("感谢您的留言");
        this.data.rows.unshift(resp);
        this.data.total++;
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
  },
  created() {
    this.$bus.$on("mainScroll", this.handleScroll);
  },
  destroyed() {
    this.$bus.$off("mainScroll", this.handleScroll);
  },
};
</script>

<style scoped>
.message-container {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 25px 0;
  box-sizing: border-box;
  scroll-behavior: smooth;
}
.message-area-container {
  width: 700px;
  margin: 0 auto;
}
</style>
