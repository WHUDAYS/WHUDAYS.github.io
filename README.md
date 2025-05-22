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
    - `newbie-guide`: **本学年**萌新指南
  - `activity`: 活动
  - `department`: 部门
  - `group`: 小群
  - `maintainer`: 站点维护人员
  - `message-box`: 留声箱

## 本地部署指南

（写的不是很完整...不会的问ai吧...）

1. 克隆仓库
2. 安装 `node.js` 与 `pnpm`
3. 运行 `pnpm install` 安装依赖性
4. 命令行输入 `pnpm dev` 启动本地服务器。默认会启动在 `http://localhost:5173/`