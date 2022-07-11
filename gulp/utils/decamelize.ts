/*
 * @Author: Quarter
 * @Date: 2022-06-16 09:51:21
 * @LastEditors: Quarter
 * @LastEditTime: 2022-06-16 11:05:52
 * @FilePath: /simple-icons/gulp/utils/decamelize.ts
 * @Description: 从驼峰命名转换
 */

export interface DecamelizeOptions {
  separator?: string; // 分隔符
}

/**
 * @description: 从驼峰命名转换连词模式
 * @param {string} str 字符串
 * @param {DecamelizeOptions} options 配置项
 * @return {string}
 */
export const decamelize = (str = "", options: DecamelizeOptions = {}) => {
  const { separator = "_" } = options;
  return str
    .replace(/[A-Z]/g, (p1) => `${separator}${p1.toLocaleLowerCase()}`)
    .replace(/[0-9]+/g, (p1) => `${separator}${p1}`);
};
