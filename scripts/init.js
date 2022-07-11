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

/**
 * @description: 移除文件或文件夹
 * @author: Quarter
 * @param {string} path 文件夹路径
 * @return
 */
const removeFileOrDir = (path) => {
  const stat = fs.statSync(path);
  if (stat.isDirectory()) {
    const files = fs.readdirSync(path);
    for (let i = 0; i < files.length; i++) {
      const filePath = path.join(path, files[i]);
      removeFileOrDir(filePath);
    }
    fs.rmdirSync(path); //如果文件夹是空的，就将自己删除掉
  } else {
    //删除文件
    fs.unlinkSync(path);
  }
};

// 清理和安装依赖
const fileRegExp = /^((.+)\.lock)|(yarn-(.+)\.log)$/;
fs.readdirSync(workDir).forEach((file) => {
  if (fileRegExp.test(file)) {
    removeFileOrDir(path.join(workDir, file));
  }
});
if ("win32" === platform) {
  /* try {
    execSync("rmdir -r node_modules", {
      cwd: workDir,
      encoding: "buffer",
    });
  } catch (e) {
    console.log(e.stdout.toString());
  } */
} else {
  try {
    execSync("rm -r ./node_modules", {
      cwd: workDir,
      encoding: "utf8",
    });
  } catch (e) {
    console.log(e.stdout.toString());
  }
}
try {
  const result = execSync("yarn install", {
    cwd: workDir,
    encoding: "utf8",
  }).toString();
  console.log(result);
  // 配置 git hooks
  execSync("git config core.hooksPath hooks", {
    cwd: workDir,
    encoding: "utf8",
  });
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