# 英灵殿

历任社团干部。~~赛博墓碑~~

::: warning 警告
- 2015学年-2021学年头像为2025.05.29从QQ采集（感谢`铜鼓`QAQ）
- 由于站点维护者是23届的小登，所以肯定会有遗漏...
- 如果您想补充/更换头像或是任何其他信息，欢迎联系[维护者](/maintainer/)（发邮件/加好友都行！），如果各位老大能补充的话我什么都会做的！！！（~~你不跟我联系的话我也不知道怎么补充...~~）
- `>_<`
:::

<script setup>
import { VPTeamMembers } from 'vitepress/theme'

const hq_2025 = [{ avatar: '/about/hq/2025/avatar.jpg', name: '2025HQ', title: '2025.6-2026.6', sponsor:'/about/hq/2025', actionText:'详情页' }]
const hq_2024 = [{ avatar: '/about/hq/2024/avatar.png', name: '2024HQ', title: '2024.6-2025.6', sponsor:'/about/hq/2024', actionText:'详情页' }]
const hq_2023 = [{ avatar: '/about/hq/2023/avatar.png', name: '2023HQ', title: '2023.6-2024.6', sponsor:'/about/hq/2023', actionText:'详情页' }]
const hq = (year) => {
  const nextYear = year + 1;
return [{ avatar: '/about/hq/avatar.png',name: `${year}HQ`, title: `${year}.6-${nextYear}.6`, sponsor:`/about/hq/${year}`, actionText:'详情页' }];
}
</script>

## 2025学年

<center>
  <VPTeamMembers size="small" :members="hq_2025" />
</center>

## 2024学年

<center>
  <VPTeamMembers size="small" :members="hq_2024" />
</center>

## 2023学年

<center>
  <VPTeamMembers size="small" :members="hq_2023" />
</center>

## 2022学年

<center>
  <VPTeamMembers size="small" :members="hq(2022)" />
</center>

## 2021学年

<center>
  <VPTeamMembers size="small" :members="hq(2021)" />
</center>

## 2020学年

<center>
  <VPTeamMembers size="small" :members="hq(2020)" />
</center>

## 2019学年

<center>
  <VPTeamMembers size="small" :members="hq(2019)" />
</center>

## 2018学年

<center>
  <VPTeamMembers size="small" :members="hq(2018)" />
</center>

## 2017学年

<center>
  <VPTeamMembers size="small" :members="hq(2017)" />
</center>

## 2016学年

<center>
  <VPTeamMembers size="small" :members="hq(2016)" />
</center>

## 2015学年

<center>
  <VPTeamMembers size="small" :members="hq(2015)" />
</center>

## 2014学年

<center>
  <VPTeamMembers size="small" :members="hq(2014)" />
</center>

## 2013学年

<center>
  <VPTeamMembers size="small" :members="hq(2013)" />
</center>
## 2012学年

<center>
  <VPTeamMembers size="small" :members="hq(2012)" />
</center>

## 2011学年

<center>
  <VPTeamMembers size="small" :members="hq(2011)" />
</center>

## 2010学年

<center>
  <VPTeamMembers size="small" :members="hq(2010)" />
</center>

## 2009学年

<center>
  <VPTeamMembers size="small" :members="hq(2009)" />
</center>