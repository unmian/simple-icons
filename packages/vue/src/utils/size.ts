/*
 * @Author: Quarter
 * @Date: 2022-07-05 15:37:16
 * @LastEditors: Quarter
 * @LastEditTime: 2022-07-05 17:27:34
 * @FilePath: /simple-icons/packages/vue/src/utils/size.ts
 * @Description: 尺寸转换
 */

import { ICON_NAMESPACE } from "../../../../config";

// 尺寸和类名映射表映射表
const SIZE_CLASS_MAP: { [key: string]: string } = {
  small: "s",
  medium: "m",
  large: "l",
};

/**
 * @description: 转换尺寸类名
 * @param {SizeEnum} string 尺寸
 * @return {string}
 */
export const convertSizeClassName = (size: SizeEnum): string => {
  return `${ICON_NAMESPACE}-size-${SIZE_CLASS_MAP[size]}`;
};
