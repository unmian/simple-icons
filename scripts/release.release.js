#!/usr/bin/env node

const os = require("os");
const platform = os.platform();
const path = require("path");
const fs = require("fs");
const { execSync } = require("child_process");
const args = process.argv.slice(2);

// 工作区路径
const workDir = path.resolve(__dirname.replace(/(\/|\\)scripts$/g, ""));
// 类型
const type = args[0];

// 类型验证
if (!["patch", "minor", "major"].includes(type)) {
  console.error("请指定 release 的类型： patch、minor、major");
  process.exit(1);
}

try {
  let result = execSync(`git checkout release`, {
    cwd: workDir,
    encoding: "utf8",
  }).toString();
  console.log(result);
  result = execSync(`git rebase origin/stage`, {
    cwd: workDir,
    encoding: "utf8",
  }).toString();
  console.log(result);
} catch (e) {
  console.log(e.stdout.toString());
  process.exit(1);
}

// 验证当前分支是否为 release
try {
  const branchName = execSync(`git symbolic-ref --short -q HEAD`, {
    cwd: workDir,
    encoding: "utf8",
  }).toString().trim();
  if ("release" !== branchName) {
    console.error("请在 release 分支进行 tag 操作");
    process.exit(1);
  }
} catch (e) {
  console.log(e.stdout.toString());
  process.exit(1);
}

// yarn version 操作
try {
  const result = execSync(`yarn version --${type}`, {
    cwd: workDir,
    encoding: "utf8",
  }).toString();
  console.log(result);
} catch (e) {
  console.log(e.stdout.toString());
  process.exit(1);
}

// tag 操作
try {
  const versionRegExp = /^[0-9]+(\.[0-9]+){2,})$/
  const package = JSON.parse(fs.readFileSync(path.join(workDir, "package.json"), "utf8"));
  if (!versionRegExp.test(package.version)) {
    console.error("版本号不符合要求，请检查版本");
    process.exit(1);
  }
  const result = execSync(`git tag v${package.version}`, {
    cwd: workDir,
    encoding: "utf8",
  }).toString();
  console.log(result);
} catch (e) {
  console.log(e.stdout.toString());
  process.exit(1);
}

// 推送更新
try {
  const result = execSync(`git push release:release --tag`, {
    cwd: workDir,
    encoding: "utf8",
  }).toString();
  console.log(result);
} catch (e) {
  console.log(e.stdout.toString());
  process.exit(1);
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