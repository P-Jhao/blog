<template>
  <ul class="hierarchyList-container">
    <li v-for="(item, i) in list" :key="i">
      <span @click="handleClick(item)" :class="{ active: item.isActive }">{{
        item.name
      }}</span>
      <span
        @click="handleClick(item)"
        v-if="item.aside"
        class="aside"
        :class="{ active: item.isActive }"
        >{{ item.aside }}</span
      >
      <HierarchyList :list="item.children" @select="handleClick" />
    </li>
  </ul>
</template>

<style lang="less" scoped>
@import "~@/styles/var.less";
.hierarchyList-container {
  .hierarchyList-container {
    margin-left: 1em;
  }
  li {
    min-height: 40px;
    line-height: 40px;
    font-size: 14px;
  }
  .active {
    color: @warn;
    font-weight: bold;
  }
  span {
    cursor: pointer;
  }
}
.aside {
  margin-left: 1em;
  color: @gray;
  font-size: 12px;
}
</style>

<script>
export default {
  name: "HierarchyList",
  props: {
    /**
     * list格式为
     * [{name:"xxx", isActive:true, children:[{content:"yyy"}]}]
     */
    list: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    handleClick(item) {
      if (item.isActive) return;
      this.$emit("select", item);
    },
  },
};
</script>
