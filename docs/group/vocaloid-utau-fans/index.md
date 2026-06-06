<link rel="stylesheet" href="/group/vocaloid-utau-fans/styles.css">

# WHUDAYS-Vocaloid/Utau Fans

![WHUDAYS-Vocaloid/Utau Fans](/group/vocaloid-utau-fans/logo.jpg)

<script setup>
import { avatarOf } from '/.vitepress/data/people.js'
</script>

## 关于

这里是武汉大学动漫协会下属的虚拟歌手交流群 WHUDAYS-Vocaloid/Utau Fans!

2018 年建群时，主流的歌声合成引擎是 VOCALOID 和 UTAU，故以此命名。近年来很多新引擎也很受欢迎，比如 CeVIO、Synthesizer V、ACE 等。虽然群名叫 VOCALOID/UTAU Fans，但我们也欢迎喜欢其他引擎的歌手的同好加入我们！

## 成员

群里聚集了不少各种类型的虚拟歌手相关作品创作者，包括调教、画手、编曲等。当然，除了创作者还有众多热爱虚拟歌手的同好们。

主要成员一览：

<!-- 
Bug 原因：
- 外部 CSS 文件加载时序不确定
- SSR 预渲染时样式未加载，客户端 hydration 时样式已加载
- 导致服务端和客户端渲染结果不一致，触发 hydration mismatch 错误
解决方案：
- 使用<ClientOnly>包裹，强制客户端渲染
-->
<ClientOnly>
<div class="member-grid">
  <MemberCard
    name="RemeaMiku (岚曦)"
    :avatar="avatarOf('RemeaMiku (岚曦)')"
    description="绘画苦手 ミク最高！"
    link="/group/vocaloid-utau-fans/members/remeamiku"
    :badges="[{ type: 'tip', text: '管理员' }, { type: 'warning', text: '创作者' }, { type: 'info', text: '维护者' }]"
    :socials="[{ platform: 'pixiv', url: 'https://www.pixiv.net/users/24701727', icon: '/group/vocaloid-utau-fans/members/sns/pixiv.svg' }, { platform: 'github', url: 'https://github.com/RemeaMiku', icon: '/group/vocaloid-utau-fans/members/sns/github.svg' }, { platform: 'bilibili', url: 'https://space.bilibili.com/86866407', icon: '/group/vocaloid-utau-fans/members/sns/bilibili.svg' }]"
  />
  <MemberCard
    name="二酸化炭素"
    :avatar="avatarOf('二酸化炭素')"
    description="霓虹金"
    link=""
    :badges="[{ type: 'danger', text: '群主' }]"
    :socials="[]"
  />
  <MemberCard
    name="-QuQ-"
    :avatar="avatarOf('-QuQ-')"
    description=""
    link=""
    :badges="[{ type: 'tip', text: '管理员' },{ type: 'info', text: '维护者' }]"
    :socials="[{ platform: 'github', url: 'https://github.com/shenxianovo', icon: '/group/vocaloid-utau-fans/members/sns/github.svg' },{ platform: 'bilibili', url: 'https://space.bilibili.com/446305918', icon: '/group/vocaloid-utau-fans/members/sns/bilibili.svg' }]"
  />
  <MemberCard
    name="a初音ミクz"
    :avatar="avatarOf('a初音ミクz')"
    description="隔壁华科的内鬼"
    link=""
    :badges="[{ type: 'tip', text: '管理员' },]"
    :socials="[]"
  />
  <MemberCard
    name="Arccos"
    :avatar="avatarOf('Arccos')"
    description=""
    link=""
    :badges="[{ type: 'tip', text: '管理员' },]"
    :socials="[]"
  />
  <MemberCard
    name="烧烤"
    :avatar="avatarOf('烧烤(VOCALOID)')"
    description=""
    link=""
    :badges="[{ type: 'tip', text: '管理员' },]"
    :socials="[]"
  />
  <MemberCard
    name="Imris"
    :avatar="avatarOf('Imris')"
    description=""
    link=""
    :badges="[{ type: 'tip', text: '管理员' },]"
    :socials="[]"
  />
  <MemberCard
    name="InkFea 墨墨羽"
    :avatar="avatarOf('InkFea 墨墨羽')"
    description="调校师丨Vup偶尔播播"
    link=""
    :badges="[{ type: 'tip', text: '管理员' },{ type: 'warning', text: '创作者' },]"
    :socials="[{ platform: 'bilibili', url: 'https://space.bilibili.com/15135608', icon: '/group/vocaloid-utau-fans/members/sns/bilibili.svg' }]"
  />
  <MemberCard
    name="Jusfans PG"
    :avatar="avatarOf('Jusfans PG')"
    description="中 V 小群主"
    link=""
    :badges="[{ type: 'danger', text: '群主' },{ type: 'tip', text: '管理员' },]"
    :socials="[]"
  />
  <MemberCard
    name="浅月明"
    :avatar="avatarOf('浅月明')"
    description=""
    link=""
    :badges="[{ type: 'tip', text: '管理员' },]"
    :socials="[]"
  />
</div>
</ClientOnly>

<!-- 
  成员卡模板 - 添加新成员时复制下面的代码并修改相应信息：
  
  <MemberCard
    name="成员名称 (昵称)"
    :avatar="avatarOf('成员名称 (昵称)')"
    description="成员描述"
    link=""
    :badges="[{ type: 'danger', text: '群主' },{ type: 'tip', text: '管理员' },{ type: 'warning', text: '创作者' },{ type: 'info', text: '维护者' }]"
    :socials="[{ platform: '平台名', url: '社交媒体链接', icon: '/group/vocaloid-utau-fans/members/sns/图标.svg' }]"
  />

  头像说明：
  - 头像统一在 docs/.vitepress/data/people.js 注册表里登记，本页面只用 :avatar="avatarOf('成员名称')"。
  - 新成员先在 people.js 加一行 `'成员名称': { avatar: ... }`：
    - 本地图片：放进 docs/public/avatars/，写 `/avatars/<文件名>` 作为 avatar 值
    - QQ 头像：写 `QQ('你的QQ号')`
  - 注册表中没有找到的成员名会回落到默认占位头像。
  
  导航链接说明：
    如果没有个人介绍详情页面，则不用修改；如果有个人详情页，将页面的 Markdown 文件放到 members 文件夹里，链接改成 /group/vocaloid-utau-fans/members/[Markdown 文件名]
  
  常用社交平台图标（可在 docs/public/group/vocaloid-utau-fans/sns/ 下追加静态资源或指定 URL）：
  - pixiv: /group/vocaloid-utau-fans/sns/pixiv.svg
  - github: /group/vocaloid-utau-fans/sns/github.svg
  - bilibili: /group/vocaloid-utau-fans/sns/bilibili.svg

-->

欢迎更多的虚拟歌手爱好者加入~

::: info 提示

   可联系维护者或直接在仓库提交 PR 将自己加入成员列表

:::

## 活动

自 2021 年恢复线下活动以来，我们举办过不少有趣的活动：

- [漫协活动出摊](/group/vocaloid-utau-fans/events/whudays)
- [演唱会观影](/group/vocaloid-utau-fans/events/live-watching)
- [初音未来 16 周年纪念生日会](/group/vocaloid-utau-fans/events/miku16th)
- [日常卡拉 OK](/group/vocaloid-utau-fans/events/karaoke)

我们也曾与武汉地区其他高校，包括华中科技大学、中南财经大学、华中师范大学、华中农业大学等的虚拟歌手同好交流群合作举办过活动！
