<template>
  <div class="menu-container">
    <RouterLink
      :exact="item.exact"
      v-for="item in items"
      :key="item.name"
      class="item"
      :to="{ name: item.name }"
    >
      <Icon :type="item.icon" />
      <span>{{ item.content }}</span>
    </RouterLink>
  </div>
</template>

<style lang="less" scoped>
@import "~@/styles/var.less";
.menu-container {
  margin-top: 30px;
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
          name: "Home",
          content: "首页",
          icon: "home",
          exact: true,
        },
        {
          name: "Blog",
          content: "文章",
          icon: "blog",
          exact: false,
        },
        {
          name: "About",
          content: "关于我",
          icon: "about",
          exact: true,
        },
        {
          name: "Project",
          content: "项目&效果",
          icon: "code",
          exact: true,
        },
        {
          name: "Message",
          content: "留言",
          icon: "chat",
          exact: true,
        },
      ],
    };
  },
};
</script>
