# 武汉大学动漫协会社团网站

- 网址：[whudays.org](https://whudays.org/)
- GitHub 组织：[WHUDAYS](https://github.com/WHUDAYS)

本站是「武大漫协 HQ 工作文档存档项目」的副产物，保存社团历史活动与资料。基于 [Fumadocs](https://www.fumadocs.dev/)、Next.js 和 React，构建为无需服务器的静态网站，继续使用 GitHub Pages 与原域名。

## 本地开发

需要 Node.js 24、pnpm 11。请完整克隆仓库（不要 shallow clone），以显示完整页面历史。

```sh
pnpm install --frozen-lockfile
pnpm dev       # http://localhost:3000
pnpm check     # 类型、静态构建与路由/资源/搜索定位检查
pnpm preview   # http://localhost:4173，预览 out/ 中的实际静态产物
```

## 目录

- `docs/**/*.mdx`：内容；原 Markdown 文件名/路由保留，Vue 片段已迁移为 React/MDX
- `public/`：原有图片、PDF、视频、PDF.js 和独立历史页面，由 Next.js 直接读取，构建时原样输出到站点根目录
- `lib/navigation.json`：顶栏和按最长路径匹配的分区侧栏
- `lib/git-history.mjs`：构建期读取页面历史
- `lib/people.js`、`lib/icons.js`：统一人员、头像、贡献者别名与社交图标
- `components/content.tsx`：聊天气泡、成员卡、团队页等 React 组件
- `components/git-history-view.tsx`：页面完整 Git 历史、排序/展开、作者与共同作者
- `source.config.ts`、`lib/remark-legacy-headings.mjs`：Fumadocs MDX 及历史标题锚点兼容
- `scripts/`：仅保留发布产物检查；搜索由 Fumadocs 生成，站点地图由 Next.js 生成，本地静态预览使用 `serve`
- `out/`：GitHub Pages 静态输出，包含站点地图、CNAME 和原有独立 HTML 存档；文章使用无 `.html` 后缀的地址

## 投稿与维护

欢迎投稿和协助维护！详见[贡献指南](https://whudays.org/maintainer/contributing)。新增页面时请同步更新侧栏，站内链接继续使用绝对路径。`pnpm build` 会检查站内链接与归档资源；失败时不要部署。

图片和附件直接维护在根目录 `public/`。构建检查当前静态页面的站内链接、资源地址和锚点，不依赖旧站迁移快照。

## 许可

本站内容采用[知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh)许可。图片、文档等版权归原作者所有。
