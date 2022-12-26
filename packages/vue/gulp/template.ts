/*
 * @Author: Quarter
 * @Date: 2022-06-20 17:45:27
 * @LastEditors: Quarter
 * @LastEditTime: 2022-12-06 20:16:11
 * @FilePath: /simple-icons/packages/vue/gulp/template.ts
 * @Description: 模板转换
 */

import fs from "fs";
import path from "path";
import { camelCase } from "../../../gulp/utils/camelCase";
import { createTransformStream } from "../../../gulp/transform";

export type VueGetIconFileContent = (props: { name: string; element: string }) => string;

const template = fs.readFileSync(path.resolve(__dirname, "../template/icon.template.ts"), "utf-8");

/**
 * @description: vue 组件生成模板
 * @param {IconFileContentGenerator} iconGenerator icon 生成函数
 * @return {internal.Transform}
 */
export const useTemplate = (vueGetIconFileContent: VueGetIconFileContent) =>
  createTransformStream((astString, { stem: name }) =>
    vueGetIconFileContent({ name, element: astString }),
  );

/**
 * @description: 生成图标项
 * @return {internal.Transform}
 */
export const useItemTemplate = () =>
  createTransformStream((_, { stem: name, dirname }) => {
    const dir = dirname
      .replace(path.resolve(__dirname, "../../svg/dist/ast/"), "")
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
 * @description: 生成外层数据结构
 * @return {internal.Transform}
 */
export const useWrapperTemplate = () =>
  createTransformStream(
    (raw) => `const mainfest = [
${raw}
];

export default mainfest;

`,
  );

/**
 * @description: 生成图标项
 * @return {internal.Transform}
 */
export const useEntryItemTemplate = () =>
  createTransformStream(
    (_, { stem: name }) =>
      `export { default as Icon${camelCase(name, {
        complete: true,
      })} } from "./components/${name}";`,
  );

/**
 * @description: 生成 vue 组件字符串
 * @param {object} config 配置
 * @return {string}
 */
export const vueGetIconFileContent = ({ name }: { name: string; element: string }): string => {
  return template
    .replace("/* @vite-ignore */", "")
    .replace(/\$ICON_NAME/g, camelCase(name, { complete: true }))
    .replace(/\$FILE_NAME/g, name);
};
