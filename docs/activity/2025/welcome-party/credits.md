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

function qq(uin, size = 640) {
  return `https://q1.qlogo.cn/g?b=qq&nk=${uin}&s=${size}`
}

const staff = [
  { avatar: '/about/hq/2024/-QuQ-.jpeg', name: '-QuQ-', title: '策划/场地/录播剪辑', desc:'阿巴阿巴，，，' },
  { avatar: qq('1540104836'), name: '九尾晨', title: '晚会主催', desc:'谁是九尾晨？' },
  { avatar: qq('970088006'), name: '化纤咲', title: '随舞主办', desc:'LOFTER关注密教小祥谢谢喵！' },
  { avatar: qq('3330567554'), name: '花桑', title: '设备租赁', desc:'迎新演出塔~诺~西~！设备调试苦~露~西！' },
  { avatar: qq('1079056948'), name: '霂霜', title: '背投制作/放映', desc:'陌影雨巷，瑶洁霂霜' },
  { avatar: qq('3541769752'), name: '四角五十分', title: '摄影', desc:'α99ii：创造新时代的不会是老人' },
  { avatar: qq('2629107663'), name: '想吃海鲜', title: '摄影', desc:'想吃石斑鱼金鲳鱼海鲈鱼花蟹沙白蛤蜊生蚝基围虾九节虾大虾龙虾' },
  { avatar: qq('3356940959'), name: '白夜', title: '摄影' },
];

const divisions = [
  { avatar: '/about/hq/2024/-QuQ-.jpeg', name: '-QuQ-', title: '社团介绍', desc:'我为什么会在这里，，，' },
  { avatar: qq('1540104836'), name: '九尾晨', title: '演音部', desc:'到底谁是九尾晨？' },
  { avatar: qq('7613753'), name: '鸭鸭鸭', title: '编辑部', desc:'我从来没有觉得加入漫协开心过（bushi）' },
  { avatar: qq('1557019243'), name: '垂杨', title: 'COS 部', desc:'₍˄·͈༝·͈˄*₎◞ ̑̑' },
  { avatar: qq('3237452706'), name: '谛霞', title: 'WOTA艺部', desc:'请关注b站幻光Lucas谢谢喵' },
  { avatar: qq('3330567554'), name: '花桑', title: '夏樱乐团', desc:'一生、バンドしてくれる？' },
  { avatar: qq('1416439811'), name: '利洛', title: '暗部/东方群' },
  { avatar: '/activity/2025/welcome-party/二氧化碳.jpg', name: '二氧化碳', title: '术群', desc:'关注武大术群谢谢喵，灌注武大术群谢谢喵' },
]

const actor = [
	{ avatar: '/about/hq/avatar.png', name: '多米诺骨牌', title: '主持人', desc:'感谢各位' },
	{ avatar: qq('936455961'), name: 'Yun_me', title: '主持人', desc:'我想组一辈子漫协o(*≧▽≦)ツ' },
	{ avatar: qq('1540104836'), name: '九尾晨', title: '天天天国地獄国', desc:'我不是九尾晨' },
	{ avatar: qq('3551088713'), name: '艾其', title: '天天天国地獄国', desc:'喵的这辈子再也不唱跳了' },
	{ avatar: '/about/hq/2024/-QuQ-.jpeg', name: '-QuQ-', title: '弱虫モンブラン (Reloaded)', desc:'あたしはまだ弱虫モンブランだったみたいだ' },
	{ avatar: '/activity/2025/welcome-party/梨紫.png', name: '梨紫', title: 'ハレ晴レユカイ、アイカツ活動+Diamond Happy', desc:'和大家一起玩真是太开心啦！' },
	{ avatar: '/about/hq/avatar.png', name: '小白', title: 'ハレ晴レユカイ' },
	{ avatar: qq('1064310442'), name: '伊伊', title: 'Eclipse', desc:'已完成今日博普大学习（1/1）' },
	{ avatar: qq('1282063020'), name: '才子', title: '两翼のbrilliance', desc:'re0第四季啥时候播啊啊啊啊啊啊啊啊' },
	{ avatar: '/about/hq/avatar.png', name: '红温', title: 'アイカツ活動+Diamond Happy' },
	{ avatar: '/activity/2025/welcome-party/椿雪.jpeg', name: '椿雪', title: '神女劈观', desc:'我唱歌再也不跟不上节奏了太尬了呜呜呜呜呜呜呜呜呜呜呜呜' },
	{ avatar: qq('3139267329'), name: '竹杖化龙', title: '怪物', desc:'不为所动，做更专业的自己 （）' },
	{ avatar: qq('2186387030'), name: '极夜晓月君', title: '届かない恋', desc:'组一辈子漫协吧！偶内该，哇达西！' },
	{ avatar: '/activity/2025/welcome-party/towa.jpeg', name: 'towa', title: '蓝汐 · 贝斯', desc:'' },
	{ avatar: qq('3307487273'), name: 'miu', title: '蓝汐 · 吉他' },
	{ avatar: qq('3421285702'), name: 'izumi', title: '蓝汐 · 主唱&节奏吉他' },
	{ avatar: qq('1558570957'), name: 'Inexistent√7', title: '蓝汐 · 键盘' },
	{ avatar: qq('3330567554'), name: '花桑', title: '蓝汐 · 鼓手', desc:'一生、バンドしてくれる？' },
	{ avatar: qq('3551088713'), name: '艾其', title: 'void · 主唱', desc:'你是谁，快来支持void' },
	{ avatar: qq('1147869087'), name: 'wing', title: 'void · 鼓手', desc:'我好菜啊我要加练' },
	{ avatar: qq('1337921275'), name: '吐司炸弹', title: 'void · 贝斯', desc:'我将使用威龙利用8tick服务器狠狠的冲刺到你脸上然后把7.62*51 M61塞进你的嘴里' },
	{ avatar: qq('1683383969'), name: '麦恩莉', title: 'void · 吉他', desc:'音乐是记忆的载体' },
	{ avatar: qq('3463550668'), name: 'horsen🐮', title: 'void · 键盘', desc:'我再也不要女装去男寝了' },
	{ avatar: '/about/hq/2024/灰灰.jpeg', name: '灰灰', title: 'void · 支援吉他', desc:'燃尽了' },
	{ avatar: qq('2634161337'), name: '夏洛', title: '萤火虫算法 · 吉他', desc:'希望以后会越来越好'},
	{ avatar: qq('2889100147'), name: '纱夜天仪', title: '萤火虫算法 · 鼓手', desc:'キラキラキラ きらめいていてよ'},
	{ avatar: qq('3357148314'), name: '纱夜天仪', title: '萤火虫算法 · 主唱', desc:'喵'},
	{ avatar: qq('3066816169'), name: '勿严', title: '萤火虫算法 · 贝斯', desc:'其实我也没有上过学……'},
	{ avatar: qq('2665083348'), name: '狸雨', title: '萤火虫算法 · 吉他', desc:'你说得对'},
	{ avatar: qq('1587692733'), name: '茂桑', title: '夜桜 · 吉他' },
	{ avatar: qq('26158277'), name: '烛木', title: '夜桜 · 贝斯'},
	{ avatar: '/activity/2025/welcome-party/纱橙靈.jpeg', name: '纱橙靈', title: '夜桜 · 鼓手', desc:'饿了'},
	{ avatar: qq('3012766646'), name: '剑语', title: '夜桜 · 键盘', desc:'广告位招租'},
	{ avatar: qq('2928433543'), name: '桃沢紗奈子', title: '夜桜 · 主唱', desc:'萌え萌え～૮(˶ᵔ ᵕ ᵔ˶)ა'},
	{ avatar: qq('2317312342'), name: 'clover', title: '夜桜 · 吉他', desc:'这里是乐队主理人'},
	{ avatar: qq('1064310442'), name: '伊伊', title: '夜桜 · 主唱', desc:'你是谁？请支持夜桜乐队！'},
]

</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>2025迎新</template>
    <template #lead>2025.9.27</template>
  </VPTeamPageTitle>

  <VPTeamPageSection>
    <template #title>活动STAFF</template>
    <template #members>
      <VPTeamMembers size="small" :members="staff" />
    </template>
  </VPTeamPageSection>

  <VPTeamPageSection>
    <template #title>社团/部门/小群介绍</template>
    <template #members>
      <VPTeamMembers size="small" :members="divisions" />
    </template>
  </VPTeamPageSection>

  <VPTeamPageSection>
    <template #title>晚会参演</template>
    <template #members>
      <VPTeamMembers size="small" :members="actor" />
    </template>
  </VPTeamPageSection>

</VPTeamPage>