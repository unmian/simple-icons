/*
 * @Author: Quarter
 * @Date: 2022-06-13 09:22:07
 * @LastEditors: Quarter
 * @LastEditTime: 2022-06-16 11:12:20
 * @FilePath: /simple-icons/packages/svg-sprite/gulp/tansform.ts
 * @Description: 转换
 */

import { readFileSync } from "fs";
import path from "path";

/**
 * @description: 获取 SVG 精灵图 JS 文件内容
 * @param {string} raw 文件原内容
 * @return {string}
 */
export const getSvgSpriteJSFile = (raw: string): string => {
  const svgSpriteContent = readFileSync(
    path.resolve(__dirname, "../dist/symbol/svg/sprite.symbol.svg"),
    "utf-8",
  );
  return raw.replace(/\$SVGSPRITE/g, svgSpriteContent);
};
