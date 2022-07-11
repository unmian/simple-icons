/*
 * @Author: Quarter
 * @Date: 2022-06-16 17:08:57
 * @LastEditors: Quarter
 * @LastEditTime: 2022-07-05 15:09:20
 * @FilePath: /simple-icons/packages/icon-font/gulp/template.ts
 * @Description: 转换模板
 */

import { createTransformStream } from "../../../gulp/transform";

export interface JsonTemplateConfig {
  namespace?: string; // 字体命名空间
}

/**
 * @description: 转换字体项
 * @param {Object} iconfontMap 图标名称和 unicode 映射关系
 * @return {internal.Transform}
 */
export const useItemTemplate = (iconfontMap: { [key: string]: string }) =>
  createTransformStream(
    (raw, { stem: name }) =>
      `    { "name": "${name}", "svg": ${JSON.stringify(raw).replace(
        /(\r\n|\n|\r)/gm,
        "",
      )}, "code": "${encodeURIComponent(iconfontMap[name])}" },`,
  );

/**
 * @description: 转换字体关系 JSON
 * @param {Object} iconfontMap 图标名称和 unicode 映射关系
 * @return {internal.Transform}
 */
export const useJsonTemplate = ({ namespace = "s" }: JsonTemplateConfig) =>
  createTransformStream(
    (raw) => `{
  "iconName": "${namespace}-",
  "icons": [
${raw}
  ]
}`,
  );
