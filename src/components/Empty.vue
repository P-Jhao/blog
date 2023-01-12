<template>
  <div class="empty-container">
    <Icon type="empty" /><span> {{ text }}</span>
  </div>
</template>

<script>
import Icon from "./Icon";
export default {
  components: {
    Icon,
  },
  props: {
    text: {
      type: String,
      default: "无数据",
    },
  },
};
</script>

<style lang="less" scoped>
@import "../styles/var.less";
.empty-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: @lightWords;
  .icon-container {
    font-size: 10em;
    margin-bottom: 30px;
  }
  span {
    font-weight: bold;
    font-size: 18px;
  }
}
</style>
