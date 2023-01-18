import eventBus from "@/eventBus";
import debounce from "@/utils/debounce";
import defaultUrl from "@/assets/default.gif";

let imgs = [];

function setImg(img) {
  img.dom.src = defaultUrl;
  //判断图片是否在视口范围内
  const rect = img.dom.getBoundingClientRect();
  const clientHeight = document.documentElement.clientHeight;
  const minHeight = rect.height || 150;
  if (rect.top >= -minHeight && rect.top <= clientHeight) {
    //在视口范围内
    const tempImg = new Image();
    tempImg.onload = function () {
      //当真实图片加载完成之后
      img.dom.src = tempImg.src;
    };
    tempImg.src = img.src;
    //处理后直接删除该属性值
    imgs = imgs.filter((i) => i !== img);
  }
}

//调用该函数，设置合适的图片
function setImgs() {
  for (const img of imgs) {
    setImg(img);
  }
}

function handleScroll() {
  setImgs();
}

eventBus.$on("mainScroll", debounce(handleScroll, 50));

export default {
  inserted(el, bindings) {
    const img = {
      dom: el,
      src: bindings.value,
    };
    imgs.push(img);
    setImgs();
  },
  unbind(el) {
    imgs = imgs.filter((img) => img.dom !== el);
  },
};
