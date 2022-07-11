/*
 * @Author: Quarter
 * @Date: 2022-06-20 16:45:58
 * @LastEditors: Quarter
 * @LastEditTime: 2022-07-08 14:15:33
 * @FilePath: /simple-icons/packages/vue/src/icon/index.ts
 * @Description: SVG 精灵图图标组件
 */

import { checkScriptAndLoad, convertSizeClassName } from "utils";
import Vue, { PluginObject, PropType } from "vue";
import { CDN_BASE_URL, ICON_NAMESPACE, ICON_VERSION } from "../../../../config";

// SVG 精灵图 CDN 地址
const CDN_ICONFONT_URL = `${CDN_BASE_URL}/simple-ui/icon/${ICON_VERSION}/svg-sprite.js`;

// Icon 组件
export const Icon = Vue.extend({
  name: "SIcon",
  props: {
    // 颜色
    color: String,
    // 尺寸
    size: [String, Number],
    url: [String, Array] as PropType<string | string[]>,
    name: {
      type: String,
      default: "help-questionmark",
    },
  },
  /**
   * @description: 生命周期函数
   * @return
   */
  mounted() {
    // 核查 SVG 精灵图脚本加载情况
    let finalUrl: string[] = [CDN_ICONFONT_URL];
    if (Array.isArray(this.url)) {
      finalUrl = [...finalUrl, ...this.url];
    } else if ("string" === typeof this.url) {
      finalUrl = [...finalUrl, this.url];
    }
    Array.from(new Set(finalUrl)).forEach((url) => {
      checkScriptAndLoad(url, `${ICON_NAMESPACE}-svg-js-stylesheet--unique-class`);
    });
  },
  /**
   * @description: 渲染函数
   * @param {CreateElement} createElement 元素创建函数
   * @return {VNode}
   */
  render(createElement) {
    // 类名
    const classes = [`${ICON_NAMESPACE}-icon`, `${ICON_NAMESPACE}-icon-${this.name}`];
    // 样式
    const iconStyle: Styles = {
      color: this.color,
    };
    if ("string" === typeof this.size) {
      if (["small", "medium", "large"].includes(this.size)) {
        classes.push(convertSizeClassName(this.size as SizeEnum));
      } else {
        iconStyle["font-size"] = this.size;
      }
    } else {
      iconStyle["font-size"] = `${this.size}px`;
    }
    // 属性
    const attrs = { href: `#${ICON_NAMESPACE}-icon-${this.name}` };

    return createElement(
      "svg",
      {
        class: classes,
        staticStyle: iconStyle,
        attrs: {
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 24 24",
        },
      },
      [
        createElement("use", {
          attrs,
        }),
      ],
    );
  },
});

// 插件
const plugin: PluginObject<object> = {
  install: (vue: typeof Vue) => {
    vue.component(`${ICON_NAMESPACE}-icon`, Icon);
  },
};

export default plugin;
