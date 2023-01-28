<template>
  <div class="siteAside-container">
    <Avatar :url="data && data.avatar" />
    <h1>{{ loading ? "加载中..." : data.siteTitle }}</h1>
    <Menu />
    <Contact />
    <p v-if="data" class="footer">
      {{ data.icp }}
    </p>
  </div>
</template>

<style lang="less" scoped>
@import "~@/styles/var.less";
.siteAside-container {
  width: 100%;
  height: 100%;
  background: @dark;
  padding: 20px 0;
  overflow-x: hidden;
  overflow-y: auto;
  .avatar-container {
    margin: 0 auto;
  }
  h1 {
    font-size: 1.2em;
    color: #fff;
    text-align: center;
    margin-top: 16px;
  }
}
.footer {
  text-align: center;
  font-size: 12px;
}
</style>

<script>
import Avatar from "@/components/Avatar";
import Menu from "./Menu";
import Contact from "./Contact";
import { mapState } from "vuex";

export default {
  components: {
    Avatar,
    Menu,
    Contact,
  },
  computed: {
    ...mapState("setting", ["loading", "data"]),
  },
};
</script>
