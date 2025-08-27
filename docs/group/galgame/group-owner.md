---
layout: page
---
<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers,
  VPTeamPageSection
} from 'vitepress/theme'

const groupOwners = [
  { avatar: '/group/galgame/group-owner/黑羽仙洛.png', name: '黑羽仙洛' },
  { avatar: '/group/galgame/group-owner/Atelier Recittal.png', name: 'Atelier Recittal' },
  { avatar: '/group/galgame/group-owner/天凉好个秋.png', name: '天凉好个秋' },
  { avatar: '/group/galgame/group-owner/zeit.png', name: 'zeit' },
  { avatar: '/group/galgame/group-owner/Darkream.png', name: 'Darkream' },
];
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>英灵殿</template>
  </VPTeamPageTitle>
  <VPTeamMembers size="small" :members="groupOwners" />
</VPTeamPage>