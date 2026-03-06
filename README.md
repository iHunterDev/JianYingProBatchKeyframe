# JianyingPro Batch Keyframe | 剪映Pro 批量关键帧

**English** | [中文](#中文)

A web tool that automatically batch-adds keyframe animations and entrance animations to all video clips in a [JianyingPro (剪映Pro)](https://www.jianying.com/) draft file — no manual frame-by-frame editing required.

Live site: **[keyframeai.top](https://keyframeai.top)**

---

## Features

- **Batch keyframe generation** — automatically applies motion keyframes (pan, zoom) to every clip in the draft
- **Keyframe types** — Left→Right, Right→Left, Top→Bottom, Bottom→Top, Scale Up, Scale Down
- **Entrance animations** — add random or fixed entrance animations to all clips in one shot
- **Configurable options** — keyframe speed, animation speed, video aspect ratio (auto / 16:9 / 9:16 / 4:3)
- **Clean slate mode** — optionally wipe existing keyframes and animations before regenerating
- **Fully browser-based** — upload the draft JSON, get the processed file back instantly, no installation needed
- **Copilot desktop client** — a companion app that reads drafts directly from disk for a smoother workflow
- **i18n** — supports English and Simplified Chinese (简体中文)

---

## How It Works

JianyingPro stores project data as a JSON file (`draft_content.json`) on disk. This tool reads that file, injects keyframe and animation data for each clip according to your settings, and returns the modified file ready to be dropped back into JianyingPro.

> **Important:** JianyingPro 6.0+ encrypts draft files. You must use **version 5.8** or below for the draft file to be readable. If you already have encrypted drafts, create a new project in 5.8 — existing encrypted files cannot be decrypted.

---

## Usage (Web)

1. Open [keyframeai.top](https://keyframeai.top) in your browser
2. (Optional) Click **Draft Setting** to configure keyframe type, speed, animations, and video ratio
3. Close JianyingPro
4. Click **Select JianyingPro Draft File** and choose the `draft_content.json` file from your project folder
5. The processed file downloads automatically — replace the original file in the draft folder
6. Reopen JianyingPro to see the effects

---

## Usage (Copilot Desktop Client)

The Copilot client reads drafts directly from your local JianyingPro drafts folder, so you don't need to manually locate and replace files.

1. Download and run the Copilot client from [keyframeai.top/copilot](https://keyframeai.top/copilot)
2. Open the dashboard at [keyframeai.top/copilot/dashboard](https://keyframeai.top/copilot/dashboard)
3. Select a draft and click **Process Drafts**

Copilot source code: [github.com/iHunterDev/JianYingProBatchKeyframeCopilot](https://github.com/iHunterDev/JianYingProBatchKeyframeCopilot)

---

## Settings Reference

| Setting | Description |
|---|---|
| Video Ratio | Output aspect ratio: auto (follows draft), 16:9, 9:16, 4:3 |
| Keyframe Speed | Controls pan/zoom intensity (recommended range: 1–10) |
| Keyframe Type | Check which motion types to include in random selection |
| Clear Old Keyframes | Delete existing keyframe data before regenerating |
| Entrance Animation | Toggle entrance animations on/off |
| Random Animation | Randomly pick from checked animations per clip |
| Animation Speed | Entrance animation duration in milliseconds (e.g. 500 = 0.5s) |
| Clear Old Animations | Delete existing animations when entrance animation is off |

---

## Tech Stack

- [Next.js 14](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) (Radix UI)
- [next-intl](https://next-intl-docs.vercel.app/) for i18n
- [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote) for MDX content pages

---

## Local Development

```bash
# Install dependencies (pnpm recommended)
pnpm install

# Start dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## License

MIT

---

---

## 中文

**[English](#jianyingpro-batch-keyframe--剪映pro-批量关键帧)** | 中文

一个 Web 工具，可以自动为[剪映Pro](https://www.jianying.com/)草稿文件中的所有视频片段批量添加关键帧动画和入场动画，无需手动逐帧操作。

在线使用：**[keyframeai.top](https://keyframeai.top)**

---

### 功能特性

- **批量生成关键帧** — 自动为草稿中的每个片段添加运动关键帧（平移、缩放）
- **关键帧类型** — 左→右、右→左、上→下、下→上、放大、缩小
- **入场动画** — 一键为所有片段添加随机或指定的入场动画
- **灵活配置** — 关键帧速度、动画速度、视频比例（自动 / 16:9 / 9:16 / 4:3）
- **清理旧数据** — 可选在重新生成前清除原有的关键帧和动画数据
- **纯浏览器操作** — 上传草稿 JSON 文件，处理后立即下载，无需安装任何软件
- **Copilot 客户端** — 配套桌面程序，可直接读取本地草稿文件，操作更流畅
- **中英双语** — 支持简体中文和英文

---

### 使用说明（网页版）

1. 打开 [keyframeai.top](https://keyframeai.top)
2. （可选）点击 **草稿设置** 配置关键帧类型、速度、入场动画和视频比例
3. 关闭剪映Pro
4. 点击 **选择剪映Pro草稿文件**，选择草稿文件夹中的 `draft_content.json`
5. 处理完成后文件会自动下载，将其替换到草稿文件夹中的原文件
6. 重新打开剪映Pro 即可看到效果

---

### 使用说明（Copilot 客户端）

Copilot 客户端可以直接读取本地剪映草稿文件夹，无需手动找文件和替换。

1. 在 [keyframeai.top/copilot](https://keyframeai.top/copilot) 下载并运行 Copilot 客户端
2. 在浏览器中打开控制台：[keyframeai.top/copilot/dashboard](https://keyframeai.top/copilot/dashboard)
3. 选择草稿后点击 **处理草稿** 即可

Copilot 源码：[github.com/iHunterDev/JianYingProBatchKeyframeCopilot](https://github.com/iHunterDev/JianYingProBatchKeyframeCopilot)

---

### 注意事项

> **重要：** 剪映Pro 6.0 及以上版本对草稿文件进行了加密，无法被本工具读取。请使用 **5.8 版本**。若你已有加密草稿，需要用 5.8 版本新建项目，旧的加密文件无法解密。

---

### 本地开发

```bash
# 安装依赖（推荐使用 pnpm）
pnpm install

# 启动开发服务器
pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000)。
