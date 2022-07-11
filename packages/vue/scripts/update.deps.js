#!/usr/bin/env node

const os = require("os");
const platform = os.platform();
const path = require("path");
const fs = require("fs");
const { execSync } = require("child_process");

// 工作区路径
const workDir = path.resolve(__dirname.replace(/(\/|\\)scripts$/g, ""));

// 升级 vue 全家桶
try {
  const result = execSync(`ncu -u -f "vue vuex vue-router" -t minor`, {
    cwd: workDir,
    encoding: "utf8",
  });
  console.log(result);
} catch (e) {
  console.log(e.stdout.toString());
}
// 升级其它依赖
try {
  const result = execSync(`ncu -u -x "vue vuex vue-router socket.io-client @types/socket.io-client" -t latest`, {
    cwd: workDir,
    encoding: "utf8",
  });
  console.log(result);
} catch (e) {
  console.log(e.stdout.toString());
}
// 更新依赖
try {
  const result = execSync(`yarn upgrade`, {
    cwd: workDir,
    encoding: "utf8",
  });
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