/*
 * @Author: Quarter
 * @Date: 2022-06-14 16:57:21
 * @LastEditors: Quarter
 * @LastEditTime: 2022-12-06 20:00:51
 * @FilePath: /simple-icons/gulp/generate-svg.ts
 * @Description: 生成规范的 svg 文件
 */

import { series } from "gulp";
import clearDir from "./clean-dir";
import { generateIconsTask, generateManifestTask } from "../packages/svg/gulp";
import { svgGenIconFileContent } from "../packages/svg/gulp/transform";

/**
 * @description: 生成规范化的 svg 文件
 * @param {string[]} source 来源
 * @return
 */
const svgTask = (source: string[]) =>
  series(
    clearDir(["packages/svg/dist"]),
    generateIconsTask({
      from: [...source],
      to: "packages/svg/dist",
      iconGenerator: svgGenIconFileContent,
      extName: ".svg",
      config: {
        removeXMLNS: false,
      },
      options: {
        replaceColor: true,
      },
    }),
    generateManifestTask({
      from: ["packages/svg/dist/svg/**/*.svg"],
      to: "packages/svg/dist",
    }),
  );

export default svgTask;
