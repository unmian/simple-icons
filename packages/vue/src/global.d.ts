/*
 * @Author: Quarter
 * @Date: 2022-07-05 17:26:48
 * @LastEditors: Quarter
 * @LastEditTime: 2022-07-05 17:28:11
 * @FilePath: /simple-icons/packages/vue/src/global.d.ts
 * @Description: 全局类型定义
 */

declare interface Styles {
  [css: string]: string | number;
}

declare type SizeEnum = "small" | "medium" | "large";

declare type ClassName = { [className: string]: any } | ClassName[] | string;
