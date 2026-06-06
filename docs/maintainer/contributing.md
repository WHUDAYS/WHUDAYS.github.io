# 贡献指南

欢迎参与武大漫协站点的建设！本页面整合了投稿与维护所需的全部信息。

本站是 [VitePress](https://vitepress.dev/) 搭建的静态站，定位为社团历史活动与资料的**保存库**。它将 Markdown 文本转换为静态网页，让你专注于内容撰写而非网页设计——只要会基本的 `Markdown` 标记即可投稿。

::: tip 不会 Markdown / Git？
你可以将材料写成一份 `word` 文档，发给[维护者](/maintainer/)并告知需求，维护者会代为添加。
:::

## 我们希望收到什么

我们希望各位添加的是**有意义的材料**。以下类型的投稿不会通过：

- 照搬群头像和群介绍（[#26](https://github.com/WHUDAYS/WHUDAYS.github.io/pull/26#pullrequestreview-2981897408)）
- 到此一游或测试信息（[#3](https://github.com/WHUDAYS/WHUDAYS.github.io/pull/3)、[#5](https://github.com/WHUDAYS/WHUDAYS.github.io/pull/5)）

::: warning 关于 AI 协作
我们不希望项目的 Contributors 被各种 AI 协作者污染。如果你使用 AI 编写内容，请在 commit 时**删除 AI 的 Co-Authors**，否则不予通过（[#98](https://github.com/WHUDAYS/WHUDAYS.github.io/pull/98)）。
:::

## 本地部署

1. fork 该仓库，然后克隆你的 fork 到本地
2. 安装 [`node.js`](https://nodejs.org/)（建议 24+，与 CI 一致）与 [`pnpm`](https://pnpm.io/)
3. 运行 `pnpm install` 安装依赖
4. 运行 `pnpm dev` 启动本地服务器，默认地址 `http://localhost:5173/`
5. 修改页面后，在命令行按 `r` 键重启服务器即可看到效果

提交前建议运行 `pnpm build` 确认能构建通过——构建会做**死链检查**，任何失效的站内链接都会导致构建失败（详见下方[链接规范](#链接规范)）。

## 目录与资源约定

- **内容**：Markdown 文件放在 `docs/<区域>/` 下（如 `docs/activity/`、`docs/group/`）
- **资源**：图片等静态资源放在 `docs/public/` 的**对应镜像目录**下。例如 2024 冬日祭的图片放在 `docs/public/activity/2024/`，页面里用绝对路径 `/activity/2024/xxx.jpg` 引用（`public` 即站点根目录）
- **学年**：涉及年份的文件夹均为**学年**。如 `2024` 表示 2024 学年（`2024.6–2025.6`），与社团干部任期一致

## 新增页面

新建一个 Markdown 文件后，需要把它登记到侧边栏才会出现在导航里。侧边栏在 `docs/.vitepress/config.js` 的 `themeConfig.sidebar` 中**手动配置**。找到对应区域（如 `/activity/`），在 `items` 里按现有写法追加一项即可。

新增内容时，**参考同区域已有的页面**是最快的方式，例如：

- 活动页：参考 `docs/activity/2024/winter-festival.md`
- 成员卡：参考 `docs/group/vocaloid-utau-fans/index.md`
- 留声箱：参考 `docs/message-box/quq/words.md`

## 链接规范

站内链接一律使用**以 `/` 开头的绝对路径**（如 `/group/ani-key/`），不要用相对路径。相对路径在嵌套目录下容易解析错误，且会触发构建期的死链检查导致部署失败。

## 自定义组件

本站注册了两个全局 Vue 组件，可直接在 Markdown 中使用。

::: danger 必须用 ClientOnly 包裹
两个组件都依赖客户端渲染，**必须**用 `<ClientOnly>...</ClientOnly>` 包裹，否则会触发 SSR / hydration 不一致的报错。直接照搬现有页面的写法最稳妥。
:::

### ChatMessage 对话气泡

用于呈现聊天记录式的对话（参考 `docs/about/introduction.md`）。

| 属性 | 说明 |
| --- | --- |
| `avatar` | 头像图片路径 |
| `nickname` | 昵称 |
| `message` | 消息内容，支持 `<br>`、内嵌 `<img>` 等 HTML |
| `position` | `left`（默认）或 `right`，右侧通常表示自己 |

```md
<ClientOnly>
<ChatMessage avatar="/about/hq/avatar.png" nickname="萌新一枚" message="为什么漫协要叫WHUDAYS呢？" position="right"/>
<ChatMessage avatar="/about/hq/2012/店长.jpeg" nickname="店长" message="这都怪当年某管理的恶趣味……"/>
</ClientOnly>
```

### MemberCard 成员卡片

用于展示成员/群友信息卡（参考 `docs/group/vocaloid-utau-fans/index.md`）。

| 属性 | 说明 |
| --- | --- |
| `name` | 成员名称 |
| `avatar` | 头像图片路径或 URL |
| `description` | 一句话描述 |
| `link` | 个人详情页链接，没有则留空 `""` |
| `:badges` | 徽章数组，`type` 可选 `tip` / `warning` / `info` / `danger` |
| `:socials` | 社交链接数组，每项含 `platform` / `url` / `icon` |

头像推荐用 QQ 头像动态链接：`https://q1.qlogo.cn/g?b=qq&nk=<QQ号>&s=100`；也可将图片放进 `docs/public/...` 后用绝对路径引用。

```md
<ClientOnly>
<div class="member-grid">
  <MemberCard
    name="示例成员"
    avatar="https://q1.qlogo.cn/g?b=qq&nk=10000&s=100"
    description="一句话简介"
    link=""
    :badges="[{ type: 'tip', text: '管理员' }, { type: 'warning', text: '创作者' }]"
    :socials="[{ platform: 'github', url: 'https://github.com/xxx', icon: '/group/vocaloid-utau-fans/members/sns/github.svg' }]"
  />
</div>
</ClientOnly>
```

## 提交与合并

1. commit 时请**尽量用中文**填写**有意义的** Commit Message。不确定怎么写可参考[提交记录](https://github.com/WHUDAYS/WHUDAYS.github.io/commits/main/)
2. 记得移除 AI 协作者的 Co-Authors（见上方[关于 AI 协作](#我们希望收到什么)）
3. 本项目通过 `Pull Request` 合并。请确保 `pnpm build` 能通过后再提交
