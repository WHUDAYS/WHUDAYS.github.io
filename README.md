# 武汉大学动漫协会社团网站

- 网址：[whudays.org](https://whudays.org/)
- GitHub 组织：[WHUDAYS](https://github.com/WHUDAYS)

本站是「武大漫协 HQ 工作文档存档项目」的副产物，保存社团历史活动与资料。基于 [Fumadocs](https://www.fumadocs.dev/)、Next.js 和 React，构建为无需服务器的静态网站，继续使用 GitHub Pages 与原域名。

## 本地开发

需要 Node.js 24.14 或更新版本、pnpm 11。请完整克隆仓库（不要 shallow clone），以显示完整页面历史。

```sh
pnpm install --frozen-lockfile
pnpm dev       # http://localhost:3000
pnpm check     # 历史回归、类型、静态构建与路由/资源/搜索定位检查
pnpm preview   # http://localhost:4173，预览 out/ 中的实际静态产物
```

## 目录

- `docs/**/*.mdx`：内容；原 Markdown 文件名/路由保留，Vue 片段已迁移为 React/MDX
- `public/`：原有图片、PDF、视频、PDF.js 和独立历史页面，由 Next.js 直接读取，构建时原样输出到站点根目录
- `lib/navigation.json`：顶栏和按最长路径匹配的分区侧栏
- `lib/people.js`、`lib/icons.js`：统一人员、头像、贡献者别名与社交图标
- `components/content.tsx`：聊天气泡、成员卡、团队页等 React 组件
- `components/mdx.tsx`：全局 MDX 组件与官方图片查看器接入；正文图片支持放大，带链接的图片保持跳转行为
- `source.config.ts`：Fumadocs MDX 配置；通过 `remarkGitChangelog` 自动追加贡献者和页面历史，并由 Fumadocs 导出页面更新时间
- `components/provider.tsx`：通过 Fumadocs 翻译接口组合官方简体中文语言包和页面历史中文预设
- `scripts/`：发布产物检查和页面历史接入回归测试；搜索由 Fumadocs 生成，站点地图由 Next.js 生成，本地静态预览使用 `serve`
- `out/`：GitHub Pages 静态输出，包含站点地图、CNAME 和原有独立 HTML 存档；文章使用无 `.html` 后缀的地址

## 投稿与维护

欢迎投稿和协助维护！详见[贡献指南](https://whudays.org/maintainer/contributing)。新增页面时请同步更新侧栏，站内链接继续使用绝对路径。`pnpm build` 会检查站内链接与归档资源；失败时不要部署。

图片和附件直接维护在根目录 `public/`。构建检查当前静态页面的站内链接、资源地址和锚点，不依赖旧站迁移快照。

每个内容页面的 frontmatter 都需填写 `description`：用一两句话客观概括本页已有内容，不堆关键词，也不把待补充内容写成已有资料。摘要用于搜索、网页元信息和分享预览，不会自动显示在正文里。

`source.config.ts` 使用 Fumadocs 的 `includeProcessedMarkdown` 导出正文，`lib/llm-components.tsx` 提供本站成员卡片和聊天记录的文字形式。页面操作中的 Markdown、自动生成的 `/llms.txt` 索引及 `/llms-full.txt` 全文均使用这份处理后的内容；不再维护 `public/llms.txt`。独立 HTML 存档和 PDF 仍以正文中的原链接提供。

面包屑结构化数据复用可见导航的 Fumadocs 页面树，仅输出有实际页面链接的路径；不显示面包屑的团队页不额外添加。每页分享图由 Fumadocs 官方 OG 模板在构建时生成 `/og/**/*.png`，包含本页标题、摘要与站点标志，并同时接入 Open Graph 和 Twitter Card。中文字体及许可位于 `lib/og-assets/`，仅供生成图片使用。

页面历史直接使用 npm 发布的 `fumadocs-page-history`，无需本地补丁。本站在 `source.config.ts` 中通过 `getHistoryPaths` 显式关联迁移前的同路径 `.md` 文件，由包统一合并、去重、排序，不限制数量。迁移同时改写了 Vue/React 语法，部分文件未达到 Git 默认 50% 的重命名相似度阈值，显式路径用于补齐这部分记录。纯合并不重复展示，合并时产生的独立修改仍会保留。`scripts/page-history.test.mjs` 验证迁移前记录和建页记录不会丢失，纯合并与其他页面的模板历史不会混入。

## 许可

本站内容采用[知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh)许可。图片、文档等版权归原作者所有。
