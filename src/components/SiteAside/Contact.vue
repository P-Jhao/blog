<template>
  <div class="contact-container">
    <div class="item">
      <Icon type="github" />
      <a :href="data.github" target="_blank">{{ data.githubName }}</a>
    </div>
    <div class="item">
      <Icon type="mail" />
      <a :href="`mailto:${data.mail}`">{{ data.mail }}</a>
    </div>
    <div class="item">
      <Icon type="qq" />
      <a
        :href="`tencent://message/?Menu=yes&uin=${data.qq}&Service=300&sigT=45a1e5847943b64c6ff3990f8a9e644d2b31356cb0b4ac6b24663a3c8dd0f8aa12a595b1714f9d45`"
        >{{ data.qq }}</a
      >
      <div class="pop">
        <img :src="data.qqQrCode" alt="" />
      </div>
    </div>
    <div class="item">
      <Icon type="weixin" class="weixin" />
      <span>{{ data.weixin }}</span>
      <div class="pop">
        <img :src="data.weixinQrCode" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import Icon from "@/components/Icon";
import WxCode from "@/assets/myBusiness.jpg";
import { mapState } from "vuex";
export default {
  components: {
    Icon,
  },
  data() {
    return {
      WxCode,
    };
  },
  computed: {
    ...mapState("setting", ["data"]),
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.contact-container {
  margin-top: 40px;
  width: 100%;
  color: @gray;
  font-size: 18px;
  .icon-container {
    margin-right: 10px;
    font-size: 27px;
    &.weixin {
      margin-right: 5px;
      font-size: 32px;
      vertical-align: -8px;
      margin-left: -1px;
    }
  }
  .item {
    margin: 5px 0;
    position: relative;
    padding: 0 10px;
    height: 35px;
    line-height: 35px;
    .pop {
      width: 165px;
      height: 165px;
      transition: 0.5s all;
      top: -170px;
      transform: scale(0);
      transform-origin: center bottom;
      margin-left: 10px;
      padding: 10px 15px;
      background: #fff;
      position: absolute;
      border-radius: 10px;
      left: 0;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      &::before {
        content: "";
        position: absolute;
        left: 50%;
        bottom: -3px;
        transform: translateX(-50%) rotate(45deg);
        border: 5px solid;
        font-size: 0;
        border-color: transparent #fff #fff transparent;
      }
    }
    &:hover .pop {
      transform: scale(1);
    }
  }
  span {
    cursor: pointer;
    &:hover {
      color: @primary;
    }
  }
}
</style>
