#!/usr/bin/env node

const os = require("os");
const platform = os.platform();
const path = require("path");
const fs = require("fs");
const { execSync } = require("child_process");

// 工作区路径
const workDir = path.resolve(__dirname.replace(/(\/|\\)scripts$/g, ""));

// ncu 安装检查
try {
  execSync("npm ls -g npm-check-updates", {
    cwd: workDir,
    encoding: "utf8",
  });
} catch (e) {
  if (null === e.signal) {
    try {
      const result = execSync("npm install -g npm-check-updates", {
        cwd: workDir,
        encoding: "utf8",
      }).toString();
      console.log(result);
    } catch (e) {
      console.log(e.stdout.toString());
    }
  }
}
// yarn 安装检查
try {
  execSync("npm ls -g yarn", {
    cwd: workDir,
    encoding: "utf8",
  });
} catch (e) {
  if (null === e.signal) {
    try {
      const result = execSync("npm install -g yarn", {
        cwd: workDir,
        encoding: "utf8",
      }).toString();
      console.log(result);
    } catch (e) {
      console.log(e.stdout.toString());
    }
  }
}
// cross-env 安装检查
try {
  execSync("npm ls -g cross-env", {
    cwd: workDir,
    encoding: "utf8",
  });
} catch (e) {
  if (null === e.signal) {
    try {
      const result = execSync("npm install -g cross-env", {
        cwd: workDir,
        encoding: "utf8",
      }).toString();
      console.log(result);
    } catch (e) {
      console.log(e.stdout.toString());
    }
  }
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
