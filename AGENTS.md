# AGENTS.md

面向 AI agent 的仓库维护说明。人类投稿者请看站点[贡献指南](https://whudays.org/maintainer/contributing)。

## 项目

武汉大学动漫协会（武大漫协 / WHUDAYS）社团历史存档站。[VitePress](https://vitepress.dev/) 静态站，GitHub Pages 部署，正式域名 `whudays.org`。

- 内容源在 `docs/`，VitePress 配置在 `docs/.vitepress/config.js`
- 本地预览 `pnpm dev`，构建 `pnpm build`

## 硬性约束（最易违反，务必遵守）

1. **站内链接用绝对路径**（`/group/...`），禁用相对路径。构建期有死链检查，失效链接会让 `pnpm build` 失败、阻断部署。
2. **新增页面必须同步侧边栏**：在 `docs/.vitepress/config.js` 的 `themeConfig.sidebar` 对应区域手动登记，否则页面不出现在导航。
3. **改动后跑 `pnpm build` 验证**能通过再提交。
4. **commit 不要带 AI 的 Co-Authors**——这是社区硬性规矩，带了会被拒。
5. commit message 用中文，描述清楚"为什么"。

## 目录与资源约定

- **内容**：Markdown 放 `docs/<区域>/`（`activity` / `about` / `department` / `group` / `message-box` / `maintainer`）
- **资源**：图片等放 `docs/public/` 的**镜像目录**，页面用绝对路径引用（`public` = 站点根）。如 `docs/public/activity/2024/x.jpg` → 页面写 `/activity/2024/x.jpg`
- **年份 = 学年**：`2024` 指 2024 学年（2024.6–2025.6），与干部任期一致

## 常见任务

新增内容时**优先模仿同区域的现有页面**，再按需登记侧边栏：

| 任务 | 参考现有文件 |
| --- | --- |
| 加活动页 | `docs/activity/2024/winter-festival.md` |
| 加成员卡 | `docs/group/vocaloid-utau-fans/index.md` |
| 加留声箱 | `docs/message-box/quq/words.md` |
| 加部门/小群 | `docs/department/` 或 `docs/group/` 下任一 |

## 自定义组件

`docs/.vitepress/theme/` 注册了两个全局组件，**必须用 `<ClientOnly>` 包裹**（否则 SSR/hydration 报错）：

- `ChatMessage`：对话气泡。props `avatar` / `nickname` / `message`（支持 HTML）/ `position`。例：`docs/about/introduction.md`
- `MemberCard`：成员卡。props `name` / `avatar` / `description` / `link` / `:badges` / `:socials`。例：`docs/group/vocaloid-utau-fans/index.md`

用法细节见站点[贡献指南](https://whudays.org/maintainer/contributing)。
