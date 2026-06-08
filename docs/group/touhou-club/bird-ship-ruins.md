---
layout: page
gitChangelog: false
---

<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers,
  VPTeamPageSection
} from 'vitepress/theme'

import { memberOf, QQGroup } from '/.vitepress/data/people.js'

const mainGroupAvatar = QQGroup('310619080')
const tsukimiGroupAvatar = QQGroup('1047043631')
const saigyoujiGroupAvatar = QQGroup('891795171')

const mainAdmins = [
  memberOf('红马尾'),
  memberOf('彼方'),
  memberOf('椿梦栀结'),
  memberOf('大小姐的⑨'),
  memberOf('魔理沙的扫把'),
  memberOf('南瓜牛奶麻鼠'),
  memberOf('Shadow'),
  memberOf('天边壹颗星'),
  memberOf('幽沐'),
  memberOf('利洛'),
];

const tsukimiAdmins = [
  memberOf('利洛'),
  memberOf('椿梦栀结'),
  memberOf('Animnia'),
  memberOf('长野原大介'),
  memberOf('旧水'),
  memberOf('天一'),
];

const saigyoujiStaff = [
  memberOf('Check Maid'),
  memberOf('利洛'),
  memberOf('椿梦栀结'),
  memberOf('Animnia'),
  memberOf('45450721'),
  memberOf('长野原大介'),
  memberOf('旧水'),
  memberOf('天一'),
  memberOf('笺染阡素'),
  memberOf('MangLF'),
  memberOf('末陌'),
  memberOf('寂寞嫦娥舒广袖'),
  memberOf('喵喵喵'),
  memberOf('Quank'),
  memberOf('天边壹颗星'),
  memberOf('二酸化碳素'),
  memberOf('吃药图书'),
  memberOf('卒子'),
];
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>鸟船遗迹</template>
    <template #lead>
      这里记载着截至目前 WHUDAYS Touhou Club 正式群聊及同人社团的全部工作人员，感谢所有人的辛勤付出。
    </template>
  </VPTeamPageTitle>

  <VPTeamPageSection>
    <template #title>主群管理</template>
    <template #lead>
      <div style="display:flex;align-items:center;justify-content:center;gap:0.5rem;">
        <img :src="mainGroupAvatar" alt="WHUDAYS Touhou Club" style="width:64px;height:64px;border-radius:50%;" />
        <span>WHUDAYS Touhou Club</span>
      </div>
    </template>
    <template #members>
      <VPTeamMembers size="small" :members="mainAdmins" />
    </template>
  </VPTeamPageSection>

  <VPTeamPageSection>
    <template #title>秘月集 管理</template>
    <template #lead>
      <div style="display:flex;align-items:center;justify-content:center;gap:0.5rem;">
        <img :src="tsukimiGroupAvatar" alt="秘月集" style="width:64px;height:64px;border-radius:50%;" />
        <span>WHUDAYS-东方club-秘月集</span>
      </div>
    </template>
    <template #members>
      <VPTeamMembers size="small" :members="tsukimiAdmins" />
    </template>
  </VPTeamPageSection>

  <VPTeamPageSection>
    <template #title>西行妖储备养料 Staff</template>
    <template #lead>
      <div style="display:flex;align-items:center;justify-content:center;gap:0.5rem;">
        <img :src="saigyoujiGroupAvatar" alt="西行妖储备养料" style="width:64px;height:64px;border-radius:50%;" />
        <span>西行妖储备养料-Staff Only</span>
      </div>
    </template>
    <template #members>
      <VPTeamMembers size="small" :members="saigyoujiStaff" />
    </template>
  </VPTeamPageSection>
</VPTeamPage>
