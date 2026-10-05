# AGENTS.md

武汉大学动漫协会（WHUDAYS）历史存档站。Fumadocs + Next.js + React；完整静态导出部署至 GitHub Pages，正式域名 `whudays.org`。

## 硬性约束

1. 站内链接用绝对路径，例如 `/group/ani-key/`；不要使用相对链接。构建的死链检查失败时不能提交。
2. 新增页面需同步 `lib/navigation.json` 对应分区侧栏；子分区按最长路径匹配，不能覆盖丢失。
3. 改动后运行 `pnpm check`，确保类型检查和完整构建通过。
4. Commit 不要带 AI 的 Co-Authors。Commit message 使用中文并说明原因。
5. 不能删除或改名历史附件、中文 URL、旧锚点或独立 HTML 存档。变更时必须先解释兼容方案。

## 内容与资源

- 内容在 `docs/<区域>/**/*.mdx`；区域为 activity、about、department、group、message-box、maintainer
- 图片、附件和独立 HTML 存档直接维护在根目录 `public/`，用根绝对路径引用；例如 `public/activity/2024/x.jpg` → `/activity/2024/x.jpg`
- 年份为学年，例如 2024 指 2024.6–2025.6，与干部任期一致
- 内容页面使用无 `.html` 后缀的地址；独立 HTML 存档保持原地址
- 标题锚点沿用旧规则；添加显式锚点使用 Fumadocs 支持的 `[#anchor]`

## React / MDX

- `ChatMessage`、`MemberCard`、`TeamMembers`、`TeamPage`、`TeamPageTitle`、`TeamPageSection`、`Badge`、`Callout` 已全局注册
- 组件支持服务器渲染，不再依赖 Vue `ClientOnly`；保留的同名兼容组件会直接输出子内容
- JavaScript 变量用 `export const`；动态属性用 `avatar={avatarOf('名字')}`；不能使用 Vue `:prop`、`<script setup>`、`<template #...>`
- 统一人员数据在 `lib/people.js`；复用头像，暂无头像使用占位图；有 GitHub 的提交者需配置 github/name/email 别名
- 作者映射邮件只用于构建期匹配，不要把完整注册表或邮箱别名传入客户端组件
- `gitChangelog: false` 隐藏历史；历史仍追溯原 `.md` 文件和重命名。GitHub Actions 必须 `fetch-depth: 0`
- 贡献者参考 `docs/maintainer/contributing.mdx`

## 验证

`pnpm dev` 开发；`pnpm build` 构建并检查；`pnpm preview` 在 4173 端口预览实际静态输出；`pnpm typecheck`、`pnpm check` 为单项和完整检查。PR 工作流只检查不部署，main 更新才部署。
