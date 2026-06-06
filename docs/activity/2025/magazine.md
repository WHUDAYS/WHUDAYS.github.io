# 社刊《樱次元》2025年9月号

<script setup>
import {
  VPTeamPageSection,
  VPTeamMembers
} from 'vitepress/theme';

import { memberOf } from '/.vitepress/data/people.js'

const staff = [
  memberOf('鸭鸭鸭', { title: '封面图绘制 & 排版 · 社团活动/编辑部企划', desc:'我已经完全学会了设计.jpg' }),
  memberOf('里珂', { title: '排版 · cos部投稿', desc:'打毛厂要被毛厂打哭QAQ' }),
  memberOf('流澜', { title: '排版 · 编辑部文手投稿', desc:'立祖宗之法：下辈子绝不再写文' }),
  memberOf('Biophilia', { title: '排版 · 编辑部画手投稿', desc:'小萨，你是不是就在这个时候倒霉的？' }),
  memberOf('-QuQ-', { title: '催命的', desc:'怎么哪都有你' }),
]
</script>

本学年社刊自`2025/6/23`开始征稿，`2025/9/17`完成制作。共53页。

封面图：

![](/activity/2025/magazine/cover.png)

## 社刊制作人员

<div style="display:none">

- 鸭鸭鸭
- Biophilia
- 流澜
- 里珂
- -QuQ-

</div>


<VPTeamMembers size="small" :members="staff" />
