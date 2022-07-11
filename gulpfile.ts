/*
 * @Author: Quarter
 * @Date: 2022-06-14 16:53:35
 * @LastEditors: Quarter
 * @LastEditTime: 2022-06-20 18:01:22
 * @FilePath: /simple-icons/gulpfile.ts
 * @Description: gulp 配置文件
 */

import { parallel, series } from "gulp";
import iconFontTask from "./gulp/generate-icon-font";
import svgSpriteTask from "./gulp/generate-svg-sprite";
import svgTask from "./gulp/generate-svg";
import vueTask from "./gulp/generate-vue-component";

const source: string[] = ["icons/**/*.svg"];
export default series(svgTask(source), parallel(iconFontTask(), svgSpriteTask(), vueTask()));
