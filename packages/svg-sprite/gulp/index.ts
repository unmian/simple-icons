/*
 * @Author: Quarter
 * @Date: 2022-05-20 13:37:49
 * @LastEditors: Quarter
 * @LastEditTime: 2022-07-05 16:56:23
 * @FilePath: /simple-icons/packages/svg-sprite/gulp/index.ts
 * @Description: 入口文件
 */

import { dest, src } from "gulp";
import rename from "gulp-rename";
import svgSprite from "gulp-svg-sprite";
import uglify from "gulp-uglify";
import { Config } from "svg-sprite";
import { createTransformStream } from "../../../gulp/transform";
import { getSvgSpriteJSFile } from "./tansform";

/**
 * @description: 生成精灵图文件
 * @param {Object} config 配置
 * @return {function}
 */
export const generateSpriteTask = ({
  iconGlob,
  iconDir,
  config,
  targetDir,
}: {
  iconGlob: string;
  iconDir: string;
  config: Config;
  targetDir: string;
}) => {
  const generateSprite = () =>
    src(iconGlob, { cwd: iconDir }).pipe(svgSprite(config)).pipe(dest(targetDir));
  return generateSprite;
};

/**
 * @description: 生成精灵图的 js 文件
 * @param {Object} config 配置
 * @return {function}
 */
export const generateSpriteJSTask = ({
  from,
  to,
  extName = ".js",
}: {
  from: string;
  to: string;
  extName?: string;
}) => {
  const generateSpriteJS = () =>
    src(from)
      .pipe(createTransformStream(getSvgSpriteJSFile))
      .pipe(
        rename((file) => {
          if (file.basename) {
            // eslint-disable-next-line no-param-reassign
            file.extname = extName;
          }
        }),
      )
      .pipe(uglify())
      .pipe(
        rename((file) => {
          // eslint-disable-next-line no-param-reassign
          file.basename = "svg-sprite";
        }),
      )
      .pipe(dest(to));
  return generateSpriteJS;
};
