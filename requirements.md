# DevCodec - Requirements Document

## 项目概述
Chrome 浏览器扩展，为开发者提供一站式编解码工具。

## 核心功能（MVP）

### 1. Base64 编解码
- Base64 编码（文本 → Base64）
- Base64 解码（Base64 → 文本）
- 支持 Unicode 字符

### 2. URL 编解码
- URL 编码（encodeURIComponent）
- URL 解码（decodeURIComponent）

### 3. JWT Token 解码
- 解析 JWT Header（算法、类型）
- 解析 JWT Payload（用户数据、过期时间等）
- 显示过期时间（人类可读格式）
- 验证签名（仅显示，不验证）

### 4. HTML 实体编解码
- HTML 实体编码（< → &lt; 等）
- HTML 实体解码

### 5. 时间戳转换
- 时间戳 → 日期时间（支持秒/毫秒）
- 日期时间 → 时间戳
- 显示当前时间戳

### 6. 哈希生成
- MD5 哈希
- SHA-256 哈希
- 输入：文本字符串

## UI/UX 要求

### 设计风格
- 现代简约（Modern Minimalist）
- 跟随系统深色/浅色模式
- 清晰的视觉层次

### 布局
- Popup 弹窗界面
- 左侧导航栏（功能切换）
- 右侧主操作区
- 输入/输出双栏布局

### 交互
- 一键复制结果
- 实时转换（输入即输出）
- 清空按钮
- 交换按钮（编码 ↔ 解码）

## 国际化
- 主要语言：英文
- 支持中文切换
- 语言文件结构便于扩展

## 技术栈
- Manifest V3
- HTML5 + CSS3 + Vanilla JavaScript
- 无外部依赖（纯原生实现）

## 图标
- 生成 SVG 格式图标
- 多尺寸：16x16, 32x32, 48x48, 128x128
- 风格：简约线条图标

## 目标用户
- Web 开发者
- 后端开发者
- 全栈工程师
- 技术产品经理

## 竞品参考
- DevDock
- GTools
- Encoder/Decoder

## 发布目标
- 第一个月完全免费
- 目标：1 个月内 500+ 安装量
