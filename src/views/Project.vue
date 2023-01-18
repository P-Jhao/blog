<template>
  <div class="project-container" ref="projectContainer" v-loading="loading">
    <div v-for="item in data" :key="item.id" class="project-item">
      <a
        :href="
          item.url ? item.url : `javascript:alert('该项目无法通过外网打开')`
        "
        :target="item.url ? '_blank' : '_self'"
        ><img class="thumb" v-lazy="item.thumb"
      /></a>
      <div class="info">
        <a
          :href="
            item.url ? item.url : `javascript:alert('该项目无法通过外网打开')`
          "
          :target="item.url ? '_blank' : '_self'"
        >
          <h2>{{ item.name }}</h2>
        </a>
        <a v-if="item.github" target="_blank" :href="item.github" class="github"
          >github</a
        >
        <p v-for="(desc, i) in item.description" :key="i">
          {{ desc }}
        </p>
      </div>
    </div>
    <Empty
      v-if="!loading && data.length === 0"
      text="这个人初来乍到，还没有任何拿得出手的项目"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mainScroll } from "@/mixins";
import Empty from "@/components/Empty";
export default {
  mixins: [mainScroll("projectContainer")],
  components: {
    Empty,
  },
  computed: {
    ...mapState("project", ["loading", "data"]),
  },
  created() {
    this.$store.dispatch("project/fetchData");
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.project-container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
  position: relative;
  overflow-y: auto;
  scroll-behavior: smooth;
}
.project-item {
  transition: 0.5s;
  padding: 20px;
  display: flex;
  margin-bottom: 20px;
  position: relative;
  &:hover {
    box-shadow: -1px 1px 5px #000;
    transform: scale(1.01) translate(3px, -3px);
    color: inherit;
  }
  .thumb {
    width: 250px;
    min-height: 150px;
    flex: 0 0 auto;
    object-fit: cover;
    border-radius: 5px;
    margin-right: 15px;
  }
  .info {
    line-height: 1.7;
    flex: 1 1 auto;
    h2 {
      margin: 0;
    }
  }
  .github {
    font-size: 14px;
    color: @primary;
    position: absolute;
    top: 27px;
    right: 25px;
  }
}
</style>
