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

const groupOwners = [
  memberOf('黑羽仙洛'),
  memberOf('Atelier Recittal'),
  memberOf('天凉好个秋'),
  memberOf('zeit'),
  memberOf('Darkream'),
];
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>英灵殿</template>
  </VPTeamPageTitle>
  <VPTeamMembers size="small" :members="groupOwners" />
</VPTeamPage>
