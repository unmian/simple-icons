/*
 * @Author: Quarter
 * @Date: 2022-06-15 13:55:13
 * @LastEditors: Quarter
 * @LastEditTime: 2022-07-05 15:21:26
 * @FilePath: /simple-icons/packages/svg/gulp/transform.ts
 * @Description: 转换
 */

import renderNode from "./render-node";
import { ICON_NAMESPACE } from "../../../config";

/**
 * @description: 渲染图标
 * @param {string} name 名称
 * @param {string} element 元素
 * @return {string}
 */
const renderIcon = (name: string, element: string): string => {
  const node = JSON.parse(element);

  let className = node.attrs?.className ?? "";
  className += ` ${ICON_NAMESPACE}-icon ${ICON_NAMESPACE}-icon-${name}`;
  className = className.trim();
  node.attrs = { ...node.attrs, className };

  return renderNode(node);
};

export const svgGenIconFileContent = ({
  name,
  element,
}: {
  name: string;
  element: string;
}): string => {
  return renderIcon(name, element);
};
