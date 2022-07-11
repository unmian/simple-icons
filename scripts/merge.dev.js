#!/usr/bin/env node

const os = require("os");
const platform = os.platform();
const path = require("path");
const fs = require("fs");
const { execSync } = require("child_process");

// 工作区路径
const workDir = path.resolve(__dirname.replace(/(\/|\\)scripts$/g, ""));

const branchNameRegExp = /^dev\-([0-9a-z]+)$/
try {
  const branchName = execSync(`git symbolic-ref --short -q HEAD`, {
    cwd: workDir,
    encoding: "utf8",
  }).toString().trim();
  if (branchNameRegExp.test(branchName)) {
    const result = execSync(`git merge dev`, {
      cwd: workDir,
      encoding: "utf8",
    }).toString();
    console.log(result);
  } else {
    console.log(`当前分支【${branchName}】不满足 merge 要求`);
  }
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