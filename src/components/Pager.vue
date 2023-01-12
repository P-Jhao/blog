<template>
  <div class="pager-container" v-if="pagerNumber > 1">
    <a @click="handleClick(1)" :class="{ disabled: current === 1 }"
      >|&lt;&lt;</a
    >
    <a @click="handleClick(current - 1)" :class="{ disabled: current === 1 }"
      >&lt;&lt;</a
    >
    <a
      @click="handleClick(item)"
      v-for="(item, i) in numbers"
      :key="i"
      :class="{ active: item === current }"
      >{{ item }}</a
    >
    <a
      @click="handleClick(current + 1)"
      :class="{ disabled: current === pagerNumber }"
      >&gt;&gt;</a
    >
    <a
      @click="handleClick(pagerNumber)"
      :class="{ disabled: current === pagerNumber }"
      >&gt;&gt;|</a
    >
  </div>
</template>

<script>
export default {
  props: {
    current: {
      type: Number,
      default: 1,
    },
    total: {
      type: Number,
      default: 0,
    },
    limit: {
      type: Number,
      default: 10,
    },
    visibleNumber: {
      type: Number,
      default: 10,
    },
  },
  computed: {
    pagerNumber() {
      return Math.ceil(this.total / this.limit);
    },
    visibleMin() {
      let min = this.current - Math.floor(this.visibleNumber / 2);
      min < 1 && (min = 1);
      return min;
    },
    visibleMax() {
      let max = this.visibleMin + this.visibleNumber - 1;
      max > this.pagerNumber && (max = this.pagerNumber);
      return max;
    },
    numbers() {
      const arr = [];
      for (let i = this.visibleMin; i <= this.visibleMax; i++) {
        arr.push(i);
      }
      return arr;
    },
  },
  methods: {
    handleClick(newPage) {
      this.$emit("pageChange", newPage);
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.pager-container {
  display: flex;
  justify-content: center;
  margin: 20px 0;
  a {
    color: @primary;
    cursor: pointer;
    margin: 0 6px;
    &.disabled {
      cursor: not-allowed;
      color: @lightWords;
    }
    &.active {
      cursor: auto;
      font-weight: bold;
      color: @words;
    }
  }
}
</style>
