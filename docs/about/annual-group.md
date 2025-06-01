# 历年大群

- 2024：WHUDAYS-春日影
- 2023：WHUDAYS-愛言葉
- 2022：WHUDAYS-虹之咲
- 2021：WHUDAYS-迦勒底
- 2020：WHUDAYS-秀知院
- 2019：WHUDAYS-绯想天
- 2018：WHUDAYS-樱公馆
- 2017：WHUDAYS-卡巴拉生命树
- 2016：WHUDAYS-异世界
- 2015：WHUDAYS-奥德赛圣殿
- 2014：WHUDAYS-世界线
- 2013：WHU-自漫协新世界

<script setup>
import {
  VPTeamPageSection,
  VPTeamMembers
} from 'vitepress/theme';

const annualGroups = [
  { avatar: '/about/annual-group/春日影.png', name: '春日影', title: '2024' },
  { avatar: '/about/annual-group/愛言葉.png', name: '愛言葉', title: '2023' },
  { avatar: '/about/annual-group/虹之咲.png', name: '虹之咲', title: '2022' },
  { avatar: '/about/annual-group/迦勒底.png', name: '迦勒底', title: '2021' },
  { avatar: '/about/annual-group/秀知院.png', name: '秀知院', title: '2020' },
  { avatar: '/about/annual-group/绯想天.png', name: '绯想天', title: '2019' },
  { avatar: '/about/annual-group/樱公馆.png', name: '樱公馆', title: '2018' },
  { avatar: '/about/annual-group/卡巴拉生命树.png', name: '卡巴拉生命树', title: '2017' },
  { avatar: '/about/annual-group/异世界.png', name: '异世界', title: '2016' },
  { avatar: '/about/annual-group/奥德赛圣殿.png', name: '奥德赛圣殿', title: '2015' },
  { avatar: '/about/annual-group/世界线.png', name: '世界线', title: '2014' },
  { avatar: '/about/annual-group/自漫协新世界.png', name: '自漫协新世界', title: '2013' }
];
</script>

<VPTeamPageSection>
  <template #title>历年大群</template>
  <template #members>
    <VPTeamMembers size="small" :members="annualGroups" />
  </template>
</VPTeamPageSection>



