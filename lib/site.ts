export const site = {
  title: '武汉大学动漫协会-WHUDAYS',
  description: '武汉大学动漫协会（武大漫协 / WHUDAYS）官方历史存档站，记录 1997 年至今的社团活动、部门、成员与刊物。',
  url: 'https://whudays.org',
  keywords: ['武汉大学动漫协会', '武大漫协', 'WHUDAYS', 'ACGN', '动漫社团', '武大动漫社', '冬日祭', '春日祭', '樱次元', '夏樱乐团'],
};
export const organization = {
  '@context': 'https://schema.org', '@type': 'Organization',
  name: '武汉大学动漫协会', alternateName: ['武大漫协', 'WHUDAYS'],
  url: `${site.url}/`, logo: `${site.url}/WHUDAYS.png`, foundingDate: '1997',
  parentOrganization: { '@type': 'CollegeOrUniversity', name: '武汉大学', alternateName: 'Wuhan University', url: 'https://www.whu.edu.cn/' },
  sameAs: ['https://github.com/WHUDAYS', 'https://space.bilibili.com/20942465'],
};
