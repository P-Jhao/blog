<template>
  <div class="imageLoader-container">
    <img v-if="isLoading" :src="placeholder" class="coverImg" />
    <img
      :src="src"
      class="visbleImg"
      @load="handleLoad"
      :style="{
        opacity,
        transition: duration + 'ms opacity',
      }"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: true,
      opacity: 0,
    };
  },
  props: {
    src: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      default: 2000,
    },
  },
  methods: {
    handleLoad() {
      this.opacity = 1;
      setTimeout(() => {
        this.isLoading = false;
        this.$emit("load");
      }, this.duration);
    },
  },
};
</script>

<style lang="less" scoped>
.imageLoader-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    &.coverImg {
      filter: blur(10px);
    }
    &.visbleImg {
      position: absolute;
      left: 0;
      top: 0;
    }
  }
}
</style>
