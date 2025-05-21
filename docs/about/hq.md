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

const hqLeaders = [
	{
    avatar: '/2024/nyako.jpeg',
    name: '茂桑',
    title: '社长',
	},
	{
    avatar: '/avatar.png',
    name: '纱月Satsuki',
    title: '指导老师',
	},
]

const hqMembers = [
  {
    avatar: '/2024/quq.jpeg',
    name: '-QuQ-',
    title: '演音部部长',
    links: [
      { icon: 'github', link: 'https://github.com/shenxianovo' },
    ]
  },
  {
    avatar: '/2024/huihui.jpeg',
    name: '灰灰',
    title: '夏樱乐团团长',
  },
  {
    avatar: '/2024/storm.jpeg',
    name: 'storm',
    title: '暗部部长',
  },
  {
    avatar: '/2024/wweiyi.jpeg',
    name: 'wweiyi',
    title: '暗部外联组组长',
  },
  {
    avatar: '/2024/chiya.jpeg',
    name: '风又千夜',
    title: '暗部秘书组组长',
  },
  {
    avatar: '/avatar.png',
    name: 'YY',
    title: 'cos部部长',
  },
  {
    avatar: '/2024/elenia.jpeg',
    name: '埃兰伊亚-Elenia',
    title: 'cos部副部长',
  },
  {
    avatar: '/2024/shuzhi.jpeg',
    name: '树枝',
    title: '编辑部部长',
  },
  {
    avatar: '/2024/siguaduntang.jpeg',
    name: '丝瓜炖汤',
    title: '编辑部美编',
  },
  {
    avatar: '/2024/sigal.jpeg',
    name: '西加尔',
    title: '演音部歌姬组组长',
  },
  {
    avatar: '/2024/scapino.jpeg',
    name: 'scapino',
    title: '演音部配音组组长',
  },
  {
    avatar: '/avatar.png',
    name: '阳',
    title: '夏樱组组长',
  },
]
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>2024HQ</template>
    <template #lead>2024-2025学年社团干部</template>
  </VPTeamPageTitle>
  <VPTeamMembers size="medium" :members="hqLeaders" />
  <VPTeamPageSection>
    <template #title>2024HQ成员</template>
    <!-- <template #lead>这是一段文字</template> -->
    <template #members>
      <VPTeamMembers size="small" :members="hqMembers" />
    </template>
  </VPTeamPageSection>
</VPTeamPage>