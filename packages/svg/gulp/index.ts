/*
 * @Author: Quarter
 * @Date: 2022-06-15 12:18:53
 * @LastEditors: Quarter
 * @LastEditTime: 2022-06-17 10:07:09
 * @FilePath: /simple-icons/packages/svg/gulp/index.ts
 * @Description: 入口文件
 */

import { dest, src } from "gulp";
import contact from "gulp-concat";
import rename from "gulp-rename";
import { svgToElement, SvgToElementOptions } from "./svg-info-check";
import { svgo, SVGOConfig } from "./svgo";
import {
  useTemplate,
  IconFileContentGenerator,
  useItemTemplate,
  useWrapperTemplate,
} from "./template";

export interface GenerateIconOptions {
  from: string[];
  to: string;
  iconGenerator: IconFileContentGenerator;
  options?: SvgToElementOptions;
  extName?: string;
  config?: SVGOConfig;
}

/**
 * @description: 生成 svg 图标
 * @param {Object} config 配置
 * @return {function}
 */
export const generateIconsTask = ({
  from,
  to,
  iconGenerator,
  extName = ".svg",
  config,
  options,
}: GenerateIconOptions) => {
  const generateIcons = () =>
    src(from)
      .pipe(svgo(config))
      .pipe(svgToElement(options))
      .pipe(
        rename((file) => {
          if (file.basename) {
            // eslint-disable-next-line no-param-reassign
            file.extname = ".json";
          }
        }),
      )
      .pipe(dest(`${to}/ast`))
      .pipe(useTemplate(iconGenerator))
      .pipe(
        rename((file) => {
          if (file.basename) {
            // eslint-disable-next-line no-param-reassign
            file.extname = extName;
            // eslint-disable-next-line no-param-reassign
            file.basename = file.basename.toLocaleLowerCase();
          }
        }),
      )
      .pipe(dest(`${to}/svg`));
  return generateIcons;
};

/**
 * @description: 生成清单文件
 * @return {Function}
 */
export const generateManifestTask = ({ from, to }: { from: string[]; to: string }) => {
  const generateManifest = () =>
    src(from)
      .pipe(useItemTemplate())
      .pipe(contact("NOT-VALID"))
      .pipe(useWrapperTemplate())
      .pipe(contact("manfest.ts"))
      .pipe(dest(to));
  return generateManifest;
};
