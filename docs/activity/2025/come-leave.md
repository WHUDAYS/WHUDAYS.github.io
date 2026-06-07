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

import { memberOf } from '/.vitepress/data/people.js'

const coordinators = [
  memberOf('澪原初华', { title: '统筹' }),
  memberOf('灰灰', { title: '统筹' }),
  memberOf('wweiyi', { title: '统筹' }),
]

const storyboard = [
  memberOf('澪原初华', { title: '分镜脚本' }),
]

const vocalists = [
  memberOf('沙拉', { title: '演唱' }),
  memberOf('澪原初华', { title: '演唱' }),
]

const performers = [
  memberOf('Suika', { title: '出镜' }),
  memberOf('wing', { title: '出镜' }),
  memberOf('龙井', { title: '出镜' }),
  memberOf('xmtx', { title: '出镜' }),
  memberOf('Izumi', { title: '出镜' }),
  memberOf('乌冬', { title: '出镜' }),
  memberOf('九尾晨', { title: '出镜' }),
]

const recording = [
  memberOf('梁沫寒', { title: '录音' }),
  memberOf('lrx', { title: '录音' }),
]

const photographers = [
  memberOf('陈田翔', { title: '摄影' }),
]
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>B站毕业歌《我们都很棒》全国高校版</template>
    <template #lead>参与人员名单</template>
  </VPTeamPageTitle>

  <VPTeamPageSection>
    <template #title>统筹</template>
    <template #members>
      <VPTeamMembers size="small" :members="coordinators" />
    </template>
  </VPTeamPageSection>

  <VPTeamPageSection>
    <template #title>分镜脚本</template>
    <template #members>
      <VPTeamMembers size="small" :members="storyboard" />
    </template>
  </VPTeamPageSection>

  <VPTeamPageSection>
    <template #title>演唱</template>
    <template #members>
      <VPTeamMembers size="small" :members="vocalists" />
    </template>
  </VPTeamPageSection>

  <VPTeamPageSection>
    <template #title>出镜</template>
    <template #members>
      <VPTeamMembers size="small" :members="performers" />
    </template>
  </VPTeamPageSection>

  <VPTeamPageSection>
    <template #title>录音</template>
    <template #members>
      <VPTeamMembers size="small" :members="recording" />
    </template>
  </VPTeamPageSection>

  <VPTeamPageSection>
    <template #title>摄影</template>
    <template #members>
      <VPTeamMembers size="small" :members="photographers" />
    </template>
  </VPTeamPageSection>

  <VPTeamPageSection>
    <template #title>特别鸣谢</template>
  </VPTeamPageSection>

  <div style="text-align: center; margin-top: 20px;">
    <p>武汉大学融媒体中心学生记者团</p>
    <p>武汉大学动漫协会</p>
  </div>
</VPTeamPage>
