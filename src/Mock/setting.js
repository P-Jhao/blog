import Mock from "mockjs";
import avatarUrl from "@/assets/avatar.jpg";
import weixinCode from "@/assets/myBusiness.jpg";

Mock.mock("/api/setting", "get", {
  code: 0,
  msg: "",
  data: {
    avatar: avatarUrl,
    siteTitle: "彭俊豪的个人空间",
    github: "https://github.com/P-Jhao",
    qq: "2212688637",
    qqQrCode:
      "http://www.duyiedu.com/source/img/%E5%B0%8F%E6%B8%A1%E5%BE%AE%E4%BF%A1%E4%BA%8C%E7%BB%B4%E7%A0%81.png",
    weixin: "pengjunhao716",
    weixinQrCode: weixinCode,
    mail: "2212688637@qq.com",
    icp: "备案号，还没有",
    githubName: "P-Jhao",
    favicon: avatarUrl,
  },
});
