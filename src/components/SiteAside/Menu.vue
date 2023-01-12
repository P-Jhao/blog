<template>
  <div class="menu-container">
    <RouterLink
      :exact="item.exact"
      v-for="item in items"
      :key="item.link"
      class="item"
      :to="item.link"
    >
      <Icon :type="item.icon" />
      <span>{{ item.content }}</span>
    </RouterLink>
  </div>
</template>

<style lang="less" scoped>
@import "~@/styles/var.less";
.menu-container {
  margin-top: 40px;
}
.item {
  width: 100%;
  display: block;
  font-size: 18px;
  color: @gray;
  padding: 10px 0 10px 10px;
  &:hover,
  &.router-link-active {
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
  }
  .icon-container {
    margin-right: 10px;
  }
}
</style>

<script>
import Icon from "@/components/Icon";
export default {
  components: {
    Icon,
  },
  data() {
    return {
      items: [
        {
          link: "/",
          content: "首页",
          icon: "home",
          exact: true,
        },
        {
          link: "/blog",
          content: "文章",
          icon: "blog",
          exact: false,
        },
        {
          link: "/about",
          content: "关于我",
          icon: "about",
          exact: true,
        },
        {
          link: "/project",
          content: "项目&效果",
          icon: "code",
          exact: true,
        },
        {
          link: "/message",
          content: "留言",
          icon: "chat",
          exact: true,
        },
      ],
    };
  },
};
</script>
