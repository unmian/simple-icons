/*
 * @Author: Quarter
 * @Date: 2022-06-15 16:05:00
 * @LastEditors: Quarter
 * @LastEditTime: 2022-06-16 16:22:15
 * @FilePath: /simple-icons/packages/svg/gulp/render-node.ts
 * @Description: 节点渲染
 */

import { IconElement } from "./svg-info-check";
import { decamelize } from "../../../gulp/utils/decamelize";

/**
 * @description: 渲染节点
 * @param {IconElement} node
 * @return {string}
 */
const renderNode = (node: IconElement): string => {
  const { attrs } = node;

  let attrString = "";
  if (attrs) {
    if (attrs.className) {
      attrs.class = attrs.className;
      delete attrs.className;
    }

    // 处理 style 的值
    const styleObj = attrs.style as { [key: string]: any } | undefined;
    if (styleObj) {
      const styleStr = Object.keys(styleObj).reduce((styles, styleKey) => {
        let destStyle = styles;
        destStyle += `${decamelize(styleKey, { separator: "-" })}: ${styleObj[styleKey]};`;
        return destStyle;
      }, "");

      attrs.style = styleStr.trim();
    }

    // 将属性转换成字符串
    const attrArray = Object.keys(attrs).reduce((classes: string[], currentAttrKey) => {
      const val = attrs[currentAttrKey] as string;
      if (val.length > 0) {
        classes.push(`${currentAttrKey}="${val}"`);
      }
      return classes;
    }, []);

    if (attrArray.length) {
      attrString = ` ${attrArray.join(" ")}`;
    }
  }

  const childrenString = node.children?.map((child) => renderNode(child)).join("") ?? "";

  return `<${node.tag}${attrString}>${childrenString}</${node.tag}>`;
};

export default renderNode;
