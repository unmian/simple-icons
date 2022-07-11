/*
 * @Author: Quarter
 * @Date: 2022-06-14 16:57:47
 * @LastEditors: Quarter
 * @LastEditTime: 2022-07-05 16:37:23
 * @FilePath: /simple-icons/gulp/generate-svg-sprite.ts
 * @Description: 生成 SVG 精灵图 JS 文件
 */

import { series } from "gulp";
import path from "path";
import { Config } from "svg-sprite";
import clearDir from "./clean-dir";
import { generateSpriteTask, generateSpriteJSTask } from "../packages/svg-sprite/gulp";

const templateFrom = path.resolve(__dirname, "../packages/svg-sprite/template/index.template.js");
const iconGlob = path.resolve(__dirname, "../packages/svg/dist/svg/**/*.svg");
const iconDir = path.resolve(__dirname, "../packages/svg/dist/svg/");
const targetDir = path.resolve(__dirname, "../packages/svg-sprite/dist");
const config: Config = {
  svg: {
    namespaceClassnames: false,
    rootAttributes: {
      style: "position:absolute; width:0; height:0; visibility:hidden",
    },
  },
  shape: {
    id: {
      generator(name: string) {
        const svgPath = name.split("/");
        return `s-icon-${svgPath[svgPath.length - 1].replace(".svg", "")}`;
      },
    },
    dimension: {
      // Set maximum dimensions
      maxWidth: 16,
      maxHeight: 16,
      attributes: false,
    },
  },
  mode: {
    symbol: true,
  },
};

/**
 * @description: 生成精灵图
 * @return
 */
const svgSpriteTask = () =>
  series(
    clearDir(["packages/svg-sprite/dist"]),
    generateSpriteTask({ iconGlob, iconDir, config, targetDir }),
    generateSpriteJSTask({ from: templateFrom, to: targetDir }),
  );

export default svgSpriteTask;
