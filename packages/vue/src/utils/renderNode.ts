/*
 * @Author: Quarter
 * @Date: 2022-06-20 17:09:41
 * @LastEditors: Quarter
 * @LastEditTime: 2022-06-20 17:20:07
 * @FilePath: /simple-icons/packages/vue/src/utils/renderNode.ts
 * @Description: 渲染 svg 节点
 */

import { CreateElement, VNode, VNodeData } from "vue";
import { IconElement } from "../../../svg/gulp/svg-info-check";

/**
 * @description: 渲染节点
 * @param {CreateElement} createElement
 * @param {IconElement} node
 * @param {VNodeData} rootData
 * @return {VNode}
 */
const renderNode = (
  createElement: CreateElement,
  node: IconElement,
  rootData: VNodeData,
): VNode => {
  const attrs = { ...node.attrs, ...rootData.attrs };
  return createElement(
    node.tag,
    { attrs },
    (node.children || []).map((child: IconElement) => renderNode(createElement, child, {})),
  );
};

export default renderNode;
