<template>
  <div class="blogTOC-container">
    <h1>文章目录</h1>
    <HierarchyList :list="tocWithActive" @select="handleSelect" />
  </div>
</template>

<script>
import HierarchyList from "./HierarchyList";
import debounce from "@/utils/debounce";
export default {
  components: {
    HierarchyList,
  },
  props: {
    toc: {
      type: Array,
    },
  },
  data() {
    return {
      activeAnchor: "",
    };
  },
  computed: {
    tocWithActive() {
      const getTOC = (toc = []) => {
        return toc.map((t) => ({
          ...t,
          isActive: t.anchor === this.activeAnchor,
          children: getTOC(t.children),
        }));
      };
      return getTOC(this.toc);
    },
    doms() {
      const doms = [];
      const addDoms = (toc) => {
        return toc.map((t) => {
          doms.push(document.getElementById(t.anchor));
          if (t.children && t.children.length) {
            addDoms(t.children);
          }
        });
      };
      addDoms(this.toc);
      return doms;
    },
  },
  created() {
    this.setActiveDebounce = debounce(this.setActive);
    this.$bus.$on("mainScroll", this.setActiveDebounce);
  },
  mounted() {
    const hash = location.hash;
    location.hash = "";
    setTimeout(() => {
      location.hash = hash;
    }, 0);
  },
  destroyed() {
    this.$bus.$off("mainScroll", this.setActiveDebounce);
  },
  methods: {
    handleSelect(item) {
      location.hash = item.anchor;
    },
    setActive() {
      const range = 200;
      this.activeAnchor = "";
      for (const dom of this.doms) {
        //判断该dom是否存在
        if (!dom) continue;
        //每次触发时重置activeAnchor
        const top = dom.getBoundingClientRect().top;
        if (top >= 0 && top <= range) {
          //标题在视口的0-range区间内的时候
          this.activeAnchor = dom.id;
          return;
        } else if (top > range) {
          //在视口下方
          return;
        } else {
          //在视口上方
          this.activeAnchor = dom.id;
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.blogTOC-container {
  min-width: 100%;
  padding: 20px;
  height: 100%;
  h2 {
    font-size: 1em;
    letter-spacing: 2px;
    margin-bottom: 16px;
  }
}
</style>
