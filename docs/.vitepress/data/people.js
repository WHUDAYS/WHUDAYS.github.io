// 全站人员注册表：name -> { avatar, github?, mapByNameAliases?, mapByEmailAliases? }
//
// 头像来源两类：
//   1. 本地：'/avatars/<name>.<ext>'，文件实际位于 docs/public/avatars/
//   2. QQ：QQ('uin')，由腾讯 q1.qlogo.cn 动态返回
//
// 调用入口：
//   - avatarOf(name)        : 给 MemberCard / ChatMessage 等组件用
//   - memberOf(name, extras): 给 VPTeamMembers 用，extras 透传 title/desc/links 等
//   - buildMapAuthors()     : 派生 git-changelog 的 mapAuthors 配置

const QQ = (uin, size = 640) => `https://q1.qlogo.cn/g?b=qq&nk=${uin}&s=${size}`

export { QQ }

export const PLACEHOLDER_AVATAR = '/avatars/_placeholder.png'

export const people = {
  // === git 贡献者 ===
  '-QuQ-': {
    avatar: '/avatars/-QuQ-.jpeg',
    github: 'shenxianovo',
    mapByNameAliases: ['shenxianovo'],
    mapByEmailAliases: ['shenxianovo@gmail.com', 'shenxianovo@outlook.com'],
  },
  '岚曦': {
    avatar: '/avatars/岚曦.jpeg',
    github: 'RemeaMiku',
    mapByNameAliases: ['RemeaMiku', 'nʞᴉɯɐǝɯǝɹ'],
    mapByEmailAliases: ['remeamiku@gmail.com', 'tianchen.zhou.whu@outlook.com'],
  },
  '涅普智可': {
    avatar: '/avatars/涅普智可.png',
    github: 'Nepchico',
    mapByNameAliases: ['Nepchico'],
    mapByEmailAliases: ['Nepchico@gmail.com', '85654042+Nepchico@users.noreply.github.com'],
  },
  'wweiyi': {
    avatar: '/avatars/wweiyi.jpeg',
    github: 'wweiyi2004',
    mapByNameAliases: ['wweiyi'],
    mapByEmailAliases: ['2844938982@qq.com'],
  },
  'Yun_me': {
    avatar: '/avatars/Yun_me.jpg',
    github: 'Yun-me',
    mapByNameAliases: ['Yun-me'],
    mapByEmailAliases: ['936455961@qq.com'],
  },
  '纱橙靈': {
    avatar: '/avatars/纱橙靈.jpeg',
    github: 'Tcelylin',
    mapByNameAliases: ['Tcelylin'],
    mapByEmailAliases: ['243813586@qq.com'],
  },
  'Animnia': {
    avatar: QQ('2550838863'),
    github: 'Animnia',
    mapByNameAliases: ['Animnia'],
    mapByEmailAliases: ['2550838863@qq.com'],
  },
  'awaqwq233': {
    avatar: PLACEHOLDER_AVATAR,
    github: 'awaqwq233',
    mapByNameAliases: ['awaqwq233'],
    mapByEmailAliases: ['2024302111400@whu.edu.cn'],
  },
  'Mushayuki': {
    avatar: QQ('1079056948'),
    github: 'Mushayuki',
    mapByNameAliases: ['Mushayuki'],
    mapByEmailAliases: ['1079056948@qq.com'],
  },
  'INFINITY': {
    avatar: 'https://www.github.com/xingzelei.png',
    github: 'xingzelei',
    mapByNameAliases: ['xingzelei'],
    mapByEmailAliases: ['billtonxing@gmail.com'],
  },
  'Nagi': {
    avatar: 'https://www.github.com/yiyuchichu.png',
    github: 'yiyuchichu',
    mapByNameAliases: ['yiyuchichu'],
    mapByEmailAliases: ['1304739403@qq.com'],
  },

  // === HQ 2024（最新一届，与冲突时优先） ===
  '茂桑': { avatar: '/avatars/茂桑.jpeg' },
  '纱月Satsuki': { avatar: '/avatars/纱月Satsuki.jpeg' },
  '西加尔': { avatar: '/avatars/西加尔.jpeg' },
  'scapino': { avatar: '/avatars/scapino.jpeg' },
  '灰灰': { avatar: '/avatars/灰灰.jpeg' },
  'storm': { avatar: '/avatars/storm.jpeg' },
  '风又千夜': { avatar: QQ('3174609292') },
  'YY': { avatar: '/avatars/YY.png' },
  '埃兰伊亚-Elenia': { avatar: QQ('2652573036') },
  '树枝': { avatar: '/avatars/树枝.jpeg' },
  '丝瓜炖汤': { avatar: '/avatars/丝瓜炖汤.jpeg' },
  '悠梦': { avatar: '/avatars/悠梦.jpeg' },
  '阳': { avatar: PLACEHOLDER_AVATAR },

  // === HQ 2023 ===
  '瓜': { avatar: '/avatars/瓜.png' },
  'zeit': { avatar: '/avatars/zeit.jpeg' },
  '烧烤': { avatar: '/avatars/烧烤.jpeg' },
  '安轩': { avatar: '/avatars/安轩.jpeg' },
  '始华': { avatar: '/avatars/始华.jpeg' },
  '风沉白': { avatar: '/avatars/风沉白.jpeg' },
  '北洛': { avatar: '/avatars/北洛.jpeg' },
  '干君': { avatar: '/avatars/干君.jpeg' },
  '土川': { avatar: '/avatars/土川.jpeg' },

  // === HQ 2022 ===
  '葑菲': { avatar: '/avatars/葑菲.jpeg' },
  '影临光': { avatar: '/avatars/影临光.jpg' },
  '冰荷': { avatar: '/avatars/冰荷.jpg' },
  '平板': { avatar: '/avatars/平板.jpeg' },
  '汐宫': { avatar: '/avatars/汐宫.jpeg' },
  '龙井': { avatar: '/avatars/龙井.jpeg' },
  'ange': { avatar: '/avatars/ange.jpg' },

  // === HQ 2021 ===
  '七月疯兔': { avatar: '/avatars/疯兔.jpeg' },
  '壹個': { avatar: '/avatars/壹個.jpg' },
  '影黎': { avatar: '/avatars/影黎.jpg' },
  '72': { avatar: '/avatars/72.jpg' },
  '开跌': { avatar: '/avatars/开跌.png' },
  '学徒': { avatar: '/avatars/学徒.jpg' },
  '秦淮': { avatar: '/avatars/秦淮.jpg' },
  '千遇': { avatar: '/avatars/千遇.jpg' },
  'WJ': { avatar: '/avatars/WJ.jpg' },

  // === HQ 2020 ===
  'Rosie': { avatar: '/avatars/Rosie.jpg' },
  '掉线': { avatar: '/avatars/掉线.jpg' },
  '骑士': { avatar: '/avatars/骑士.jpg' },
  '大粽': { avatar: '/avatars/大粽.jpg' },
  '砌槐': { avatar: '/avatars/砌槐.jpg' },
  '槑菌': { avatar: '/avatars/槑菌.jpg' },
  '春阁下': { avatar: '/avatars/春阁下.jpg' },
  '洛棠': { avatar: '/avatars/洛棠.jpg' },
  'Narcissus': { avatar: '/avatars/narcissus.jpeg' },
  '优格': { avatar: '/avatars/优格.jpg' },
  '方块': { avatar: '/avatars/方块.jpg' },

  // === HQ 2019 ===
  '名字': { avatar: '/avatars/名字.jpeg' },
  '子非羽': { avatar: '/avatars/子非羽.jpg' },
  '橘七': { avatar: '/avatars/橘七.jpg' },
  '龙虾': { avatar: '/avatars/龙虾.jpg' },
  '秋啾': { avatar: '/avatars/秋啾.jpg' },
  '冬阳': { avatar: '/avatars/冬阳.jpg' },
  '安怡': { avatar: '/avatars/安怡.jpg' },
  '海豹': { avatar: '/avatars/海豹.jpg' },
  '听海': { avatar: '/avatars/听海.jpg' },
  '夷辰': { avatar: '/avatars/夷辰.jpg' },
  'C酱': { avatar: '/avatars/C酱.jpg' },

  // === HQ 2018 ===
  'DiVE': { avatar: '/avatars/DiVE.png' },
  '米斯特': { avatar: '/avatars/米斯特.jpg' },
  '圆酒': { avatar: '/avatars/圆酒.jpg' },
  '三三': { avatar: '/avatars/三三.jpg' },
  '中出': { avatar: '/avatars/中出.jpg' },
  '红鲤': { avatar: '/avatars/红鲤.jpg' },
  '三问': { avatar: '/avatars/三问.jpg' },
  '晗酱': { avatar: '/avatars/晗酱.jpg' },
  'ATP': { avatar: '/avatars/ATP.jpg' },
  '昭昭': { avatar: '/avatars/昭昭.jpg' },
  '仙洛': { avatar: '/avatars/仙洛.jpg' },
  '爱姬': { avatar: '/avatars/爱姬.jpg' },
  '阿弄': { avatar: '/avatars/阿弄.jpg' },
  '彼方': { avatar: '/avatars/彼方.jpg' },
  '三日': { avatar: '/avatars/三日.jpg' },

  // === HQ 2017 ===
  '残念': { avatar: '/avatars/残念.jpg' },
  '魔王': { avatar: '/avatars/魔王.jpg' },
  '北大门的天灾': { avatar: '/avatars/北大门的天灾.jpg' },
  '天狗': { avatar: '/avatars/天狗.jpg' },
  '铜鼓': { avatar: '/avatars/铜鼓.jpg' },
  '茶子': { avatar: '/avatars/茶子.jpg' },
  '声灵': { avatar: '/avatars/声灵.jpg' },
  '中三病': { avatar: '/avatars/中三病.jpg' },
  '电锯': { avatar: '/avatars/电锯.jpg' },
  '劫灰': { avatar: '/avatars/劫灰.jpg' },
  '李子': { avatar: '/avatars/李子.jpg' },
  '凛': { avatar: '/avatars/凛.jpg' },
  '美妈': { avatar: '/avatars/美妈.jpg' },
  '黑羽': { avatar: '/avatars/黑羽.jpg' },

  // === HQ 2016 ===
  'evy': { avatar: '/avatars/Evy.jpg' },
  'SRin': { avatar: '/avatars/SRin.jpg' },
  '包子': { avatar: '/avatars/包子.jpg' },
  '不科学': { avatar: '/avatars/不科学.jpg' },
  'Kuma': { avatar: '/avatars/KUMA.jpg' },
  'elegy': { avatar: '/avatars/elegy.jpg' },
  '九日': { avatar: '/avatars/九日.jpg' },
  '鸭梨': { avatar: '/avatars/鸭梨.jpg' },
  '小天': { avatar: '/avatars/小天.jpg' },
  '大痴': { avatar: '/avatars/大痴.jpg' },
  '树皮': { avatar: '/avatars/树皮.jpg' },
  'Layla': { avatar: '/avatars/Layla.jpg' },
  '穹妹': { avatar: '/avatars/穹妹.jpg' },

  // === HQ 2015 ===
  '鬼目': { avatar: '/avatars/鬼目.jpg' },
  '喵少': { avatar: '/avatars/喵少.jpg' },
  '眠子': { avatar: '/avatars/眠子.jpg' },
  '罪恶': { avatar: '/avatars/罪恶.jpg' },
  '86': { avatar: '/avatars/86.jpg' },
  '杂音': { avatar: '/avatars/杂音.jpg' },
  'Lion': { avatar: '/avatars/Lion.jpg' },
  '玫音': { avatar: '/avatars/玫音.jpg' },
  'well': { avatar: '/avatars/well.jpg' },
  '冷凝': { avatar: '/avatars/冷凝.jpg' },
  'TheEscapist': { avatar: '/avatars/TheEscapist.jpg' },

  // === HQ 2013 ===
  '正面': { avatar: '/avatars/正面.jpeg' },
  '店长': { avatar: '/avatars/店长.jpeg' },
  '世闲': { avatar: '/avatars/世闲.jpg' },

  // === activity 2025 welcome-party ===
  '二氧化碳': { avatar: '/avatars/二氧化碳.jpg' },
  '多米诺骨牌': { avatar: '/avatars/多米诺骨牌.png' },
  '梨紫': { avatar: '/avatars/梨紫.png' },
  '椿雪': { avatar: '/avatars/椿雪.jpeg' },
  'towa': { avatar: '/avatars/towa.jpeg' },
  '伴夏': { avatar: '/avatars/伴夏.jpeg' },

  // === activity 2025 come-leave ===
  '澪原初华': { avatar: QQ('2022304191') },
  '沙拉': { avatar: QQ('985938202') },
  'Suika': { avatar: QQ('2871867114') },
  'Izumi': { avatar: QQ('3421285702') },
  '乌冬': { avatar: QQ('2035285899') },
  'xmtx': { avatar: QQ('2252966746') },
  '陈田翔': { avatar: QQ('1415265271') },

  // === activity 2025 magazine ===
  '流澜': { avatar: '/avatars/流澜.jpg' },

  // === maintainer ===
  '椅子': { avatar: '/avatars/椅子.jpeg' },
  '初春': { avatar: '/avatars/初春.png' },

  // === group/galgame group-owner ===
  '黑羽仙洛': { avatar: '/avatars/黑羽仙洛.png' },
  '天凉好个秋': { avatar: '/avatars/天凉好个秋.png' },
  'Atelier Recittal': { avatar: '/avatars/Atelier Recittal.png' },
  'Darkream': { avatar: '/avatars/Darkream.png' },

  // === group/vocaloid-utau-fans members ===
  'InkFea 墨墨羽': { avatar: '/avatars/InkFea 墨墨羽.jpg' },
  'RemeaMiku (岚曦)': { avatar: QQ('1597638582', 100) },
  '二酸化炭素': { avatar: QQ('2078467653', 100) },
  'a初音ミクz': { avatar: QQ('1687165919', 100) },
  'Arccos': { avatar: QQ('2163254470', 100) },
  '烧烤(VOCALOID)': { avatar: QQ('2780072534', 100) },
  'Imris': { avatar: QQ('3161441399', 100) },
  'Jusfans PG': { avatar: QQ('943441394', 100) },
  '浅月明': { avatar: QQ('2835365089', 100) },

  // === group/ani-key participants ===
  'yihu': { avatar: '/avatars/yihu.jpg' },

  // === activity/2025/welcome-party credits 里出现的 QQ-only 成员 ===
  '九尾晨': { avatar: QQ('1540104836') },
  '化纤咲': { avatar: QQ('970088006') },
  '花桑': { avatar: QQ('3330567554') },
  '霂霜': { avatar: QQ('1079056948') },
  '四角五十分': { avatar: QQ('3541769752') },
  '想吃海鲜': { avatar: QQ('2629107663') },
  '白夜': { avatar: QQ('3356940959') },
  '鸭鸭鸭': { avatar: QQ('7613753') },
  '垂杨': { avatar: QQ('1557019243') },
  '谛霞': { avatar: QQ('3237452706') },
  '利洛': { avatar: QQ('1416439811') },
  '艾其': { avatar: QQ('3551088713') },
  '伊伊': { avatar: QQ('1064310442') },
  '才子': { avatar: QQ('1282063020') },
  '竹杖化龙': { avatar: QQ('3139267329') },
  '极夜晓月君': { avatar: QQ('2186387030') },
  '辂木': { avatar: QQ('1404921055') },
  '滑瓢': { avatar: QQ('1804183397') },
  'miu': { avatar: QQ('3307487273') },
  'izumi': { avatar: QQ('3421285702') },
  'Inexistent√7': { avatar: QQ('1558570957') },
  'wing': { avatar: QQ('1147869087') },
  '吐司炸弹': { avatar: QQ('1337921275') },
  '麦恩莉': { avatar: QQ('1683383969') },
  'horsen🐮': { avatar: QQ('3463550668') },
  '夏洛': { avatar: QQ('2634161337') },
  '纱夜天仪': { avatar: QQ('2889100147') },
  'daki': { avatar: QQ('3357148314') },
  '勿严': { avatar: QQ('3066816169') },
  '狸雨': { avatar: QQ('2665083348') },
  '烛木': { avatar: QQ('26158277') },
  '剑语': { avatar: QQ('3012766646') },
  '桃沢紗奈子': { avatar: QQ('2928433543') },
  'clover': { avatar: QQ('2317312342') },
  '社会主义接班人': { avatar: QQ('640015087') },
  '凪行': { avatar: QQ('1304739403') },
  '萝苇萁': { avatar: QQ('2500389205') },
  '残长': { avatar: QQ('1626186878') },
  '里珂': { avatar: QQ('3269346878') },
  'Biophilia': { avatar: QQ('2786123260') },
}

export function avatarOf(name) {
  return people[name]?.avatar ?? PLACEHOLDER_AVATAR
}

// VPTeamMembers 一行式工厂；extras 透传 title / desc / links / sponsor / actionText 等
export function memberOf(name, extras = {}) {
  return { avatar: avatarOf(name), name, ...extras }
}

// 派生 git-changelog mapAuthors。只导出有 git 关联的项。
export function buildMapAuthors() {
  return Object.entries(people)
    .filter(([, p]) => p.github || p.mapByNameAliases || p.mapByEmailAliases)
    .map(([name, p]) => ({
      name,
      username: p.github,
      avatar: p.avatar,
      mapByNameAliases: p.mapByNameAliases,
      mapByEmailAliases: p.mapByEmailAliases,
    }))
}
