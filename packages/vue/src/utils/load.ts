/*
 * @Author: Quarter
 * @Date: 2022-07-05 14:57:57
 * @LastEditors: Quarter
 * @LastEditTime: 2022-07-06 13:49:34
 * @FilePath: /simple-icons/packages/vue/src/utils/load.ts
 * @Description: 加载脚本或样式
 */

/**
 * @description: 脚本检查
 * @param {string} url 脚本地址
 * @param {string} className 类名
 * @return
 */
export const checkScriptAndLoad = (url: string, className: string): void => {
  if (window) {
    if (!document || !url) {
      return;
    }
    // 判断是否已经加载过
    if (document.querySelectorAll(`.${className}[src="${url}"]`).length > 0) {
      return;
    }
    // 创建 script 标签并加载
    const script = document.createElement("script");
    script.setAttribute("class", className);
    script.setAttribute("src", url);
    document.body.appendChild(script);
  }
};

/**
 * @description: 样式检查
 * @param {string} url 样式地址
 * @param {string} className 类名
 * @return
 */
export const checkStyleAndLoad = (url: string, className: string): void => {
  if (window) {
    if (!document || !url) {
      return;
    }
    // 判断是否已经加载过
    if (document.querySelectorAll(`.${className}[href="${url}"]`).length > 0) {
      return;
    }
    // 创建 link 标签并加载
    const link = document.createElement("link");
    link.setAttribute("class", className);
    link.setAttribute("href", url);
    link.setAttribute("rel", "stylesheet");
    document.head.appendChild(link);
  }
};
