import imgUrl from "@/assets/loading.svg/";
import styles from "./loading.module.less";

function getLoadingImg(el) {
  return el.querySelector(`.${styles.loading}`);
}

function createLoadingImg() {
  const img = document.createElement("img");
  img.src = imgUrl;
  img.classList.add(styles.loading);
  return img;
}

export default function (el, binding) {
  const curImg = getLoadingImg(el);
  if (binding.value) {
    if (!curImg) el.appendChild(createLoadingImg());
  } else {
    if (curImg) curImg.remove();
  }
}
