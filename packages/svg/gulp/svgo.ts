/*
 * @Author: Quarter
 * @Date: 2022-06-15 13:54:47
 * @LastEditors: Quarter
 * @LastEditTime: 2022-12-10 14:39:50
 * @FilePath: /simple-icons/packages/svg/gulp/svgo.ts
 * @Description: svgo 处理
 */

import SVGO from "svgo";
import { createTransformStream } from "../../../gulp/transform";

export interface SVGOConfig {
  removeXMLNS?: boolean;
}

/**
 * @description: 获取 SVGO 配置
 * @param {SVGOConfig} config 配置
 * @return {OptimizeOptions}
 */
const getSVGOOptions = (config: SVGOConfig = {}): SVGO.Config => {
  const { removeXMLNS = true } = config;

  const plugins: SVGO.Config["plugins"] = [
    // 清除空行无用空格等
    { name: "cleanupAttrs" },
    // 合并 style 标签
    { name: "mergeStyles" },
    // 将样式转换为行内样式
    { name: "inlineStyles" },
    // 移除 doctype 声明
    { name: "removeDoctype" },
    // 移除 xml 处理指令
    { name: "removeXMLProcInst" },
    // 移除注释
    { name: "removeComments" },
    // 移除 metadata 标签
    { name: "removeMetadata" },
    // 移除 title 标签
    { name: "removeTitle" },
    // 移除 desc 标签
    { name: "removeDesc" },
    // 移除没有 id 的 defs
    { name: "removeUselessDefs" },
    // 移除 xmlns 属性
    // { name: "removeXMLNS" },
    // 移除编辑器命名空间、元素和属性
    { name: "removeEditorsNSData" },
    // 移除空的属性
    { name: "removeEmptyAttrs" },
    // 移除隐藏元素
    { name: "removeHiddenElems" },
    // 移除空的文本元素
    { name: "removeEmptyText" },
    // 移除空的容器元素
    { name: "removeEmptyContainers" },
    // 移除 viewBox 属性
    // { name: "removeViewBox" },
    // 清理 enable-background 属性
    { name: "cleanupEnableBackground" },
    // 精简 style 标签内容
    { name: "minifyStyles" },
    // 将样式转换为 style 属性
    { name: "convertStyleToAttrs" },
    // 颜色转换
    { name: "convertColors" },
    // 转换路径数据
    { name: "convertPathData" },
    // 将多个转换合并为一个
    { name: "convertTransform" },
    // 移除一些未知的或者默认的内容
    { name: "removeUnknownsAndDefaults" },
    // 移除不可继承组的 presentation 属性
    { name: "removeNonInheritableGroupAttrs" },
    // 移除无用的 stroke 和 fill 属性
    // { name: "removeUselessStrokeAndFill" },
    // 移除未使用命名空间定义
    { name: "removeUnusedNS" },
    // 将 id 或者 class 以文件名作为前缀
    // { name: "prefixIds" },
    // 清理未使用的 id
    { name: "cleanupIds" },
    // 清理默认的 px 单位
    { name: "cleanupNumericValues" },
    // 清理属性中的数字列表
    // { name: "cleanupListOfValues" },
    // 将属性移动到组上
    { name: "moveElemsAttrsToGroup" },
    // 将群组上的属性移动到元素上
    { name: "moveGroupAttrsToElems" },
    // 折叠无用的组
    { name: "collapseGroups" },
    // 删除光栅图片
    // { name: "removeRasterImages" },
    // 合并路径
    { name: "mergePaths" },
    // 将形状转换为路径
    { name: "convertShapeToPath" },
    // 将非偏心的 ellipse 转换为 circle
    { name: "convertEllipseToCircle" },
    // 将属性进行排序
    { name: "sortAttrs" },
    // 将 defs 的子元素进行排序
    { name: "sortDefsChildren" },
    // 移除 width/height，并添加 viewBox
    { name: "removeDimensions" },
    // 移除指定的属性
    { name: "removeAttrs", params: { attrs: ["class"] } },
    // 通过 CSS 选择器移除属性
    // { name: "removeAttributesBySelector" },
    // 通过 id 或者 class 移除元素
    // { name: "removeElementsByAttr" },
    // 给 svg 元素添加 class
    // { name: "addClassesToSVGElement" },
    // 给 svg 元素添加属性
    // { name: "addAttributesToSVGElement" },
    // 移除超出画布的元素内容
    // { name: "removeOffCanvasPaths" },
    // 移除 style 元素
    // { name: "removeStyleElement" },
    // 移除 script 元素
    // { name: "removeScriptElement" },
    // 使用 link 复用重复的路径
    // { name: "reusePaths" },
  ];
  if (removeXMLNS) {
    plugins.push({ name: "removeXMLNS" });
  }

  return {
    floatPrecision: 2,
    plugins,
  };
};

/**
 * @description: 通过 svgo 转换文件
 * @param {SVGOConfig} config 自定义配置
 * @return {internal.Transform}
 */
export const svgo = (config?: SVGOConfig) => {
  const options = getSVGOOptions(config);
  return createTransformStream((raw: string) => {
    const result = SVGO.optimize(raw, options);
    return result.data;
  });
};
