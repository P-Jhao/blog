<template>
  <div class="toTop-container" v-show="show" @click="handleClick">Top</div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
    };
  },
  created() {
    this.$bus.$on("mainScroll", this.handleScroll);
  },
  beforeDestroy() {
    this.$bus.$off("mainScroll", this.handleScroll);
  },
  methods: {
    handleScroll(dom) {
      if (!dom) {
        this.show = false;
        return;
      }
      this.show = dom.scrollTop >= 500;
    },
    handleClick() {
      this.$bus.$emit("setMainScroll", 0);
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.toTop-container {
  color: #fff;
  width: 50px;
  height: 50px;
  position: fixed;
  right: 50px;
  bottom: 50px;
  background: @primary;
  border-radius: 50%;
  text-align: center;
  line-height: 50px;
  z-index: 99;
  cursor: pointer;
}
</style>
