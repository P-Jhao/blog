import imgUrl from "@/assets/loading.svg/";
import "./loading.module.less";

function getLoadingImg(el) {
  return document.querySelector(".loading");
}

function createLoadingImg() {
  const img = document.createElement("img");
  img.src = imgUrl;
  img.classList.add("loading");
  return img;
}

export default function (el, binding) {
  const curImg = getLoadingImg();
  if (binding.value) {
    if (!curImg) el.appendChild(createLoadingImg());
  } else {
    if (curImg) curImg.remove();
  }
}
