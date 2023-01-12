<template>
  <div class="siteAside-container">
    <Avatar
      url="https://th.bing.com/th/id/OIP.dlStk205z9zpv00_FypwfwHaNK?w=187&h=333&c=7&r=0&o=5&pid=1.7"
    />
    <h1>彭俊豪的个人博客</h1>
    <Menu />
    <Contact />
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
  }
}
</style>

<script>
import Avatar from "@/components/Avatar";
import Menu from "./Menu";
import Contact from "./Contact";

export default {
  components: {
    Avatar,
    Menu,
    Contact,
  },
};
</script>
