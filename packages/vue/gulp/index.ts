/*
 * @Author: Quarter
 * @Date: 2022-06-20 17:37:19
 * @LastEditors: Quarter
 * @LastEditTime: 2022-07-05 16:22:41
 * @FilePath: /simple-icons/packages/vue/gulp/index.ts
 * @Description: gulp 入口文件
 */

import { dest, src } from "gulp";
import concat from "gulp-concat";
import rename from "gulp-rename";
import {
  useEntryItemTemplate,
  useItemTemplate,
  useTemplate,
  useWrapperTemplate,
  VueGetIconFileContent,
} from "./template";

/**
 * @description: 生成 vue 组件文件
 * @param {object} config 配置
 * @return {function}
 */
export const generateVueComponentsTask = ({
  from,
  to,
  iconGenerator,
  extName = ".ts",
}: {
  from: string;
  to: string;
  iconGenerator: VueGetIconFileContent;
  extName?: string;
}) => {
  const generateVueComponents = () =>
    src(from)
      .pipe(
        rename((file) => {
          if (file.basename) {
            // eslint-disable-next-line no-param-reassign
            file.dirname = "";
          }
        }),
      )
      .pipe(dest(`${to}/data`))
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
      .pipe(dest(`${to}/components`));
  return generateVueComponents;
};

/**
 * @description: 生成清单文件
 * @param {object} config 配置
 * @return {function}
 */
export const generateManifestTask = ({ from, to }: { from: string; to: string }) => {
  const generateManifest = () =>
    src(from)
      .pipe(useItemTemplate())
      .pipe(concat("NOT-VALID"))
      .pipe(useWrapperTemplate())
      .pipe(concat("mainfest.ts"))
      .pipe(dest(to));
  return generateManifest;
};

/**
 * @description: 生成入口文件
 * @param {object} config 配置
 * @return {function}
 */
export const generateEntryTask = ({ from, to }: { from: string; to: string }) => {
  const generateEntry = () =>
    src(from).pipe(useEntryItemTemplate()).pipe(concat("icons.ts")).pipe(dest(to));
  return generateEntry;
};
