<template>
  <div class="app-container">
    <Layout>
      <template #left>
        <div class="aside">
          <SiteAside />
        </div>
      </template>
      <RouterView />
    </Layout>
  </div>
</template>

<style lang="less" scoped>
@import "~@/styles/mixin.less";
.app-container {
  .self-fill(fixed);
}
.aside {
  width: 250px;
  height: 100vh;
}
</style>

<script>
import SiteAside from "@/components/SiteAside";
import Layout from "@/components/Layout";
export default {
  components: {
    SiteAside,
    Layout,
  },
};
</script>
