#!/usr/bin/env node

const os = require("os");
const platform = os.platform();
const path = require("path");
const fs = require("fs");
const { execSync } = require("child_process");

// 工作区路径
const workDir = path.resolve(__dirname.replace(/(\/|\\)scripts$/g, ""));

try {
  let result = execSync(`git checkout stage`, {
    cwd: workDir,
    encoding: "utf8",
  }).toString();
  console.log(result);
  result = execSync(`git rebase origin/dev`, {
    cwd: workDir,
    encoding: "utf8",
  }).toString();
  console.log(result);
  result = execSync(`git push origin stage:stage`, {
    cwd: workDir,
    encoding: "utf8",
  }).toString();
  console.log(result);
} catch (e) {
  console.log(e.stdout.toString());
}

switch (platform) {
  // linux/unix
  case "darwin":
  case "linux":
    break;
  // windows
  case "win32":
    break;
  default:
    console.log("无法确认操作系统");
}