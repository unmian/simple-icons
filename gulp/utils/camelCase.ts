/*
 * @Author: Quarter
 * @Date: 2022-06-16 09:54:13
 * @LastEditors: Quarter
 * @LastEditTime: 2022-06-20 18:40:42
 * @FilePath: /simple-icons/gulp/utils/camelCase.ts
 * @Description: 将字符串转化为驼峰命名
 */

export interface CamelCaseOptions {
  separator?: string; // 连词符号
  complete?: boolean; // 是否使用大驼峰
}

/**
 * @description: 将字符串转化为驼峰命名
 * @param {string} str 字符串
 * @param {CamelCaseOptions} options 配置项
 * @return {string}
 */
export const camelCase = (str = "", options: CamelCaseOptions = {}) => {
  const { separator = "-", complete = false } = options;
  const reg = new RegExp(`([${separator}][a-z])`, "g");
  let temp = str
    .replace(reg, (p1) => p1[1].toLocaleUpperCase())
    .replace(new RegExp(separator, "g"), "");
  if (complete && temp.length > 0) {
    temp = temp[0].toLocaleUpperCase() + temp.substring(1);
  }
  return temp;
};
