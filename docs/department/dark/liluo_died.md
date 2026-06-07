<script setup>
import { VPTeamMembers } from 'vitepress/theme'
import { avatarOf, memberOf } from '/.vitepress/data/people.js'

const liluo = [
  memberOf('利洛', { title: '2006-2025',
    desc:'永 远 怀 念'
  }),
]
</script>

# 利洛假死

<center>
  <VPTeamMembers size="small" :members="liluo" />
  <br>
  <b>永远不要忘记2025年10月14日。。。。</b>
</center>

---

<ClientOnly>

<ChatMessage :avatar="avatarOf('Yun_me')" nickname="Yun_me" message="我，一个正在游玩柚子社的死肥宅，接到一个QQ电话称有人突然晕倒，甚至还不知道发生了什么就直冲过去敲开那个宿舍的门，迎接我的是四双带着三分吃惊，三分迷茫，三分害怕，一分属于大学生的清澈的眼睛。我尴尬的展示主页认人，终于找到了正确的地方。然后得到了“人已经死在床上”的信息" position="left"/>

<ChatMessage :avatar="avatarOf('wweiyi')" nickname="wweiyi" message="我，一个正在洗澡的私宅，看到群里称有人晕倒，甚至还不知道发生了什么就立马开始进行联络，迎接我的是一长串的对话以及光是隔着电话就感到尴尬的场景，最后得到了“人已经死在床上”的信息。" position="left"/>

<ChatMessage :avatar="avatarOf('涅普智可')" nickname="涅普智可" message="我，一个正在准备睡觉的死肥宅，看到群里称有人突然晕倒，甚至还不知道发生了什么就在群里等消息，迎接我的是几百条带着三分吃惊，三分迷茫，三分害怕，一分属于大学生的清澈的话语。然后得到了“人已经死在床上”的信息" position="left"/>

</ClientOnly>

---

::: warning 温馨提示
2025学年暗部部长`利洛`当天只是发高烧，并无大碍。

本次事件仅造成冲入他人宿舍的`Yun_me`因为**人一次的勇气酿成一生的内向**
:::