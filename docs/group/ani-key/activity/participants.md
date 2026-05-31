---
title: 番键会 · 活动名册
layout: page
---
<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamPageSection,
  VPTeamMembers
} from 'vitepress/theme'
// 头像走 QQ 实时头像：填上 qq 号即可，会自动取对应头像。
// 没填 qq 时用占位图。昵称（name）请手动填写。
const ph = '/group/ani-key/participants/_placeholder.svg'
const qqAvatar = (uin) =>
  uin ? `https://q.qlogo.cn/headimg_dl?dst_uin=${uin}&spec=640&img_type=jpg` : ph
// 优先使用自定义 avatar（没有 QQ 的成员），否则取 QQ 实时头像。
const build = (list) => list.map((m) => ({ ...m, avatar: m.avatar || qqAvatar(m.qq) }))

// 用法示例： { qq: '2844938982', name: 'wweiyi', title: '线下' }

// 十月新番闲聊（2025-11-15）
const oct2025 = build([
  { qq: '2844938982', name: 'wweiyi', title: '线下' },
  { qq: '2302369362', name: 'kisso', title: '线下' },
  { qq: '936455961', name: 'Yun_me', title: '线下' },
  { qq: '1426108018', name: '独偶一二里', title: '线下' },
  { qq: '2186387030', name: '桜见胧月', title: '线下' },
  { qq: '2546098498', name: 'Co.vector', title: '线下' },
  { qq: '1312102002', name: 'mana', title: '线下' },
  { qq: '1210807410', name: '电气白兰', title: '线下' },
  { qq: '2804302085', name: '名字普通', title: '线上' },
])

// 暖冬茶会（2025-12-05）
const warmWinter2025 = build([
  { qq: '849304059', name: '消散的灵魂', title: '线上' },
  { qq: '1592160393', name: '壹個', title: '线上' },
  { qq: '2186387030', name: '桜见胧月', title: '线上' },
  { qq: '1459083009', name: '鸿珏', title: '线上' },
  { qq: '2844938982', name: 'wweiyi', title: '线下' },
  { qq: '896181439', name: '我永远喜欢Aozaki Aoko', title: '线下' },
  { qq: '1426108018', name: '独偶一二里', title: '线下' },
  { qq: '319326946', name: '忆阳', title: '线下' },
  { qq: '2546098498', name: 'Co.vector', title: '线下' },
  { qq: '2804302085', name: '名字普通', title: '线下' },
  { qq: '2047126002', name: '瑠昼', title: '线下' },
  { qq: '2431319130', name: '夜霁', title: '线下' },
  { qq: '1210807410', name: '电气白兰', title: '线下' },
  { qq: '1304739403', name: '意于彳亍', title: '线下' },
  { qq: '936455961', name: 'Yun_me', title: '线下' },
  { qq: '1312102002', name: 'mana', title: '线下' },
  { qq: '2302369362', name: 'kisso', title: '线下' },
  { qq: '2228319054', name: '长野原大介', title: '线下' },
  { qq: '172747698', name: '樱岛麻衣', title: '线下' },
  { qq: '2875654849', name: 'Darkream', title: '线下' },
])

// 一月新番闲聊（2026-03-14）
const jan2026 = build([
  { qq: '2228319054', name: '长野原大介', title: '线上' },
  { qq: '2804302085', name: '名字普通', title: '线上' },
  { qq: '1459083009', name: '鸿珏', title: '线上' },
  { qq: '1312102002', name: 'mana', title: '线下' },
  { qq: '2186387030', name: '桜见胧月', title: '线下' },
  { qq: '3205001405', name: '三玖天下第一', title: '线下' },
  { qq: '640015087', name: '北风', title: '线下' },
  { qq: '2844938982', name: 'wweiyi', title: '线下' },
  { qq: '936455961', name: 'Yun_me', title: '线下' },
  { qq: '1426108018', name: '独偶一二里', title: '线下' },
  { qq: '2047126002', name: '瑠昼', title: '线下' },
  { qq: '1210807410', name: '电气白兰', title: '线下' },
])

// 四月新番大吐槽（2026-05-31）
const apr2026 = build([
  { qq: '2804302085', name: '名字普通', title: '线上' },
  { qq: '', name: 'yihu', title: '线上', avatar: '/group/ani-key/participants/yihu.jpg' },
  { qq: '1459083009', name: '鸿珏', title: '线上' },
  { qq: '1965973734', name: '来者可追', title: '线下' },
  { qq: '2228319054', name: '长野原大介', title: '线下' },
  { qq: '1426108018', name: '独偶一二里', title: '线下' },
  { qq: '3205001405', name: '三玖天下第一', title: '线下' },
  { qq: '936455961', name: 'Yun_me', title: '线下' },
  { qq: '1371961320', name: '雨玉', title: '线下' },
  { qq: '1812535501', name: 'mito', title: '线下' },
  { qq: '1210807410', name: '电气白兰', title: '线下' },
  { qq: '2186387030', name: '桜见胧月', title: '线下' },
  { qq: '640015087', name: '北风', title: '线下' },
  { qq: '2844938982', name: 'wweiyi', title: '线下' },
  { qq: '2047126002', name: '瑠昼', title: '线下' },
])
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>活动名册</template>
    <template #lead>每次番键会活动到场的同好们。头像取自 QQ 实时头像。</template>
  </VPTeamPageTitle>

  <VPTeamPageSection>
    <template #title>十月新番闲聊</template>
    <template #lead>2025-11-15 · 信息学部青楼</template>
    <template #members>
      <VPTeamMembers size="small" :members="oct2025" />
    </template>
  </VPTeamPageSection>

  <VPTeamPageSection>
    <template #title>暖冬茶会</template>
    <template #lead>2025-12-05 · 会议室</template>
    <template #members>
      <VPTeamMembers size="small" :members="warmWinter2025" />
    </template>
  </VPTeamPageSection>

  <VPTeamPageSection>
    <template #title>一月新番闲聊</template>
    <template #lead>2026-03-14 · 会议室</template>
    <template #members>
      <VPTeamMembers size="small" :members="jan2026" />
    </template>
  </VPTeamPageSection>

  <VPTeamPageSection>
    <template #title>四月新番大吐槽</template>
    <template #lead>2026-05-31 · 会议室</template>
    <template #members>
      <VPTeamMembers size="small" :members="apr2026" />
    </template>
  </VPTeamPageSection>
</VPTeamPage>

<!-- 标记元素：插件会把「页面历史」(NolebaseGitChangelog) 追加到本页末尾，
     这里用本页独有的标记 + 兄弟选择器，只在本页隐藏它，不影响其它页面。 -->
<div class="ak-no-changelog"></div>

<style>
.ak-no-changelog{ display:none; }
.ak-no-changelog ~ h2,
.ak-no-changelog ~ div{ display:none !important; }
</style>
