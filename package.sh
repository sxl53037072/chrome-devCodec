#!/bin/bash
# DevCodec 打包脚本

set -e

VERSION=$(grep '"version"' manifest.json | head -1 | cut -d'"' -f4)
ZIP_NAME="devcodec-v${VERSION}.zip"

echo "📦 打包 DevCodec v${VERSION}..."

# 清理旧文件
rm -rf dist/ "$ZIP_NAME"

# 创建目录结构
mkdir -p dist/icons
mkdir -p dist/_locales/en
mkdir -p dist/_locales/zh_CN

# 复制核心文件
cp manifest.json dist/
cp popup.html dist/
cp popup.js dist/
cp styles.css dist/
cp LICENSE dist/

# 复制图标
cp icons/icon16.png dist/icons/
cp icons/icon32.png dist/icons/
cp icons/icon48.png dist/icons/
cp icons/icon128.png dist/icons/

# 复制国际化文件
cp _locales/en/messages.json dist/_locales/en/
cp _locales/zh_CN/messages.json dist/_locales/zh_CN/

# 打包（从 dist 目录内部打包，避免多一层目录）
cd dist
zip -r "../$ZIP_NAME" . -x ".*"
cd ..

# 清理
rm -rf dist/

echo ""
echo "✅ 打包完成: $ZIP_NAME"
echo "📏 文件大小: $(du -h "$ZIP_NAME" | cut -f1)"
echo ""
echo "📤 下一步: 上传到 Chrome Web Store"
echo "   https://chrome.google.com/webstore/devconsole"
