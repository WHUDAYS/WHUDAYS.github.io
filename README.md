# 武汉大学动漫协会社团网站

- 网址：[whudays.github.io](https://whudays.github.io/)
- GitHub组织首页：[WHUDAYS](https://github.com/WHUDAYS)

本站点为`武大漫协HQ工作文档存档项目`的**副产物**，初始定位是**保存库**

## 仓库结构

- `.github`: GitHub workflow 配置
- `docs`: 网站根目录
  - `.vitepress`: Vitepress 配置
    - `config.js`: 站点导航栏与菜单设置
  - `public`: 网站资源根目录
    - `pdfjs`: 前端pdf预览库
  - `about`: 关于
    - `hq`: 社团管理信息
    - `newbie-guide`: 萌新指南
  - `activity`: 活动，按照**学年**分类
  - `department`: 部门
  - `group`: 小群
  - `maintainer`: 站点维护人员
  - `message-box`: 留声箱

## 项目维护指南

如果你想协助维护这个项目，或者是亲自撰写页面，请阅读下面的部分

### 本地部署

（写的不是很完整...不会的问ai吧...）

1. 克隆仓库（**若您想撰写页面，请先fork该仓库，然后克隆自己的那一份fork**）
2. 安装 `node.js` 与 `pnpm`
3. 运行 `pnpm install` 安装依赖项
4. 命令行输入 `pnpm dev` 启动本地服务器。默认会启动在 `http://localhost:5173/`
5. 添加/修改页面后，在命令行界面按下`r`键可重启本地服务器。重启后就能看到更改的效果

### 页面撰写

*不会的问AI,上下文加上整个工作区*

本站基于`Vitepress`框架搭建。简单来说，这是一个将Markdown文本转换为静态网页的工具，能够让你专心于文本撰写而非网页设计。

撰写页面非常简单，你只需要会基本的 `Markdown 标记` 即可。

如果你非常想投稿但真的不会写 Markdown 文档，你可以将材料写成一份 `word` 文档，发给[维护者](https://whudays.github.io/maintainer/)，并告知需求。

须知：本仓库中涉及**年份**的文件夹，均为**学年**（如：`2024`表示2024学年，即`2024.6-2025.6`，与社团干部任期相同）

### 上传与合并

1. commit时，请**尽量用中文**填写**有意义的**Commit Message
   - 如果你不知道如何写commit message，可以看看[commit记录](https://github.com/WHUDAYS/WHUDAYS.github.io/commits/main/)
2. 本项目目前只支持通过 `Pull Request` 合并。