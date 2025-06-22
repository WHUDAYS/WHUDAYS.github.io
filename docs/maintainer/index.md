# 站点维护人员

<script setup>
import { VPTeamMembers } from 'vitepress/theme'

const maintainers = [
  { avatar: '/about/hq/2024/-QuQ-.jpeg', name: '-QuQ-', title: '2025-现在', links: [ { icon: 'github', link: 'https://github.com/shenxianovo' } ] },
]

const contributors = [
  { avatar: '/about/hq/2015/喵少.jpg', name: '喵少' },
  { avatar: '/about/hq/2012/店长.jpeg', name: '店长' },
  { avatar: '/about/hq/2012/正面.jpeg', name: '正面' }, 
  { avatar: '/about/hq/2017/铜鼓.jpg', name: '铜鼓' },
  { avatar: '/about/hq/2023/涅普智可.png', name: '涅普智可' },
  { avatar: '/about/hq/2024/-QuQ-.jpeg', name: '-QuQ-' }, // 本条及以上为协史编写群中贡献者
  { avatar: 'https://www.github.com/Animnia.png', name: 'Animnia' }, // 本条及以下为外部贡献者
  { avatar: 'https://www.github.com/xingzelei.png', name: 'INFINITY' },
]

</script>

<VPTeamMembers size="small" :members="maintainers" />

投稿方式：
- QQ私信：51729575
- QQ邮箱：51729575@qq.com

您可以将相关材料写成一份word文档发给维护者并告知需求，维护者收到后会第一时间添加~

如果您会使用 `Markdown` 写作，并知道如何使用 `git`，欢迎直接在 [GitHub 仓库](https://github.com/whudays/whudays.github.io) 提 PR

## 贡献者

<VPTeamMembers size="small" :members="contributors" />
