/*
 * @Author: Quarter
 * @Date: 2022-06-15 13:55:05
 * @LastEditors: Quarter
 * @LastEditTime: 2022-12-06 20:28:30
 * @FilePath: /simple-icons/packages/svg/gulp/svg-info-check.ts
 * @Description: SVG 信息检查
 */

import { parse, Node, ElementNode } from "svg-parser";
import { createTransformStream } from "../../../gulp/transform";
import { camelCase } from "../../../gulp/utils/camelCase";

export interface Attrs {
  [key: string]: string | number | object | undefined;
  style: { [key: string]: any } | string;
}

export interface IconElement {
  tag: string;
  attrs: Attrs;
  children?: IconElement[];
}

export interface SvgToElementOptions {
  replaceColor?: boolean; // 是否替换颜色
}

/**
 * @description: 序列化样式
 * @param {string|object} style 样式信息
 * @return {Object}
 */
const normalizeStyle = (style: string | object): { [key: string]: any } => {
  if ("string" === typeof style) {
    const styles: { [key: string]: any } = {};
    style.split(";").forEach((chunk) => {
      const [key, value] = chunk.split(":");
      // 连字符转驼峰命名
      if (key.indexOf("-") !== -1) {
        styles[camelCase(key)] = value;
      } else {
        styles[key] = value;
      }
    });
    return styles;
  }

  return style;
};

/**
 * @description: 序列化属性
 * @param {Object} properties 属性
 * @return {Attrs}
 */
const normalizeAttrs = (
  properties: Record<string, string | number> = {},
  options: SvgToElementOptions,
): Attrs => {
  const attrs = { ...properties };

  if (undefined !== attrs) {
    // 序列化类名
    if (undefined !== attrs.class) {
      attrs.className = attrs.class;
      delete attrs.class;
    }
    // 序列化长宽
    if (undefined !== attrs.viewBox) {
      attrs.width = "1em";
      attrs.height = "1em";
    }
    // 序列化颜色
    if (options.replaceColor) {
      if (undefined !== attrs.fill && "none" !== attrs.fill) {
        attrs.fill = "currentColor";
      }
      if (undefined !== attrs.stroke && "none" !== attrs.stroke) {
        attrs.stroke = "currentColor";
      }
    }
  }

  return {
    style: properties ? normalizeStyle(String(properties.style)) : {},
    ...attrs,
  };
};

/**
 * @description: 将 svg ast 转换为元素
 * @param {Node[]} nodes 节点数组
 * @return {IconElement[]}
 */
const astToElement = (nodes: Node[], options: SvgToElementOptions): IconElement[] => {
  const elementNodes = nodes.filter((node) => "element" === node.type) as ElementNode[];
  return elementNodes.map((node) => {
    const temp: IconElement = {
      tag: node.tagName || "",
      attrs: normalizeAttrs(node.properties, options),
    };
    let children: Node[] = [];
    if (Array.isArray(node.children)) {
      children = node.children.filter((child) => "string" !== typeof child) as Node[];
    }
    if (children.length > 0) {
      temp.children = astToElement(children, options);
    }
    return temp;
  });
};

/**
 * @description: 将 svg 转化为元素
 * @param {SvgToElementOptions} options 配置项
 * @return {internal.Transform}
 */
export const svgToElement = (options: SvgToElementOptions = { replaceColor: false }) => {
  return createTransformStream((raw: string) => {
    const ast = parse(raw);
    const svgElements = astToElement(ast.children, options);
    if (svgElements.length > 0) {
      return JSON.stringify(svgElements[0]);
    }
    return raw;
  });
};
