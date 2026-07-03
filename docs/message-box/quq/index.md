# -QuQ-

<script setup>
  import * as icons from '/.vitepress/theme/icons.js';
import { VPTeamMembers } from 'vitepress/theme'
import { memberOf } from '/.vitepress/data/people.js'

const quq = [
  memberOf('-QuQ-', {
    links: [
      { icon: 'github', link: 'https://github.com/shenxianovo' },
      { icon: { svg: icons.bilibili }, link:'https://space.bilibili.com/446305918' },
      { icon: { svg: icons.blog }, link:'https://shenxianovo.com' },
    ],
    desc:'呜啊...',
  }),
]
</script>

<center>
<VPTeamMembers size="small" :members="quq" />
</center>

武大2023级本科生，后面忘了（~~其实是这个人还没写完~~）

不知道写什么...
