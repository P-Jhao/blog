<template>
  <div class="blog-list-container" v-loading="isLoading" ref="container">
    <ul v-show="!isLoading">
      <li v-for="item in data.rows" :key="item.id">
        <div class="thumb" v-if="item.thumb">
          <RouterLink
            :to="{
              name: 'BlogDetail',
              params: {
                id: item.id,
              },
            }"
          >
            <img v-lazy="item.thumb" :alt="item.title" :title="item.title" />
          </RouterLink>
        </div>
        <div class="main">
          <RouterLink
            :to="{
              name: 'BlogDetail',
              params: {
                id: item.id,
              },
            }"
          >
            <h2>{{ item.title }}</h2>
          </RouterLink>
          <div class="aside">
            <span>日期：{{ formatDate(item.createDate) }}</span>
            <span>浏览：{{ item.scanNumber }}</span>
            <span>评论{{ item.commentNumber }}</span>
            <RouterLink
              :to="{
                name: 'CategoryBlog',
                params: {
                  categoryId: item.category.id,
                },
              }"
              >{{ item.category.name }}
            </RouterLink>
          </div>
          <div class="desc">
            {{ item.description }}
          </div>
        </div>
      </li>
    </ul>
    <Empty
      v-if="!isLoading && data.rows.length === 0"
      text="这个人很懒，还没有写任何文章"
    />
    <!-- 分页放到这里 -->
    <Pager
      :current="routeInfo.page"
      :total="data.total"
      :limit="routeInfo.limit"
      @pageChange="handlePageChange"
      v-show="!isLoading"
    />
  </div>
</template>

<script>
import Pager from "@/components/Pager";
import { fetchData, mainScroll } from "@/mixins";
import { getBlog } from "@/api/blog";
import formatDate from "@/utils/formatDate";
import Empty from "@/components/Empty";
export default {
  mixins: [fetchData({ total: 0, rows: [] }), mainScroll("container")],
  components: {
    Pager,
    Empty,
  },
  computed: {
    routeInfo() {
      const categoryId = +this.$route.params.categoryId || -1;
      const page = +this.$route.query.page || 1;
      const limit = +this.$route.query.limit || 10;
      return {
        categoryId,
        page,
        limit,
      };
    },
  },
  methods: {
    formatDate,
    async fetchData() {
      return await getBlog();
    },
    handlePageChange(newPage) {
      const query = {
        page: newPage,
        limit: this.routeInfo.limit,
      };
      //判断是否为分类页
      if (this.routeInfo.categoryId === -1) {
        //所有文章
        this.$router.push({
          name: "Blog",
          query,
        });
      } else {
        //分类文章
        this.$router.push({
          name: "CategoryBlog",
          query,
          params: {
            categoryId: this.routeInfo.categoryId,
          },
        });
      }
    },
  },
  watch: {
    $route() {
      this.isLoading = true;
      this.fetchData(
        this.routeInfo.page,
        this.routeInfo.limit,
        this.routeInfo.categoryId
      ).then((res) => {
        this.data = res;
        this.isLoading = false;
      });
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.blog-list-container {
  line-height: 1.7;
  position: relative;
  padding: 20px;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  scroll-behavior: smooth;
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
}
li {
  display: flex;
  padding: 15px 0;
  border-bottom: 1px solid @gray;
  .thumb {
    flex: 0 0 auto;
    margin-right: 15px;
    img {
      display: block;
      max-width: 200px;
      border-radius: 5px;
    }
  }
  .main {
    flex: 1 1 auto;
    h2 {
      margin: 0;
    }
  }
  .aside {
    font-size: 12px;
    color: @gray;
    span {
      margin-right: 15px;
    }
  }
  .desc {
    margin: 15px 0;
    font-size: 14px;
  }
}
</style>
