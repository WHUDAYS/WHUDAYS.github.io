---
layout: page
gitChangelog: false
---

<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers,
  VPTeamPageSection,
} from 'vitepress/theme'

import { memberOf } from '/.vitepress/data/people.js'

const coordinators = [
  memberOf('澪原初华', { title: '统筹' }),
  memberOf('灰灰', { title: '统筹' }),
  memberOf('wweiyi', { title: '统筹' }),
]

const creators = [
  memberOf('澪原初华', { title: '分镜脚本 / 演唱' }),
  memberOf('沙拉', { title: '演唱' }),
]

const performers = [
  memberOf('瓜', { name: 'Suika', title: '出镜' }),
  memberOf('wing', { title: '出镜' }),
  memberOf('龙井', { title: '出镜' }),
  memberOf('xmtx', { title: '出镜' }),
  memberOf('izumi', { name: 'Izumi', title: '出镜' }),
  memberOf('乌冬', { title: '出镜' }),
  memberOf('九尾晨', { title: '出镜' }),
]

const photographers = [
  memberOf('陈田翔', { title: '摄影' }),
]
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>B站毕业歌《我们都很棒》全国高校版</template>
  </VPTeamPageTitle>

  <div style="max-width: 720px; margin: -12px auto 44px; text-align: center; color: var(--vp-c-text-2); line-height: 1.8;">
    <p>应 B 站音乐区和武汉大学融媒体中心学生记者团邀请，武大漫协部分同学参与拍摄 B 站毕业歌《我们都很棒》全国高校版。</p>
    <p><a href="https://b23.tv/TZXFgK1" target="_blank" rel="noreferrer">视频链接</a></p>
  </div>

  <VPTeamPageSection>
    <template #title>统筹</template>
    <template #members>
      <VPTeamMembers size="small" :members="coordinators" />
    </template>
  </VPTeamPageSection>

  <VPTeamPageSection>
    <template #title>创作与演唱</template>
    <template #members>
      <VPTeamMembers size="small" :members="creators" />
    </template>
  </VPTeamPageSection>

  <VPTeamPageSection>
    <template #title>出镜</template>
    <template #members>
      <VPTeamMembers size="small" :members="performers" />
    </template>
  </VPTeamPageSection>

  <VPTeamPageSection>
    <template #title>摄影</template>
    <template #members>
      <VPTeamMembers size="small" :members="photographers" />
    </template>
  </VPTeamPageSection>

  <div style="max-width: 720px; margin: 20px auto 0; text-align: center; color: var(--vp-c-text-2); line-height: 1.8;">
    <p><strong>录音：</strong>梁沫寒、lrx</p>
  </div>

</VPTeamPage>
