# 武汉大学动漫协会社团网站

- 网址：[whudays.github.io](https://whudays.github.io/)
- GitHub组织首页：[WHUDAYS](https://github.com/WHUDAYS)

## 仓库结构

- `.github`: GitHub workflow 配置
- `docs`: 网站根目录
  - `.vitepress`: Vitepress 配置
  - `public`: 网站资源根目录
    - `pdfjs`: 前端pdf预览库
  - `about`: 关于
    - `newbie-guide`: 萌新指南
  - `activity`: 活动
  - `department`: 部门
  - `group`: 小群
  - `maintainer`: 站点维护人员
  - `message-box`: 留声箱

## 项目维护指南

如果你想协助维护这个项目，或者是亲自撰写页面，请阅读下面的部分

### 本地部署

（写的不是很完整...不会的问ai吧...）

1. 克隆仓库
2. 安装 `node.js` 与 `pnpm`
3. 运行 `pnpm install` 安装依赖性
4. 命令行输入 `pnpm dev` 启动本地服务器。默认会启动在 `http://localhost:5173/`
5. 添加/修改页面后，在命令行界面按下`r`键可重启本地服务器。重启后就能看到更改的效果

### 上传与合并

1. commit时，请**尽量用中文**填写**有意义的**Commit Message
   - 如果你不知道如何写commit message，可以看看[commit记录](https://github.com/WHUDAYS/WHUDAYS.github.io/commits/main/)
2. 本项目目前只支持通过 `Pull Request` 合并。