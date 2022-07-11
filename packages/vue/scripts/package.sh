###
# @Author: Quarter
# @Date: 2022-04-21 09:23:59
 # @LastEditTime: 2022-04-26 12:14:55
 # @LastEditors: Quarter
# @Description: package 脚本
 # @FilePath: /simple-icons/scripts/package.sh
###
if [[ -d "docs" ]]; then
  # 清理旧文件
  if [[ -f "$PROJECT_NAME.zip" ]]; then
    rm "$PROJECT_NAME.zip"
  fi
  if [[ "$OSS_ENABLE" == true ]]; then
    mc config host add oss https://fs.leswx.cn "$OSS_KEY" "$OSS_SECRET" --api s3v4
    mc alias ls
    # 获取 oss 静态资源
    mc cp -r "oss/public/$PROJECT_OSS" docs
    mv "docs/$PROJECT_OSS" docs/oss
  fi
  # 压缩成 zip
  cd docs
  zip -q -r "../$PROJECT_NAME.zip" .
  cd ..
  # 发布压缩包
  mc config host add deploy https://io.deploy.lescity.com.cn "$DEPLOY_KEY" "$DEPLOY_SECRET" --api s3v4
  mc cp "${PROJECT_NAME}.zip" deploy/deploy/
  # 删除打包代码
  rm -r docs/
else
  echo "无法找到构建内容"
  exit 1
fi