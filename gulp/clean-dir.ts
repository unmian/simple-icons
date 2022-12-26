/*
 * @Author: Quarter
 * @Date: 2022-06-14 17:07:33
 * @LastEditors: Quarter
 * @LastEditTime: 2022-12-10 14:28:06
 * @FilePath: /simple-icons/gulp/clean-dir.ts
 * @Description: 清除文件夹
 */

import del from "del";

/**
 * @description: 清空文件夹
 * @param {string[]} paths 路径
 * @return {function}
 */
const clearDir = (paths: string[]) => () => del(paths);

export default clearDir;
