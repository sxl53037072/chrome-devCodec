# DevCodec Chrome Web Store 上线流程

## 一、打包

在项目根目录执行：

```bash
bash package.sh
```

产出文件：`devcodec-v1.2.0.zip`（约 32KB）

> 脚本会自动从 `manifest.json` 读取版本号，只打包必要文件（不含 `.git`、`node_modules`、`design.md` 等开发文件）。

---

## 二、准备商店素材

### 2.1 必需材料

| 材料 | 要求 | 状态 |
|------|------|------|
| 扩展 ZIP 包 | 上一步已生成 | ✅ |
| 图标 128x128 | `icons/icon128.png`，已包含在 ZIP 中 | ✅ |
| 截图 1-5 张 | 1280x800 或 640x400，PNG/JPEG | ⬜ 需截取 |
| 简短描述 | ≤132 字符 | ✅ 见 STORE.md |
| 详细描述 | 中英文 | ✅ 见 STORE.md |
| 类别 | Developer Tools | ✅ |
| 语言 | English + 中文(简体) | ✅ |

### 2.2 截图建议

在 Chrome 中加载扩展后，打开弹窗截图。建议截取以下 5 张：

1. **Base64 工具**（深色模式）— 展示主界面和侧边栏
2. **JWT 解码器** — 展示解码结果、Header/Payload/过期时间
3. **密码生成器** — 展示密码、强度指示器、破解时间
4. **正则测试器** — 展示高亮匹配和捕获组
5. **浅色模式** — 任一工具的浅色主题截图

截图方法：
```
1. Chrome 中打开扩展弹窗
2. 右键弹窗 → 检查（Inspect）
3. 在 DevTools 中按 Cmd+Shift+P → 输入 "screenshot"
4. 选 "Capture node screenshot" 截取弹窗区域
   或者用系统截图工具 Cmd+Shift+4 截取
```

### 2.3 宣传图（可选但推荐）

| 类型 | 尺寸 | 说明 |
|------|------|------|
| 小宣传图 | 440x280 px | 商店列表中展示 |
| 大宣传图 | 1400x560 px | 精选横幅（可选） |
| Marquee | 1400x560 px | 首页轮播（可选） |

---

## 三、上传到 Chrome Web Store

### 3.1 登录开发者控制台

打开 [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)

> 你说账号已经通过了，直接登录即可。首次注册需支付一次性 $5 注册费。

### 3.2 创建新项目

1. 点击左上角 **「+ 新建项目」**（New Item）
2. 点击 **「上传 ZIP 文件」**，选择 `devcodec-v1.2.0.zip`
3. 上传成功后进入编辑页面

### 3.3 填写商店信息

进入项目编辑页后，按以下标签页逐一填写：

#### 标签页 1：商品详情（Store Listing）

| 字段 | 填写内容 |
|------|---------|
| 语言 | 先填 English，之后添加 中文(简体) |
| 扩展名称 | `DevCodec - Developer Encoding/Decoding Toolkit` |
| 简短描述 | 从 STORE.md 复制 |
| 详细描述 | 从 STORE.md 复制（先英文部分，再中文部分） |
| 类别 | `Developer Tools` |
| 截图 | 上传准备好的 1-5 张截图 |
| 宣传图 | 上传（如有） |

> **多语言**：点击 "添加语言" → 选择 "中文(简体)"，分别填写中文名称和描述。

#### 标签页 2：隐私权（Privacy）

| 字段 | 填写内容 |
|------|---------|
| 单一用途描述 | `Provides encoding/decoding and developer utility tools (Base64, URL, JWT, HTML, Hash, Password, QR Code, Regex)` |
| 权限说明 | `storage` 权限用于保存用户的主题和语言偏好设置 |
| 是否收集用户数据 | **否**（No） |
| 隐私政策 URL | 可留空（不收集数据的扩展可以不需要），也可以填写 GitHub repo 的隐私说明页 |
| 是否使用远程代码 | **否** |

#### 标签页 3：分发（Distribution）

| 字段 | 选择 |
|------|------|
| 可见性 | **公开**（Public） |
| 分发地区 | **所有地区** |

### 3.4 提交审核

1. 所有标签页填完后，检查页面顶部是否有红色错误提示
2. 确认无误后点击右上角 **「提交审核」**（Submit for Review）
3. 状态变为 **「待审核」**（Pending Review）

---

## 四、审核等待

| 项目 | 说明 |
|------|------|
| 审核时长 | 通常 1-3 个工作日，复杂情况可能更久 |
| 审核状态 | 在 Developer Dashboard 查看 |
| 邮件通知 | 审核通过/拒绝会发邮件到开发者账号邮箱 |

### 常见拒绝原因及应对

| 拒绝原因 | 解决方法 |
|----------|---------|
| 描述与实际功能不符 | 确保描述准确反映当前功能 |
| 截图不清晰或不相关 | 重新截取高清截图 |
| 权限过多 | 我们只用了 `storage`，风险很低 |
| 代码混淆 | 我们没有混淆代码，原生 JS |
| 缺少隐私政策 | 如被要求，创建一个简单的 GitHub Page |

---

## 五、发布成功后

### 5.1 验证上线

1. 在 Chrome Web Store 搜索 "DevCodec" 确认可见
2. 点击安装测试完整功能
3. 检查描述、截图、图标是否正确显示

### 5.2 更新版本流程

后续需要更新时：

```bash
# 1. 修改 manifest.json 中的 version（如 1.2.0 → 1.3.0）
# 2. 重新打包
bash package.sh

# 3. 在 Developer Dashboard 中：
#    - 打开已有项目
#    - 点击 "Package" 标签 → "Upload updated package"
#    - 上传新的 ZIP 文件
#    - 点击 "Submit for Review"
```

> 版本号必须比当前已发布版本高，否则会被拒绝。

### 5.3 版本号规范

```
主版本.次版本.补丁版本
  1   .  2  .  0

主版本：大改版、不兼容变更
次版本：新增功能（如本次加 Regex = 1.2.0）
补丁版本：bug 修复
```

---

## 六、快速参考命令

```bash
# 打包
cd /Users/song/IdeaProjects/chrome/chrome-devCodec
bash package.sh

# 本地测试加载
# chrome://extensions/ → 开发者模式 → 加载已解压的扩展程序 → 选择项目目录

# 查看当前版本
grep '"version"' manifest.json
```

---

## 附：目录结构（发布包内容）

```
devcodec-v1.2.0.zip
├── manifest.json          # 扩展清单
├── popup.html             # 弹窗 HTML
├── popup.js               # 核心逻辑（~1660 行）
├── styles.css             # 样式（~1185 行）
├── LICENSE                # MIT 许可证
├── icons/
│   ├── icon16.png
│   ├── icon32.png
│   ├── icon48.png
│   └── icon128.png
└── _locales/
    ├── en/messages.json   # 英文
    └── zh_CN/messages.json # 中文
```
