<template>
  <div class="home-container" ref="container" @wheel="handleWheel">
    <Loading v-if="isLoding" />
    <ul
      class="banners-list"
      :style="{ marginTop }"
      @transitionend="handleTransitionEnd"
    >
      <li v-for="item in banners" :key="item.id">
        <CarouselItem :attribute="item" />
      </li>
    </ul>
    <div v-show="index > 0" class="arrow arrow-up" @click="switchTo(index - 1)">
      <Icon type="arrowUp" />
    </div>
    <div
      v-show="index < banners.length - 1"
      class="arrow arrow-down"
      @click="switchTo(index + 1)"
    >
      <Icon type="arrowDown" />
    </div>
    <ul class="indicator">
      <li
        :class="{ active: i === index }"
        v-for="(item, i) in banners"
        :key="item.id"
        @click="switchTo(i)"
      ></li>
    </ul>
  </div>
</template>

<script>
import getBanners from "@/api/banner";
import CarouselItem from "./CarouselItem";
import Icon from "@/components/Icon";
import Loading from "@/components/Loading";
export default {
  components: {
    CarouselItem,
    Loading,
    Icon,
  },
  data() {
    return {
      banners: [],
      index: 0, //当前图片索引
      clientHeight: 0,
      isSwitch: false, //是否正在切换
      isLoding: true, //是否正在加载数据
    };
  },
  async created() {
    this.banners = await getBanners();
    this.isLoding = false;
  },
  mounted() {
    this.clientHeight = this.$refs.container.clientHeight;
    window.addEventListener("resize", this.handleHomeResize);
  },
  computed: {
    marginTop() {
      return -this.index * this.clientHeight + "px";
    },
  },
  destroyed() {
    window.removeEventListener("resize", this.handleHomeResize);
  },
  methods: {
    switchTo(i) {
      this.index = i;
    },
    handleWheel(e) {
      if (this.isSwitch) return;
      if (e.deltaY > 5 && this.index < this.banners.length - 1) {
        this.isSwitch = true;
        this.index++;
      } else if (e.deltaY < -5 && this.index > 0) {
        this.isSwitch = true;
        this.index--;
      }
    },
    handleTransitionEnd() {
      this.isSwitch = false;
    },
    handleHomeResize() {
      this.clientHeight = this.$refs.container.clientHeight;
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.home-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}
.arrow {
  @gap: 25px;
  @jump: 5px;
  position: absolute;
  font-size: 30px;
  color: @gray;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
  &-up {
    top: @gap;
    animation: jump-up 2s infinite;
  }
  &-down {
    bottom: @gap;
    animation: jump-down 2s infinite;
  }
  @keyframes jump-up {
    0% {
      transform: translateY(-@jump);
    }
    50% {
      transform: translateY(@jump);
    }
    100% {
      transform: translateY(-@jump);
    }
  }
  @keyframes jump-down {
    0% {
      transform: translateY(@jump);
    }
    50% {
      transform: translateY(-@jump);
    }
    100% {
      transform: translateY(@jump);
    }
  }
}
.indicator {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  li {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: @words;
    cursor: pointer;
    border: 1px solid #fff;
    margin-bottom: 10px;
    &.active {
      background: #fff;
    }
  }
}
.banners-list {
  width: 100%;
  height: 100%;
  transition: 0.7s;

  li {
    width: 100%;
    height: 100%;
  }
}
</style>
