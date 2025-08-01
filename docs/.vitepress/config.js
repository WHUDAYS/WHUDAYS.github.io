import { defineConfig } from 'vitepress'
import {
	GitChangelog,
	GitChangelogMarkdownSection,
} from '@nolebase/vitepress-plugin-git-changelog/vite'

export default defineConfig({
	vite: {
		plugins: [
			GitChangelog({
				// 填写在此处填写您的仓库链接
				repoURL: () => 'https://github.com/WHUDAYS/WHUDAYS.github.io',
			}),
			GitChangelogMarkdownSection({
				sections: {
					disableContributors: true, // 关闭贡献者
					// disableChangelog: true, // 关闭 changelog
				}
			}),
		],
	},
	// 站点级选项
	lang: 'zh-CN',
	title: "武汉大学动漫协会-WHUDAYS", // 网站标题
	description: "武汉大学动漫协会", // 网站描述
	sitemap: {
		hostname: "https://whudays.github.io/", // 网站域名
	},
	head: [
		['meta', { name: 'keywords', content: '武汉大学动漫协会, 武大漫协, WHUDAYS, ACGN, 动漫社团, 武大动漫社' }],
		['meta', { name: 'author', content: '武汉大学动漫协会' }],
		['meta', { name: 'description', content: '武汉大学动漫协会官方网站，记录社团历史与活动，快来看看吧（！）\\^o^/' }],

		// Open Graph Protocol
		['meta', { property: 'og:title', content: '武汉大学动漫协会-WHUDAYS' }],
		['meta', { property: 'og:description', content: '武汉大学动漫协会官方网站，记录社团历史与活动，快来看看吧（！）\\^o^/' }],
		['meta', { property: 'og:image', content: '/WHUDAYS.png' }],
		['meta', { property: 'og:url', content: 'https://whudays.github.io/' }],

		// Google Analytics
		['script', { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-LQLQ2CEQ64' }],
		['script', {}, "window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-LQLQ2CEQ64');"],

		['link', { rel: 'icon', href: '/favicon.ico' }],
	],

	themeConfig: {
		// 主题级选项
		nav: [
			{ text: '首页', link: '/' },
			{ text: '关于', link: '/about/' },
			{ text: '活动', link: '/activity/' },
			{ text: '部门', link: '/department/' },
			{ text: '小群', link: '/group/' },
			{ text: '留声箱', link: "/message-box/" },
			{ text: '维护者', link: "/maintainer/" }
		],
		sidebarMenuLabel: '菜单',
		returnToTopLabel: '回到顶部',
		sidebar: {
			'/about/': [
				{
					text: "关于社团",
					collapsed: false,
					items: [
						{ text: "关于本站", link: "/about/" },
						{ text: "社团介绍", link: "/about/introduction" },
						{ text: "英灵殿", link: "/about/hq/" },
						{ text: "历年大群", link: "/about/annual-group" }
					]
				},
				{
					text: "萌新指南",
					collapsed: false,
					items: [
						{ text: "2025萌新指南", link: "/about/newbie-guide/2025/" },
						{ text: "一、武大漫协Q&A", link: "/about/newbie-guide/2025/faq" },
						{ text: "二、武大漫协大群群规", link: "/about/newbie-guide/2025/rules" },
						{ text: "三、关注武大漫协官方账号", link: "/about/newbie-guide/2025/official-accounts" },
						{ text: "四、2025萌新指南（pdf）", link: "/about/newbie-guide/2025/raw" }
					]
				},
			],
			'/activity/': [
				{
					text: "社团活动",
					collapsed: false,
					items: [
						{ text: "漫协大事记", link: "/activity/" },
						{
							text: "冬日祭系列",
							collapsed: true,
							items: [
								{ text: "第十三届冬日祭（2024）", link: "/activity/2024/winter-festival" },
								{ text: "第十二届冬日祭（2023）", link: "/activity/2023/winter-festival" },
								{ text: "第四届冬日祭（2015）", link: "/activity/2015/winter-festival" },
								{ text: "第三届冬日祭（2014）", link: "/activity/2014/winter-festival" },
								{ text: "第二届冬日祭（2013）", link: "/activity/2013/winter-festival" },
								{ text: "第一届冬日祭（2012）", link: "/activity/2012/winter-festival" },
							]
						},
						{
							text: "社刊《樱次元》",
							collapsed: true,
							items: [
								{ text: "2024年9月号", link: "/activity/2024/magazine" },
								{ text: "2023年9月号", link: "/activity/2023/magazine" },
								{ text: "2022年9月号", link: "/activity/2022/magazine" },
								{ text: "2021年9月号", link: "/activity/2021/magazine" },
								{ text: "2020年9月号", link: "/activity/2020/magazine" },
								{ text: "2019年6月号", link: "/activity/2019/magazine" },
								{ text: "2018年9月号", link: "/activity/2018/magazine" },
								{ text: "2017年9月号", link: "/activity/2017/magazine" },
								{ text: "2016年9月号", link: "/activity/2016/magazine" },
								{ text: "2015年9月号", link: "/activity/2015/magazine" },
								{ text: "2014年9月号", link: "/activity/2014/magazine" },
								{ text: "创刊号（2013.9）", link: "/activity/2013/magazine" },
							]
						},
						{
							text: "迎新片系列",
							collapsed: true,
							items: [
								{ text: "2024迎新片", link: "/activity/2024/welcome-video" },
								{ text: "2023迎新片", link: "/activity/2023/welcome-video" },
								{ text: "2022迎新片", link: "/activity/2022/welcome-video" },
								{ text: "2019迎新片", link: "/activity/2019/welcome-video" },
								{ text: "2016迎新片", link: "/activity/2016/welcome-video" },
							]
						},
					]
				},
			],
			'/department/': [
				{
					text: "社团部门",
					collapsed: false,
					items: [
						{ text: "部门简介", link: "/department/" },
						{ text: "暗部", link: "/department/dark/" },
						{
							text: "演音部", link: "/department/va/",
							collapsed: true,
							items: [
								{ text: "Re:START工作室", link: "/department/va/restart/" },
							]
						},
						{
							text: "夏樱乐团", link: "/department/band/",
							collapsed: true,
							items: [
								{ text: "管弦组", link: "/department/band/orchestra/" },
							]
						},
						{ text: "cos部", link: "/department/cos/" },
						{ text: "编辑部", link: "/department/edit/" },
						{ text: "wota艺部", link: "/department/wota/" },
						{
							text: "历史部门",
							collapsed: true,
							items: [
								{ text: "夏樱组", link: "/department/vtb/" },
							]
						},
					]
				}
			],
			'/group/': [
				{
					text: "社团小群",
					collapsed: false,
					items: [
						{ text: "小群简介", link: "/group/" },
						{ text: "WHUDAYS Galgame Party", link: "/group/galgame/" },
						{ text: "WHUDAYS-冰糖樱花", link: "/group/dry-humor/" },
						{ text: "WHUDAYS-Touhou Club", link: "/group/touhou-club/" },
						{ text: "WHUDAYS-Vocaloid/Utau Fans", link: "/group/vocaloid-utau-fans/" },
					]
				}
			],
			'/group/vocaloid-utau-fans/': [
				{
					text: "Vocaloid/Utau Fans",
					collapsed: false,
					items: [
						{ text: "简介", link: "/group/vocaloid-utau-fans/" },
						{
							text: "主要成员",
							collapsed: false,
							items: [
								{ text: "RemeaMiku (岚曦)", link: "/group/vocaloid-utau-fans/members/remeamiku" },
							]
						},
						{ text: "活动记录", 
						  collapsed: false,  
						  items: [
							{ text: "漫协活动出摊", link:"/group/vocaloid-utau-fans/events/whudays"},
							{ text: "演唱会观影", link: "/group/vocaloid-utau-fans/events/live-watching" },
							{ text: "初音未来 16 周年纪念生日会", link: "/group/vocaloid-utau-fans/events/miku16th" },
							{ text: "日常卡拉 OK", link: "/group/vocaloid-utau-fans/events/karaoke" },
						  ]},
					]
				}
			],
			'/message-box/': [
				{
					text: "留声箱",
					collapsed: false,
					items: [
						{ text: "喵呜", link: "/message-box/" },
					]
				}
			]
		},
		lastUpdated: {
			text: "最后更新",
			formatOptions: {
				dateStyle: "medium",
				timeStyle: "short"
			}
		},
		docFooter: {
			prev: "上一页",
			next: "下一页"
		},
		search: {
			provider: "local",
		},
		footer: {
			message: '本站点内容采用<a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh">知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议</a>进行许可',
			copyright: "Copyright © 1997-2025 武汉大学动漫协会<br>站内所有图片、文档等，版权归原作者所有，未经授权禁止使用。"
		}
	}
})