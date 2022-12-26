/*
 * @Author: Quarter
 * @Date: 2022-06-14 16:53:35
 * @LastEditors: Quarter
 * @LastEditTime: 2022-12-10 14:40:33
 * @FilePath: /simple-icons/gulpfile.ts
 * @Description: gulp 配置文件
 */

import { parallel, series, task } from "gulp";
import iconFontTask from "./gulp/generate-icon-font";
import svgSpriteTask from "./gulp/generate-svg-sprite";
import svgTask from "./gulp/generate-svg";
import vueTask from "./gulp/generate-vue-component";

const source = ["icons/**/*.svg"];

task("default", series(svgTask(source), parallel(iconFontTask(), svgSpriteTask(), vueTask())));
