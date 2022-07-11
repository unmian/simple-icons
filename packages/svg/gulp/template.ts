/*
 * @Author: Quarter
 * @Date: 2022-06-16 09:33:22
 * @LastEditors: Quarter
 * @LastEditTime: 2022-06-16 11:07:49
 * @FilePath: /simple-icons/packages/svg/gulp/template.ts
 * @Description: 使用模板转换文件
 */

import { createTransformStream } from "../../../gulp/transform";
import { camelCase } from "../../../gulp/utils/camelCase";

export type IconFileContentGenerator = (props: { name: string; element: string }) => string;

/**
 * @description: SVG 生成模板
 * @param {IconFileContentGenerator} iconGenerator icon 生成函数
 * @return {internal.Transform}
 */
export const useTemplate = (iconGenerator: IconFileContentGenerator) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  createTransformStream((svgElementString, { stem: name }) =>
    iconGenerator({ name, element: svgElementString }),
  );

/**
 * @description:
 * @return {internal.Transform}
 */
export const useItemTemplate = () =>
  createTransformStream(
    (_, { stem: name }) =>
      `  { stem: "${name}}", icon: "${camelCase(name, { complete: true })}" },`,
  );

/**
 * @description:
 * @return {internal.Transform}
 */
export const useWrapperTemplate = () =>
  createTransformStream((raw) => `export const manifest = [\n${raw}\n];`);
