/*
 * @Author: Quarter
 * @Date: 2022-06-14 16:58:54
 * @LastEditors: Quarter
 * @LastEditTime: 2022-06-20 18:28:31
 * @FilePath: /simple-icons/gulp/generate-vue-component.ts
 * @Description: 生成 vue 组件
 */

import { parallel, series } from "gulp";
import clearDir from "./clean-dir";
import { generateVueComponentsTask, generateManifestTask, generateEntryTask } from "../packages/vue/gulp";
import { vueGetIconFileContent } from "../packages/vue/gulp/template";

/**
 * @description: 生成规范化的 svg 文件
 * @return
 */
const vueTask = () =>
  series(
    clearDir(["packages/vue/dist", "packages/vue/src/data", "packages/vue/src/components"]),
    parallel(
      generateVueComponentsTask({
        from: "packages/svg/dist/ast/**/*.json",
        to: "packages/vue/src",
        iconGenerator: vueGetIconFileContent,
      }),
       generateManifestTask({
         from: "packages/svg/dist/ast/**/*.json",
         to: "packages/vue/src",
       }),
       generateEntryTask({
        from: "packages/svg/dist/ast/**/*.json",
        to: "packages/vue/src",
      }),
    ),
  );

export default vueTask;
