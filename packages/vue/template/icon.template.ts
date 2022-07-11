/*
 * @Author: Quarter
 * @Date: 2022-06-20 16:45:58
 * @LastEditors: Quarter
 * @LastEditTime: 2022-07-06 09:22:24
 * @FilePath: /simple-icons/packages/vue/template/icon.template.ts
 * @Description: 图标组件
 */
import Vue from "vue";
import SVGJSON from "data/$FILE_NAME.json";
import { renderNode } from "utils";
import { ICON_NAMESPACE } from "../../../../config";
import { camelCase } from "../../../../gulp/utils/camelCase";

const $ICON_NAME = Vue.extend({
  name: `${camelCase(ICON_NAMESPACE, { complete: true })}$ICON_NAME`,
  functional: true,
  props: {
    // 尺寸
    size: [String, Number],
  },
  render(createElement, context) {
    const { size } = context.props;

    const finalSize = size || "1em";
    const attrs = { width: finalSize, height: finalSize };

    return renderNode(createElement, SVGJSON, { attrs });
  },
});

export default $ICON_NAME;
