/*
 * @Author: Quarter
 * @Date: 2022-06-16 16:26:09
 * @LastEditors: Quarter
 * @LastEditTime: 2022-07-05 16:36:53
 * @FilePath: /simple-icons/gulp/generate-icon-font.ts
 * @Description: 生成图标字体文件
 */

import { series } from "gulp";
import path from "path";
import clearDir from "./clean-dir";
import {
  FontCssConfig,
  generateIconFontJsonTask,
  generateIconFontTask,
} from "../packages/icon-font/gulp";
import { ICON_NAMESPACE } from "../config";

const iconGlob = path.resolve(__dirname, "../packages/svg/dist/svg/**/*.svg");
const targetDir = path.resolve(__dirname, "../packages/icon-font/dist");
const fontCssConfig: FontCssConfig = {
  namespace: ICON_NAMESPACE,
  path: path.resolve(__dirname, "../packages/icon-font/template/index.template.css"),
  targetPath: "./index.css",
  fontPath: "./",
};

const iconFontTask = () =>
  series(
    clearDir(["packages/icon-font/dist"]),
    generateIconFontTask({
      iconGlob,
      targetDir,
      fontCssConfig,
    }),
    generateIconFontJsonTask({ iconGlob, targetDir, config: { namespace: ICON_NAMESPACE } }),
  );

export default iconFontTask;
