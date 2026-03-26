#!/bin/bash
# DevCodec 打包脚本

VERSION=$(grep '"version"' manifest.json | cut -d'"' -f4)
ZIP_NAME="devcodec-v${VERSION}.zip"

echo "📦 打包 DevCodec v${VERSION}..."

# 创建临时目录
mkdir -p dist

# 复制必要文件
cp manifest.json dist/
cp popup.html dist/
cp popup.js dist/
cp styles.css dist/
cp LICENSE dist/
cp README.md dist/
cp -r icons/*.png dist/icons/
cp -r locales dist/

# 打包
zip -r "$ZIP_NAME" dist/

# 清理
rm -rf dist/

echo "✅ 打包完成: $ZIP_NAME"
echo "📤 上传到 Chrome Web Store: https://chrome.google.com/webstore/devconsole"
