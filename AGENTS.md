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
| 加成员卡 | `docs/activity/2025/welcome-party/credits.md` |
| 加留声箱 | `docs/message-box/quq/words.md` |
| 加部门/小群 | `docs/department/` 或 `docs/group/` 下任一 |

## 针对框架的修改与二开

### 1. 自定义组件

`docs/.vitepress/theme/` 注册了两个全局组件，**必须用 `<ClientOnly>` 包裹**（否则 SSR/hydration 报错）：

- `ChatMessage`：对话气泡。仅 `docs/about/introduction.md` 中使用。props `avatar` / `nickname` / `message`（支持 HTML）/ `position`。例：
- `MemberCard`：成员卡。仅在 `docs/group/vocaloid-utau-fans` 中使用。props `name` / `avatar` / `description` / `link` / `:badges` / `:socials`

### 2. gitChangelog 插件

为插件添加了 patch(`patches/@nolebase__vitepress-plugin-git-changelog@2.17.1.patch`) 以显示贡献者名称

用法细节见站点[贡献指南](https://whudays.org/maintainer/contributing)。

### 3. 人员数据与贡献者映射

统一参考和修改 `docs/.vitepress/data/people.js`。
- **头像复用**：若某一成员的头像已存在，请直接复用，**不要新建条目**。暂无头像可缺省，会自动回退到占位图。
- **贡献者别名映射**：`people.js` 同时作为 `gitChangelog` 的作者数据源。如果成员是仓库提交者（有 GitHub），需在其数据对象中补充 `github` 字段，并根据 Git 历史配置 `mapByNameAliases` 和 `mapByEmailAliases`，插件才能将不同机器上的 commit 正确归拢到同一作者卡片下。