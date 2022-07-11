/*
 * @Author: Quarter
 * @Date: 2022-06-16 16:24:47
 * @LastEditors: Quarter
 * @LastEditTime: 2022-07-05 16:55:31
 * @FilePath: /simple-icons/packages/icon-font/gulp/index.ts
 * @Description: 图标字体入口文件
 */

import { dest, src } from "gulp";
import concat from "gulp-concat";
import cssMinify from "gulp-css-minify";
import iconfont from "gulp-iconfont";
import iconfontCss from "gulp-iconfont-css";
import rename from "gulp-rename";
import { JsonTemplateConfig, useItemTemplate, useJsonTemplate } from "./template";

export interface FontCssConfig {
  namespace: string; // 字体命名空间
  path: string; // 路径
  targetPath: string; // 目标路径
  fontPath: string; // 字体路径
}

export interface GLYPHS {
  name: string; // 名称
  unicode: string; // unicode 代码
}

// 时间戳
const timestamp = Math.round(Date.now() / 1000);
// 图标字体映射关系
const iconfontMap: { [key: string]: string } = {};

/**
 * @description: 生成图标字体文件
 * @param {Object} config 配置项
 * @return {function}
 */
export const generateIconFontTask = ({
  iconGlob,
  targetDir,
  fontCssConfig,
}: {
  iconGlob: string;
  targetDir: string;
  fontCssConfig: FontCssConfig;
}) => {
  const { namespace = "s" } = fontCssConfig;
  const generateIconFont = () =>
    src([iconGlob])
      .pipe(
        iconfontCss({
          fontName: namespace,
          ...fontCssConfig,
        }),
      )
      .pipe(cssMinify())
      .pipe(
        iconfont({
          fontName: `${namespace}-iconfont`,
          prependUnicode: true,
          formats: ["eot", "woff", "woff2", "ttf", "svg"],
          timestamp,
          normalize: true,
          fontHeight: 1024,
        }),
      )
      .on("glyphs", (glyphs: GLYPHS[]) =>
        glyphs.forEach((g) => Reflect.set(iconfontMap, g.name, g.unicode)),
      )
      .pipe(
        rename((file) => {
          if ("index" === file.basename) {
            // eslint-disable-next-line no-param-reassign
            file.basename = "iconfont";
          }
        }),
      )
      .pipe(dest(targetDir));
  return generateIconFont;
};

/**
 * @description: 生成图标 JSON 文件
 * @param {Object} config 配置项
 * @return {function}
 */
export const generateIconFontJsonTask = ({
  iconGlob,
  targetDir,
  config,
}: {
  iconGlob: string;
  targetDir: string;
  config: JsonTemplateConfig;
}) => {
  const generateIconFontJson = () =>
    src([iconGlob])
      .pipe(useItemTemplate(iconfontMap))
      .pipe(concat("iconfont.json"))
      .pipe(useJsonTemplate(config))
      .pipe(dest(targetDir));
  return generateIconFontJson;
};
