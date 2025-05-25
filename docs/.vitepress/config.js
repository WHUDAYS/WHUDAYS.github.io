export default {
    // 站点级选项
    title: "武汉大学动漫协会-WHUDAYS", // 网站标题
    description: "武汉大学动漫协会", // 网站描述
    sitemap: {
        hostname: "https://whudays.github.io/", // 网站域名
    },
    head: [
        ['meta', { name: 'keywords', content: '武汉大学动漫协会, 武大漫协, WHUDAYS, ACGN, 动漫社团, 武汉大学' }],
        ['link', { rel: 'icon', href: '/favicon.ico' }]
    ],

    themeConfig: {
        // 主题级选项
        nav: [
            { text: '首页', link: '/' },
            { text: '关于', link: '/about' },
            { text: '部门', link: '/department' },
            { text: '留声箱', link: "/message-box/" }
        ],
        sidebarMenuLabel: '菜单',
        returnToTopLabel: '回到顶部',
        sidebar: {
            '/about': [
                {
                    text: "关于社团",
                    collapsed: false,
                    items: [
                        { text: "关于本站", link: "/about" },
                        { text: "社团介绍", link: "/about/introduction" }
                    ]
                },
                {
                    text: "萌新指南",
                    collapsed: false,
                    items: [
                        { text: "2024萌新指南", link: "/about/newbie-guide/2024" },
                        { text: "一、武大漫协Q&A", link: "/about/newbie-guide/2024/01-faq" },
                        { text: "二、武大漫协大群群规", link: "/about/newbie-guide/2024/02-rules" },
                        { text: "三、关注武大漫协官方账号", link: "/about/newbie-guide/2024/03-official-accounts" },
                        { text: "四、2024萌新指南（pdf）", link: "/about/newbie-guide/2024/04-raw" }
                    ]
                },
            ],
            'department': [
                {
                    text: "社团部门",
                    collapsed: false,
                    items: [
                        { text: "部门简介", link: "/department" },
                        { text: "暗部", link: "/department/dark" },
                        { text: "演音部", link: "/department/va" },
                        { text: "夏樱乐团", link: "/department/band" },
                        { text: "cos部", link: "/department/cos" },
                        { text: "编辑部", link: "/department/edit" },
                        { text: "wota艺部", link: "/department/wota" }
                    ]
                }
            ],
            'message-box': [
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
        }
    }
};