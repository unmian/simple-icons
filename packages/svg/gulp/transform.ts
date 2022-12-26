/*
 * @Author: Quarter
 * @Date: 2022-06-15 13:55:13
 * @LastEditors: Quarter
 * @LastEditTime: 2022-12-06 19:57:36
 * @FilePath: /simple-icons/packages/svg/gulp/transform.ts
 * @Description: 转换
 */

import renderNode from "./render-node";
import { ICON_NAMESPACE } from "../../../config";
import rename from "gulp-rename";

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

/**
 * @description: 调整文件格式
 * @param {rename.ParsedPath} file 文件名
 * @return {rename.ParsedPath}
 */
export const filterFileName = (file: rename.ParsedPath): rename.ParsedPath => {
  // eslint-disable-next-line no-param-reassign
  file.dirname = file.dirname.replace(/[^0-9a-zA-Z]+/g, "-").toLocaleLowerCase();
  // eslint-disable-next-line no-param-reassign
  file.basename = file.basename.replace(/[^0-9a-zA-Z]+/g, "-").toLocaleLowerCase();
  return file;
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
