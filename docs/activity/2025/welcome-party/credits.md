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

const coreStaff = [
  memberOf('-QuQ-', { title: '策划/场地/录播剪辑', desc:'阿巴阿巴 (º﹃º) ，，，' }),
  memberOf('九尾晨', { title: '晚会主催', desc:'谁是九尾晨？' }),
  memberOf('化纤咲', { title: '随舞主办', desc:'LOFTER关注密教小祥谢谢喵！' }),
  memberOf('花桑', { title: '设备租赁', desc:'迎新演出塔~诺~西~！设备调试苦~露~西！' }),
  memberOf('霂霜', { title: '背投制作/放映', desc:'陌影雨巷，瑶洁霂霜' }),
  memberOf('四角五十分', { title: '摄影', desc:'α99ii：创造新时代的不会是老人' }),
  memberOf('想吃海鲜', { title: '摄影', desc:'想吃石斑鱼金鲳鱼海鲈鱼花蟹沙白蛤蜊生蚝基围虾九节虾大虾龙虾' }),
  memberOf('白夜', { title: '摄影' }),
];

const divisionPresenters = [
  memberOf('-QuQ-', { title: '社团介绍', desc:'我为什么会在这里，，，' }),
  memberOf('九尾晨', { title: '演音部', desc:'到底谁是九尾晨？' }),
  memberOf('鸭鸭鸭', { title: '编辑部', desc:'我从来没有觉得加入漫协开心过（bushi）' }),
  memberOf('垂杨', { title: 'COS 部', desc:'₍˄·͈༝·͈˄*₎◞ ̑̑' }),
  memberOf('谛霞', { title: 'WOTA艺部', desc:'请关注b站幻光Lucas谢谢喵' }),
  memberOf('花桑', { title: '夏樱乐团', desc:'一生、バンドしてくれる？' }),
  memberOf('利洛', { title: '暗部/东方群' }),
  memberOf('二氧化碳', { title: '术群', desc:'关注武大术群谢谢喵，灌注武大术群谢谢喵' }),
]

const performers = [
  memberOf('多米诺骨牌', { title: '主持人', desc:'感谢各位' }),
  memberOf('Yun_me', { title: '主持人', desc:'我想组一辈子漫协o(*≧▽≦)ツ' }),
  memberOf('九尾晨', { title: '天天天国地獄国', desc:'我不是九尾晨' }),
  memberOf('艾其', { title: '天天天国地獄国', desc:'喵的这辈子再也不唱跳了' }),
  memberOf('-QuQ-', { title: '弱虫モンブラン (Reloaded)', desc:'あたしはまだ弱虫モンブランだったみたいだ' }),
  memberOf('梨紫', { title: 'ハレ晴レユカイ、アイカツ活動+Diamond Happy', desc:'和大家一起玩真是太开心啦！' }),
  memberOf('小白', { title: 'ハレ晴レユカイ' }),
  memberOf('伊伊', { title: 'Eclipse', desc:'已完成今日博普大学习（1/1）' }),
  memberOf('才子', { title: '两翼のbrilliance', desc:'re0第四季啥时候播啊啊啊啊啊啊啊啊' }),
  memberOf('红温', { title: 'アイカツ活動+Diamond Happy' }),
  memberOf('椿雪', { title: '神女劈观', desc:'我唱歌再也不跟不上节奏了太尬了呜呜呜呜呜呜呜呜呜呜呜呜' }),
  memberOf('竹杖化龙', { title: '怪物', desc:'不为所动，做更专业的自己 （）' }),
  memberOf('极夜晓月君', { title: '届かない恋', desc:'组一辈子漫协吧！偶内该，哇达西！' }),
  memberOf('辂木', { title: '夏樱乐团管弦组 · 长笛', desc:'吹奏乐手摩多摩多' }),
  memberOf('滑瓢', { title: '夏樱乐团管弦组 · 小号', desc:'玩的开心嗬' }),
  memberOf('Animnia', { title: '夏樱乐团管弦组 · 萨克斯', desc:'温暖' }),
  memberOf('towa', { title: '蓝汐 · 贝斯', desc:'我是蠢狗，加强刻晴' }),
  memberOf('miu', { title: '蓝汐 · 吉他', desc:'喵，喵，喵喵喵，喵喵喵喵，喵喵' }),
  memberOf('izumi', { title: '蓝汐 · 主唱&节奏吉他', desc:'不玩赛马娘' }),
  memberOf('Inexistent√7', { title: '蓝汐 · 键盘', desc:'少打舞萌多读书）' }),
  memberOf('花桑', { title: '蓝汐 · 鼓手', desc:'一生、バンドしてくれる？' }),
  memberOf('艾其', { title: 'void · 主唱', desc:'你是谁，快来支持void' }),
  memberOf('wing', { title: 'void · 鼓手', desc:'我好菜啊我要加练' }),
  memberOf('吐司炸弹', { title: 'void · 贝斯', desc:'我将使用威龙利用8tick服务器狠狠的冲刺到你脸上然后把7.62*51 M61塞进你的嘴里' }),
  memberOf('麦恩莉', { title: 'void · 吉他', desc:'音乐是记忆的载体' }),
  memberOf('horsen🐮', { title: 'void · 键盘', desc:'我再也不要女装去男寝了' }),
  memberOf('灰灰', { title: 'void · 支援吉他', desc:'燃尽了' }),
  memberOf('夏洛', { title: '萤火虫算法 · 吉他', desc:'希望以后会越来越好' }),
  memberOf('纱夜天仪', { title: '萤火虫算法 · 鼓手', desc:'キラキラキラ きらめいていてよ' }),
  memberOf('daki', { title: '萤火虫算法 · 主唱', desc:'喵' }),
  memberOf('勿严', { title: '萤火虫算法 · 贝斯', desc:'其实我也没有上过学……' }),
  memberOf('狸雨', { title: '萤火虫算法 · 吉他', desc:'你说得对' }),
  memberOf('茂桑', { title: '夜桜 · 吉他' }),
  memberOf('烛木', { title: '夜桜 · 贝斯' }),
  memberOf('纱橙靈', { title: '夜桜 · 鼓手', desc:'饿了' }),
  memberOf('剑语', { title: '夜桜 · 键盘', desc:'广告位招租' }),
  memberOf('桃沢紗奈子', { title: '夜桜 · 主唱', desc:'萌え萌え～૮(˶ᵔ ᵕ ᵔ˶)ა' }),
  memberOf('clover', { title: '夜桜 · 吉他', desc:'这里是乐队主理人' }),
  memberOf('伊伊', { title: '夜桜 · 主唱', desc:'你是谁？请支持夜桜乐队！' }),
]

const eventStaff = [
  memberOf('wweiyi', { desc:'这样的迎新晚会再来一打' }),
  memberOf('涅普智可', { desc:'老东西复活了（x）' }),
  memberOf('社会主义接班人', { desc:'我想吃掉魔方的土豆😋' }),
  memberOf('凪行', { desc:'「哇，还有名留协史（那就，一生、漫协やろう」' }),
  memberOf('Yun_me', { desc:'我要当QuQ粉丝后援会会长，总有一天所有人都会爱上QuQ的！' }),
  memberOf('萝苇萁', { desc:'盐鸠牲老登，摄影师新手，刷新概率低，喜欢拍唐照，有空就来van♂' }),
  memberOf('伴夏', { desc:'喵~' }),
  memberOf('残长', { desc:'switch2新作快出' }),
]

</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>2025迎新</template>
    <template #lead>2025.9.27</template>
  </VPTeamPageTitle>

  <VPTeamPageSection>
    <template #title>核心团队</template>
    <template #members>
      <VPTeamMembers size="small" :members="coreStaff" />
    </template>
  </VPTeamPageSection>

  <VPTeamPageSection>
    <template #title>社团/部门/小群介绍</template>
    <template #members>
      <VPTeamMembers size="small" :members="divisionPresenters" />
    </template>
  </VPTeamPageSection>

  <VPTeamPageSection>
    <template #title>晚会参演</template>
    <template #members>
      <VPTeamMembers size="small" :members="performers" />
    </template>
  </VPTeamPageSection>

  <VPTeamPageSection>
    <template #title>暗部STAFF</template>
    <template #members>
      <VPTeamMembers size="small" :members="eventStaff" />
    </template>
  </VPTeamPageSection>

</VPTeamPage>
