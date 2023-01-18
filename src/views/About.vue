<template>
  <div class="about-container" v-loading="loading || !srcLoading">
    <iframe
      class="about-content"
      v-if="data"
      :src="data"
      frameborder="0"
      @load="srcLoading = true"
    ></iframe>
  </div>
</template>

<style lang="less" scoped>
.about-container {
  width: 100%;
  height: 100%;
  position: relative;
}
.about-content {
  width: 100%;
  height: 100%;
  display: block;
}
</style>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      srcLoading: false,
    };
  },
  computed: {
    ...mapState("about", ["loading", "data"]),
  },
  created() {
    this.$store.dispatch("about/fetchData");
  },
};
</script>
