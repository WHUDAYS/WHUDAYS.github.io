# 站点维护人员

<script setup>
import { VPTeamMembers } from 'vitepress/theme'

const maintainers = [
  { avatar: '/about/hq/2024/-QuQ-.jpeg', name: '-QuQ-', title: '2025-现在', links: [ { icon: 'github', link: 'https://github.com/shenxianovo' } ] },
]

// 协史编写群中贡献者
// 除了群主其他人就按年份排了...
const group = [
  { avatar: '/about/hq/2015/喵少.jpg', name: '喵少' }, // 协史群群主，15-17年资料收集，摇人大神
  { avatar: '/about/hq/2012/店长.jpeg', name: '店长' }, // 14年之前记录
  { avatar: '/about/hq/2012/正面.jpeg', name: '正面' }, // 13冬日祭录播
  { avatar: '/about/hq/2013/世闲.jpg', name: '世闲' }, // 夏樱原始设定
  { avatar: '/about/hq/2017/铜鼓.jpg', name: '铜鼓' }, // 15-21hq头像，部分其他资料
  { avatar: '/about/hq/2019/名字.jpg', name: '名字' }, // 给我(-QuQ-)发了很多其他资料
  { avatar: '/about/hq/2021/影临光.jpg', name: '影临光' }, // 23社刊
  { avatar: '/about/hq/2023/涅普智可.png', name: '涅普智可' }, // 22、23学年撰写
  { avatar: '/about/hq/2024/-QuQ-.jpeg', name: '-QuQ-' }, // 站点建立者，维护牛马
]

// 外部贡献者(GitHub提交PR，或是提供小群/部门相关材料)
const external = [
  { avatar: 'https://www.github.com/Animnia.png', name: 'Animnia', title: '夏樱乐团/东方群' },
  { avatar: 'https://www.github.com/xingzelei.png', name: 'INFINITY', title: '夏樱乐团/gal群' },
  { avatar: '/about/hq/2023/北洛.jpeg', name: '北洛', title: '冰糖樱花'},
  { avatar: '/maintainer/椅子.jpeg', name: '椅子', title: '夏樱组/Re:START工作室'},
  { avatar: '/about/hq/2022/岚曦.jpeg', name: '岚曦', title: '术群' },
  { avatar: '/group/galgame/group-owner/Darkream.png', name: 'Darkream', title: 'gal群' },
  { avatar: '/maintainer/初春.png', name: '初春', title: 'whudays.org域名' },
]

</script>

<center>
  <VPTeamMembers size="small" :members="maintainers" />
</center>

[建站初衷](/message-box/quq/words)

投稿方式：
- QQ私信：51729575（~~快来戳我加好友！~~）
- QQ邮箱：51729575@qq.com

您可以将相关材料写成一份word文档发给维护者并告知需求，维护者收到后会第一时间添加~

如果您会使用 `Markdown` 写作，并知道如何使用 `git`，欢迎直接在 [GitHub 仓库](https://github.com/whudays/whudays.github.io) 提 PR。请仔细阅读`README`，若您的PR不符合要求将不予通过。

## 贡献者

感谢所有为站点提供资料和支持的朋友们！

### 协史群

> 2023学年第一学期学期将要结束的时候，喵少、店长等你协已经毕业的元老启动了新的协史修订计划，旨在更新百度百科等地有公共资料的协史，但因为百度百科新的无厘头的审核条件（~~本来就是我们才知道的资料非要求引用出处，活该百度药丸~~），导致此项工作停滞  
> 2024学年第二学期将要结束的时候，该站点建立。此群重新启用，该群也成为本项目考据你协前期历史的重要信源

以下为协史群中贡献者名单：

<VPTeamMembers size="small" :members="group" />

### 其他资料提供者

部门/小群资料贡献者名单：

<VPTeamMembers size="small" :members="external" />
