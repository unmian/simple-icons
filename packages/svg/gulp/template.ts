/*
 * @Author: Quarter
 * @Date: 2022-06-16 09:33:22
 * @LastEditors: Quarter
 * @LastEditTime: 2022-12-06 20:12:51
 * @FilePath: /simple-icons/packages/svg/gulp/template.ts
 * @Description: 使用模板转换文件
 */

import path from "path";
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
  createTransformStream((_, { stem: name, dirname }) => {
    const dir = dirname
      .replace(path.resolve(__dirname, "../dist/svg/"), "")
      .replace(/^[^0-9a-zA-Z]+/g, "")
      .replace(/[^0-9a-zA-Z]+/g, "-");
    return `  { group: ${`"${camelCase(dir, { complete: true })}"` || "null"}, icon: "${camelCase(
      name,
      {
        complete: true,
      },
    )}", name: "${name}" },`;
  });

/**
 * @description:
 * @return {internal.Transform}
 */
export const useWrapperTemplate = () =>
  createTransformStream((raw) => `export const manifest = [\n${raw}\n];`);
