/*
 * @Author: Quarter
 * @Date: 2022-06-20 16:45:58
 * @LastEditors: Quarter
 * @LastEditTime: 2022-11-15 11:48:51
 * @FilePath: /simple-icons/packages/vue/src/iconfont/index.ts
 * @Description: 字体图标组件
 */

import { checkStyleAndLoad, convertSizeClassName } from "utils";
import Vue, { PluginObject, PropType } from "vue";
import { CDN_BASE_URL, ICON_NAMESPACE, ICON_VERSION } from "../../../../config";

// 图标字体样式 CDN 地址
const CDN_ICONFONT_URL = `${CDN_BASE_URL}/simple-ui/icon/${ICON_VERSION}/iconfont.css`;

// Iconfont 组件
export const Iconfont = Vue.extend({
  name: "SIconfont",
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
      checkStyleAndLoad(url, `${ICON_NAMESPACE}-svg-js-stylesheet--unique-class`);
    });
  },
  /**
   * @description: 渲染函数
   * @param {CreateElement} createElement 元素创建函数
   * @return {VNode}
   */
  render(createElement) {
    // 类名
    const classes = [`${ICON_NAMESPACE}-iconfont`];
    if (this.url) {
      classes.push(this.name);
    } else {
      classes.push(`${ICON_NAMESPACE}-iconfont-${this.name}`);
    }
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

    return createElement("i", {
      class: classes,
      staticStyle: iconStyle,
    });
  },
});

// 插件
const plugin: PluginObject<object> = {
  install: (vue: typeof Vue) => {
    vue.component(`${ICON_NAMESPACE}-iconfont`, Iconfont);
  },
};

export default plugin;
