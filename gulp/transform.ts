/*
 * @Author: Quarter
 * @Date: 2022-06-15 10:41:46
 * @LastEditors: Quarter
 * @LastEditTime: 2022-06-15 16:23:40
 * @FilePath: /simple-icons/gulp/transform.ts
 * @Description: 文件流转换
 */

import through from "through2";
import File from "vinyl";

/**
 * @description: 创建文件流转换
 * @param {function} fn 转换函数
 * @return {function}
 */
export const createTransformStream = (fn: (raw: string, file: File) => string) =>
  through.obj((file: File, encoding, done) => {
    if (file.isBuffer()) {
      const before = file.contents.toString(encoding);
      try {
        const after = fn(before, file);
        // eslint-disable-next-line no-param-reassign
        file.contents = Buffer.from(after);
        done(null, file);
      } catch (err) {
        done(err, null);
      }
    } else {
      done(null, file);
    }
  });

/**
 * @description: 异步创建文件流转换
 * @param {function} fn 转换函数
 * @return {function}
 */
export const createTransformStreamAsync = (fn: (raw: string, file: File) => Promise<string>) =>
  through.obj((file: File, encoding, done) => {
    if (file.isBuffer()) {
      const before = file.contents.toString(encoding);
      fn(before, file)
        .then((after) => {
          // eslint-disable-next-line no-param-reassign
          file.contents = Buffer.from(after);
          done(null, file);
        })
        .catch((err) => {
          done(err, null);
        });
      done(null, file);
    } else {
      done(null, file);
    }
  });
