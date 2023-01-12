import getComponentRootDom from "./getComponentRootDom";
import Icon from "@/components/Icon";
import styles from "./showMessage.module.less";

/**
 *弹出一个消息框
 * @param {String} content
 * @param {String} type
 * @param {Number} duration
 * @param {HTMLElement} container
 */
export default function (options = {}) {
  const content = options.content || "";
  const type = options.type || "success";
  const duration = options.duration || 2000;
  const container = options.container || document.body;
  const div = document.createElement("div");
  const el = getComponentRootDom(Icon, { type });
  div.innerHTML = `<span class=${styles.icon}>${el.outerHTML}</span><div>${content}</div>`;
  const typeClassName = styles[`message-${type}`];
  div.className = `${styles.message} ${typeClassName}`;
  if (options.container && getComputedStyle(container).position === "static") {
    container.style.position = "relative";
  }
  container.appendChild(div);

  setTimeout(() => {
    div.style.opacity = 1;
    div.style.transform = "translate(-50%,-50%)";
  }, 0);
  //等待一段时间后消失
  setTimeout(() => {
    div.style.opacity = 0;
    div.style.transform = "translate(-50%,-50%) translateY(-25px)";
    div.addEventListener(
      "transitionend",
      () => {
        div.remove();
      },
      { once: true }
    );
    options.callback && options.callback();
  }, duration);
}
