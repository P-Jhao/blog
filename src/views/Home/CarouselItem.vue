<template>
  <div
    class="carouselItem-container"
    ref="container"
    @mousemove="handleMousemove"
    @mouseleave="handleMouseleave"
    v-loading="isLoading"
  >
    <div class="img-container" ref="inner" :style="imgPosition">
      <ImageLoader
        :src="attribute.bigImg"
        :placeholder="attribute.midImg"
        @load="this.handleLoad"
      />
    </div>
    <h2 class="title" ref="title">{{ attribute.title }}</h2>
    <h3 class="desc" ref="desc">{{ attribute.description }}</h3>
  </div>
</template>

<script>
import ImageLoader from "@/components/ImageLoader";
export default {
  data() {
    return {
      titleWidth: 0,
      descWidth: 0,
      containerSize: null,
      innerSize: null,
      mouseX: 0,
      mouseY: 0,
      isLoading: true,
    };
  },
  props: {
    attribute: {
      type: Object,
      require: true,
    },
  },
  mounted() {
    this.titleWidth = this.$refs.title.clientWidth;
    this.descWidth = this.$refs.desc.clientWidth;
    this.setSize();
    this.mouseX = this.centerPosition.x;
    this.mouseY = this.centerPosition.y;
    window.addEventListener("resize", this.setSize);
    this.isLoading = false;
  },
  destroyed() {
    window.removeEventListener("resize", this.setSize);
  },
  components: {
    ImageLoader,
  },
  methods: {
    handleLoad() {
      this.$refs.title.style.width = 0;
      this.$refs.title.style.opacity = 1;
      this.$refs.title.style.transition = "1s";
      this.$refs.desc.style.width = 0;
      this.$refs.desc.style.opacity = 1;
      this.$refs.desc.style.transition = "2s 1s";
      //强制渲染
      this.$refs.title.clientWidth;
      this.$refs.title.style.width = this.titleWidth + "px";
      this.$refs.desc.style.width = this.descWidth + "px";
    },
    handleMouseleave() {
      this.mouseX = this.centerPosition.x;
      this.mouseY = this.centerPosition.y;
    },
    setSize() {
      this.containerSize = {
        width: this.$refs.container.clientWidth,
        height: this.$refs.container.clientHeight,
      };
      this.innerSize = {
        width: this.$refs.inner.clientWidth,
        height: this.$refs.inner.clientHeight,
      };
    },
    handleMousemove(e) {
      const rect = this.$refs.container.getBoundingClientRect();
      this.mouseX = e.clientX - rect.left;
      this.mouseY = e.clientY - rect.top;
    },
  },
  computed: {
    //得到图片的坐标
    imgPosition() {
      if (!this.innerSize || !this.containerSize) return;
      //图片多出的宽高
      const extratWidth = this.innerSize.width - this.containerSize.width;
      const extratHeight = this.innerSize.height - this.containerSize.height;
      //计算容器与多出部分的比例
      const proportionWidth = extratWidth / this.containerSize.width;
      const proportionHeight = extratHeight / this.containerSize.height;
      //计算图片的坐标
      const imgX = -this.mouseX * proportionWidth;
      const imgY = -this.mouseY * proportionHeight;
      return { transform: `translate(${imgX}px, ${imgY}px)` };
    },
    centerPosition() {
      return {
        x: this.containerSize.width / 2,
        y: this.containerSize.height / 2,
      };
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/mixin.less";
@import "~@/styles/var.less";

.carouselItem-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  .img-container {
    width: 110%;
    height: 110%;
    position: absolute;
    top: 0;
    left: 0;
    transition: 0.3s;
  }
  .title,
  .desc {
    opacity: 0;
    position: absolute;
    left: 30px;
    .stroke();
    letter-spacing: 3px;
    white-space: nowrap;
    overflow: hidden;
  }
  .title {
    top: calc(50% - 40px);
    color: #fff;
    font-size: 2em;
  }
  .desc {
    top: calc(50% + 20px);
    font-size: 1.2em;
    color: lighten(@gray, 20%);
  }
}
</style>
